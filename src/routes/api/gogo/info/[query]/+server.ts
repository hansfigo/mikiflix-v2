import { gogo } from '$lib/server/anime';
import { GOGO_URI } from '$lib/utils/constant';
import { json } from '@sveltejs/kit';
import type { RequestHandler, RouteParams } from './$types';

interface Params extends RouteParams {
	query: string;
}

const API = {
	search: GOGO_URI,
	info: GOGO_URI + 'info/'
};

const getAnimeId = async (query: string) => {
	const search = await fetch(API.search + query);
	const data = await search.json();

	return data.results[0].id;
};

const getAnimeInfo = async (id: string) => {
	const search = await fetch(API.info + `${id}`);
	const data = await search.json();
	return data;
};

export const GET: RequestHandler = async ({ params }) => {
	const { query } = params as Params;

	try {
		const id = await gogo.search(query);

		console.log(id);

		// const id = await getAnimeId(query)
		// const animeInfoRes = await getAnimeInfo(id)

		return json(id);
	} catch (error) {
		const search = await fetch(
			'https://consumet-api-production-e852.up.railway.app/anime/search/' + query
		);
		const data = await search.json();
		const res = data.results;
		return json(res);
	}
};
