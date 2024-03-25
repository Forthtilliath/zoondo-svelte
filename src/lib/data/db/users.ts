import { dbClient } from '../../server/prisma';

export function getByName(username: string) {
  return dbClient.user.findFirst({
    where: { username }
  });
}

export function getAll() {
  return dbClient.user.findMany();
}
