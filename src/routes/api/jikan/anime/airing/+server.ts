import { JIKAN_API_URL } from '$lib/utils/constant';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {

    const res = await fetch(JIKAN_API_URL + "top/anime?filter=airing&limit=10")

    const data = await res.json()

    return json(data);
};