import { json } from '@sveltejs/kit';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function GET() {
	const users = await prisma.users.findMany();

	return json(users);
}
