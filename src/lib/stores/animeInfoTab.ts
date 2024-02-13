import { writable } from "svelte/store";

export const isTabActiveStore = writable({
    overview : false,
    characters : false,
    episodes : false
})