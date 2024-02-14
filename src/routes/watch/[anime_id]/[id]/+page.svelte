<script lang="ts">
	import VideoPlayer from '$lib/components/shared/VideoPlayer.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	const { episodes, animeData } = data;

	function handlePlayerReady(player: any) {
		console.log('Player is ready:', player);
	}
</script>

<section class="mt-20 flex gap-6 flex-col items-center">
	<VideoPlayer
		src={episodes[3].url}
		onReady={handlePlayerReady}
		options={{ controls: true, autoplay: false }}
	/>
	<section class="container">
		<h1 class="text-2xl font-bold">{animeData.title?.romaji}</h1>
	</section>
</section>
