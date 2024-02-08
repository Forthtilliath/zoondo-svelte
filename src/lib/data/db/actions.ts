import { prismaClient } from '../../server/prisma';

export function create(action: DB.ActionCreate) {
	return prismaClient.action.create({
		data: {
			action_id: crypto.randomUUID(), // SQLite
			game_id: action.game_id,
			cardinstance_id: action.cardinstance_id,
			player_id: action.player_id,
			destination: action.destination
		}
	});
}

export function getLastAction(game_id: DB.Action['game_id']) {
	return prismaClient.action.findMany({
		where: { game_id },
		orderBy: { created_at: 'desc' },
		take: 1
	});
}
