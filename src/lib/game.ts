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
