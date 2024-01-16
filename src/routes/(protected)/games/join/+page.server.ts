import type { PageServerLoad } from './$types';
import { Game } from '$lib/server/prisma';

export const load: PageServerLoad = async () => {
	const games = await Game.getGames();

	return {
		games
	};
};
