import { json } from '@sveltejs/kit';
import { generatePositions } from '$lib/game';

export function GET() {
	const board: Array<Game.Square> = generatePositions(0, 5);

	return json(board);
}
