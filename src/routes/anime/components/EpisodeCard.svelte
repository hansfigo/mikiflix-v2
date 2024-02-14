<script lang="ts">
	import type { Episode } from '$lib/types/anime';
	export let animeId : string;
	export let episodes: Episode[];
</script>

<section class="mt-8">
	<div class="flex flex-wrap gap-6 justify-between items-start pt-8">
		{#each episodes as ep}
			<a
				href={`/watch/${animeId}/${ep.id}`}
				class="relative flex justify-between gap-x-3 w-[48%] max-h-48 h-48 border-[2px] border-white/10 overflow-hidden rounded-md"
			>
				<div
					class="max-w-full relative w-full h-full hidden md:block"
					data-flip-id={`img-${ep.id}`}
				>
					<section class="absolute h-full w-full bg-gradient-to-t from-surface-600 opacity-80" />
					<img class="rounded-lg h-full w-full object-cover" src={ep.image} alt="Anime Cover" />
				</div>
				<section class="absolute bottom-4 left-2 break-words text-base">
					{ep.id}
				</section>
			</a>
		{/each}
	</div>
</section>
