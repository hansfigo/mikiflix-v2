<script lang="ts">
	import type { AnimeInfo } from '$lib/types/anime';

	export let anim: AnimeInfo;
</script>

<div class="absolute top-[-8rem] 1max-w-[18rem] flex flex-col rounded-md shadow-lg z-10">
	<div
		class="cover max-w-[18rem] rounded-lg shadow-lg relative overflow-hidden"
		data-flip-id={`img-${anim.id}`}
	>
		<img src={anim.image} alt={anim.title?.romaji} />
	</div>
    <button class="btn bg-blue-700 mt-8 w-full">+ Watch Later</button>
</div>
