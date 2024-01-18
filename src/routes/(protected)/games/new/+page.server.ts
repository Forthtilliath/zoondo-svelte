import { redirect } from '@sveltejs/kit';
import { Game, User } from '$lib/server/prisma';
import type { gameCreateSchema } from '$lib/schemas';

export const load = async () => {
	const users = await User.getUsers();

	return {
		users
	};
};

export const actions = {
	create: async ({ locals }): F.ZodActionOutput<typeof gameCreateSchema> => {
		const newGame = await Game.createGame(locals.user.userId);

		throw redirect(302, '/games/' + newGame.id);
	}
};
