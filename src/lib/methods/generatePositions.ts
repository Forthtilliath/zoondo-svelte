/**
 * Generates an array of positions within the specified range.
 *
 * @param {number} min - the minimum value for the position
 * @param {number} max - the maximum value for the position
 * @return {Game.Position[]} an array of positions within the specified range
 */
export function generatePositions(min: number, max: number): Game.Position[] {
  const positions: Array<Game.Position> = [];

  for (let y = max; y >= min; y--) {
    for (let x = min; x <= max; x++) {
      positions.push({ x, y });
    }
  }

  return positions;
}
