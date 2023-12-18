import { json } from '@sveltejs/kit';
import { generatePositions } from '$lib/game';
import { cardsOnBoard } from '$lib/data/mock';

export function GET() {
	const idPlayer = 1;
	let board: Array<Game.Square> = generatePositions(0, 5);

	board = board.map((square) => {
		let foundCard: Game.CardInstance | undefined | null = cardsOnBoard.find(
			(candidate) => candidate.x === square.x && candidate.y === square.y
		);
		if (foundCard && foundCard.owner !== idPlayer) {
			foundCard = null;
		}

		return { ...square, card: foundCard };
	});

	return json(board);
}
