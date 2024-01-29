import { prismaClient } from '../server/prisma';

export const db = {
	createGame: function (p1: string, p2: string) {
		return prismaClient.game.create({
			data: {
				id: crypto.randomUUID(), // SQLite
				Players: { connect: [{ id: p1 }, { id: p2 }] }
			}
		});
	},
	createMessage: function (data: DB.MessageToInsert) {
		return prismaClient.message.create({ data });
	},
	getMessages: function (room: string) {
		return prismaClient.message.findMany({ where: { room } });
	}
};
