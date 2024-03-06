<script lang="ts">
  import { cn } from '$lib/methods/cn';
  import { currentToasts } from '$lib/stores/toast';
</script>

<ul class="fixed left-0 right-0 top-0 z-10 mt-4 flex w-full flex-col justify-center">
  {#each $currentToasts as item}
    <li
      class={cn(
        'mb-2 ml-auto mr-auto mt-0 flex w-80 items-center rounded px-3 py-6 text-white',
        item.type === 'error' && 'bg-red-400',
        item.type === 'notice' && 'bg-blue-400'
      )}
    >
      {item.msg}
    </li>
  {/each}
</ul>
