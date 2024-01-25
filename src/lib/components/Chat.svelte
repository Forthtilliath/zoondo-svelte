<script lang="ts">
	import { subscribeSocket } from '$lib/methods/subscribeSocket';
	import { afterUpdate } from 'svelte';

	export let room: string;
	export let userId: string;
	export let isInGame: boolean = false;
	$: canWrite = isInGame || room === 'waiting';

	const { socket, messages } = subscribeSocket(room);

	let ul: HTMLUListElement;

	afterUpdate(() => {
		ul.scrollTo({
			top: ul.scrollHeight,
			left: 0,
			behavior: 'smooth'
		});
	});

	let currMsg = '';
	const hClickSend = () => {
		socket.emit('message', currMsg, userId);
		currMsg = '';
	};
</script>

<div class="wrapper">
	<ul bind:this={ul}>
		{#each $messages as msg}
			<li class={msg.user_id === userId ? 'me' : 'him'}>{msg.content}</li>
		{/each}
	</ul>
	{#if canWrite}
		<form on:submit|preventDefault={hClickSend}>
			<label>
				<span class="sr-only">Message:</span>
				<input type="text" bind:value={currMsg} />
			</label>
			<button>Send a message!</button>
		</form>
	{:else}
		<p>You are not allowed to write in this room</p>
	{/if}
</div>

<style lang="scss">
	ul {
		display: flex;
		flex-flow: column nowrap;
		color: black;
		height: calc(45vh - 1rem);
		overflow-y: scroll;
	}
	li {
		width: 60%;
		background-color: rgba(144, 238, 144, 0.445);
		margin: 0.5rem;
		padding: 0.5rem;
		border-radius: 5px;

		&.me {
			align-self: end;
			background-color: rgba(173, 216, 230, 0.452);
		}
	}
</style>
