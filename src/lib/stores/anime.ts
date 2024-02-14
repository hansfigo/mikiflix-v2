import { CONSUMET_API_BASE_URL } from "$lib/utils/constant";
import { error } from '@sveltejs/kit';

// function animeProvider() {
//     return
// }

export const useAnime = () => {

    async function getRecentAnime() {
        try {
            const res = await fetch(`${CONSUMET_API_BASE_URL}meta/anilist/recent-episodes`);
            const data = await res.json();

            return data;
        } catch (err) {
            console.error('Error fetching recent anime:', err);
            throw error(500, {
                message: "Error Fething Data on Server, Please Try Again Later"
            })
        }
    }

    async function getTrendingAnime() {
        try {
            const res = await fetch(`${CONSUMET_API_BASE_URL}meta/anilist/popular`);
            const data = await res.json();

            return data;
        } catch (err) {
            console.error('Error fetching recent anime:', err);
            throw error(500, {
                message: "Error Fething Data on Server, Please Try Again Later"
            })
        }
    }

    async function getDetailAnime(id: number) {
        try {
            const res = await fetch(`${CONSUMET_API_BASE_URL}meta/anilist/recent-episodes`);
            const data = await res.json();

            return data;
        } catch (err) {
            console.error('Error fetching recent anime:', err);
            throw error(500, {
                message: "Error Fething Data on Server, Please Try Again Later"
            })
        }
    }

    async function getStreamingLinks(id: number) {
        try {
            const res = await fetch(`${CONSUMET_API_BASE_URL}meta/anilist/watch/${id}`);
            const data = await res.json();

            return data;
        } catch (err) {
            console.error('Error fetching recent anime:', err);
            throw error(500, {
                message: "Error Fething Data on Server, Please Try Again Later"
            })
        }
    }

    return { getRecentAnime, getDetailAnime, getStreamingLinks, getTrendingAnime }
}