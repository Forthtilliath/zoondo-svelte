import { type ViteDevServer } from 'vite';
import { Server } from 'socket.io';
import { broadcastMsg } from './broadcastMsg';
import { playAction } from './playAction';
import db from '../../../lib/data/db';
import { generateBoard } from '../../methods/game';
import { isRoomGame } from '../../../lib/methods/isType';

async function getBoard(room: RoomGame) {
  let board: Game.Square[] = [];
  const [, gameId] = room.split('#');
  const gameData = await db.games.get(gameId, ['actions', 'cards', 'player1', 'player2']);
  // console.log(gameData); //! L'id du joueur 2 semble être celui du socket io !
  if (gameData) board = generateBoard(gameData);

  return board;
}
export default {
  name: 'webSocketServer',
  configureServer(server: ViteDevServer) {
    if (!server.httpServer) return;

    const io = new Server<ClientToServerEvents, ServerToClientEvents>(server.httpServer);

    io.on('connection', (socket) => {
      socket.emit('serverNotice', 'Hello World !');

      socket.on('joinRoom', async (room) => {
        socket.join(room);
        
        if (isRoomGame(room)) {
          const board: Game.Square[] = await getBoard(room);
          socket.on('pushAction', playAction({ io, room, board }));
        }
        socket.on('message', broadcastMsg({ io, room }));
        
        socket.emit('lastMessages', await db.messages.getByRoom(room));
      });
    });
  }
};