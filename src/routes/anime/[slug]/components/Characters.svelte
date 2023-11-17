<script lang="ts">
	import type { AnimeInfo } from '$lib/types/anime';

	export let anim: AnimeInfo;

	function capitalizeFirstLetter(word: string) {
    if (typeof word !== 'string') {
        return '';
		}
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
	}
</script>

<section>
	<h1>Characters</h1>
	<div class="flex flex-wrap gap-6 justify-between items-start pt-8 px-4">
		{#if anim.characters}
			{#each anim.characters as chara}
				<div class="flex justify-between gap-x-3 p-5 w-[48%] max-h-48 h-48 border-[3px] border-white border-opacity-50 overflow-hidden rounded-xl">
					<div class="w-[48%] flex gap-x-3">
						<div class="h-full w-2/5 flex rounded-xl overflow-hidden">
							<img class="w-full object-cover" src={chara.image} alt={chara.name.first} />
						</div>
						<div class="w-1/2 flex flex-col justify-between items-start text-left">
							<p>{chara.name.full}</p>
							<p class="opacity-50">{capitalizeFirstLetter(chara.role)}</p>
						</div>
					</div>
					<div class="w-[48%] flex gap-x-3">										
						{#if chara.voiceActors && chara.voiceActors[0] && chara.voiceActors[0].name}
							<div class="w-1/2 flex flex-col justify-between items-end text-right">
								<p>{chara.voiceActors[0].name.full}</p>
								<p class="opacity-50">{chara.voiceActors[0].language}</p>
							</div>
						{:else}
							<p>No Data</p>
						{/if}
						<div class="w-2/5 h-full flex rounded-xl overflow-hidden">
							{#if chara.voiceActors && chara.voiceActors[0] && chara.voiceActors[0].name}
								<img class="w-full object-cover" src={chara.voiceActors[0].image} alt={chara.voiceActors[0].image} />
							{/if}
						</div>
					</div>
				</div>
			{/each}
		{/if}
	</div>
</section>

<style>
	h1 {
		@apply text-2xl font-semibold;
	}
</style>
