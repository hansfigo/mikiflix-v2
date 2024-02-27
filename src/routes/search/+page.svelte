<script lang="ts">
	import AnimeCard from '$lib/components/shared/anime-card/AnimeCard.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<svelte:head>
	<title>Search for '{data.query} | Mikiflix'</title>
</svelte:head>

<main class="pt-20 flex w-full justify-center">
	<div class="container px-8 md:px-0">
		<h1 class="pb-6">Search Results for <span>'{data.query}'</span></h1>
		{#await data.search.results}
			Loading...
		{:then value}
			<div
				class="grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-8 grid gap-4 justify-center items-center"
			>
				{#each value as anime, i}
					<AnimeCard animeList={data.search.results} {i} popupData={data.popup[i]} />
				{/each}
			</div>
		{:catch error}
			{error.message}
		{/await}
	</div>
</main>

<style lang="postcss">
	h1 {
		@apply text-xl;
	}

	span {
		font-weight: 600;
	}
</style>
