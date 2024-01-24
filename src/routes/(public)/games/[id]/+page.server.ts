import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch, params }) => {
	try {
		const response = await fetch(`/api/games/${params.id}`);
		const board: Game.Board = await response.json();
		return {
			board,
			gameId: params.id
		};
	} catch (err) {
		if (err instanceof Error) {
			console.error(err);
			error(500, {
				message: 'An unknown error has occured'
			});
		}
	}
};
