<script lang="ts">
	import type { AnimeInfo } from '$lib/types/anime';
	import { setContext } from 'svelte';
	import SvelteMarkdown from 'svelte-markdown';
	import type { LayoutData } from './$types';
	import AnimeCard from './components/AnimeCard.svelte';
	import AnimeCover from './components/AnimeCover.svelte';
	import AnimeDetails from './components/AnimeDetails.svelte';
	import Characters from './components/Characters.svelte';
	import Relations from './components/Relations.svelte';
	import Tabs from './components/Tabs.svelte';

	export let data: LayoutData;

	let current_data;
	let anim: AnimeInfo;
	$: data,
		(() => {
			current_data = data;

			anim = current_data ? current_data.info : data.info;

			setContext('anime-detail-context', anim);
		})();

	let isReadMore = false;
</script>

<svelte:head>
	<title>{anim.title?.romaji} | Mikiflix</title>
</svelte:head>

<section>
	<div class="w-full h-72 relative">
		<div class="bg-black opacity-40 absolute w-full h-full" />
		<img class="object-cover w-full h-full bg-gray-700 border-0" src={anim.cover} alt="" />
	</div>
	<div class="flex justify-center w-full">
		<div class="w-screen relative container hidden lg:flex flex-col gap-4">
			<div class="flex flex-row gap-12 min-h-[24rem]">
				<div class="min-w-[18rem] relative">
					<AnimeCover {anim} />
				</div>
				<div
					class="relative pt-12 flex flex-col justify-between items-start gap-4 h-full w-full overflow-hidden pb-4"
				>
					<div class="flex items-baseline gap-2">
						<h1 class="">{anim.title?.romaji}</h1>
						<p class="text-sm">{anim.releaseDate}</p>
					</div>
					<div class="flex gap-4">
						{#each anim.genres ?? [] as genre}
							<span class="chip border-[1px] border-blue-700 bg-blue-600/20 text-blue-100"
								>{genre}</span
							>
						{/each}
					</div>
					<div
						class={`prose lg:prose-lg prose-p:text-white transition-all duration-500 ${
							!isReadMore ? `line-clamp-none` : `line-clamp-none`
						}`}
					>
						<SvelteMarkdown source={anim.description} />
					</div>
					<div class="pt-12 pb-4 w-full">
						<Tabs id={anim.id}/>
					</div>
				</div>
			</div>
			<div class="w-full flex gap-12">
				<div class="min-w-[18rem]  h-full border-white/10  rounded-md py-8">
					<AnimeDetails {anim} />
				</div>

				<div class="w-full">
					<slot />
				</div>
			</div>

			<div class=" w-screen relative container flex flex-col lg:hidden">
				<div class="absolute top-[-8rem] left-0 right-0 w-ful flex justify-center">
					<div
						class="cover max-w-[18rem] rounded-lg shadow-lg relative overflow-hidden z-10"
						data-flip-id={`img-${anim.id}-mob`}
					>
						<img
							class="max-w-[18rem] min-w-[18rem] h-[26rem] bg-gray-800"
							src={anim.image}
							alt={anim.title?.romaji}
						/>
					</div>
				</div>

				<div
					class="relative pt-80 flex flex-col items-center gap-4 h-full w-full overflow-hidden pb-4 px-8"
				>
					<h1 class="">{anim.title?.romaji}</h1>
					<div class="prose lg:prose-base prose-p:text-white">
						<SvelteMarkdown source={anim.description} />
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<style lang="postcss">
	h1 {
		@apply text-center font-semibold text-xl md:text-3xl;
	}

	.cover {
		width: 100%;
		display: block;
	}
</style>
