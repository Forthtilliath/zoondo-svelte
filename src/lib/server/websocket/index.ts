import { type ViteDevServer } from 'vite';
import { Server } from 'socket.io';
import { broadcastMsg } from './broadcastMsg';
import { playAction } from './playAction';
import db from '../../../lib/data/db';
import { generateBoard } from '../../../lib/game';

export default {
  name: 'webSocketServer',
  configureServer(server: ViteDevServer) {
    if (!server.httpServer) return;

    const io = new Server<ClientToServerEvents, ServerToClientEvents>(server.httpServer);

    io.on('connection', (socket) => {
      socket.emit('serverNotice', 'Hello World !');

      socket.on('joinRoom', async (room) => {
        let board: Game.Square[] = [];
        const [, gameId] = room.split('#');
        const gameData = await db.games.getExtended(gameId);
        if (gameData) board = generateBoard(gameData);

        socket.join(room);

        socket.emit('lastMessages', await db.messages.getByRoom(room));
        socket.on('message', broadcastMsg({ io, room }));
        socket.on('pushAction', playAction({ io, room, board }));
      });
    });
  }
};
