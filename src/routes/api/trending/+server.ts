import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getPaginationParamsFromURL } from '$lib/server/PaginationParams';
import { anime } from '$lib/server/anime';

export const GET: RequestHandler = async ({url}) => {
    const { page, perPage } = getPaginationParamsFromURL(url)

    const { results, currentPage, hasNextPage, totalPages } = await anime.fetchTrendingAnime(page, perPage)

    return json({ currentPage, hasNextPage, perPage, totalPages, results });
};