import db from '$lib/data/db';
import { generateBoard } from '../../../../lib/methods/game';
import { fail } from '@sveltejs/kit';

export const load = async ({ params, parent, locals }) => {
  await parent();
  const rawData = await db.games.getExtended(params.id);
  if (!rawData) return fail(404);

  let board: Game.Square[] = generateBoard(rawData);
  if (locals.user.userId === rawData.player1_id) {
    board = board.reverse();
  }
  // TODO obfuscation selon le user

  return {
    board,
    isFirstPlayer: locals.user.userId === rawData.player1_id
  };
};
