<script lang="ts">
	import { currentFocus } from '$lib/stores/game';
	import { generatePositions, movesToTransitions } from '$lib/game';
	let squares = generatePositions(-2, 2);
</script>

<div class="card">
	{#if $currentFocus}
		<div class="corner cor-tl">{$currentFocus.corners[0]}</div>
		<div class="corner cor-tr">{$currentFocus.corners[1]}</div>
		<div class="corner cor-br">{$currentFocus.corners[2]}</div>
		<div class="corner cor-bl">{$currentFocus.corners[3]}</div>
		<div class="moves">
			{#each squares as square}
				<div
					class="square {square.x === 0 && square.y === 0 && 'origin'} {$currentFocus.moves
						.flat()
						.some(([x, y]) => x === square.x && y === square.y && (x !== 0 || y !== 0)) && 'move'}"
				></div>
				<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
					{#each movesToTransitions($currentFocus.moves, squares.length) as [src, dst]}
						<line
							x1={src.x + 50}
							y1={src.y + 50}
							x2={dst.x + 50}
							y2={dst.y + 50}
							stroke="black"
							stroke-width="2"
						/>
					{/each}
				</svg>
			{/each}
		</div>
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

	.moves {
		grid-area: moves;
		display: flex;
		flex-flow: row wrap;
		gap: 1px;
		aspect-ratio: 1;
		align-self: center;
		position: relative;
		width: 10rem; //TODO valeur magique -_-

		.square {
			width: calc(20% - 1px);
			aspect-ratio: 1;
			border: 1px solid lightgray;
			box-sizing: border-box;
			position: relative;

			&::after {
				content: '●';
				width: 100%;
				aspect-ratio: 1;
				position: absolute;
				color: black;
				display: grid;
				place-items: center;
			}

			&.origin {
				background-color: red;
			}
			&.move {
				background-color: yellow;
			}
		}

		svg {
			position: absolute;
		}
	}
</style>
