import { Prisma } from '@prisma/client';

declare global {
	namespace DB {
		type User = Prisma.UserGetPayload<object>;
		type Game = Prisma.GameGetPayload<object>;
		type Message = Prisma.MessageGetPayload<object>;

		type MessageToInsert = Prisma.MessageUncheckedCreateInput;
	}
}
export {};
