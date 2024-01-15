import { auth } from '$lib/server/lucia';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	// - we can pass `event` because we used the SvelteKit middleware
	// - whenever a user is logged in we store their data in event.locals. Beware: if user updates a field, need to update user.locals as well!
	event.locals.auth = auth.handleRequest(event);
	const session = await event.locals.auth.validate();
	if (session) {
		event.locals.user = session.user;
	}
	return await resolve(event);
};
