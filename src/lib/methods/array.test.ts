import { describe, expect, it } from 'vitest';
import { arrayOfKeysToObject } from '.';

describe('Array methods', () => {
  describe('Method: arrayOfKeysToObject()', () => {
    it('should return an object with undefined as default values', () => {
      expect(arrayOfKeysToObject(['key1', 'key2', 'key3'])).toEqual({
        key1: undefined,
        key2: undefined,
        key3: undefined
      });
    });
    it('should return an object with true as values', () => {
      expect(arrayOfKeysToObject(['key1', 'key2'], true)).toEqual({
        key1: true,
        key2: true
      });
    });
    it('should return an object with an object values', () => {
      expect(arrayOfKeysToObject(['key1', 'key2'], { firstname: 'John', lastname: 'Doe' })).toEqual(
        {
          key1: { firstname: 'John', lastname: 'Doe' },
          key2: { firstname: 'John', lastname: 'Doe' }
        }
      );
    });
    it('should handle an array with duplicate keys', () => {
      expect(arrayOfKeysToObject(['key1', 'key2', 'key1', 'key3'])).toEqual({
        key1: undefined,
        key2: undefined,
        key3: undefined
      });
    });
  });
});
