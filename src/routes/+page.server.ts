import type { Anime, ApiCallResult, PopularAnime, RecentAnime } from '$lib/types/anime';
import type { PopupSettings } from '@skeletonlabs/skeleton';
import type { PageServerLoad } from './$types';
import { generatePopupData } from '$lib/server/GetPopupData';
import { redis } from '$lib/server/Redis';

export const load = (async ({ fetch }) => {

    const getRecentAnime = async (): Promise<ApiCallResult<RecentAnime>> => {
        const cached = await redis.get('recent')

        redis.del('recent')

        if (cached) {
            console.log("CACHE HIT (recent)");

            console.log("EEEEE",
                JSON.parse(cached)
            );

            return JSON.parse(cached);
        }

        console.log("CACHE MISS (recent)");

        let data
        try {
            const res = await fetch('/api/recent');
            data = await res.json();
        } catch (error) {
            console.log(error);
            
            const res = await fetch('https://api.consumet.org/meta/anilist/recent-episodes');
            data = await res.json();
            console.log("RECENT", data);
        }
   
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
        // await redis.del('trending')
        const cached = await redis.get('trending')

        redis.del('trending')


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