import { type ViteDevServer } from 'vite';
import { Server } from 'socket.io';

const messages: Array<Chat.Message> = [
	{
		id: 1,
		userId: 1,
		content: 'Hello!',
		time: 1702634802
	},
	{
		id: 2,
		userId: 2,
		content: 'Hi! How are you ?',
		time: 1702634815
	},
	{
		id: 3,
		userId: 2,
		content: 'Which tribe do you play ?',
		time: 1702634820
	},
	{
		id: 4,
		userId: 1,
		content:
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus aut,  deserunt hic aspernatur porro alias. Sed vero reprehenderit quaerat repellendus, molestias minus ad eos aspernatur saepe mollitia et qui facere.',
		time: 1702634834
	}
];

export default {
	name: 'webSocketServer',
	configureServer(server: ViteDevServer) {
		if (!server.httpServer) return;

		const io = new Server(server.httpServer);

		io.on('connection', (socket) => {
			socket.emit('serverNotice', 'Hello World !');
			socket.emit('lastMessages', messages);

			socket.on('message', (content, userId) => {
				const msg = {
					id: messages.length,
					userId,
					content,
					time: Date.now()
				};
				messages.push(msg);
				io.emit('newMessage', msg);
			});
		});
	}
};
