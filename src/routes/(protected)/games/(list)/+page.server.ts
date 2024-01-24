import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from '../$types';
import { gameJoinSchema } from '$lib/schemas';
import db from '$lib/queries';
import { createAction } from '$lib/methods/createAction';
import { createActionError } from '$lib/methods/createActionError';

export const load: PageServerLoad = async () => {
	const games = await db.games.getGames();

	return {
		games
	};
};

export const actions = {
	join: async ({ locals, request }): F.ZodActionOutput<typeof gameJoinSchema> => {
		return createAction({
			request,
			schema: gameJoinSchema,
			callback: async ({ gameId }) => {
				const game = await db.games.getGameById(gameId);
				if (!game) {
					return createActionError(404, ['Game not found']);
				}
				if (game.players.length === 2) {
					return createActionError(409, ['Game already full']);
				}
				if(game.players.some((player) => player.id === locals.user.userId)) {
					return createActionError(409, ['You already joined this game']);
				}

				await db.games.joinGame(locals.user.userId, gameId);

				// The first player is the creator
				// We can choose him randomly
				await db.games.createGameDetail(game.id, game.created_by);

				throw redirect(302, '/games/' + gameId);
			}
		});
	}
};