<script lang="ts">
	import type { AnimeInfo } from '$lib/types/anime';

	export let anim: AnimeInfo;
</script>

<div class="text-left border-2">
	<h1>SAMA KAYAK ANILIST AJAHH MUMET</h1>
	<br>
	<h3>Airing</h3>
	<p>{anim.nextAiringEpisode?.episode}</p>
</div>
