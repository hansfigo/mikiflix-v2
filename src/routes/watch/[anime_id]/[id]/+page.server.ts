import { useAnime } from "$lib/stores/anime";
import type { AnimeInfo } from "$lib/types/anime";
import type { PageServerLoad } from "./$types";

const anime = useAnime()

export const load = (async ({ params }) => {

    const { id, anime_id } = params

    const data = await anime.getStreamingLinks(id)

    const animeData : AnimeInfo = await anime.getDetailAnime(anime_id)

    return { episodes: data.sources, animeData: animeData };
}) satisfies PageServerLoad;