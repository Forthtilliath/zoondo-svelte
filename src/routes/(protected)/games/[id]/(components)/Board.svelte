<script lang="ts">
	import CardTokenOpponent from './CardTokenOpponent.svelte';
	import CardTokenPlayer from './CardTokenPlayer.svelte';
	import { subscribeSocket } from '$lib/methods/subscribeSocket';
	import { page } from '$app/stores'
	import { currentBoard, currentFocus } from '$lib/stores/game';
	import { onMount } from 'svelte';

	export let board: Game.Board;
	export let userId: string;
	export let room = 'waiting';
	let dropTargets: Game.Move[]=[];

	$: {
		if($currentFocus?.card) {
			const {x,y} = $currentFocus;
			const token = $currentFocus.card
			dropTargets =token.moves.flat().map(move=>[move[0]+x, move[1]+y])
		}
	}

	onMount(()=>{
		currentBoard.set(board);
	})

	const { socket } = subscribeSocket(room);

	function hDragDrop(evt: DragEvent & { currentTarget: HTMLElement }) {
		if (!evt.dataTransfer) return;

		if(!evt.currentTarget.classList.contains("targettable")){
			return;
		}

		const coordsDst = `${evt.currentTarget.dataset.x};${evt.currentTarget.dataset.y}`;

		if($currentFocus && 'instanceid' in $currentFocus){
			const newAction: DB.Action = {
				action_id:"",
				cardinstance_id: $currentFocus?.instanceid,
				destination: coordsDst,
				game_id: $page.params.id,
				player_id: userId
			}
			socket.emit("pushAction",newAction);
		}
	}
</script>

<div class="wrapper">
	{#each $currentBoard as square}
		<div
			class="square"
			class:targettable={ dropTargets.some(target=>target[0]===square.x && target[1]=== square.y) }
			on:drop|preventDefault={hDragDrop}
			on:dragover|preventDefault
			data-x={square.x}
			data-y={square.y}
			aria-dropeffect="move"
			role="gridcell"
			tabindex="0"
			>
			{#if square.card}
				{#if square.owner===userId}
					<CardTokenPlayer cardInstance={square}/>
				{:else}
					<CardTokenOpponent />
				{/if}
			{/if}
			<span>{square.x}-{square.y}</span>
		</div>
	{/each}
</div>

<style lang="scss">
	@use '$styles/abstracts/variables.module' as *;

	.wrapper {
		display: flex;
		flex-flow: row wrap;
		width: 100%;
		height: 100%;
		background-image: url('/assets/board.webp');
		background-size: cover;
	}
	.targettable{
		background-color: rgba(200,200,0,.2);
	}
	.square {
		width: calc(100% / $gameSquaresX);
		aspect-ratio: 1;
		border: 1px solid $baseColor;
		box-sizing: border-box;
		display: flex;
		justify-content: center;
		align-items: center;

		position: relative;


		span {
			position: absolute;
			inset: 0;
			display: grid;
			place-items: center;
			pointer-events: none;
		}
	}
</style>
