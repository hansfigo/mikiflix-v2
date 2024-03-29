import { getPaginationParamsFromURL } from '$lib/server/PaginationParams';
import { anime } from '$lib/server/anime';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url }) => {
	const { page, perPage } = getPaginationParamsFromURL(url);

	try {
		const { results, currentPage, hasNextPage, totalPages } = await anime.fetchRecentEpisodes();
		return json({ currentPage, hasNextPage, perPage, totalPages, results });
	} catch (error) {
		return json({ error: error });
		// const res = await fetch('https://api.consumet.org/meta/anilist/recent-episodes');
		// const data = await res.json();
		// return json({ currentPage: data.currentPage, hasNextPage: data.hasNextPage, perPage, totalPages: data.totalPages, results: data.results });
	}
};
