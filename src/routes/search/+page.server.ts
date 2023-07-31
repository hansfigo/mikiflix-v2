import type { PageServerLoad } from './$types';
import type { Anime, ApiCallResult } from '$lib/types/anime';
import { redirect } from '@sveltejs/kit';
import { generatePopupData } from '$lib/server/GetPopupData';
import { getParsedCacheData, redis } from '$lib/server/Redis';

export const load: PageServerLoad = async ({ url, fetch, setHeaders }) => {

    const query = url.searchParams.get('q')

    if (!query || query === '') {
        throw redirect(300, '/')
    }


    const getSearchedAnime = async (): Promise<ApiCallResult<Anime>> => {

        const cached = await redis.get(query)

        if (cached) {
            console.log("CACHE HIT (search : ", query, ")");

            return JSON.parse(cached)

        }

        console.log("CACHE MISS (search : ", query, ")" );

        // Fetch data from endpoint
        const res = await fetch(`/api/search/${query}`)

        const ttl = await redis.ttl(query);
        res.headers.set('cache-control', `max-age=${ttl}`);

        const data = await res.json()

        redis.set(query, JSON.stringify(data), "EX", 600)

        return data
    }

    return {
        query: query,
        popup: generatePopupData(getSearchedAnime()),
        search: getSearchedAnime(),
    };
};