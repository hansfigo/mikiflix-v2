<script lang="ts">
	import type { Character } from '$lib/types/anime';

	export let characters: Character[];

	function capitalizeFirstLetter(word: string) {
		if (typeof word !== 'string') {
			return '';
		}
		return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
	}
</script>

<section class="mt-8">
	<h1>Characters</h1>
	<div class="flex flex-wrap gap-6 justify-between items-start pt-8">
		{#each characters as chara}
			<div
				class="flex justify-between gap-x-3 p-5 w-[48%] max-h-48 h-48 border-[2px] border-white/10 overflow-hidden rounded-md"
			>
				<div class="max-w-[40%] h-full flex rounded-md overflow-hidden">
					<img class="object-cover" src={chara.image} alt={chara.name.first} />
				</div>
				<div class="flex flex-col mr-8 justify-between items-start">
					<p>{chara.name.full}</p>
					<p class="opacity-50">{capitalizeFirstLetter(chara.role)}</p>
				</div>
				{#if chara.voiceActors && chara.voiceActors[0] && chara.voiceActors[0].name}
					<div class="flex flex-col justify-between items-end">
						<p>{chara.voiceActors[0].name.full}</p>
						<p class="opacity-50">{chara.voiceActors[0].language}</p>
					</div>
				{:else}
					<p>No Data</p>
				{/if}
				<div class="max-w-[40%] h-full flex rounded-md overflow-hidden">
					{#if chara.voiceActors && chara.voiceActors[0] && chara.voiceActors[0].name}
						<img
							class="object-cover"
							src={chara.voiceActors[0].image}
							alt={chara.voiceActors[0].image}
						/>
					{/if}
				</div>
			</div>
		{/each}
	</div>
</section>

<style lang="postcss">
	h1 {
		@apply text-2xl font-semibold;
	}
</style>
