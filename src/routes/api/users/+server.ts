import { json } from '@sveltejs/kit';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function GET() {
	const users = await prisma.user.findMany();

	return json(users);
}
