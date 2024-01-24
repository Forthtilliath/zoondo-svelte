import { type ViteDevServer } from 'vite';
import { Server } from 'socket.io';

const messages: Array<Chat.Message> = [];

export default {
	name: 'webSocketServer',
	configureServer(server: ViteDevServer) {
		if (!server.httpServer) return;

		const io = new Server(server.httpServer);

		io.on('connection', (socket) => {
			socket.emit('serverNotice', 'Hello World !');

			socket.on('joinRoom', (room) => {
				socket.join(room);

				socket.emit('lastMessages', messages);

				socket.on('message', (content, userId) => {
					const msg = {
						id: 1,
						userId,
						content,
						time: Date.now()
					};
)

					//messages.push(msg);
					io.to(room).emit('newMessage', msg);
				});
			});
		});
	}
};
