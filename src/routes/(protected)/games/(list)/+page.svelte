<script lang="ts">
	import type { PageData } from '../$types';
	export let data: PageData;

	$: ({ games, user } = data);
</script>

<section>
	<h2>Liste des parties</h2>
	<ul>
		{#each games as game}
			<li>
				<form method="post" action="?/join">
					<span>{game.name}</span>
					<span
					class:notfull={game.players.length < 2}
					class:full={game.players.length === 2}>
					 {game.players.length}/2
					</span>
					<input type="hidden" name="gameId" value={game.id} />
					{#if game.players.some((p) => p.id === user.userId)}
						<button type="submit">Ouvrir la partie</button>
					{:else}
						<button type="submit" disabled={game.players.length === 2}>Rejoindre</button>
					{/if}
				</form>
			</li>
		{/each}
	</ul>
</section>

<style lang="scss">
	section {
    margin-inline: auto;
    padding-inline: 2rem;
		max-width: 1200px;
	}
	form {
		display: grid;
		grid-template-columns: 1fr 100px 200px;
		margin-top: 1rem;
	}
	li {
		line-height: 2rem;
	}
	button {
		cursor: pointer;
	}
	.notfull {
		color: green;
	}
	.full {
		color: #b30202;
	}
</style>
