<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;

	$: ({currentGames, user} = data);
</script>

<h1>Rejoindre une partie</h1>

<h2>Liste des parties</h2>
<ul>
	{#each currentGames as game}
		<li>
			<form method="post" action="?/join">
				{game.id}
				{#if game.players.some( p => p.id === user.userId)}
					<button type="submit">Ouvrir la partie</button>
				{:else if game.players.length < 2}
					<button type="submit">Rejoindre</button>{:else}
					<button disabled>Rejoindre</button>{/if}
			</form>
		</li>
	{/each}
</ul>



<style lang="scss">
</style>
