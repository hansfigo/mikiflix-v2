<script lang="ts">
	import type { Anime } from '$lib/types/anime';
	import { register } from 'swiper/element/bundle';
	import SvelteMarkdown from 'svelte-markdown';

	register();

	export let trendingAnime: Anime[];
</script>

<swiper-container
	slides-per-view={1}
	centered-slides={true}
	pagination={{
		hideOnClick: false,
		clickable: true
	}}
	breakpoints={{
		768: {
			slidesPerView: 1
		}
	}}
>
	{#each trendingAnime as anime, i}
		<swiper-slide lazy="true">
			<div class="h-[26rem] w-full relative">
				<div class="bg-black opacity-60 absolute w-full h-full z-10" />
				<div class="absolute z-10 bottom-24 left-4 sm:left-16 flex flex-col gap-2">
					<h1 class="text-lg md:text-2xl line-clamp-2 font-semibold md:max-w-xl">
						{anime.title?.romaji}
					</h1>
					<div
						class="prose lg:prose prose-p:text-white line-clamp-4 prose-p:md:text-sm prose-p:text-[12px]"
					>
						<SvelteMarkdown source={anime.description} />
					</div>
					<div class="h-8 w-12">
						<a href={`/anime/${anime.id}`}>
							<button class="btn variant-ghost-primary h-8 md:h-10 w-20 md:w-24"
								><p class="text-[12px] md:text-sm">Watch now</p></button
							>
						</a>
					</div>
				</div>
				<img class="object-cover h-[26rem] w-full relative" src={anime.cover} alt="" loading="lazy" />
			</div>
		</swiper-slide>
	{/each}
</swiper-container>
