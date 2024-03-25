import { dbClient } from '../../server/prisma';

export function create(data: DB.CardInstanceCreate) {
  return dbClient.cardInstance.create({
    data: {
      ...data,
      cardinstance_id: crypto.randomUUID() // SQLite
    }
  });
}

export function get(cardinstance_id: string) {
  return dbClient.cardInstance.findFirst({
    where: { cardinstance_id }
  });
}
