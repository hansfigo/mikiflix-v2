<script lang="ts">
	import { goto } from '$app/navigation';
	import type { Recommendation, Relation } from '$lib/types/anime';

	export let relation: Relation | Recommendation;
</script>


<button on:click={() => goto(`/anime/${relation.id}`, { invalidateAll: true })}>
    <div
        class="relative rounded-lg card-hover w-40 flex justify-center flex-col items-center"
    >
        <div
            class="max-w-full relative w-full h-full hidden md:block"
            data-flip-id={`img-${relation.id}`}
        >
            <section
                class="absolute h-full w-full bg-gradient-to-t from-surface-600 opacity-80"
            />
            <img class="rounded-lg" src={relation.image} alt="Anime Cover" />
        </div>
        <section class="absolute bottom-4 left-2 break-words text-xs">
            {relation.title?.romaji}
        </section>
    </div>
</button>