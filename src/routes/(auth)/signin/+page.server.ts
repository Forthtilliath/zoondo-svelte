import { redirect } from '@sveltejs/kit';
import { LuciaError } from 'lucia';
import { auth } from '$lib/server/lucia';
import type { Actions } from './$types';
import { userSigninSchema } from '$lib/schemas';
import { createAction } from '$lib/methods/createAction';
import { parseError } from '$lib/methods/parseError';

export const actions: Actions = {
	default: async ({ request, locals }): F.ZodActionOutput<typeof userSigninSchema> => {
		return await createAction({
			request,
			schema: userSigninSchema,
			callback: async ({ username, password }) => {
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
						return parseError(400, ['Incorrect user or password']);
					}
					if (e instanceof Error) {
						console.error(e.message);
					}
					return parseError(500, ['An unknown error occurred']);
				}

				throw redirect(302, '/');
			}
		});
	}
};
