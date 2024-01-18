<script>
	import Form from '$lib/components/form.svelte';

	export let form;

	export let data;
	$: ({ users } = data);
</script>

<Form action="?/create">
	<h2>Create a game</h2>
	<div>
		<label for="name">Name :</label>
		<input value="forth" name="name" id="name" />
		{#if form?.message?.name}<span>{form.message?.name._errors}</span>{/if}
	</div>

	<div>
		<label for="username">Friend to invite :</label>
		<input value="forth" name="username" id="username" list="username-list" />
		<datalist id="username-list">
			{#each users as user}
				<option value={user.username} />
			{/each}
		</datalist>
		{#if form?.message}<span>{form.message._errors}</span>{/if}
	</div>
</Form>
