import { prismaClient } from '../../lib/server/prisma';

export function createGame(p1: string, p2: string) {
	return prismaClient.game.create({
		data: {
			game_id: crypto.randomUUID(), // SQLite
			player1: { connect: { id: p1 } },
			player2: { connect: { id: p2 } },
			current_turn: 0,
			game_status: 'ongoing'
		}
		//select: { Players: true }
	});
}

export function getGame(game_id: string) {
	return prismaClient.game.findUnique({
		where: {
			game_id
		},
		include: { actions: true, cards: true }
	});
}
