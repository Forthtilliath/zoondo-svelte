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

export function getGameById(gameId: string) {
	return prismaClient.game.findUnique({
		select: {
			id: true,
			players: true,
			created_by: true
		},
		where: {
			id: gameId
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
			created_by: playersId[0].id,
			players: {
				connect: playersId
			}
		}
	});
}

export async function joinGame(playerId: string, gameId: string) {
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

export async function createGameDetail(gameId: string, firstPlayer: string) {
	return prismaClient.gameDetail.create({
		data: {
			id: crypto.randomUUID(),
			game_id: gameId,
			first_player: firstPlayer
		}
	});
}
