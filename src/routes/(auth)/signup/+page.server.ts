import { auth } from '$lib/server/lucia';
import { fail, redirect } from '@sveltejs/kit';

import type { PageServerLoad, Actions } from './$types';
import { userSchema } from '$lib/schemas';
import { LuciaError } from 'lucia';

export const load: PageServerLoad = async ({ locals }) => {
	if (locals.user) throw redirect(302, '/');
};

export const actions: Actions = {
	default: async ({ request }) => {
		const formData = await request.formData();

		const parsedData = userSchema.safeParse(Object.fromEntries(formData));
		if (!parsedData.success) {
			return fail(400, {
				message: parsedData.error.format()
			});
		}
		const { username, email, password } = parsedData.data;

		try {
			console.log('Creating user...');
			await auth.createUser({
				key: {
					providerId: 'username',
					providerUserId: username.toLowerCase(),
					password
				},
				attributes: {
					username,
					email,
				}
			});
		} catch (e) {
			if (e instanceof LuciaError && e.message === 'AUTH_INVALID_KEY_ID') {
				return fail(400, {
					message: 'Username already taken'
				});
			}
			if (e instanceof Error) {
				console.error(e.message)
			}
			return fail(500, {
				message: 'An unknown error occurred'
			});
		}
		
		throw redirect(302, '/');
	}
};
