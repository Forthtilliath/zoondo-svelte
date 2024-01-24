import { addToast } from '$lib/stores/toast';
import { io } from 'socket.io-client';
import { writable } from 'svelte/store';

export function subscribeSocket(room = 'waiting') {
	const messages = writable<Array<Chat.Message>>([]);
	const socket = io();

	socket.emit('joinRoom', room);

	socket.on('serverNotice', (msg: string) => {
		addToast({ msg, type: 'notice' });
	});
	socket.on('lastMessages', (msg: Array<Chat.Message>) => {
		messages.set(msg);
	});
	socket.on('newMessage', (msg: Chat.Message) => {
		messages.update((m) => [...m, msg]);
	});

	return { socket, messages };
}
