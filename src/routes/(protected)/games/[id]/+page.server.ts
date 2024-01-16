import type { PageServerLoad } from '../../(profile)/$types.js';

export const load: PageServerLoad = async ({ fetch }) => {
	// get the id game
	// if not found, redirect to /games
	const response = await fetch('/api/boards');
	const board: Game.Board = await response.json();

	return {
		board
	};
};
