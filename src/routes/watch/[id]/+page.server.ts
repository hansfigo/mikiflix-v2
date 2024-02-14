import { useAnime } from "$lib/stores/anime";
import type { PageServerLoad } from "./$types";

const anime = useAnime()

export const load = (async ({ params }) => {

    const { id } = params

    const data = await anime.getStreamingLinks(id)

    return { episodes: data.sources };
}) satisfies PageServerLoad;