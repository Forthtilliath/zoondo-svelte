<script lang="ts">
	import { currentFocus } from '$lib/stores/game';

	export let cardInstance: Game.Position & Game.PlayerCard;

	function setCurrentFocus() {
		currentFocus.set(cardInstance);
	}

	function hDragStart(evt: DragEvent) {
		if (!evt.dataTransfer) return;

		evt.dataTransfer.dropEffect = 'move';
	}
</script>

<img
	src="/assets/card-back-board-alt.webp"
	alt="{cardInstance.card.name} Card owned by you"
	draggable="true"
	on:mouseenter={setCurrentFocus}
	on:dragstart={hDragStart}
/>

<style lang="scss">
</style>
