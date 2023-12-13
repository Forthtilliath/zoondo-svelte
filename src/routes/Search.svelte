<div class="search">
	<input type="search" />
	<ul>
		<li>
			<ul>
				<li>result</li>
			</ul>
		</li>
	</ul>
</div>

<style lang="scss">
	@use 'sass:color';
	@use '../styles/abstracts/variables.module' as *;

	.search {
		position: relative;
		width: 30ch;

		&.unfocused ul {
			opacity: 0.5;
		}
		&.empty ul {
			display: none;
		}
		&.noresults ul {
			color: red;
		}
		&.results ul {
			color: inherit;
		}

		input {
			width: 100%;
		}

		& > ul {
			position: absolute;
			width: 100%;
			background-color: color.scale($baseColor, $lightness: -30%);
			z-index: 1;
		}
	}
</style>
