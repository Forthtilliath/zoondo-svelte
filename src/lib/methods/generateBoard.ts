import { BOARD_SIZE } from '$lib/constants';
import db from '$lib/data/db';

export async function generateBoard(gameId: DB.Game['game_id'], playerId: DB.User['id']): Promise<Game.Square[] | null> {
	const game = await db.games.get(gameId);
	if (!game) return null;

	/**
	 * 1- Génèrer le board vide
	 * 2- Récupèrer les dernières actions de chaque carte de la partie
	 * 3- Mettre les cartes dans le board
	 * 4- Retourner le board
	 */

	const initialBoard = generatePositions(BOARD_SIZE);
	console.log(initialBoard);
	// Note: If a card is in cimetry, we need an action for that
	// Else we get the position before the cimetry
	const cardsLastAction = await db.actions.getLastAction(gameId);
	console.log({cardsLastAction});

	const boardWithCards = initialBoard.map((square) => {
		const squareContent = cardsLastAction.find(
			(card) => `${square.x};${square.y}` === card.destination
		);
		if (!squareContent) {
			return square;
		}
		if (squareContent.player_id !== playerId) {
			return { ...square, ...squareContent, owner: squareContent.player_id };
		}

		// get the card from the db in getLastAction
		return { ...square, ...squareContent };
	});

	return boardWithCards;
}

function generatePositions(size: number): Game.Square[] {
	const positions: Array<Game.Square> = [];

	for (let y = 0; y < size; y++) {
		for (let x = 0; x < size; x++) {
			positions.push({ x, y, card: null });
		}
	}

	return positions;
}
