<script lang="ts">
	export let lastGameId: Promise<{
		game_id: string;
	} | null>;
</script>

<nav>
	<a href="/" class="Logo">Next Template</a>
	{#await lastGameId}
		<p>Loading...</p>
	{:then game}
		{#if game}
			<a href="/games/{game.game_id}">Current (only) game</a>
		{/if}
	{/await}
	<a href="/">Link #2</a>
	<a href="/">Link #3</a>
</nav>

<style lang="scss">
	.Logo {
		text-decoration: none;
		color: inherit;
	}

	nav {
		display: flex;
		gap: 3ch;
	}
</style>
