import db from '$lib/data/db';

export const load = async ({ params, parent }) => {
	await parent();

	return {
		board: await db.games.get(params.id)
	};
};
