<script lang="ts">
	import { currentFocus } from '$lib/stores/game';
</script>

<div class="card">
	{#if $currentFocus}
		<div class="corner cor-tl">{$currentFocus.corners[0]}</div>
		<div class="corner cor-tr">{$currentFocus.corners[1]}</div>
		<div class="corner cor-br">{$currentFocus.corners[2]}</div>
		<div class="corner cor-bl">{$currentFocus.corners[3]}</div>
		<div class="moves">Moves: TODO</div>
		<img src={`/assets/types/${$currentFocus.type}.png`} alt={$currentFocus.type} class="type" />
		<div class="value">{$currentFocus.value}</div>
		<img
			src={`/assets/tribes/${$currentFocus.slug}.png`}
			alt={$currentFocus.slug}
			class="picture"
		/>
		<div class="name">{$currentFocus.name}</div>
		<div class="power">{$currentFocus.power ? `Special: ${$currentFocus.power}` : ''}</div>
	{/if}
</div>

<style lang="scss">
	.card {
		display: grid;
		place-items: center;
		grid-template-columns: 3em 1fr 1fr 3em;
		grid-template-rows: 3em 1fr 3em;
		gap: 0;
		grid-auto-flow: row;
		grid-template-areas:
			'cor-tl name name cor-tr'
			'type moves picture value'
			'cor-bl power power cor-br';

		& > * {
			border: 1px dashed violet;
		}

		background-color: black;
	}

	.cor-tl {
		grid-area: cor-tl;
	}

	.cor-bl {
		grid-area: cor-bl;
	}

	.moves {
		grid-area: moves;
	}

	.cor-br {
		grid-area: cor-br;
	}

	.cor-tr {
		grid-area: cor-tr;
	}

	.picture {
		grid-area: picture;
	}

	.type {
		grid-area: type;
	}

	.name {
		grid-area: name;
	}

	.value {
		grid-area: value;
	}

	.power {
		grid-area: power;
	}

	.corner {
		border-radius: 50%;
		width: 80%;
		aspect-ratio: 1;
		background-color: orangered;

		display: grid;
		place-items: center;
	}
</style>
