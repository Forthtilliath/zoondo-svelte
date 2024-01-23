import type { PageServerLoad } from './$types';
import db from '$lib/queries';

export const load: PageServerLoad = async ({ locals }) => {
	const currentGames = await db.games.getGamesByPlayerId(locals.user.userId);

	return {
		currentGames
	};
};
