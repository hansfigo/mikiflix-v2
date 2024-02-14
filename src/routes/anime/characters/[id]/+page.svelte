<script lang="ts">
	import { animeDetailStore, isTabActiveStore } from '$lib/stores/animeInfoTab';
	import Characters from '../../components/Characters.svelte';


    isTabActiveStore.update(()=>{
		return {
			overview : false,
			characters : true,
			episodes : false
		}
	})
</script>

{#if $animeDetailStore.characters}
    <Characters characters={$animeDetailStore.characters} />
{/if}
