import { json } from '@sveltejs/kit';
import { generatePositions } from '$lib/game';
import { cardsOnBoard } from '$lib/data/mock';

export function GET() {
	const idPlayer = 1;
	let board: Array<Game.Position> = generatePositions(0, 5);

	board = board.map((square) => {
		let squareContent: Game.SquareContent | undefined | null = cardsOnBoard.find(
			(candidate) => candidate.x === square.x && candidate.y === square.y
		);
		if (squareContent && squareContent.owner !== idPlayer) {
			squareContent = { card: null, owner: squareContent.owner };
		}

		return { ...square, ...squareContent };
	});

	return json(board);
}
