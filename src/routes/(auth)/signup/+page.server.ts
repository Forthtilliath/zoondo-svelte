import { auth } from '$lib/server/lucia';
import { fail, redirect } from '@sveltejs/kit';

import type { Actions } from './$types';
import { Prisma } from '@prisma/client';
import { userSignupSchema } from '$lib/schemas';
import { createAction } from '$lib/methods/createAction';

export const actions: Actions = {
	default: async ({ request, locals }): F.ZodActionOutput<typeof userSignupSchema> => {
		return createAction({
			request,
			schema: userSignupSchema,
			callback: async ({ username, password, email }) => {
				try {
					const user = await auth.createUser({
						key: {
							providerId: 'username',
							providerUserId: username.toLowerCase(),
							password
						},
						attributes: {
							username,
							email
						}
					});

					const session = await auth.createSession({
						userId: user.userId,
						attributes: {}
					});
					locals.auth.setSession(session);
				} catch (e) {
					if (e instanceof Prisma.PrismaClientKnownRequestError) {
						if (/email/i.test(e.message)) {
							return fail(400, {
								message: { email: { _errors: ['Email already taken'] }, _errors: [] }
							});
						}
						if (/username/i.test(e.message)) {
							return fail(400, {
								message: { username: { _errors: ['Username already taken'] }, _errors: [] }
							});
						}
					}
					if (e instanceof Error) {
						console.error(e.message);
					}
					return fail(500, {
						message: { _errors: ['An unknown error occurred'] }
					});
				}
				console.log("====")
				throw redirect(302, '/');
			}
		});
	}
};
