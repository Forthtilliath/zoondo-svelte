<script>
	import { enhance } from '$app/forms';
</script>

<form method="post" action="?/newgame" use:enhance>
	<input type="submit" value="Create a new game" />
</form>

<slot />
