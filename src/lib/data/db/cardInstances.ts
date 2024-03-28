import { dbClient } from '../../server/prisma';
import { arrayOfKeysToObject } from '../../../lib/methods';

export function create(data: DB.CardInstanceCreate) {
  return dbClient.cardInstance.create({
    data: {
      ...data,
      cardinstance_id: crypto.randomUUID() // SQLite
    }
  });
}

// export function get(cardinstance_id: string) {
//   return dbClient.cardInstance.findFirst({
//     where: { cardinstance_id }
//   });
// }

// export function get(cardinstance_id: string, include: DB.KeysCardInstanceInclude = []) {
//   return dbClient.cardInstance.findFirst({
//     where: { cardinstance_id },
//     include: include.reduce((obj, key) => ({...obj, [key]: true }), {}),
//   });
// }
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
