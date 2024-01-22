<script lang="ts">
	export let data;
	$: ({ currentGames, user } = data);
</script>

<h2>Liste des parties</h2>

<ul>
	{#each currentGames as game}
		<li>
			<form method="post" action="?/join">
				<span>{game.name}</span>
				<button type="submit" disabled={game.players.length !== 2}> Ouvrir la partie</button>
			</form>
		</li>
	{/each}
</ul>

<style lang="scss">
	form {
		display: grid;
		grid-template-columns: 1fr 300px;
		margin-top: 1rem;
	}
	li {
		line-height: 2rem;
	}
</style>
