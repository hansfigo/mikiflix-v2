import type { PageServerLoad } from './$types';
import type { AnimeInfo } from '$lib/types/anime';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params, fetch }) => {

    const id = params.slug

    console.log(id);

    if (!id || id === '') {
        throw redirect(300, '/')
    }

    const getAnimeInfo = async (): Promise<AnimeInfo> => {
        const res = await fetch(`/api/info/${id}`)
        return res.json()
    }
    return {
        id: id,
        info: getAnimeInfo(),
    };
};