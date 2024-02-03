<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	const recentAnimePopupData = data.recentPopups;
	const recentAnime = data.recent.results;
	const trendingAnime = data.trending.results;

	let isBackendError = data.trending.results.length <= 3 || recentAnime.length <= 5 ? true : false;

	import { browser } from '$app/environment';
	import AnimeCard from '$lib/components/shared/AnimeCard.svelte';
	import Carousel from '$lib/components/shared/Carousel.svelte';
</script>

<svelte:head>
	<title>Mikiflix | Free Anime Streaming Web</title>
</svelte:head>

<div>
	<div class="min-h-[18rem] w-full">
		{#if browser}
			<Carousel {trendingAnime} />
		{:else}
			<div class="placeholder h-52 w-screen animate-pulse" >HellPPPPPo</div>
		{/if}
	</div>
	{#if isBackendError}
		<div class="px-8">
			<aside class="alert variant-filled-error mt-12">
				<div>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="w-6 h-6"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
						/>
					</svg>
				</div>
				<!-- Message -->
				<div class="alert-message">
					<h3 class="h3 font-semibold">Unstable Server</h3>
					<p>
						The backend server is currently experiencing issues so it only displays a limited
						selection of anime. Otherwise other feature is safe
					</p>
				</div>
			</aside>
		</div>
	{/if}
	<section class="md:px-8">
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
