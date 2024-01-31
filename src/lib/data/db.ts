import { prismaClient } from '../server/prisma';

export const db = {
	createGame: function (p1: string, p2: string) {
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
				action_id: crypto.randomUUID(), // SQLite
				game_id: action.game_id,
				cardinstance_id: action.cardinstance_id,
				player_id: action.player_id,
				destination: action.destination
			}
		});
	},

	createCardInstance: function (action: DB.CardInstanceCreate) {
		return prismaClient.cardInstance.create({
			data: {
				cardinstance_id: crypto.randomUUID(), // SQLite
				card_id: action.card_id,
				position: '2;2',
				owner_id: action.owner_id,
				game_id: action.game_id
			}
		});
	}
};
