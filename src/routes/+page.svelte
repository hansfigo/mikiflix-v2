<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	const recentAnimePopupData = data.recentPopups;
	const recentAnime = data.recent.results;
	const trendingAnime = data.trending.results.splice(2, 8);

	import { browser } from '$app/environment';
	import AnimeCard from '$lib/components/AnimeCard.svelte';
	import Carousel from '$lib/components/Carousel.svelte';
</script>

<svelte:head>
	<title>Mikiflix | Free Anime Streaming Web</title>
</svelte:head>

<div>
	<div class="min-h-[18rem] w-full">
		{#if browser}
			<Carousel {trendingAnime} />
		{:else}
			<div class="placeholder h-52 w-screen animate-pulse" />
		{/if}
	</div>
	<section>
		<h1 class=" my-7">Recent Release</h1>
		{#await recentAnime}
			Loading...
		{:then value}
			<div class="flex gap-4 flex-wrap justify-center">
				{#each value as anime, i}
					<AnimeCard animeList={recentAnime} {i} popupData={recentAnimePopupData[i]} />
				{/each}
			</div>
		{:catch error}
			{error.message}
		{/await}
	</section>

	<!-- {#await data.popular.results}
		Loading...
	{:then value}
		<div class="flex gap-4 flex-wrap">
			{#each value as anime}{/each}
		</div>
	{:catch error}
		{error.message}
	{/await} -->
</div>

<style lang="postcss">
	h1 {
		@apply text-center font-semibold text-xl md:text-2xl;
	}
</style>
