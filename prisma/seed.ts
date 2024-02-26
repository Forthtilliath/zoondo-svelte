import { PrismaClient } from '@prisma/client';
import crypto from 'crypto';
const prisma = new PrismaClient();

async function main() {
	// TODO Fill this ?
	await prisma.user.upsert({
		where: { email: 'evoli@spamland.com' },
		update: {},
		create: {
			id: crypto.randomUUID(), //SQLite
			email: 'evoli@spamland.com',
			username: 'Evoli'
		}
	});
	await prisma.user.upsert({
		where: { email: 'aquali@spamland.com' },
		update: {},
		create: {
			id: crypto.randomUUID(), //SQLite
			email: 'aquali@spamland.com',
			username: 'Aquali'
		}
	});
	await prisma.user.upsert({
		where: { email: 'pyroli@spamland.com' },
		update: {},
		create: {
			id: crypto.randomUUID(), //SQLite
			email: 'pyroli@spamland.com',
			username: 'Pyroli'
		}
	});
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
