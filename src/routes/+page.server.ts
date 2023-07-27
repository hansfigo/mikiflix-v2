import type { ApiCallResult, PopularAnime, RecentAnime } from '$lib/types/anime';
import type { PageServerLoad } from './$types';

export const load = (async ({fetch}) => {

    const getRecentAnime = async (): Promise<ApiCallResult<RecentAnime>> => {
        const res = await fetch('/api/recent')
        return res.json()
    }

    const getPopularAnime = async (): Promise<ApiCallResult<PopularAnime>> => {
        const res = await fetch('/api/popular')
        return res.json()
    }

    return {
        recent: getRecentAnime(),
        popular: getPopularAnime()
    };
}) satisfies PageServerLoad;