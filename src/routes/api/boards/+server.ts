import { json } from '@sveltejs/kit';
import { generatePositions } from '$lib/game';
import { cardsOnBoard } from '$lib/data/mock';
import { Game } from '$lib/server/prisma.js';

export function GET() {
	const idPlayer = 1;
	let board: Array<Game.Position> = generatePositions(0, 5);

	board = board.map((square) => {
		let squareContent: Game.CardInstance | undefined | null = cardsOnBoard.find(
			(candidate) => candidate.x === square.x && candidate.y === square.y
		);
		if (squareContent && squareContent.owner !== idPlayer) {
			squareContent = { card: null, owner: squareContent.owner };
		}

		return { ...square, ...squareContent };
	});

	return json(board);
}

// Create a new game
export async function POST({ locals }) {
	if (!locals.user) {
		return json({ message: 'Unauthorized' }, { status: 401 });
	}

	// Si on veut limiter à une partie simultanée par joueur
	const games = await Game.getGamesByPlayerId(locals.user.userId);
	if (games.length) {
		return json({ message: 'Game already exists' }, { status: 409 });
	}

	const game = await Game.createGame(locals.user.userId);
	return json({ message: 'Game created', data: game }, {status: 201});
}
