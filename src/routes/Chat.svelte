<div class="wrapper">
	<ul>
		<li class="me">Hello!</li>
		<li class="him">Hi! How are you ?</li>
		<li class="him">Which tribe do you play ?</li>
		<li class="me">
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus aut, deserunt hic
			aspernatur porro alias. Sed vero reprehenderit quaerat repellendus, molestias minus ad eos
			aspernatur saepe mollitia et qui facere.
		</li>
	</ul>
</div>

<style lang="scss">
	ul {
		display: flex;
		flex-flow: column nowrap;
	}
	li {
		width: 60%;
		background-color: violet;
		margin: 0.5rem;
		padding: 0.5rem;
		border-radius: 5px;

		&.me {
			align-self: end;
			background-color: yellowgreen;
		}
	}
</style>
