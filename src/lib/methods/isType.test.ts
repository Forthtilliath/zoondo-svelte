import { describe, expect, it } from 'vitest';
import { isRoomGame } from './';

describe('isType methods', () => {
  describe('Method: isRoomGame()', () => {
      it('should return true if the room starts with "game#"', () => {
        const room: Room = 'game#123';
        const result = isRoomGame(room);
        expect(result).toBe(true);
      });
    
      it('should return false if the room does not start with "game#"', () => {
        const room: Room = 'waiting';
        const result = isRoomGame(room);
        expect(result).toBe(false);
      });
  });
});
