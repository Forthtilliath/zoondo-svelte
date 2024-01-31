import { prismaClient } from '../../lib/server/prisma';

export function createMessage(data: DB.MessageCreate) {
	return prismaClient.message.create({ data });
}

export function getMessages(room: string) {
  return prismaClient.message.findMany({ where: { room } });
}
