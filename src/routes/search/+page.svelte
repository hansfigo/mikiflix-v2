<script lang="ts">
	import AnimeCard from '$lib/components/shared/AnimeCard.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<svelte:head>
	<title>Search for '{data.query} | Mikiflix'</title>
</svelte:head>

<div class="pt-20">
	<h1 class="px-8 pb-6">Search Results for <span>'{data.query}'</span></h1>
	{#await data.search.results}
		Loading...
	{:then value}
		<div class="px-8  w-full   flex gap-4 flex-wrap justify-between md:justify-start">
			{#each value as anime, i}
				<AnimeCard animeList={data.search.results} {i} popupData={data.popup[i]} />
			{/each}
		</div>
	{:catch error}
		{error.message}
	{/await}
</div>

<style lang="postcss">
	h1 {
		@apply text-xl;
	}

	span{
		font-weight: 600;
	}
</style>
