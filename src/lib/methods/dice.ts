export function roll(nbFaces: number): number;
export function roll(startValue: number, nbFaces: number): number;
/**
 * Generates a random number between the start value and the sum of the start value and the number of faces.
 *
 * @param {number} startValue - The starting value of the range.
 * @param {number} [nbFaces=0] - The number of faces of the dice. Defaults to 0.
 * @throws {Error} Invalid number of faces if nbFaces is less than 1.
 * @return {number} The randomly generated number between the start value and the sum of the start value and the number of faces.
 */
export function roll(startValue: number, nbFaces: number = 0): number {
  if (startValue > nbFaces) [startValue, nbFaces] = [nbFaces, startValue];
  if (nbFaces < 1) throw new Error('Invalid number of faces');
  return Math.floor(Math.random() * nbFaces + startValue);
}
