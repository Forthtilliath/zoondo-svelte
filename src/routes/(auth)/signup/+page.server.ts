import { auth } from '$lib/server/lucia';
import { fail, redirect, type ActionFailure } from '@sveltejs/kit';

import type { PageServerLoad, Actions } from './$types';
import { userSignupSchema } from '$lib/schemas';
import { Prisma } from '@prisma/client';
import type { z } from 'zod';

export const load: PageServerLoad = async ({ locals }) => {
	if (locals.user) throw redirect(302, '/');
};

type DefaultActionOutput = Promise<
	ActionFailure<{ message: z.inferFormattedError<typeof userSignupSchema> }>
>;
export const actions: Actions = {
	default: async ({ request, locals }): DefaultActionOutput => {
		const formData = await request.formData();

		const parsedData = userSignupSchema.safeParse(Object.fromEntries(formData));
		if (!parsedData.success) {
			return fail(400, {
				message: parsedData.error.format()
			});
		}
		const { username, email, password } = parsedData.data;

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
				// return fail(400, {
				// 	message: 'Username or email already taken'
				//// 	message: { _errors: ['Username or email already taken'] }
				// });
			}
			if (e instanceof Error) {
				console.error(e.message);
			}
			return fail(500, {
				message: { _errors: ['An unknown error occurred'] }
			});
		}

		throw redirect(302, '/');
	}
};
