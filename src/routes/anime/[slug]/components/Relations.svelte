<script lang="ts">
	import { goto } from '$app/navigation';
	import type { AnimeInfo } from '$lib/types/anime';
	import AnimeCard from './AnimeCard.svelte';

	export let anim: AnimeInfo;
</script>

<div>
    <h1>Relation</h1>
    <div class="flex flex-wrap gap-6 justify-start items-center pt-8">
        {#if anim.relations}
            {#each anim.relations as relation}
                <AnimeCard {relation}/>
            {/each}
        {/if}
    </div>
</div>

<style>
    h1{
        @apply text-2xl font-semibold;
    }
</style>