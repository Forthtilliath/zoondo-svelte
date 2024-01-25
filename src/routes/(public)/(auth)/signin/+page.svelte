<script lang="ts">
	import { enhance } from '$app/forms';

	// export let form;

	let buttonElement: HTMLInputElement;
	let username: string;
	let password = 'tototo';

	function log(name: string) {
		username = name;
		setTimeout(() => buttonElement.click(), 100);
	}
</script>

<h1>Sign in</h1>

<div>
	<button on:click={() => log('ValhallaCode')}>Log VCode</button>
	<button on:click={() => log('Guillaume')}>Log Guillaume</button>
	<button on:click={() => log('Forth')}>Log Forth</button>
</div>

<form method="post" use:enhance>
	<label for="username">Username</label>
	<input name="username" id="username" bind:value={username} /><br />
	<label for="password">Password</label>
	<input type="password" name="password" id="password" bind:value={password} /><br />
	<input type="submit" bind:this={buttonElement} />
</form>
<a href="/signup">Create an account</a>
