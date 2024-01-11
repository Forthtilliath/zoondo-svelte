<script lang="ts">
	import { enhance } from '$app/forms';
</script>

<h1>Sign up</h1>
<form method="post" use:enhance>
	<label for="username">Username</label>
	<input value="forth" name="username" id="username" /><br />

	<label for="username">Email</label>
	<input value="forth@live.fr" name="email" id="email" /><br />

	<label for="password">Password</label>
	<input value="tototo" type="password" name="password" id="password" /><br />

	<input type="submit" />
</form>
<a href="/signin">Sign in</a>
