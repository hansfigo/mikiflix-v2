import type { Anime, ApiCallResult, PopularAnime, RecentAnime } from '$lib/types/anime';
import type { PopupSettings } from '@skeletonlabs/skeleton';
import type { PageServerLoad } from './$types';
import { generatePopupData } from '$lib/server/GetPopupData';
import { redis } from '$lib/server/Redis';

export const load = (async ({ fetch }) => {

    const getRecentAnime = async (): Promise<ApiCallResult<RecentAnime>> => {
        const cached = await redis.get('recent')

        if (cached) {
            console.log("CACHE HIT (recent)");
            return JSON.parse(cached);
        }

        console.log("CACHE MISS (recent)");
        const res = await fetch('/api/recent');
        const data = await res.json();

        // Store the data in Redis with a TTL of 30 seconds
        redis.set('recent', JSON.stringify(data), 'EX', 1800);

        return data;
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
        const cached = await redis.get('trending')

        if (cached) {
            console.log("CACHE HIT (trending)");
            return JSON.parse(cached)
        }

        console.log("CACHE MISS (trending)");

        const res = await fetch('/api/trending')
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