<script lang="ts">
	import type { AnimeInfo } from '$lib/types/anime';

	export let anim: AnimeInfo;
</script>

<section>
    <h1>Characters</h1>
    <div class="flex flex-wrap gap-6 justify-center items-center pt-8">
            {#if anim.characters }
                {#each anim.characters as chara}
                <div class="flex gap-2">
                    <p>{chara.name.full}</p>
                    <div class="">
                        <img src={chara.image} alt={chara.name.first}>
                    </div>
                </div>
                
                {/each}
            {/if}

    </div>
</section>