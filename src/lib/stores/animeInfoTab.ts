import type { AnimeInfo } from "$lib/types/anime";
import { writable } from "svelte/store";

export const isTabActiveStore = writable({
    overview : false,
    characters : false,
    episodes : false
})

export const animeDetailStore = writable<AnimeInfo>()