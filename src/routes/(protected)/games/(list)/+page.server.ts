import { fail, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from '../$types';
import { gameJoinSchema } from '$lib/schemas';
import db from '$lib/queries';

export const load: PageServerLoad = async () => {
	const games = await db.games.getGames();

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

		await db.games.joinGame(locals.user.userId, parsedData.data.gameId);
	}
};
