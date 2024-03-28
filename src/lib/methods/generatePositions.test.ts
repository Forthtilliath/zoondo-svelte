import { describe, expect, it } from 'vitest';
import { generatePositions } from './';

describe('Method: generatePositions()', () => {
  it('should generate an array of positions within the specified range when min is less than max', () => {
    const min = 1;
    const max = 3;
    const result = generatePositions(min, max);
    expect(result).toEqual([
      { x: 1, y: 3 },
      { x: 2, y: 3 },
      { x: 3, y: 3 },
      { x: 1, y: 2 },
      { x: 2, y: 2 },
      { x: 3, y: 2 },
      { x: 1, y: 1 },
      { x: 2, y: 1 },
      { x: 3, y: 1 }
    ]);
  });

  it('should generate an array of positions within the specified range when min is equal to max', () => {
    const min = 2;
    const max = 2;
    const result = generatePositions(min, max);
    expect(result).toEqual([{ x: 2, y: 2 }]);
  });

  it('should generate an empty array when min is greater than max', () => {
    const min = 5;
    const max = 3;
    const result = generatePositions(min, max);
    expect(result).toEqual([]);
  });
});
