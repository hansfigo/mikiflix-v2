<script lang="ts">
	import VideoPlayer from '$lib/components/shared/VideoPlayer.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	const { episodes } = data;

	function handlePlayerReady(player: any) {
		console.log('Player is ready:', player);
	}
</script>

<section class="mt-20">
	<VideoPlayer
		src={episodes[3].url}
		onReady={handlePlayerReady}
		options={{ controls: true, autoplay: false }}
	/>
</section>
