<script lang="ts">
	import { enhance } from '$app/forms';

	import type { PageData } from './$types';

	export let data: PageData;
	$: user = data.user;
</script>

<h1>Profile</h1>
<p>User id: {user.userId}</p>
<p>Username: {user.username}</p>
<form method="post" action="?/logout" use:enhance>
	<input type="submit" value="Sign out" />
</form>
