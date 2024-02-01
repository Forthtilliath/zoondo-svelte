import { prismaClient } from '../../server/prisma';

export function create(data: DB.MessageCreate) {
	return prismaClient.message.create({ data });
}
export function getByRoom(room: string) {
	return prismaClient.message.findMany({ where: { room } });
}
