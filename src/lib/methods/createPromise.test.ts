import { describe, expect, expectTypeOf, it } from 'vitest';
import { createPromise } from './';

describe('Method: createPromise()', () => {
  it('should return the given value as a promise', () => {
    expect(createPromise('this is a string')).toStrictEqual(Promise.resolve('this is a string'));
    expect(createPromise('this is a string')).resolves.toBe('this is a string');
    expectTypeOf(createPromise('this is a string')).resolves.toBeString();

    expect(createPromise(666)).toStrictEqual(Promise.resolve(666));
    expect(createPromise(666)).resolves.toBe(666);
    expectTypeOf(createPromise(666)).resolves.toBeNumber();

    expect(createPromise(() => true)).toStrictEqual(Promise.resolve(() => true));
    expect(createPromise(() => true)).resolves.toBeTruthy;
    expectTypeOf(createPromise(() => true)).resolves.toBeFunction();
    expectTypeOf(createPromise(() => true)).resolves.returns.toBeBoolean();

    expect(createPromise(['a', 'b'])).toStrictEqual(Promise.resolve(['a', 'b']));
    expect(createPromise(['a', 'b'])).resolves.toStrictEqual(['a', 'b']);
    expectTypeOf(createPromise(['a', 'b'])).resolves.toBeArray();
  });
});
