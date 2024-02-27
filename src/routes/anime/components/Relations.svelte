<script lang="ts">
	import { goto } from '$app/navigation';
	import type { AnimeInfo } from '$lib/types/anime';
	import AnimeCard from './AnimeCard.svelte';

	export let anim: AnimeInfo;
</script>

<div class="flex flex-col gap-4">
	<h1>Relation</h1>
	<div class="grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 grid gap-4 justify-center items-center">
		{#if anim.relations}
			{#each anim.relations as relation}
				<AnimeCard {relation} />
			{/each}
		{/if}
	</div>
</div>

<style lang="postcss">
	h1 {
		@apply text-2xl font-semibold;
	}
</style>
