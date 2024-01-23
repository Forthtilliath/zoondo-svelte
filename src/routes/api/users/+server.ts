import { json } from '@sveltejs/kit';
import db from '$lib/queries';

export async function GET() {
	const users = await db.users.getUsers();

	return json(users);
}
