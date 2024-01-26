import { TMDB_API_KEY } from '$env/static/private';
import { TMDB_URI } from '$lib/utils/constant';
import { json } from '@sveltejs/kit';
import type { RequestHandler, RouteParams } from '../$types';

interface Params extends RouteParams {
    searchParams: string;
}

const API = {
    search: TMDB_URI + "/search/tv?query=",
    bg: TMDB_URI + "/tv",
};


async function getTMDBBgImage(id: number) {
    const res = await fetch(`${API.bg}/${id}/images`, {
        headers: {
            Authorization: `Bearer ${TMDB_API_KEY}`,
            accept: "application/json",
        },
    });
    const infoData = await res.json();
    return infoData;
}

const random = (arr: any[]) => {
    if (typeof arr === "undefined") return;
    return arr[Math.floor(Math.random() * arr.length)];
};

export const GET: RequestHandler = async ({ params }) => {
    const { searchParams } = params as Params;

    const res = await fetch(API.search + searchParams, {
        headers: {
            Authorization: `Bearer ${TMDB_API_KEY}`,
            accept: "application/json",
        },
    });

    const data = await res.json()

    const id: any = data.results[0].id

    const img = await getTMDBBgImage(id)

    return json(random(img.backdrops).file_path);
};