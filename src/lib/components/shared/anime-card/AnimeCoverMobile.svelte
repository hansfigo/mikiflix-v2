<script lang="ts">
	import type { AnimeInfo } from '$lib/types/anime';

	export let anim: AnimeInfo;
</script>

<div class="cover relative w-full h-full md:hidden" data-flip-id={`img-${anim.id}-mob`}>
	<section class="absolute h-full w-full bg-gradient-to-t from-surface-600 opacity-80" />
	<img class="rounded-lg" src={anim.image} alt="Anime Cover" />
</div>

<style>
	.cover {
		width: 100%;
		border-radius: 0.5rem;
		max-width: 100%;
	}
</style>
