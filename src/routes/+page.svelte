<script lang="ts">
	import Board from './Board.svelte';
	import CardSample from './CardSample.svelte';
	import Chat from './Chat.svelte';
	export let data;
</script>

<main>
	<div class="Board">
		<Board board={data.board} />
	</div>
	<div class="CardSample">
		<CardSample />
	</div>
	<div class="Chat">
		<Chat />
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

		aspect-ratio: 2;

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
