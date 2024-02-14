import type { AnimeInfo } from '$lib/types/anime';
import { derived, writable } from 'svelte/store';
interface Tab {
	text: 'overview' | 'characters' | 'episodes';
	href: string;
}

export const isTabActiveStore = writable({
	overview: false,
	characters: false,
	episodes: false
});

export const animeDetailStore = writable<AnimeInfo>();

export const animeDetail = derived(animeDetailStore, ($anim) => {
	return [
		{ title: 'Airing', value: 'Ep ' + $anim.nextAiringEpisode?.episode },
		{ title: 'Status', value: $anim.status },
		{ title: 'Season', value: $anim.season },
		{ title: 'Episodes', value: $anim.totalEpisodes },
		{ title: 'Episode Duration', value: $anim.duration + ' mins' },
		{
			title: 'Start Date',
			value: `${$anim.startDate?.day} ${$anim.startDate?.month} ${$anim.startDate?.year}`
		},
		{ title: 'End Date', value: $anim.endDate?.month },
		{ title: 'Popularity', value: $anim.popularity },
		{ title: 'Studio', value: $anim.studios }
	];
});

export const tabStore = derived(animeDetailStore, ($anim): Tab[] => {
	return [
		{ text: 'overview', href: `/anime/${$anim.id}` },
		{ text: 'characters', href: `/anime/characters/${$anim.id}` },
		{ text: 'episodes', href: `/anime/episodes/${$anim.id}` }
	];
});
