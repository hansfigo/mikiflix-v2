import { generatePopupData } from '$lib/server/GetPopupData';
import { redis } from '$lib/server/Redis';
import { useAnime } from '$lib/stores/anime';
import type { Anime, ApiCallResult, PopularAnime, RecentAnime } from '$lib/types/anime';
import { CONSUMET_API_BASE_URL } from '$lib/utils/constant';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ fetch }) => {

    const anime = useAnime()

    const getRecentAnime = async (): Promise<ApiCallResult<RecentAnime>> => {
        const cached = await redis.get('recent')

        if (cached) {
            const data = JSON.parse(cached)

            if (data.results) {
                return data
            }
        }

        try {
            const data = await anime.getRecentAnime()

            redis.set('recent', JSON.stringify(data), 'EX', 1800);

            return data;
        } catch (err) {
            redis.del('recent')
            throw error(500, {
                message: "Cache Problem, Please Refresh Page"
            })
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