<script lang="ts">
	import Form from '$lib/components/form.svelte';

	export let form;

	// https://codepen.io/fghty/pen/PojKNEG
</script>

<Form>
	<h2>Sign up</h2>
	<div>
		<label for="username">Username</label>
		<input value="forth" name="username" id="username" />
		{#if form?.message?.username}<span>{form.message.username._errors}</span>{/if}
	</div>

	<div>
		<label for="username">Email</label>
		<input value="forth@live.fr" name="email" id="email" />
		{#if form?.message?.email}<span>{form.message.email._errors}</span>{/if}
	</div>

	<div>
		<label for="password">Password</label>
		<input value="tototo" type="password" name="password" id="password" />
		{#if form?.message?.password}<span>{form.message.password._errors}</span>{/if}
	</div>

	{#if form?.message?._errors}
		<div>
			<span>{form.message._errors}</span>
		</div>
	{/if}

	<button>Sign up</button>

	<a href="/signin">Sign in</a>
</Form>