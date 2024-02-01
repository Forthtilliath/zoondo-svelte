import { prismaClient } from '../../server/prisma';

export function getByName(username: string) {
	return prismaClient.user.findFirst({
		where: { username }
	});
}
