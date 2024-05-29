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


export const GET: RequestHandler = async ({ params }) => {
	const { query } = params as Params;

	try {
		const anime = await fetch('https://mikiflix-api.vercel.app/anime/gogoanime/recent-episodes');

		const data = await anime.json();

		const res = data.results;
		
		return json(res);
	} catch (error) {
		const search = await fetch(
			'https://consumet-api-production-e852.up.railway.app/anime/search/' + query
		);
		const data = await search.json();
		const res = data.results;
		return json(res);
	}
};
