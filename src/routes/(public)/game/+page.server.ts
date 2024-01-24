import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch, locals }) => {
	if (!locals.user) throw redirect(302, '/signin');

	const response = await fetch('/api/boards');
	const board: Game.Board = await response.json();

	return {
		board
	};
};
