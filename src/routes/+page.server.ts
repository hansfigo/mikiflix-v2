import type { Anime, ApiCallResult, PopularAnime, RecentAnime } from '$lib/types/anime';
import type { PopupSettings } from '@skeletonlabs/skeleton';
import type { PageServerLoad } from './$types';

export const load = (async ({ fetch }) => {

    const getRecentAnime = async (): Promise<ApiCallResult<RecentAnime>> => {
        const res = await fetch('/api/recent')
        return res.json()
    }

    const getPopularAnime = async (): Promise<ApiCallResult<PopularAnime>> => {
        const res = await fetch('/api/popular')
        return res.json()
    }

    const getTrendingAnime = async (): Promise<ApiCallResult<Anime>> => {
        const res = await fetch('/api/trending')
        return res.json()
    }

    const getPopupData = async (): Promise<PopupSettings[]> => {
        const popups: PopupSettings[] = [];

        (await getPopularAnime()).results.map((e, i) => {
            const popup: PopupSettings = {
                event: 'hover',
                target: `popupHover${i}`,
                placement: 'right',
            };
            popups.push(popup)
        })

        return popups
    }

    return {
        recent: getRecentAnime(),
        popular: getPopularAnime(),
        trending : getTrendingAnime(),
        recentPopups: getPopupData()
    };
}) satisfies PageServerLoad;