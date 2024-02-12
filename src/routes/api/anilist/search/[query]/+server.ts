import { getPaginationParamsFromURL } from '$lib/server/PaginationParams';
import { anime } from '$lib/server/anime';
import { json, type RequestHandler } from '@sveltejs/kit';
import type { RouteParams } from './$types';

interface Params extends RouteParams {
  query: string;
}

export const GET: RequestHandler = async ({ url, params, setHeaders }) => {

  const { query } = params

  const { page, perPage } = getPaginationParamsFromURL(url)

  const { results, currentPage, hasNextPage, totalPages } = await anime.search(query!, page, perPage)

  setHeaders({
    "cache-control": "max-age=60",
  });

  return json({ currentPage, hasNextPage, perPage, totalPages, results });
};