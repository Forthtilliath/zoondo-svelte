import { redirect } from '@sveltejs/kit';
import { gameCreateSchema } from '$lib/schemas';
import { createAction } from '$lib/methods/createAction.js';
import db from '$lib/queries';

export const load = async ({ parent }) => {
	await parent();

	const users = await db.users.getUsers();

	return {
		users
	};
};

export const actions = {
	create: async ({ locals, request }): F.ZodActionOutput<typeof gameCreateSchema> => {
		return createAction({
			request,
			schema: gameCreateSchema,
			callback: async ({ gameName, friendName }) => {
				const creatorId = locals.user.userId;
				const friend = await db.users.getUserByUsername(friendName);
				const playersId = friend ? [creatorId, friend.id] : [creatorId];
				const formatedPlayers = playersId.map((id) => ({ id }));
				const newGame = await db.games.createGame(gameName, formatedPlayers);

				throw redirect(302, '/games/' + newGame.id);
			}
		});
	}
};
