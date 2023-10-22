<script lang="ts">
	import type { AnimeInfo } from '$lib/types/anime';

	export let anim: AnimeInfo;

</script>

<section>
	<h1>Characters</h1>
	<div class="flex flex-wrap gap-6 justify-start items-start pt-8">
		{#if anim.characters}
			{#each anim.characters as chara}
				<div class="flex gap-8 max-h-40 h-40 border-2 border-white overflow-hidden">
					<div class="max-w-[40%] h-full flex">
						<img class="object-cover" src={chara.image} alt={chara.name.first} />
					</div>
					<p>{chara.name.full}</p>
					{#if chara.voiceActors && chara.voiceActors[0] && chara.voiceActors[0].name}
						<p>{chara.voiceActors[0].name.full}</p>
					{:else}
						<p>No Data</p>
					{/if}
					<div class="max-w-[40%] h-full flex">
						{#if chara.voiceActors && chara.voiceActors[0] && chara.voiceActors[0].name}
							<img class="object-cover" src={chara.voiceActors[0].image} alt={chara.voiceActors[0].image} />
						{/if}
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
