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
		hideOnClick: true
	}}
	breakpoints={{
		768: {
			slidesPerView: 1
		}
	}}
>
	{#each trendingAnime as anime, i}
		<swiper-slide>
			<div class="h-80 w-full relative">
				<div class="bg-black opacity-60 absolute w-full h-full" />
				<div class="absolute top-24 left-4 sm:left-16 flex flex-col gap-2">
					<h1 class="text-lg md:text-2xl font-semibold md:max-w-xl">{anime.title?.romaji}</h1>
                    <div class="prose lg:prose prose-p:text-white line-clamp-4 prose-p:md:text-sm prose-p:text-[12px]">
                        <SvelteMarkdown source={anime.description} />
                    </div>
					<!-- <p class="text-[6px] md:text-[8px] max-w-xs md:max-w-md break-words line-clamp-4">
						{anime.description}
					</p> -->
					<div class="h-8 w-12">
						<button class="btn variant-ghost-primary h-8 md:h-10 w-20 md:w-24"
							><p class="text-[12px] md:text-sm">Watch now</p></button
						>
					</div>
				</div>
				<img class="object-cover h-80 w-full" src={anime.cover} alt="" loading="lazy" />
			</div>
		</swiper-slide>
	{/each}
</swiper-container>
