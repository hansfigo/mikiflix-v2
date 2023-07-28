<script lang="ts">
	import type { Anime, RecentAnime } from '$lib/types/anime';
	import { popup, type PopupSettings } from '@skeletonlabs/skeleton';
	import Star from './icons/star.svelte';
  
	export let popupData: PopupSettings;
	export let i: number;
	export let animeList: (Anime | RecentAnime)[];
  
	// Use a type guard to narrow down the type to Anime
	function isAnime(item: Anime | RecentAnime): item is Anime {
	  return 'description' in item;
	}
  
	$: anim = animeList[i];
  </script>
  
  <!-- Your HTML template -->
  <div class="card card-hover w-40 variant-ghost-secondary border-surface-500 border-[0.2px] flex justify-center flex-col items-center" use:popup={popupData}>
	<header class="card-header w-36">
	  <img class="h-auto object-cover max-w-full" src={anim.image} alt="Anime Cover" />
	</header>
	<section class="p-4 break-words text-xs">{anim.title?.romaji}</section>
  </div>
  <div class="card z-20 p-4 variant-glass-tertiary text-white min-w-[10rem] max-w-[10rem]" data-popup={`popupHover${i}`}>
	<div class="flex justify-between w-full">
		<p>{anim.type}  {anim.episodeNumber ? `Ep${anim.episodeNumber}` : ''}</p>
		<div class="flex">
			<p>{anim.rating}</p>
			<Star/>
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
  