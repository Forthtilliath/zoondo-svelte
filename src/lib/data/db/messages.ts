import { dbClient } from '../../server/prisma';

export function create(data: DB.MessageCreate) {
  return dbClient.message.create({ data });
}
export function getByRoom(room: string) {
  return dbClient.message.findMany({ where: { room } });
}
