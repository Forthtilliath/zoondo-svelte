import { Prisma } from '@prisma/client';

declare global {
	namespace DB {
		type User = Prisma.UserGetPayload<object>;
		type Game = Prisma.GameGetPayload<object>;

		type Message = Prisma.MessageGetPayload<object>;
		type MessageCreate = Prisma.MessageUncheckedCreateInput;
		type MessageUpdate = Pick<Prisma.MessageUncheckedUpdateInput, 'content'>;

		type Action = Prisma.ActionGetPayload<object>;
		type ActionCreate = Prisma.ActionUncheckedCreateInput;

		type CardInstance = Prisma.CardInstanceGetPayload<object>;
		type CardInstanceCreate = Prisma.CardInstanceUncheckedCreateInput;

		type GameWithCards = Prisma.GameGetPayload<{
			include: {
				cards: true;
			};
		}>;
	}
}
type A = DB.User['id']
export {};
