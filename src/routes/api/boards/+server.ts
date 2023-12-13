import { json } from '@sveltejs/kit';
import { generatePositions } from '$lib/game';
import { cardsOnBoard } from '$lib/data/mock';

export function GET() {
	let board: Array<Game.Square> = generatePositions(0, 5);

	board = board.map((square) => {
		let foundCard: Game.CardInstance | undefined | false = cardsOnBoard.find(
			(candidate) => candidate.x === square.x && candidate.y === square.y
		);
		if (foundCard && foundCard.owner === 2) {
			foundCard = false;
		}

		return { ...square, card: foundCard };
	});

	// board[0].card = {
	// 	slug: 'cloboulon',
	// 	name: 'Cloboulon',
	// 	type: 'chief',
	// 	corners: [4, 5, '*', 2],
	// 	power:
	// 		'Le combat se solde par une égalité. Si tu viens de déplacer Cloboulon, tu déplaces un Grognard.',
	// 	value: 20,
	// 	moves: [[[-1, 0]], [[-1, 1]], [[0, 1]], [[1, 1]], [[1, 0]], [[1, -1]], [[0, -1]], [[-1, -1]]]
	// };
	// board[1].card = false;

	return json(board);
}
