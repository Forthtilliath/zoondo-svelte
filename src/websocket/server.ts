import { type ViteDevServer } from 'vite';
import { Server } from 'socket.io';
import db from '../lib/data/db';
import { generateBoard } from '../lib/game';

export default {
  name: 'webSocketServer',
  configureServer(server: ViteDevServer) {
    if (!server.httpServer) return;

    const io = new Server<ClientToServerEvents, ServerToClientEvents>(server.httpServer);

    io.on('connection', (socket) => {
      socket.emit('serverNotice', 'Hello World !');

      socket.on('joinRoom', async (room) => {
        let board: Game.Square[] = [];
        const gameData = await db.games.getExtended(room);
        if (gameData) board = generateBoard(gameData);

        socket.join(room);

        socket.emit('lastMessages', await db.messages.getByRoom(room));

        socket.on('message', async (content, author_id) => {
          const msg: DB.MessageCreate = {
            id: crypto.randomUUID(),
            author_id,
            room,
            content
          };
          const newMsg = await db.messages.create(msg);
          io.to(room).emit('newMessage', newMsg);
        });

        socket.on('pushAction', async (action) => {
          //TODO Validation de l'action
          const attacker = await db.cardInstances.get(action.cardinstance_id);
          if (!attacker) return;
          const attackerCard = await db.cards.get(attacker.card_id);
          console.log(`${attackerCard.name} is moving !`);
          const game = await db.games.getExtended(action.game_id);

          let dropTargets;
          const isFirstPlayer = action.player_id === game?.player1_id;
          if (!isFirstPlayer) {
            dropTargets = attackerCard.moves.flat().map((move) => [move[0] + x, move[1] + y]);
          } else {
            dropTargets = attackerCard.moves.flat().map((move) => [move[0] + x, -move[1] + y]);
          }

          const attackerMoves = attackerCard.moves;

          //TODO Trigger combat + resolution

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
        });
      });
    });
  }
};
