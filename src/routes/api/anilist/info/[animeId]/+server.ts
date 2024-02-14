import { json } from '@sveltejs/kit';
import type { RequestHandler, RouteParams } from './$types';
import { anime } from '$lib/server/anime';

interface Params extends RouteParams {
	query: string;
}

export const GET: RequestHandler = async ({ url, params }) => {
	const { animeId } = params as Params;

	const data = await anime.fetchAnimeInfo(animeId);

	return json(data);
};
