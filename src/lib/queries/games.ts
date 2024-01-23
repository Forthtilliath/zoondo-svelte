import { prismaClient } from '$lib/server/prisma';

export function getGames() {
	return prismaClient.game.findMany({
		select: {
			id: true,
			name: true,
			players: true
		}
	});
}

export function getGameById(id: string) {
	return prismaClient.game.findUnique({
		select: {
			id: true,
			players: true
		},
		where: {
			id
		}
	});
}

export function getGamesByPlayerId(playerId: string) {
	return prismaClient.game.findMany({
		select: {
			id: true,
			name: true,
			players: true
		},
		where: {
			players: {
				some: {
					id: playerId
				}
			}
		}
	});
}

export async function createGame(gameName: string, playersId: { id: string }[]) {
	return prismaClient.game.create({
		data: {
			id: crypto.randomUUID(),
			name: gameName,
			players: {
				connect: playersId
			}
		}
	});
}

export async function joinGame(playerId: string, gameId: string) {
	const game = await getGameById(gameId);
	if (!game) {
		return { message: 'Game not found', status: 404 };
	}
	if (game.players.length === 2) {
		return { message: 'Game already full', status: 409 };
	}

	return prismaClient.game.update({
		where: {
			id: gameId
		},
		data: {
			players: {
				connect: {
					id: playerId
				}
			}
		}
	});
}
