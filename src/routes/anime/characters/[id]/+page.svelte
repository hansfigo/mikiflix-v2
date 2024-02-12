<script lang="ts">
	import type { AnimeInfo } from '$lib/types/anime';
	import { getContext } from 'svelte';
	import Characters from '../../components/Characters.svelte';
	const anim: AnimeInfo = getContext('anime-detail-context');
</script>

{#if anim.characters}
    <Characters characters={anim.characters} />
{/if}
