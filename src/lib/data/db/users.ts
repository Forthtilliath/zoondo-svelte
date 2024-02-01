import { prismaClient } from '../../server/prisma';

export function getByName(username: DB.User['username']) {
	return prismaClient.user.findFirst({
		where: { username }
	});
}
