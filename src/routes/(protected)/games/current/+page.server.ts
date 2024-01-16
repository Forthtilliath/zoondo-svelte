import type { PageServerLoad } from './$types';
import { Game } from '$lib/server/prisma';

export const load: PageServerLoad = async ({ locals }) => {
	const currentGames = await Game.getGamesByPlayerId(locals.user.userId);

	return {
		currentGames
	};
};
