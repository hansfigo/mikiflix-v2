import type { AnimeInfo } from '$lib/types/anime';
import { derived, writable } from 'svelte/store';

function getMonthName(month: number): string {
	const months = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December',
	];
	return months[month - 1];
}
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
	const items = [];

	// Airing
	if ($anim.nextAiringEpisode?.episode) {
		items.push({ title: 'Airing', value: 'Ep ' + $anim.nextAiringEpisode?.episode });
	}

	// Status
	if ($anim.status) {
		items.push({ title: 'Status', value: $anim.status });
	}

	// Season
	if ($anim.season) {
		items.push({ title: 'Season', value: $anim.season });
	}

	// Episodes
	if ($anim.totalEpisodes) {
		items.push({ title: 'Episodes', value: $anim.totalEpisodes });
	}

	// Episode Duration
	if ($anim.duration) {
		items.push({ title: 'Episode Duration', value: $anim.duration + ' mins' });
	}

	// Start Date
	if ($anim.startDate) {
		items.push({
			title: 'Start Date',
			value: `${$anim.startDate?.day} ${getMonthName($anim.startDate?.month!)} ${$anim.startDate?.year}`,
		});
	}

	// End Date
	if ($anim.endDate?.day) {
		items.push({
			title: 'End Date',
			value: `${$anim.endDate?.day} ${getMonthName($anim.endDate?.month!)} ${$anim.endDate?.year}`,
		});
	}

	// Popularity
	if ($anim.popularity) {
		items.push({ title: 'Popularity', value: $anim.popularity });
	}

	// Studio
	if ($anim.studios) {
		items.push({ title: 'Studio', value: $anim.studios });
	}

	return items;
});

export const tabStore = derived(animeDetailStore, ($anim): Tab[] => {
	return [
		{ text: 'overview', href: `/anime/${$anim.id}` },
		{ text: 'characters', href: `/anime/characters/${$anim.id}` },
		{ text: 'episodes', href: `/anime/episodes/${$anim.id}` }
	];
});
