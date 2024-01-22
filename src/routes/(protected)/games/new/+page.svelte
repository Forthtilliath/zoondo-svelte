<script>
	import Form from '$lib/components/form.svelte';

	export let form, data;
	$: ({ users, user } = data);
</script>

<Form action="?/create">
	<h2>Create a game</h2>
	<div>
		<label for="gameName">Name :</label>
		<input value="" name="gameName" id="gameName" />
		{#if form?.message?.gameName}<span>{form.message?.gameName._errors}</span>{/if}
	</div>

	<div>
		<label for="friendName">Friend to invite :</label>
		<input value="" name="friendName" id="friendName" list="friendName-list" />
		<datalist id="friendName-list">
			{#each users.filter((u) => u.username !== user.username) as player}
				<option value={player.username} />
			{/each}
		</datalist>
		{#if form?.message}<span>{form.message._errors}</span>{/if}
	</div>

	<button>Create the game</button>
</Form>
