import { auth } from '$lib/server/lucia';
import { redirect } from '@sveltejs/kit';

import { Prisma } from '@prisma/client';
import { userSignupSchema } from '$lib/schemas';
import { createAction } from '$lib/methods/createAction';
import { createActionCustomError, createActionError } from '$lib/methods/createActionError.js';

export const load = async ({ parent }) => {
	await parent();
};

export const actions = {
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
							return createActionCustomError(400, ['Email already taken'], 'email');
						}
						if (/username/i.test(e.message)) {
							return createActionCustomError(400, ['Username already taken'], 'username');
						}
					}
					if (e instanceof Error) {
						console.error(e.message);
					}
					return createActionError(500, ['An unknown error occurred']);
				}
				
				throw redirect(302, '/');
			}
		});
	}
};
