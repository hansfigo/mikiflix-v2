import { generatePopupData } from '$lib/server/GetPopupData';
import { redis } from '$lib/server/Redis';
import { apiUrl } from '$lib/stores/url';
import type { Anime, ApiCallResult, PopularAnime, RecentAnime } from '$lib/types/anime';
import { CONSUMET_API_BASE_URL } from '$lib/utils/constant';
import type { PopupSettings } from '@skeletonlabs/skeleton';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ fetch }) => {

    const getRecentAnime = async (): Promise<ApiCallResult<RecentAnime>> => {
        const cached = await redis.get('recent')

        if (cached) {
            const data = JSON.parse(cached)

            if (data.results) {
                return data
            }
        }

        let data

        try {

            const res = await fetch(CONSUMET_API_BASE_URL + 'meta/anilist' + '/recent-episodes');

            try {
                data = await res.json();

                redis.set('recent', JSON.stringify(data), 'EX', 1800);

                return data;
            } catch (err) {
                redis.del('recent')
                throw error(500, {
                    message: "Cache Problem, Please Refresh Page"
                })
            }
        } catch (err) {
            // console.log(err,toString());

            throw error(500, {
                message: "Error Fething Data on Server, Please Again Later"
            })

            // const res = await fetch('https://api.consumet.org/meta/anilist/recent-episodes');
            // data = await res.json();
            // console.log("RECENT", data);
        }

    }

    // const getPopularAnime = async (): Promise<ApiCallResult<PopularAnime>> => {
    //     const cached = await redis.get('popular');

    //     if (cached) {
    //         console.log("CACHE HIT (popular)");
    //         return JSON.parse(cached);
    //     }

    //     console.log("CACHE MISS (popular)");
    //     const res = await fetch('/api/popular');
    //     const data = await res.json();

    //     // Store the data in Redis with a TTL of 30 seconds
    //     redis.set('popular', JSON.stringify(data), 'EX', 1800);

    //     return data;
    // }

    const getTrendingAnime = async (): Promise<ApiCallResult<Anime>> => {
        redis.del('trending')

        const cached = await redis.get('trending')

        if (cached) {
            const data = JSON.parse(cached)

            if (data.results) {
                return data
            }
        }

        const res = await fetch(CONSUMET_API_BASE_URL + 'meta/anilist' + '/popular')
        const data = await res.json();

        redis.set('trending', JSON.stringify(data), 'EX', 1800);

        return data
    }

    return {
        recent: getRecentAnime(),
        // popular: getPopularAnime(),
        trending: getTrendingAnime(),
        recentPopups: generatePopupData(getRecentAnime())
    };
}) satisfies PageServerLoad;