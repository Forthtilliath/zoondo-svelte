<script lang="ts">
	import '../styles/core/reset.scss';
	import '../styles/core/base.scss';

	import Hotlinks from './Hotlinks.svelte';
	import Search from './Search.svelte';
</script>

<div class="wrapper">
	<header>
		<Hotlinks />
		<Search />
	</header>
	<slot />
</div>

<style lang="scss">
	.wrapper {
		min-height: 100vh;
	}

	header {
		display: flex;
		justify-content: space-between;

		background-color: hsla(0deg, 0%, 0%, 80%);
	}
</style>
