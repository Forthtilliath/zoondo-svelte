import { Prisma } from '@prisma/client';
import { dbClient } from '../../server/prisma';
import { arrayOfKeysToObject } from '../../../lib/methods/array';

export function create(p1: DB.Game['player1_id'], p2: DB.Game['player2_id']) {
  return dbClient.game.create({
    data: {
      game_id: crypto.randomUUID(), // SQLite
      player1: { connect: { id: p1 } },
      player2: { connect: { id: p2 } },
      current_turn: 0,
      game_status: 'ongoing'
    }
  });
}


/**
 * Retrieve a game from the database based on the provided game_id and included keys.
 *
 * @param {DB.Game['game_id']} game_id - The ID of the game to retrieve.
 * @param {T[]} arr_include - An array of keys to include in the retrieved game data.
 * @return The Promise containing the retrieved game data.
 */
export function get<T extends DB.GameIncludeKeys>(
  game_id: DB.Game['game_id'],
  arr_include: T[] = []
) {
  const include = arrayOfKeysToObject(arr_include, true);
  return dbClient.game.findUnique({
    where: { game_id },
    include
  });
}

export function getExtended(game_id: string) {
  return dbClient.game.findFirst({
    where: { game_id },
    include: {
      actions: true,
      cards: true
    }
  });
}

export function getExtendedBy(criteria: Prisma.GameWhereInput) {
  return dbClient.game.findMany({
    where: criteria,
    include: {
      actions: true,
      cards: true,
      player1: true,
      player2: true
    }
  });
}
