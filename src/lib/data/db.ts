import { prismaClient } from '$lib/server/prisma';

export const db = {
	createGame: async function (p1: string, p2: string) {
		const game = await prismaClient.game.create({
			data: {
				id: crypto.randomUUID(), // SQLite
				Players: { connect: [{ id: p1 }, { id: p2 }] }
			}
		});

		return game;
	}
	createMessage: async function (p1: string, p2: string) {
		const game = await prismaClient.game.create({
			data: {
				id: crypto.randomUUID(), // SQLite
				Players: { connect: [{ id: p1 }, { id: p2 }] }
			}
		});

		return game;
	}
};
