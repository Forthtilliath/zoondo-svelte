import db from '$lib/queries/index.js';

export const load = async ({ params, parent }) => {
	await parent();

	return {
		board: await db.games.getGame(params.id),
		gameId: params.id
	};
};
