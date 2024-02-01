import { prismaClient } from '../../server/prisma';

export function create(data: DB.CardInstanceCreate) {
	return prismaClient.cardInstance.create({
		data: {
			...data,
			cardinstance_id: crypto.randomUUID() // SQLite
		}
	});
}
