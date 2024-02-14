import { CONSUMET_API_BASE_URL } from "$lib/utils/constant";
import { error } from '@sveltejs/kit';

function animeProvider() {
    return
}

export const useAnime = () => {

    async function getRecentAnime() {
        try {
            const res = await fetch(CONSUMET_API_BASE_URL + 'meta/anilist/recent-episodes');

            if (!res.ok) {
                throw error(500, {
                    message: "Failed to Fetch Recent Anime Data, Please Try Again Later"
                })
            }

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

    }

    async function getDetailAnime(id: number) {

    }

    async function getStreamingLinks(id: number) {
    }


    return { getRecentAnime, getDetailAnime, getStreamingLinks, getTrendingAnime }
}