<script lang="ts">
	import '../styles/core/reset.scss';
	import '../styles/core/base.scss';

	import Hotlinks from './Hotlinks.svelte';
</script>

<div class="wrapper">
	<header>
		<Hotlinks />
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
