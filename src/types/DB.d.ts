import { Prisma } from '@prisma/client';

declare global {
  namespace DB {
    type IncludeKeys<T> = keyof Omit<T, '_count'>;

    type User = Prisma.UserGetPayload<object>;
    type UserCreate = Prisma.UserCreateInput;

    type Game = Prisma.GameGetPayload<object>;
    type GameInclude = Prisma.GameInclude;
    type GameIncludeKeys = keyof Prisma.GameInclude;
    type GameExtendedByKeys<T extends GameIncludeKeys[]> = Prisma.GameGetPayload<{
      include: ArrayToObject<T, true>;
    }>;
    type GameExtended<T extends GameInclude> = Prisma.GameGetPayload<{
      include: T;
    }>;

    type Action = Prisma.ActionGetPayload<object>;

    type Message = Prisma.MessageGetPayload<object>;
    type MessageCreate = Prisma.MessageUncheckedCreateInput;

    type ActionCreate = Prisma.ActionUncheckedCreateInput;

    type CardInstanceCreate = Prisma.CardInstanceUncheckedCreateInput;
    type CardInstanceIncludeKeys = keyof Prisma.CardInstanceInclude;
  }
}
export {};
