import { redirect, fail } from '@sveltejs/kit';
import { auth } from '$lib/server/lucia';
import db from '$lib/data/db';

export const load = async ({ parent, locals }) => {
  await parent();
  const userId = locals.user.userId;
  const currentGamesPromise = db.games.getExtendedBy({
    OR: [{ player1_id: userId }, { player2_id: userId }]
  });

  const usersPromise = db.users.getAll();

  return {
    currentGamesPromise,
    usersPromise
  };
};

export const actions = {
  logout: async ({ locals }) => {
    const session = await locals.auth.validate();
    if (!session) return fail(401);
    await auth.invalidateSession(session.sessionId);
    locals.auth.setSession(null);
    throw redirect(302, '/signin');
  },
  fight: async ({ request, locals }) => {
    const formData = await request.formData();
    const opponentName = formData.get('opponent') as string;
    const opponent = await db.users.getByName(opponentName);
    if (!opponent) return;
    const opponentId = opponent.id;
    const challengerId = locals.user.userId;

    const game = await db.games.create(opponentId, challengerId);

    const challengerDeck = [
      'cloboulon',
      'gold-hure',
      'bouclefeuille',
      'grognard:0',
      'cloboulon',
      'cloboulon'
    ];
    const opponentDeck = [
      'cloboulon',
      'gold-hure',
      'bouclefeuille',
      'grognard:0',
      'cloboulon',
      'cloboulon'
    ];

    const promises = [
      ...challengerDeck.map((card, idx) => {
        return db.cardInstances.create({
          cardinstance_id: crypto.randomUUID(),
          card_id: card,
          game_id: game.game_id,
          owner_id: challengerId,
          position: '',
          Actions: {
            create: {
              action_id: crypto.randomUUID(),
              destination: `${idx};1`,
              game_id: game.game_id,
              player_id: challengerId
            }
          }
        });
      }),
      ...opponentDeck.map((card, idx) => {
        return db.cardInstances.create({
          cardinstance_id: crypto.randomUUID(),
          card_id: card,
          game_id: game.game_id,
          owner_id: opponentId,
          position: '',
          Actions: {
            create: {
              action_id: crypto.randomUUID(),
              destination: `${idx};4`,
              game_id: game.game_id,
              player_id: opponentId
            }
          }
        });
      })
    ];
    await Promise.all(promises).catch((err) => err.json());
    throw redirect(302, `/games/${game.game_id}`);
  }
};
