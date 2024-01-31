import { prismaClient } from '../server/prisma';

export const db = {
	createGame: function (p1: string, p2: string) {
		return prismaClient.game.create({
			data: {
				id: crypto.randomUUID(), // SQLite
				Players: { connect: [{ id: p1 }, { id: p2 }] }
			}
			//select: { Players: true }
		});
	},
	initGame: function (game: DB.Game) {
		//Mock

		return game;
	},

	createMessage: function (data: DB.MessageCreate) {
		return prismaClient.message.create({ data });
	},
	getMessages: function (room: string) {
		return prismaClient.message.findMany({ where: { room } });
	},

	createAction: function (action: DB.ActionCreate) {
		return prismaClient.action.create({
			data: {
				id: crypto.randomUUID(), // SQLite
				game_id: action.game_id,
				instance_id: action.instance_id,
				user_id: action.user_id,
				destination: action.destination
			}
		});
	},

	createCardInstance: function (action: DB.CardInstanceCreate) {
		return prismaClient.cardInstance.create({
			data: {
				id: crypto.randomUUID(), // SQLite
				card: 'cloboulon',
				position: '2;2',
				user_id: action.user_id
			}
		});
	}
};
