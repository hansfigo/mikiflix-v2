<script lang="ts">
	import { isTabActiveStore } from '$lib/stores/animeInfoTab';
	import type { AnimeInfo } from '$lib/types/anime';
	import { getContext } from 'svelte';
	const anim: AnimeInfo = getContext('anime-detail-context');


    isTabActiveStore.update(()=>{
		return {
			overview : false,
			characters : false,
			episodes : true
		}
	})
</script>

{#if anim.episodes}
	<div class="flex flex-col gap-4">
		{#each anim.episodes as eps}
			<div class="flex rounded-md border-[1px] py-3 px-6 border-gray-800">
                <img src={eps.image} alt={eps.id}>
				<p>{eps.title}</p>
				<!-- <p class="text-red-500">{eps.number}</p> -->
			</div>
		{/each}
	</div>
{/if}
