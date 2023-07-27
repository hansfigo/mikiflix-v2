<script lang="ts">
	import { popup, type PopupSettings } from '@skeletonlabs/skeleton';

	import type { PageData } from './$types';

	export let data: PageData;

	const recentAnimePopupData = data.recentPopups;
	const recentAnime = data.recent.results;
	const trendingAnime = data.trending.results.splice(2, 8);

	import { register } from 'swiper/element/bundle';
	import { browser } from '$app/environment';

	register();
</script>

<svelte:head>
	<title>Mikiflix</title>
</svelte:head>

<div >
	<div class="min-h-[18rem] w-full">
		{#if browser}
			<swiper-container
				slides-per-view={1}
				centered-slides={true}
				pagination={{
					hideOnClick: true
				}}
				breakpoints={{
					768: {
						slidesPerView: 1
					}
				}}
			>
				{#each trendingAnime as anime, i}
					<swiper-slide>
						<div class="h-72 w-full relative">
							<div class="bg-black opacity-60 absolute w-full h-full" />
							<div class="absolute top-24 left-4 sm:left-16 flex flex-col gap-2">
								<h1 class="text-lg md:text-2xl font-semibold md:max-w-xl">{anime.title?.romaji}</h1>
								<p class="text-[6px] md:text-[8px] max-w-xs md:max-w-md break-words line-clamp-4">
									{anime.description}
								</p>
								<div class="h-8 w-12">
									<button class="btn variant-ghost-primary h-6 md:h-8 w-14 md:w-16"><p class="text-[8px] md:text-[10px]">Watch now</p></button>
								</div>
							</div>
							<img class="object-cover h-72 w-full" src={anime.cover} alt="" loading="lazy" />
						</div>
					</swiper-slide>
				{/each}
			</swiper-container>
		{:else}
			<div class="placeholder h-52 w-screen animate-pulse" />
		{/if}
	</div>
	<section>
		<h1 class="text-center font-semibold text-xl md:text-2xl my-7">Recent Release</h1>
		{#await recentAnime}
			Loading...
		{:then value}
			<div class="flex gap-4 flex-wrap justify-center">
				{#each value as anime, i}
					<div
						class="card card-hover w-40 variant-ghost-tertiary flex justify-center flex-col items-center"
						use:popup={recentAnimePopupData[i]}
					>
						<header class="card-header w-36">
							<img class="h-auto object-cover max-w-full" src={anime.image} alt="Anime Cover" />
						</header>
						<section class="p-4 break-words text-xs">{anime.title.romaji}</section>
					</div>
					<div
						class="hidden card p-4 variant-ghost-tertiary text-white"
						data-popup={`popupHover${i}`}
					>
						<p>{anime.type}</p>
						<p>Ep {anime.episodeNumber}</p>
						<div class="arrow variant-filled-tertiary" />
					</div>
				{/each}
			</div>
		{:catch error}
			{error.message}
		{/await}
	</section>

	{#await data.popular.results}
		Loading...
	{:then value}
		<div class="flex gap-4 flex-wrap">
			{#each value as anime}{/each}
		</div>
	{:catch error}
		{error.message}
	{/await}
</div>
