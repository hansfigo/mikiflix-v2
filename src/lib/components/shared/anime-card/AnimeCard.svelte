<script lang="ts">
	import Star from '$lib/components/icons/star.svelte';
	import type { Anime, AnimeInfo, RecentAnime } from '$lib/types/anime';
	import { popup, type PopupSettings } from '@skeletonlabs/skeleton';
	import AnimeCoverDesktop from './AnimeCoverDesktop.svelte';
	import AnimeCoverMobile from './AnimeCoverMobile.svelte';

	export let popupData: PopupSettings;
	export let i: number;
	export let animeList: (Anime | RecentAnime)[];

	$: anim = animeList[i];
</script>


<div>

<a href={`/anime/${anim.id}`} >
	<div
	class="relative rounded-lg card-hover min-w-[8rem] md:min-w-full max-h-[20rem] lg:min-h-[16rem] lg:max-h-[16rem] overflow-hidden w-full flex justify-center flex-col items-center"
		use:popup={popupData}
	>
		<!-- <AnimeCoverMobile {anim}/> -->
		<AnimeCoverDesktop {anim}/>

		<section class="absolute bottom-4 left-2 break-words text-xs">{anim.title?.romaji}</section>
	</div>
</a>

<div class="hidden md:block">
	<div
		class="card z-20 p-4 variant-glass-tertiary text-white min-w-[10rem] max-w-[10rem]"
		data-popup={`popupHover${i}`}
	>
		<div class="flex justify-between w-full">
			<p>{anim.type} {anim.episodeNumber ? `Ep${anim.episodeNumber}` : ''}</p>
			<div class="flex">
				<p>{anim.rating}</p>
				<Star />
			</div>
		</div>
		{#if anim.genres}
			<div class="flex flex-wrap gap-1">
				{#each anim.genres as genre}
					<span class="badge variant-ghost-success text-[8px]">{genre}</span>
				{/each}
			</div>
		{/if}
		<div class="arrow variant-glass-tertiary" />
	</div>
</div>
</div>


