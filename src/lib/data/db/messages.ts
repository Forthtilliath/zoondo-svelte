import { prismaClient } from '../../server/prisma';

export function create(data: DB.MessageCreate) {
	return prismaClient.message.create({ data });
}
export function getByRoom(room: DB.Message['room']) {
	return prismaClient.message.findMany({ where: { room } });
}
