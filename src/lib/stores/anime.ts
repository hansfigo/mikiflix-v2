import { CONSUMET_ANILIST_URL, CONSUMET_API_BASE_URL } from "$lib/utils/constant";
import { error } from '@sveltejs/kit';

const fetchData = async (url: string) => {
    try {
        const res = await fetch(url);
        const data = await res.json();

        return data;
    } catch (err) {
        console.error('Error fetching data:', err);
        throw error(500, {
            message: "Error Fetching Data on Server, Please Try Again Later"
        });
    }
};

export const useAnime = () => {
    const getRecentAnime = async () => {
        const url = `${CONSUMET_API_BASE_URL}meta/anilist/recent-episodes`;
        return fetchData(url);
    };

    const getTrendingAnime = async () => {
        const url = `${CONSUMET_API_BASE_URL}meta/anilist/popular`;
        return fetchData(url);
    };

    const getDetailAnime = async (id: number) => {
        const url = `${CONSUMET_ANILIST_URL}info/${id}`;
        return fetchData(url);
    };

    const getStreamingLinks = async (id: string) => {
        const url = `${CONSUMET_API_BASE_URL}meta/anilist/watch/${id}`;
        return fetchData(url);
    };

    return { getRecentAnime, getDetailAnime, getStreamingLinks, getTrendingAnime };
};
