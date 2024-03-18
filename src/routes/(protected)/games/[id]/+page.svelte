<script lang="ts">
  import { page } from '$app/stores';
  import Board from './(components)/Board.svelte';
  import CardSample from './(components)/CardSample.svelte';
  import Chat from '$lib/components/Chat.svelte';

  export let data;
  $: ({
    user: { userId },
    isFirstPlayer
  } = data);
</script>

<svelte:head>
  <title>Zoondo : Game</title>
</svelte:head>

<main class="grid grid-cols-2 grid-rows-2 gap-4">
  {#await data.board}
    <p>Loading...</p>
  {:then board}
    {#if board}
      <div class="row-span-2">
        <Board {board} {userId} room="game#{$page.params.id}" {isFirstPlayer} />
      </div>
      <div>
        <CardSample />
      </div>
    {/if}
    <div class="col-start-2">
      <Chat room="game#{$page.params.id}" {userId} />
    </div>
  {:catch err}
    <p>Error: {err.message}</p>
  {/await}
</main>
