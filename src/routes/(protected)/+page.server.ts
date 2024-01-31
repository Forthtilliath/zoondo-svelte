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

		let game = await db.createGame(opponentId, challengerId);
		const gameId = game.id;
		game = await db.initGame(game);
		throw redirect(302, `/games/${gameId}`);
	}
};
