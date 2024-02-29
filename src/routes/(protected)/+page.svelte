<script lang="ts">
	import { enhance } from '$app/forms';
	import Chat from '$lib/components/Chat.svelte';

	export let data;

	$: ({user} = data);

</script>

<h1>Profile</h1>
<p>User id: {user.userId}</p>
<p>Username: {user.username}</p>
<form method="post" action="?/logout" use:enhance>
	<input type="submit" value="Sign out" />
</form>

<h1>Waiting Room</h1>
<Chat userId={user.userId} />

{#await data.usersPromise then users}
	<form method="post" action="?/fight" use:enhance>
		<label>Choose a challenger:
			<input list="opponent-candidates" name="opponent" type="search" autocomplete="off"/>
		</label>
		<datalist id="opponent-candidates">
			{#each users as opponent}
				{#if opponent.username !== user.username}
					<option value={opponent.username}></option>
				{/if}
			{/each}
		</datalist>
		<input type="submit" value="Fight!" />
	</form>
{/await}

<h2>My Games</h2>

{#await data.currentGamesPromise then currentGames}
	<ul>
		{#each currentGames as game}
		{#if game.player1_id===user.userId}
			<li><a href={`/games/${game.game_id}`}>vs {game.player2.username}</a></li>
		{:else}
			<li><a href={`/games/${game.game_id}`}>vs {game.player1.username}</a></li>
		{/if}
		{/each}
	</ul>
{/await}