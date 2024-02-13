<script lang="ts">
	import { isTabActiveStore } from '$lib/stores/animeInfoTab';
	import type { AnimeInfo } from '$lib/types/anime';
	import { getContext } from 'svelte';
	import Characters from '../../components/Characters.svelte';
	const anim: AnimeInfo = getContext('anime-detail-context');


    isTabActiveStore.update(()=>{
		return {
			overview : false,
			characters : true,
			episodes : false
		}
	})
</script>

{#if anim.characters}
    <Characters characters={anim.characters} />
{/if}
