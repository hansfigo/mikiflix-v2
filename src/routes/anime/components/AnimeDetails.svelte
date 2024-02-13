<script lang="ts">
	import type { AnimeInfo } from '$lib/types/anime';

	export let anim: AnimeInfo;

	const animeDetail = [
		{
			title: 'Airing',
			value: 'Ep ' + anim.nextAiringEpisode?.episode
		},
		{
			title: 'Status',
			value: anim.status
		},
		{
			title: 'Season',
			value: anim.season
		},
		{
			title: 'Episodes',
			value: anim.totalEpisodes
		},
		{
			title: 'Episode Duration',
			value: anim.duration + ' mins'
		},
		{
			title: 'Start Date',
			value: `${anim.startDate?.day} ${anim.startDate?.month} ${anim.startDate?.year}`
		},
		{
			title: 'End Date',
			value: anim.endDate?.month
		},
		{
			title: 'Season',
			value: anim.season
		},
		{
			title: 'Popularity',
			value: anim.popularity
		},
		{
			title: 'Studio',
			value: anim.studios
		}
	];
</script>

<div class="text-left flex flex-col gap-4">
	{#each animeDetail as anime}
		<section>
			<h3>{anime.title}</h3>
			<p>{anime.value}</p>
		</section>
	{/each}
</div>

<style lang="postcss">
	h3 {
		@apply text-lg font-bold;
	}
	p {
		@apply text-lg;
	}
</style>
