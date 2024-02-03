<script lang="ts">
	import type { AnimeInfo } from '$lib/types/anime';

	export let anim: AnimeInfo;

	let isImageLoaded = false;

	function handleImageLoad() {
		console.log("TRUEEEE");
		isImageLoaded = true;
	}
</script>

<div class="cover relative w-full h-full hidden md:block" data-flip-id={`img-${anim.id}`}>
	<section class="absolute h-full w-full bg-gradient-to-t from-surface-600 opacity-80" />
	<img class="rounded-lg" src={anim.image} alt="Anime Cover" on:load={handleImageLoad}/>
	{#if !isImageLoaded}
		<div class="rounded-lg bg-gray-800" />
	{/if}
</div>

<style>
	.cover {
		width: 100%;
		border-radius: 0.5rem;
		max-width: 100%;
	}
</style>
