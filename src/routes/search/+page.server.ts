import type { PageServerLoad } from './$types';
import type { Anime, ApiCallResult } from '$lib/types/anime';
import { redirect } from '@sveltejs/kit';
import { generatePopupData } from '$lib/server/GetPopupData';

export const load: PageServerLoad = async ({ url, fetch }) => {

    const query = url.searchParams.get('q')

    if (!query || query === '') {
        throw redirect(300, '/')
    }

    const getSearchedAnime = async (): Promise<ApiCallResult<Anime>> => {
        const res = await fetch(`/api/search/${query}`)
        return res.json()
    }
    return {
        query: query,
        popup : generatePopupData(getSearchedAnime()),
        search: getSearchedAnime(),
    };
};