import { expect, test } from 'vitest';
import { isRoomGame } from '$lib/methods/isType';

test('is a function', () => {
  expect(isRoomGame).toBeTypeOf('function');

  expect(isRoomGame('waiting')).toBeFalsy();
  expect(isRoomGame('game#1234')).toBeTruthy();
  expect(isRoomGame('game#')).toBeTruthy(); // Bug?
});
