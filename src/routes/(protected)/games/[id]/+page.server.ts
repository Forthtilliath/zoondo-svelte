import { error } from '@sveltejs/kit';

export const load = async ({ fetch, params, parent }) => {
	await parent();
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
