<script lang="ts">
	import { cn } from '$lib/methods/cn';
import { currentToasts } from '$lib/stores/toast';
</script>

<ul class="fixed top-0 left-0 right-0 w-full flex mt-4 justify-center flex-col z-10">
	{#each $currentToasts as item}
		<li class={cn("text-white px-3 py-6 rounded flex items-center mt-0 mr-auto mb-2 ml-auto w-80", item.type==="error" && "bg-red-400", item.type==="notice" && "bg-blue-400")}>{item.msg}</li>
	{/each}
</ul>