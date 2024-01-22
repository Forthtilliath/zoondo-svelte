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
	static getGameById(id: string) {
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
	static async createGame(
		creatorId: string,{
		gameName,
		friendName
	}: {
		gameName: string;
		friendName?: string;
	}) {
		const friend = friendName ? await User.getUserByUsername(friendName) : null;
		const playersId = friend ? [creatorId, friend.id] : [creatorId];
		return prismaClient.game.create({
			data: {
				id: crypto.randomUUID(),
				name: gameName,
				players: {
					connect: playersId.map((id) => ({ id }))
				}
			}
		});
	}
	static async joinGame(playerId: string, gameId: string) {
		const game = await Game.getGameById(gameId);
		if (!game) {
			return { message: 'Game not found', status: 404 };
		}
		if (game.players.length === 2) {
			return { message: 'Game already full', status: 409 };
		}

		console.log('Joining game', gameId, playerId, game);
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
}

export class User {
	static getUserByUsername(username: string) {
		return prismaClient.user.findUnique({
			where: {
				username
			}
		});
	}

	static getUserById(id: string) {
		return prismaClient.user.findUnique({
			where: {
				id
			}
		});
	}

	static getUsers() {
		return prismaClient.user.findMany();
	}
}
