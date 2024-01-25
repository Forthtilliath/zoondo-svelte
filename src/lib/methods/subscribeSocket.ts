import { addToast } from '$lib/stores/toast';
import type { Socket } from 'socket.io-client';
import { io } from 'socket.io-client';
import { writable } from 'svelte/store';

export function subscribeSocket(room: string) {
	const messages = writable<Array<DB.Message>>([]);
	const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io();

	socket.emit('joinRoom', room);

	socket.on('serverNotice', (msg) => {
		addToast({ msg, type: 'notice' });
	});
	socket.on('lastMessages', (msg) => {
		messages.set(msg);
	});
	socket.on('newMessage', (msg) => {
		messages.update((m) => [...m, msg]);
	});

	return { socket, messages };
}
