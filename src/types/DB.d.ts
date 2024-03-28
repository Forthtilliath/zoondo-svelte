import { Prisma } from '@prisma/client';
// import * as runtime from '@prisma/client/runtime/library.js';
// import $Result = runtime.Types.Result

declare global {
  namespace DB {
    type User = Prisma.UserGetPayload<object>;
    type UserCreate = Prisma.UserCreateInput;

    type Game = Prisma.GameGetPayload<object>;
    type Action = Prisma.ActionGetPayload<object>;

    type Message = Prisma.MessageGetPayload<object>;
    type MessageCreate = Prisma.MessageUncheckedCreateInput;
    // type MessageUpdate = ?

    type ActionCreate = Prisma.ActionUncheckedCreateInput;

    type CardInstanceCreate = Prisma.CardInstanceUncheckedCreateInput;

    type GameExtended = Prisma.GameGetPayload<{
      include: {
        actions: true;
        cards: true;
        player1: true;
        player2: true;
      };
    }>;

    type IncludeKeys<T> = keyof Omit<T, '_count'>;
    type GameIncludeKeys = IncludeKeys<Prisma.GameInclude>;
    type CardInstanceIncludeKeys = IncludeKeys<Prisma.CardInstanceInclude>;

    // Types tests, je laisse pour l'instant voir si j'ai besoin ou pas !

    // type GameGetPayload<T> = Prisma.GameGetPayload<{ include: T }>;

    // type KeysCardInstanceInclude = IncludeKeys<Prisma.CardInstanceInclude>[];
    // type KeysGameInclude = IncludeKeys<Prisma.GameInclude>[];
    // type GameInclude = Prisma.Subset<Prisma.GameInclude, KeysGameInclude>;

    // type GameInclude = Prisma.GameInclude;
    // type GameIncludeObject = Partial<Record<DB.GameIncludeKeys, boolean>>;

    // type A<T extends Prisma.GameFindFirstArgs<Prisma.ExtArgs>> = Prisma.Prisma__GameClient<
    //   $Result.GetResult<Prisma.$GamePayload<'findFirst'>, T, 'findFirst'> | null,
    //   null,
    //   'findFirst'
    // >;

    // type B<T extends Prisma.GameFindFirstArgs<Prisma.ExtArgs>> = Prisma.Prisma__GameClient<
    //   $Result.GetResult<Prisma.$GamePayload<'findUnique'>, T, 'findUnique'> | null,
    //   null,
    //   'findUnique'
    //   >;
  }
}
export {};
