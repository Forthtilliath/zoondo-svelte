import { prismaClient } from '$lib/server/prisma';

const prismaUser = prismaClient.user;

export function getUsers() {
	return prismaUser.findMany();
}

export function getUserByUsername(username: string) {
	return prismaUser.findUnique({
		where: {
			username
		}
	});
}

export function getUserById(id: string) {
	return prismaUser.findUnique({
		where: {
			id
		}
	});
}
