import db from '../../../lib/data/db';
import { generateBoard } from '../../../lib/game';

type PlayAction = SocketEventsWithIo<
  ClientToServerEvents,
  'pushAction',
  { board: Game.Square[]; room: Room }
>;

export const playAction: PlayAction =
  ({ io, board, room }) =>
  async (action: DB.Action) => {
    //TODO Validation de l'action
    const attacker = await db.cardInstances.get(action.cardinstance_id);
    if (!attacker) return;
    const attackerCard = await db.cards.get(attacker.card_id);

    console.log(`${attackerCard.name} is moving to ${action.destination}`);

    const [x, y] = action.destination.split(';').map((txt) => Number(txt));
    const defenderCard = board.find((sq) => sq.x === x && sq.y === y)?.card;
    if (defenderCard) console.log(`${defenderCard.name} is ready to receive him!`);
    else {
      console.log(`No problem, since this square is ${defenderCard}`);
    }

    //WIP Trigger combat + resolution
    if (defenderCard) {
      const attackerValue = attackerCard.corners[Math.floor(Math.random() * 4)];
      const defenderValue = defenderCard.corners[Math.floor(Math.random() * 4)];

      if (attackerValue === '*') {
        const resolver = await db.cards.getResolver(attackerCard.slug);
        resolver();
        console.log('attacker resolved *');
      } else if (defenderValue === '*') {
        const resolver = await db.cards.getResolver(defenderCard.slug);
        resolver();
        console.log('defender resolved *');
      } else {
        if (attackerValue > defenderValue) console.log('The attacker wins !');
        else console.log('The defender wins !');
      }
    }

    const act: DB.ActionCreate = { ...action, action_id: crypto.randomUUID() };
    const newAct = await db.actions.create(act).catch((err) => {
      console.error(err);
    });
    if (!newAct) return;

    const gameData = await db.games.getExtended(action.game_id);
    if (gameData) {
      const board = generateBoard(gameData);

      io.to(room).emit('syncAction', {
        board,
        nextActionRestrictions: null
      });
    }
  };
