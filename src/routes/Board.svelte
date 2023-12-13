<script lang="ts">
	export let board: Game.Board;
</script>

<div class="wrapper">
	{#each board as square}
		<div class="square">?</div>
	{/each}
</div>

<style lang="scss">
	@use '../styles/abstracts/variables.module' as *;

	.wrapper {
		display: flex;
		flex-flow: row wrap;
		width: 100%;
		height: 100%;
		background-image: url('/assets/board.jpg');
		background-size: cover;
	}
	.square {
		width: calc(100% / $gameSquaresX);
		aspect-ratio: 1;
		border: 1px solid $baseColor;
		box-sizing: border-box;
		display: flex;
		justify-content: center;
		align-items: center;

		&.hovered {
			background-color: yellowgreen;
		}

		&.authorizedMove {
			background-color: yellow;
		}
	}
</style>
