import { type ViteDevServer } from 'vite';
import { Server } from 'socket.io';
import db from '../lib/queries';

export default {
	name: 'webSocketServer',
	configureServer(server: ViteDevServer) {
		if (!server.httpServer) return;

		const io = new Server<ClientToServerEvents, ServerToClientEvents>(server.httpServer);

		io.on('connection', (socket) => {
			socket.emit('serverNotice', 'Hello World !');

			socket.on('joinRoom', async (room) => {
				socket.join(room);

				socket.emit('lastMessages', await db.messages.getMessages(room));

				socket.on('message', async (content, author_id) => {
					const msg: DB.MessageCreate = {
						id: crypto.randomUUID(),
						author_id,
						room,
						content
					};
					const newMsg = await db.messages.createMessage(msg);
					io.to(room).emit('newMessage', newMsg);
				});
			});
		});
	}
};
