<script lang="ts">
	import type { AnimeInfo } from '$lib/types/anime';
	import { resizeImage } from '$lib/utils/imageResize';
	import SvelteMarkdown from 'svelte-markdown';

	export let anim: AnimeInfo = {} as AnimeInfo;

	console.log('COVERRRR');
</script>

<div
	class="absolute left-[50%] translate-x-[-50%] w-full md:w-fit md:top-[-8rem] bottom-[-4rem] md:max-w-[18rem] md:min-w-[18rem] flex flex-row md:flex-col rounded-md shadow-lg z-10"
>
	<div
		class="cover  md:max-w-[18rem] md:min-w-[18rem] rounded-lg shadow-lg relative overflow-hidden"
		data-flip-id={`img-${anim.id}`}
	>
		<img
			class="md:max-w-[18rem] w-full h-[15rem] object-cover md:min-w-[18rem] md:h-[26rem] bg-gray-800"
			src={resizeImage(anim.image, 300)}
			alt={anim.title?.romaji}
		/>
	</div>
	<!-- <div
		class="md:hidden relative pt-12 flex-col justify-between items-start gap-4 h-full w-full overflow-hidden pb-4"
	>
		<div class="flex items-baseline gap-2">
			<h1 class="">{anim.title?.romaji}</h1>
			<p class="text-sm">{anim.releaseDate}</p>
		</div>
		<div class="flex gap-4 flex-wrap ">
			{#each anim.genres ?? [] as genre}
				<span class="chip border-[1px] border-blue-700 bg-blue-600/20 text-blue-100">{genre}</span>
			{/each}
		</div>
		<div
			class={`prose lg:prose-lg prose-p:text-white transition-all duration-500 `}
		>
			<SvelteMarkdown source={anim.description} />
		</div>
	</div> -->
	<button class="btn hidden md:block bg-blue-700 mt-8 w-full">+ Watch Later</button>
</div>
