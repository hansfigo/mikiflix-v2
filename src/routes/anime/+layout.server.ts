import { redis } from '$lib/server/Redis';
import { apiUrl } from '$lib/stores/url';
import type { AnimeInfo } from '$lib/types/anime';
import { CONSUMET_ANILIST_URL } from '$lib/utils/constant';
import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ params, fetch }) => {

    const id = params.id

    if (!id || id === '') {
        throw redirect(300, '/')
    }

    const getAnimeInfo = async (): Promise<AnimeInfo> => {
        const cached = await redis.get(id)

        if (cached) {
            console.log("CACHE HIT (anime info : ", id, ")");
        }

        console.log("CACHE MISS (anime info : ", id);

        const res = await fetch(CONSUMET_ANILIST_URL + `info/${id}`)

        const data = await res.json()

        redis.set(id, JSON.stringify(data), 'EX', 600)

        return data
    }
    return {
        id: id,
        info: getAnimeInfo(),
    };
};