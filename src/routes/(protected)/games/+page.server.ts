import { type Actions } from '@sveltejs/kit';
import { Game } from '$lib/server/prisma';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const games = await Game.getGames();

	return {
		games
	};
};


export const actions: Actions = {
	newgame: async ({ locals }) => {
		Game.createGame(locals.user.userId);
	}
};
