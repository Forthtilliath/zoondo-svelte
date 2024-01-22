import { fail, type Actions } from '@sveltejs/kit';
import { Game } from '$lib/server/prisma';
import type { PageServerLoad } from '../$types';
import { gameJoinSchema } from '$lib/schemas';

export const load: PageServerLoad = async () => {
	const games = await Game.getGames();

	return {
		games
	};
};

export const actions: Actions = {
	join: async ({ locals, request }) => {
		const formData = await request.formData();
		const parsedData = gameJoinSchema.safeParse(Object.fromEntries(formData));

		if (!parsedData.success) {
			return fail(400, {
				message: parsedData.error.format()
			});
		}

		Game.joinGame(locals.user.userId, parsedData.data.gameId);
	}
};
