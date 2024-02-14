<script lang="ts">
	import { animeDetailStore, isTabActiveStore } from '$lib/stores/animeInfoTab';
	import AnimeCard from '../components/AnimeCard.svelte';
	import Characters from '../components/Characters.svelte';
	import Relations from '../components/Relations.svelte';

	isTabActiveStore.update(() => {
		return {
			overview: true,
			characters: false,
			episodes: false
		};
	});
</script>

<section class="flex flex-col gap-10">
	<div>
		<h1>Trailer</h1>
		<iframe
			class="pt-6 w-full"
			width="420"
			height="315"
			src={`https://www.youtube.com/embed/${$animeDetailStore.trailer?.id}`}
			title={$animeDetailStore.trailer?.id}
		/>
	</div>
	<Relations anim={$animeDetailStore} />
	{#if $animeDetailStore.characters}
		<Characters characters={$animeDetailStore.characters.slice(0, 6)} />
	{/if}
	<section class="flex flex-col items-baseline justify-start">
		<h1>Recomendation</h1>
		<div class="flex flex-wrap gap-6 justify-between items-center pt-8">
			{#if $animeDetailStore.recommendations}
				{#each $animeDetailStore.recommendations as recommend}
					<AnimeCard relation={recommend} />
				{/each}
			{/if}
		</div>
	</section>
</section>

<style lang="postcss">
	h1 {
		@apply text-2xl font-semibold;
	}
</style>
