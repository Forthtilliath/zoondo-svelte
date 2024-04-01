import { dbClient } from '../../server/prisma';
import { arrayOfKeysToObject } from '../../../lib/methods/array';

export function create(data: DB.CardInstanceCreate) {
  return dbClient.cardInstance.create({
    data: {
      ...data,
      cardinstance_id: crypto.randomUUID() // SQLite
    }
  });
}

export function get<T extends DB.CardInstanceIncludeKeys>(
  cardinstance_id: DB.CardInstanceCreate['cardinstance_id'],
  arr_include: T[] = []
) {
  const include = arrayOfKeysToObject(arr_include, true);
  return dbClient.cardInstance.findUnique({
    where: { cardinstance_id },
    include
  });
}