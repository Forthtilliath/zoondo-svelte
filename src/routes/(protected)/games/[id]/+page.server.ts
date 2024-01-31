import { db } from '$lib/data/db.js';

export const load = async ({ params, parent }) => {
	await parent();

	return {
		board: await db.getGame(params.id)
	};
};
