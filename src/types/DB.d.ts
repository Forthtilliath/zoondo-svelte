import { Prisma } from '@prisma/client';

declare global {
	namespace DB {
		type User = Prisma.UserGetPayload<object>;
		type Game = Prisma.GameGetPayload<object>;

		type Message = Prisma.MessageGetPayload<object>;
		type MessageCreate = Prisma.MessageUncheckedCreateInput;
		// type MessageUpdate = ?

		type ActionCreate = Prisma.ActionUncheckedCreateInput;

		type CardInstanceCreate = Prisma.CardInstanceUncheckedCreateInput;
	}
}
export {};
