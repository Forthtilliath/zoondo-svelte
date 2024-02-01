import { prismaClient } from '../../server/prisma';

export function create(p1: string, p2: string) {
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

export function get(game_id: string) {
	return prismaClient.game.findFirst({
		where: { game_id },
		include: { actions: true, cards: true }
	});
}
