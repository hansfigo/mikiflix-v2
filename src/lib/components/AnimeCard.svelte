<script lang="ts">
	import type { Anime, RecentAnime } from '$lib/types/anime';
	import { popup, type PopupSettings } from '@skeletonlabs/skeleton';
	import Star from './icons/star.svelte';
	import AnimeCoverMobile from './anime-card/AnimeCoverMobile.svelte';
	import AnimeCoverDesktop from './anime-card/AnimeCoverDesktop.svelte';

	export let popupData: PopupSettings;
	export let i: number;
	export let animeList: (Anime | RecentAnime)[];

	function isAnime(item: Anime | RecentAnime): item is Anime {
		return 'description' in item;
	}

	$: anim = animeList[i];
</script>

<a href={`/anime/${anim.id}`}>
	<div
		class="relative rounded-lg card-hover overflow-hidden w-32  md:w-40 flex md:justify-center flex-col items-center"
		use:popup={popupData}
	>
		<AnimeCoverMobile {anim}/>
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


