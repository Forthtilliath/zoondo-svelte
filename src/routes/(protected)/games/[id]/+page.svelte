<script lang="ts">
	import Board from './(components)/Board.svelte';
	import CardSample from './(components)/CardSample.svelte';
	import Chat from '$lib/components/Chat.svelte';

	export let data;
	$: ({
		user: { userId }
	} = data);
	console.log(data.board);
	
</script>

<svelte:head>
	<title>Zoondo : Game</title>
</svelte:head>

<main>
	{#await data}
		<p>Loading...</p>
	{:then board} 
		<div class="Board">
			<!-- <Board board={data.board} /> -->
			<p>Board loaded</p>
		</div>
		<div class="CardSample">
			<CardSample />
		</div>
		<div class="Chat">
			<Chat room="game#{board.board?.id}" {userId} />
		</div>
	{:catch err}
		<p>Error: {err.message}</p>
	{/await}
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
