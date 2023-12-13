export function generatePositions(
	minX: number,
	maxX: number,
	minY: number = minX,
	maxY: number = maxX
): Game.Position[] {
	const positions: Array<Game.Position> = [];

	for (let y = maxY; y >= minY; y--) {
		for (let x = minX; x <= maxX; x++) {
			positions.push({ x, y });
		}
	}

	return positions;
}

export function positionsToTransition(
	src: Game.Position,
	dst: Game.Position,
	nbSquares: number
): [Game.Position, Game.Position] {
	const squareSize = 100 / Math.sqrt(nbSquares);
	const coordSrc = { x: src.x * squareSize, y: src.y * squareSize };
	const coordDst = { x: dst.x * squareSize, y: dst.y * squareSize };

	return [coordSrc, coordDst];
}

export function movesToTransitions(
	moves: Game.Move[][],
	nbSquares: number
): Array<Game.Transition> {
	const movesCopy = JSON.parse(JSON.stringify(moves)) as typeof moves;

	const fullMoves = movesCopy.map((moveSerie) => {
		moveSerie.unshift([0, 0]);
		return moveSerie;
	});

	const transitions = [];
	for (let i = 0; i < fullMoves.length; i += 1) {
		const moveSerie = movesCopy[i];

		for (let j = 0; j < moveSerie.length - 1; j += 1) {
			const curMove = moveSerie[j];
			const nextMove = moveSerie[j + 1];

			const src: Game.Position = {
				x: curMove[0],
				y: -curMove[1]
			};
			const dst: Game.Position = {
				x: nextMove[0],
				y: -nextMove[1]
			};

			const transition = positionsToTransition(src, dst, nbSquares);
			transitions.push(transition);
		}
	}

	return transitions;
}
