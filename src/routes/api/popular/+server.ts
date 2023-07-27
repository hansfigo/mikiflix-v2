import { anime } from '$lib/server/anime';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getPaginationParamsFromURL } from '$lib/server/PaginationParams';

export const GET: RequestHandler = async ({ url }) => {
    // Get value from params
    const { page, perPage } = getPaginationParamsFromURL(url)

    //Get Anime Data
    const { results, currentPage, hasNextPage, totalPages } = await anime.fetchPopularAnime(page, perPage)

    return json({ currentPage, hasNextPage, perPage, totalPages, results });
};