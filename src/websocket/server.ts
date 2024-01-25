import { type ViteDevServer } from 'vite';
import { Server } from 'socket.io';
import { db } from '../lib/data/db';

export default {
	name: 'webSocketServer',
	configureServer(server: ViteDevServer) {
		if (!server.httpServer) return;

		const io = new Server<ServerToClientEvents>(server.httpServer);

		io.on('connection', (socket) => {
			socket.emit('serverNotice', 'Hello World !');

			socket.on('joinRoom', async (room) => {
				socket.join(room);

				socket.emit('lastMessages', await db.getMessages(room));

				socket.on('message', (content, user_id) => {
					const msg: DB.MessageCreate = {
						id: crypto.randomUUID(),
						user_id,
						room,
						content
					};
					db.createMessage(msg);
					io.to(room).emit('newMessage', msg);
				});
			});
		});
	}
};
