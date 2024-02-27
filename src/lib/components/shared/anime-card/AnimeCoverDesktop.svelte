<script lang="ts">
	import type { Anime } from '$lib/types/anime';
	import { resizeImage } from '$lib/utils/imageResize';

	export let anim: Anime;

</script>

<div class="cover relative w-full h-full md:block" data-flip-id={`img-${anim.id}`}>
	<section class="absolute h-full w-full bg-gradient-to-t from-surface-600 opacity-80" />
	<img class="rounded-lg object-cover bg-gray-800 min-h-[14rem] w-full" src={resizeImage(anim.image, 200)} alt="Anime Cover" />
</div>

<style>
	.cover {
		width: 100%;
		border-radius: 0.5rem;
		max-width: 100%;
	}
</style>
