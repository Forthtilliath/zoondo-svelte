import { availableCards } from '../data/mock';
import { generatePositions } from './';

export function generateBoard<T extends DB.GameExtendedByKeys<['actions', 'cards']>>(rawData: T) {
  const { cards, actions } = rawData;
  const positions = generatePositions(0, 5);
  const board: Game.Square[] = [];

  for (const action of actions) {
    const card = cards.find((card) => card.cardinstance_id === action.cardinstance_id);
    if (!card) continue;
    card.position = action.destination;
  }

  for (const position of positions) {
    const card = cards.find((card) => {
      const [x, y] = card.position.split(';');
      const cardPosition: Game.Position = { x: Number(x), y: Number(y) };

      return JSON.stringify(position) === JSON.stringify(cardPosition);
    });

    let squareContent: Game.CardInstance;
    if (!card)
      squareContent = {
        card: null,
        owner: null
      };
    else {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { resolver, ...cardData } = availableCards[card.card_id];

      squareContent = {
        card: cardData,
        owner: card.owner_id,
        instanceid: card.cardinstance_id
      };
    }
    board.push({
      ...position,
      ...squareContent
    });
  }

  return board;
}
