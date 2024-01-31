import { redirect, fail } from '@sveltejs/kit';

import { auth } from '$lib/server/lucia';
import { prismaClient } from '$lib/server/prisma.js';
import { db } from '$lib/data/db.js';

export const load = async ({ parent }) => {
	await parent();
};

export const actions = {
	logout: async ({ locals }) => {
		const session = await locals.auth.validate();
		if (!session) return fail(401);
		await auth.invalidateSession(session.sessionId);
		locals.auth.setSession(null);
		throw redirect(302, '/signin');
	},
	fight: async ({ request, locals }) => {
		const formData = await request.formData();
		const opponentName = formData.get('opponent') as string;
		const opponent = await prismaClient.user.findFirst({
			where: { username: opponentName },
			select: { id: true }
		});
		if (!opponent) return;
		const opponentId = opponent.id;
		const challengerId = locals.user.userId;

		const game = await db.createGame(opponentId, challengerId);

		const challengerDeck = [
			'cloboulon',
			'cloboulon',
			'cloboulon',
			'cloboulon',
			'cloboulon',
			'cloboulon'
		];
		const opponentDeck = [
			'cloboulon',
			'cloboulon',
			'cloboulon',
			'cloboulon',
			'cloboulon',
			'cloboulon'
		];

		challengerDeck.map(async (card, idx) => {
			const instance = await db.createCardInstance({
				card_id: card,
				game_id: game.game_id,
				owner_id: challengerId,
				position: '',
				cardinstance_id: ''
			});
			await db.createAction({
				action_id: '',
				cardinstance_id: instance.cardinstance_id,
				destination: `${idx};1`,
				game_id: game.game_id,
				player_id: challengerId
			});
		});
		opponentDeck.map(async (card, idx) => {
			const instance = await db.createCardInstance({
				card_id: card,
				game_id: game.game_id,
				owner_id: opponentId,
				position: '',
				cardinstance_id: ''
			});
			await db.createAction({
				action_id: '',
				cardinstance_id: instance.cardinstance_id,
				destination: `${idx};4`,
				game_id: game.game_id,
				player_id: opponentId
			});
		});

		throw redirect(302, `/games/${game.game_id}`);
	}
};
