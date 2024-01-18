<script>
	import { page } from '$app/stores';
</script>

<menu>
	<li><a href="/" class:active={$page.url.pathname === '/'}>Profile</a></li>
	<li><a href="/games" class:active={$page.url.pathname === '/games'}>Games</a></li>
	<li><a href="/games/new" class:active={$page.url.pathname === '/games/new'}>Create Game</a></li>
	<li><a href="/games/current" class:active={$page.url.pathname === '/games/current'}>Current Games</a></li>
</menu>

<slot />

<style lang="scss">
	menu {
		display: flex;
		gap: 1rem;
		list-style: none;
		margin: 0.5rem;

		a {
			padding: 10px 20px;
			font-size: 14px;
			font-weight: 500;
			display: block;
			color: rgb(232, 230, 227);
			background-color: rgb(11, 69, 184);
			border-radius: 0.5rem;
			text-decoration: none;

			&:hover {
				background-color: rgb(12, 88, 240);
			}

			&.active {
				background-color: rgb(12, 88, 240);
				outline: 2px solid rgb(11, 69, 184);
			}
		}
	}
</style>
