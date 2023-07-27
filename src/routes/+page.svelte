<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<svelte:head>
	<title>Mikiflix</title>
</svelte:head>

<div>
	<section>
		<h1 class="text-center font-semibold text-xl md:text-2xl mb-7">Recent Anime</h1>
		{#await data.recent.results}
			Loading...
		{:then value}
			<div class="flex gap-4 flex-wrap justify-center">
				{#each value as anime}
					<div class="card w-40 variant-ghost-tertiary flex justify-center flex-col items-center">
						<header class="card-header w-36">
							<img class="h-auto object-cover max-w-full" src={anime.image} alt="Anime Cover" />
						</header>
						<section class="p-4 break-words text-xs">{anime.title.romaji}</section>
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
