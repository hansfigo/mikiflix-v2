<script lang="ts">
	import { goto } from '$app/navigation';
	import type { Recommendation, Relation } from '$lib/types/anime';

	export let relation: Relation | Recommendation;

</script>

<button on:click={() => goto(`/anime/${relation.id}`, { invalidateAll: true })}>
	<div class="relative rounded-lg card-hover min-w-[8rem] md:min-w-full max-h-[20rem] lg:min-h-[16rem] lg:max-h-[16rem] overflow-hidden w-full flex justify-center flex-col items-center">
		<div
			class="max-w-full relative w-full h-full md:block"
			data-flip-id={`img-${relation.id}`}
		>
			<section class="absolute h-full w-full bg-gradient-to-t from-surface-600 opacity-80" />
			<img class="rounded-lg min-h-[14rem] w-full object-cover" src={relation.image} alt="Anime Cover"/>
		</div>
		<section class="absolute bottom-4 left-2 break-words text-xs">
			{relation.title?.romaji}
		</section>
	</div>
</button>
