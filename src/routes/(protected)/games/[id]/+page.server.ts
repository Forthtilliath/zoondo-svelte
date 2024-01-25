import { error } from '@sveltejs/kit';

export const load = async ({ fetch, params, parent }) => {
	await parent();
	try {
		const response = await fetch(`/api/games/${params.id}`);
		const board: Game.Board = await response.json();
		return {
			success: true,
			board,
			gameId: params.id,
			players: ['g7ep1pxxvxb403n', 'rtsq83ohie4jxyl'] // forth & vcode
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
