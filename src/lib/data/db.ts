import { prismaClient } from '../server/prisma';

export const db = {
	createGame: async function (p1: string, p2: string) {
		const game = await prismaClient.game.create({
			data: {
				id: crypto.randomUUID(), // SQLite
				Players: { connect: [{ id: p1 }, { id: p2 }] }
			}
		});

		return game;
	},
	createMessage: async function (msg: Omit<Chat.Message, 'id' | 'created_at'>) {
		const message = await prismaClient.message.create({
			data: {
				id: crypto.randomUUID(), // SQLite
				...msg
			}
		});
		return message;
	},
	getMessages: async function (room: string) {
		const messages = await prismaClient.message.findMany({ where: { room: room } });
		return messages;
	}
};
