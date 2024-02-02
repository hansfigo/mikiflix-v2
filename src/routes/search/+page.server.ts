import { generatePopupData } from '$lib/server/GetPopupData';
import { getParsedCacheData, redis } from '$lib/server/Redis';
import { apiUrl } from '$lib/stores/url';
import type { Anime, ApiCallResult } from '$lib/types/anime';
import { CONSUMET_ANILIST_URL } from '$lib/utils/constant';
import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url, fetch, setHeaders }) => {

    const query = url.searchParams.get('q')

    if (!query || query === '') {
        throw redirect(300, '/')
    }


    const getSearchedAnime = async (): Promise<ApiCallResult<Anime>> => {

        const cached = await redis.get(query)
        redis.del(query)

        if (cached) {
            console.log("CACHE HIT (search : ", query, ")");
            try {
                const data = JSON.parse(cached)
                return data
            } catch (err) {
                redis.del(query)
                throw error(500, {
                    message: "Error Occured Please Reload Page"
                })
            }

        }

        console.log("CACHE MISS (search : ", query, ")");

        // Fetch data from endpoint
        const res = await fetch(CONSUMET_ANILIST_URL + `${query}`)

        if (!res.ok) {
            console.log("Error");

            throw error(500, {
                message: "Error Occured Please Reload Page"
            })
        }

        const ttl = await redis.ttl(query);
        const cacheControlValue = `max-age=${ttl}`;

        const newHeaders = new Headers(res.headers);
        newHeaders.set('cache-control', cacheControlValue);




        try {
            const data = await res.json()

            console.log(data);



            redis.set(query, JSON.stringify(data), "EX", 600)

            return data
        } catch (err) {
            console.log("Error");

            redis.del(query)
            throw error(500, {
                message: "Error Occured Please Reload Page"
            })
        }


    }

    return {
        query: query,
        popup: generatePopupData(getSearchedAnime()),
        search: getSearchedAnime(),
    };
};