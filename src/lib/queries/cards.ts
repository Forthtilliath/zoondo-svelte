import { prismaClient } from '../../lib/server/prisma';

export function createCardInstance(data: DB.CardInstanceCreate) {
	return prismaClient.cardInstance.create({
		data: {
			...data,
			cardinstance_id: crypto.randomUUID() // SQLite
		}
	});
}
