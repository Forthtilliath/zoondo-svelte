<script lang="ts">
	import { enhance } from '$app/forms';
	import Chat from '$lib/components/Chat.svelte';

	export let data;

	$: user = data.user;
</script>

<h1>Profile</h1>
<p>User id: {user.userId}</p>
<p>Username: {user.username}</p>
<form method="post" action="?/logout" use:enhance>
	<input type="submit" value="Sign out" />
</form>

<h1>Waiting Room</h1>
<Chat userId={user.userId} />

<form method="post" action="?/fight" use:enhance>
	<label>Choose a challenger:
		<input list="opponent-candidates" name="opponent" type="search"/>
	</label>
	<datalist id="opponent-candidates">
		<option value="ValhallaCode"></option>
		<option value="Forth"></option>
		<option value="Guillaume37"></option>
	</datalist>
	<input type="submit" value="Fight!" />
</form>
