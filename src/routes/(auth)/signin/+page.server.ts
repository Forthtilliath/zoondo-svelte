import { auth } from '$lib/server/lucia';
import { LuciaError } from 'lucia';
import { fail, redirect, type ActionFailure } from '@sveltejs/kit';

import type { PageServerLoad, Actions } from './$types';
import { userSigninSchema } from '$lib/schemas';
import type { z } from 'zod';

export const load: PageServerLoad = async ({ locals }) => {
	if (locals.user) throw redirect(302, '/');
};

type DefaultActionOutput = Promise<
	ActionFailure<{ message: z.inferFormattedError<typeof userSigninSchema> }>
>;
export const actions: Actions = {
	default: async ({ request, locals }): DefaultActionOutput => {
		const formData = await request.formData();

		const parsedData = userSigninSchema.safeParse(Object.fromEntries(formData));
		if (!parsedData.success) {
			return fail(400, {
				message: parsedData.error.format()
			});
		}
		const { username, password } = parsedData.data;

		try {
			const key = await auth.useKey('username', username.toLowerCase(), password);
			const session = await auth.createSession({
				userId: key.userId,
				attributes: {}
			});
			locals.auth.setSession(session);
		} catch (e) {
			if (
				e instanceof LuciaError &&
				(e.message === 'AUTH_INVALID_KEY_ID' || e.message === 'AUTH_INVALID_PASSWORD')
			) {
				return fail(400, {
					message: { _errors: ['Incorrect username or password'] }
				});
			}
			return fail(500, {
				message: { _errors: ['An unknown error occurred'] }
			});
		}

		throw redirect(302, '/');
	}
};
