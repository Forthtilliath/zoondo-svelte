/**
 * Checks if a given room is a game room.
 *
 * @param {Room} room - The room to be checked.
 * @return {boolean} Returns true if the room is a game room, false otherwise.
 */
export function isRoomGame(room: Room): room is RoomGame {
  return room.startsWith('game#');
}