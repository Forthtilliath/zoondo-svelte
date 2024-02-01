import { json } from '@sveltejs/kit';
import { generatePositions } from '$lib/game';
import { cardsOnBoard } from '$lib/data/mock';
import db from '$lib/data/db';

export async function POST({ locals }) {
	// const idPlayer = 1;
	// let board: Array<Game.Position> = generatePositions(0, 5);

	// const formData = await request.formData();
	const opponentId = 'rtsq83ohie4jxyl';
	const game = await db.games.create(opponentId, opponentId);

	// board = board.map((square) => {
	// 	let squareContent: Game.CardInstance | undefined | null = cardsOnBoard.find(
	// 		(candidate) => candidate.x === square.x && candidate.y === square.y
	// 	);
	// 	if (squareContent && squareContent.owner !== idPlayer) {
	// 		squareContent = { card: null, owner: squareContent.owner };
	// 	}

	// 	return { ...square, ...squareContent };
	// });

	return json(game);
}
