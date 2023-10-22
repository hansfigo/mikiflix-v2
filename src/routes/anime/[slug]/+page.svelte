<script lang="ts">
	import type { AnimeInfo } from '$lib/types/anime';
	import type { PageData } from './$types';
	import SvelteMarkdown from 'svelte-markdown';
	import Tabs from './components/Tabs.svelte';
	import AnimeCover from './components/AnimeCover.svelte';
	import AnimeDetails from './components/AnimeDetails.svelte';
	import { goto } from '$app/navigation';
	import Relations from './components/Relations.svelte';
	import Characters from './components/Characters.svelte';
	import AnimeCard from './components/AnimeCard.svelte';
	import AlertUnderConstruction from './components/AlertUnderConstruction.svelte';

	export let data: PageData;

	let current_data;
	let anim: AnimeInfo;
	$: data,
		(() => {
			current_data = data;

			anim = current_data ? current_data.info : data.info;
		})();

	let isReadMore = false;
</script>

<svelte:head>
	<title>{anim.title?.romaji} | Mikiflix</title>
</svelte:head>

<div>
	<div class="absolute bottom-12 w-[30%] z-50">
		<AlertUnderConstruction />
	</div>
	<div class="w-screen h-72 relative border-2">
		<div class="bg-black opacity-40 absolute w-full h-full" />
		<img class="object-cover w-full h-full" src={anim.cover} alt="" />
	</div>
	<div class="flex justify-center w-full border-2">
		<div class="w-screen relative container hidden lg:flex flex-col border-red-200 border-2 gap-4">
			<div class="flex flex-row gap-12 min-h-[24rem]">
				<div class="min-w-[18rem] border-2 relative">
					<AnimeCover {anim} />
				</div>
				<div
					class="relative border-2 pt-12 flex flex-col justify-between items-start gap-4 h-full w-full overflow-hidden pb-4"
				>
					<div class="flex items-baseline gap-2">
						<h1 class="">{anim.title?.romaji}</h1>
						<p class="text-sm">{anim.releaseDate}</p>
					</div>
					<div class="flex gap-4">
						{#each anim.genres ?? [] as genre}
							<span class="chip variant-ghost-success">{genre}</span>
						{/each}
					</div>
					<div
						class={`prose lg:prose-lg prose-p:text-white transition-all duration-500 ${
							!isReadMore ? `line-clamp-none` : `line-clamp-none`
						}`}
					>
						<SvelteMarkdown source={anim.description} />
					</div>
					<div class="pt-12 pb-4 w-full border-2">
						<Tabs />
					</div>
				</div>
			</div>
			<div class="w-full border-2 flex gap-12">
				<div class="min-w-[18rem] border-2 h-full bg-slate-800 px-4 py-8">
					<AnimeDetails {anim} />
				</div>

				<div class="w-full border-2">
					<div>
						<h1>Trailer</h1>
						<iframe
							width="420"
							height="315"
							src={`https://www.youtube.com/embed/${anim.trailer?.id}`}
							title={anim.trailer?.id}
						/>
					</div>
					<Relations {anim} />
					<Characters {anim} />
					<section>
						<h1>Recomendation</h1>
						<div class="flex flex-wrap gap-6 justify-center items-center pt-8">
							{#if anim.recommendations}
								{#each anim.recommendations as recommend}
									<AnimeCard relation={recommend} />
								{/each}
							{/if}
						</div>
					</section>
				</div>
			</div>
		</div>

		<div class=" w-screen relative container flex flex-col lg:hidden">
			<div class="absolute top-[-8rem] left-0 right-0 w-ful flex justify-center">
				<div
					class="cover max-w-[18rem] rounded-lg shadow-lg relative overflow-hidden z-10"
					data-flip-id={`img-${anim.id}-mob`}
				>
					<img src={anim.image} alt={anim.title?.romaji} />
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

<style lang="postcss">
	h1 {
		@apply text-center font-semibold text-xl md:text-3xl;
	}
	h3 {
		@apply font-semibold;
	}

	.cover {
		width: 100%;
		display: block;
	}
	h2 {
		@apply text-xl font-medium;
	}
</style>
