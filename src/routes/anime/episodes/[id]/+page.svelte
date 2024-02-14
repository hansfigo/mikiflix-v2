<script lang="ts">
	import { animeDetailStore, isTabActiveStore } from '$lib/stores/animeInfoTab';
	import EpisodeCard from '../../components/EpisodeCard.svelte';

	isTabActiveStore.update(() => {
		return {
			overview: false,
			characters: false,
			episodes: true
		};
	});
</script>

{#if $animeDetailStore.episodes}
	<EpisodeCard animeId={$animeDetailStore.id} episodes={$animeDetailStore.episodes} />
{/if}
