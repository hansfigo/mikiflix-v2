import type { PageServerLoad } from './$types';
import type { AnimeInfo } from '$lib/types/anime';
import { redirect } from '@sveltejs/kit';
import { redis } from '$lib/server/Redis';
import { apiUrl } from '$lib/stores/url';

export const load: PageServerLoad = async ({ params, fetch }) => {

    const id = params.slug

    if (!id || id === '') {
        throw redirect(300, '/')
    }

    const getAnimeInfo = async (): Promise<AnimeInfo> => {
        const cached = await redis.get(id)


        if (cached) {
            console.log("CACHE HIT (anime info : ", id, ")");

            return JSON.parse(cached)
        }

        console.log("CACHE MISS (anime info : ", id);

        const res = await fetch(apiUrl + `info/${id}`)

        const data = await res.json()

        redis.set(id, JSON.stringify(data), 'EX', 600)

        return data
    }
    return {
        id: id,
        info: getAnimeInfo(),
    };
};