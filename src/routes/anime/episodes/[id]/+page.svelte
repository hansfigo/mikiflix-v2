<script lang="ts">
	import { isTabActiveStore } from '$lib/stores/animeInfoTab';
	import type { AnimeInfo } from '$lib/types/anime';
	import { getContext } from 'svelte';
	import EpisodeCard from '../../components/EpisodeCard.svelte';
	const anim: AnimeInfo = getContext('anime-detail-context');

	isTabActiveStore.update(() => {
		return {
			overview: false,
			characters: false,
			episodes: true
		};
	});
</script>

{#if anim.episodes}
	<EpisodeCard episodes={anim.episodes} />
{/if}
