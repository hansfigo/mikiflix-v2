import { json } from '@sveltejs/kit';
import type { RequestHandler, RouteParams } from '../$types';
import { anime } from '$lib/server/anime';
import { getPaginationParamsFromURL } from '$lib/server/PaginationParams';

interface Params extends RouteParams {
    query : string;
  }

export const GET: RequestHandler = async ({ url, params }) => {

    const { query } = params as Params

    const { page, perPage } = getPaginationParamsFromURL(url)

    const { results, currentPage, hasNextPage, totalPages } = await anime.search(query, page, perPage)

    return json({ currentPage, hasNextPage, perPage, totalPages, results });
};