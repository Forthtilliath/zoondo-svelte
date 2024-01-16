import { PrismaClient } from '@prisma/client';

export const prismaClient = new PrismaClient();

export class Game {
	static getGamesByPlayerId(playerId: string) {
		return prismaClient.game.findMany({
			select: {
				id: true,
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
	/** Get all games */
	static getGames() {
		return prismaClient.game.findMany({
			select: {
				id: true,
				players: true
			}
		});
	}
	static createGame(playerId: string) {
		return prismaClient.game.create({
			data: {
				id: crypto.randomUUID(),
				players: {
					connect: {
						id: playerId
					}
				}
			}
		});
	}
}
