<script lang="ts">
	let card = {
		slug: 'cloboulon',
		name: 'Cloboulon',
		type: 'chief',
		corners: [4, 5, '*', 2],
		power:
			'Le combat se solde par une égalité. Si tu viens de déplacer Cloboulon, tu déplaces un Grognard.',
		value: 20,
		moves: [[[-1, 0]], [[-1, 1]], [[0, 1]], [[1, 1]], [[1, 0]], [[1, -1]], [[0, -1]], [[-1, -1]]]
	};
</script>

<div class="card">
	<div class="corner cor-tl">{card.corners[0]}</div>
	<div class="corner cor-tr">{card.corners[1]}</div>
	<div class="corner cor-br">{card.corners[2]}</div>
	<div class="corner cor-bl">{card.corners[3]}</div>
	<div class="moves">Moves: TODO</div>
	<img src={`/assets/types/${card.type}.png`} alt={card.type} class="type" />
	<div class="value">{card.value}</div>
	<img src={`/assets/tribes/${card.slug}.png`} alt={card.slug} class="picture" />
	<div class="name">{card.name}</div>
	<div class="power">{card.power && `Special: ${card.power}`}</div>
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
