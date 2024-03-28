import { dbClient } from '../../server/prisma';
import * as cards from './cards';

export function create(data: DB.CardInstanceCreate) {
  return dbClient.cardInstance.create({
    data: {
      ...data,
      cardinstance_id: crypto.randomUUID() // SQLite
    }
  });
}

export function get<T extends DB.CardInstanceInclude>(
  cardinstance_id: DB.CardInstanceCreate['cardinstance_id'],
  include: T = {} as T
) {
  return dbClient.cardInstance.findUnique({
    where: { cardinstance_id },
    include
  });
}

/**
 * Retrieves a card based on the provided card instance ID.
 *
 * @param {DB.CardInstanceCreate['cardinstance_id']} cardinstance_id - The ID of the card instance.
 * @return {Promise<Game.Card | null>} The card associated with the card instance, or null if no card is found.
 */
export async function getCard(
  cardinstance_id: DB.CardInstanceCreate['cardinstance_id']
): Promise<Game.Card | null> {
  const cardinstance = await get(cardinstance_id);
  if (!cardinstance) return null;

  return cards.get(cardinstance.card_id);
}
