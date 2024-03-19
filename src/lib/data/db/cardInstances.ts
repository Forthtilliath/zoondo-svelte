import { prismaClient } from '../../server/prisma';

export function create(data: DB.CardInstanceCreate) {
  return prismaClient.cardInstance.create({
    data: {
      ...data,
      cardinstance_id: crypto.randomUUID() // SQLite
    }
  });
}

export function get(cardinstance_id: string) {
  return prismaClient.cardInstance.findFirst({
    where: { cardinstance_id }
  });
}
