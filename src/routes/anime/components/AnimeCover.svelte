<script lang="ts">
	import type { AnimeInfo } from '$lib/types/anime';

	export let anim: AnimeInfo = {} as AnimeInfo;
</script>

<div
	class="absolute top-[-8rem] max-w-[18rem] min-w-[18rem] flex flex-col rounded-md shadow-lg z-10"
>
	<div
		class="cover max-w-[18rem] min-w-[18rem] rounded-lg shadow-lg relative overflow-hidden"
		data-flip-id={`img-${anim.id}`}
	>
		<img
			class="max-w-[18rem] min-w-[18rem] h-[26rem] bg-gray-800"
			src={anim.image}
			alt={anim.title?.romaji}
		/>
	</div>
	<button class="btn bg-blue-700 mt-8 w-full">+ Watch Later</button>
</div>
