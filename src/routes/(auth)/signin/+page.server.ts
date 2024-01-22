import { redirect } from '@sveltejs/kit';
import { LuciaError } from 'lucia';
import { auth } from '$lib/server/lucia';
import { userSigninSchema } from '$lib/schemas';
import { createAction } from '$lib/methods/createAction';
import { createActionError } from '$lib/methods/createActionError';

export const load = async ({ parent }) => {
	await parent();
};

export const actions = {
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
						return createActionError(400, ['Incorrect user or password']);
					}
					if (e instanceof Error) {
						console.error(e.message);
						return createActionError(500, [e.message]);
					}
					return createActionError(500, ['An unknown error occurred']);
				}

				throw redirect(302, '/');
			}
		});
	}
};
