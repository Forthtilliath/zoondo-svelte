<script lang="ts">
	import { io } from 'socket.io-client';
	import Board from './Board.svelte';
	import CardSample from './CardSample.svelte';
	import Chat from './Chat.svelte';

	export let data;
	let messages: Array<Chat.Message> = [];
	let currMsg = '';

	const socket = io();

	socket.on('serverNotice', (msg) => {
		console.log(msg);
	});
	socket.on('message', (msg) => {
		console.log(msg);
	});
	socket.on('lastMessages', (msg) => {
		messages = msg;
	});
	socket.on('newMessage', (msg) => {
		messages = [...messages, msg];
	});

	const hClickSend = () => {
		socket.emit('message', currMsg);
		currMsg = '';
	};
</script>

<svelte:head>
	<title>Zoondo : Board</title>
</svelte:head>

<main>
	<div class="Board">
		<Board board={data.board} />
	</div>
	<div class="CardSample">
		<CardSample />
	</div>
	<div class="Chat">
		<Chat {messages} />
		<form on:submit={hClickSend}>
			<label>
				<span class="sr-only">Message:</span>
				<input type="text" bind:value={currMsg} />
			</label>
			<button>Send a message!</button>
		</form>
	</div>
</main>

<style lang="scss">
	main {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-template-rows: 1fr 1fr;
		gap: 1rem;
		grid-template-areas:
			'Board CardSample'
			'Board Chat';

		height: 90vh;

		& > * {
			border: 2px dotted yellowgreen;
		}
	}
	.Board {
		grid-area: Board;
	}
	.CardSample {
		grid-area: CardSample;
	}
	.Chat {
		grid-area: Chat;
	}
</style>
