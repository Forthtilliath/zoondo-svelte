import { describe, expect, it } from 'vitest';
import { roll } from './';

describe('Method: roll()', () => {
  it('should return the given value between 0 and the given number', () => {
    const value1 = roll(6);
    expect(value1).toBeLessThan(6);
    expect(value1).toBeGreaterThanOrEqual(0);

    const value2 = roll(6);
    expect(value2).toBeLessThan(6);
    expect(value2).toBeGreaterThan(0);
  });

  it('should return the given value between 1 and the given number', () => {
    const value1 = roll(1, 10);
    expect(value1).toBeLessThan(10);
    expect(value1).toBeGreaterThanOrEqual(1);

    const value2 = roll(1, 10);
    expect(value2).toBeLessThan(10);
    expect(value2).toBeGreaterThan(1);
  });

  it('should throw an error if the number of faces is less than 1', () => {
    expect(() => roll(0)).toThrow(Error);
  });
});
