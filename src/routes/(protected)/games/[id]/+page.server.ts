export const load = async ({ fetch, params, parent }) => {
	await parent();
	return {
		success: true,
		gameId: params.id,
		players: ['g7ep1pxxvxb403n', 'rtsq83ohie4jxyl'], // forth & vcode
		board: fetch(`/ai/games/${params.id}`).then((r) => r.json() as Promise<Game.Board>)
	};
};
