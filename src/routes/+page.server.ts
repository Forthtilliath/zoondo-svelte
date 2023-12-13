export async function load({ fetch }) {
	const response = await fetch('/api/boards');
	const board: Game.Board = await response.json();

	return {
		board
	};
}
