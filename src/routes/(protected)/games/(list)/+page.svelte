<script lang="ts">
	export let data;
	$: ({ games, user } = data);
</script>

<h2>Liste des parties</h2>
<ul>
	{#each games as game}
		<li>
			<form method="post" action="?/join">
				<div>
					<span>{game.name}</span>
				</div>
				<span class:notfull={game.players.length < 2} class:full={game.players.length === 2}>
					{game.players.length}/2
				</span>
				<input type="hidden" name="gameId" value={game.id} />
				{#if game.players.some((p) => p.id === user.userId)}
					{#if game.players.length < 2}
						<button class="button" disabled>Ouvrir la partie</button>
					{:else}
						<a class="button open" href="/games/{game.id}">Ouvrir la partie</a>
					{/if}
				{:else}
					<button class="button join" type="submit" disabled={game.players.length === 2}
						>Rejoindre</button
					>
				{/if}
			</form>
		</li>
	{/each}
</ul>

<style lang="scss">
	form {
		display: grid;
		grid-template-columns: 1fr 100px 200px;
		align-items: center;
		margin-top: 1rem;
	}
	li {
		line-height: 2rem;
	}
	.notfull {
		color: green;
	}
	.full {
		color: #b30202;
	}
	.button {
		all: unset;
		padding: 0.25rem 0.5rem;
		font-size: 12px;
		font-weight: 500;
		display: block;
		border-radius: 0.25rem;
		text-decoration: none;
		display: flex;
		justify-content: center;
		align-items: center;

		&.join {
			cursor: pointer;
			color: rgb(232, 230, 227);
			background-color: hsl(220, 89%, 38%);
			outline: 1px solid hsl(220, 89%, 28%);

			&:hover {
				background-color: hsl(220, 89%, 28%);
			}
		}

		&.open {
			cursor: pointer;
			color: rgb(232, 230, 227);
			background-color: hsl(120deg 100% 24%);
			outline: 1px solid hsl(120deg 100% 14%);

			&:hover {
				background-color: hsl(120deg 100% 14%);
			}
		}

		&[disabled] {
			color: rgb(173, 173, 173);
			background-color: rgb(71, 71, 71);
		}
	}
</style>
