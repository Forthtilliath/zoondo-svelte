<script lang="ts">
	import Board from './(components)/Board.svelte';
	import CardSample from './(components)/CardSample.svelte';
	import Chat from '$lib/components/Chat.svelte';

	export let data;
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
		<Chat room="game#{data.gameId}"/>
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
