import { TMDB_API_KEY } from '$env/static/private';
import { TMDB_URI } from '$lib/utils/constant';
import { json, type RequestHandler } from '@sveltejs/kit';
import type { RouteParams } from './$types';

interface Params extends RouteParams {
    searchParams: string;
}

const API = {
    search: TMDB_URI + "/search/tv?query=",
    bg: TMDB_URI + "/tv",
};


async function getEpisodeList(id: number, season : number) {
    const res = await fetch(`${API.bg}/${id}/season/${season}`, {
        headers: {
            Authorization: `Bearer ${TMDB_API_KEY}`,
            accept: "application/json",
        },
    });
    const infoData = await res.json();
    return infoData;
}

export const GET: RequestHandler = async ({ params }) => {
    const { searchParams } = params;

    const res = await fetch(API.search + searchParams, {
        headers: {
            Authorization: `Bearer ${TMDB_API_KEY}`,
            accept: "application/json",
        },
    });

    const data = await res.json()

    const id: any = data.results[0].id

    const img = await getEpisodeList(id, 1)

    return json({ mama: "susu" });
};