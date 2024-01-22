import { redirect } from '@sveltejs/kit';
import { Game, User } from '$lib/server/prisma';
import { gameCreateSchema } from '$lib/schemas';
import { createAction } from '$lib/methods/createAction.js';

export const load = async ({ parent }) => {
	await parent();

	const users = await User.getUsers();

	return {
		users
	};
};

export const actions = {
	create: async ({ locals, request }): F.ZodActionOutput<typeof gameCreateSchema> => {
		return createAction({
			request,
			schema: gameCreateSchema,
			callback: async (data) => {
				const newGame = await Game.createGame(locals.user.userId, data);

				throw redirect(302, '/games/' + newGame.id);
			}
		});
	}
};
