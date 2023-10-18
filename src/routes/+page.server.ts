import type { Anime, ApiCallResult, PopularAnime, RecentAnime } from '$lib/types/anime';
import type { PopupSettings } from '@skeletonlabs/skeleton';
import type { PageServerLoad } from './$types';
import { generatePopupData } from '$lib/server/GetPopupData';
import { redis } from '$lib/server/Redis';

export const load = (async ({ fetch }) => {

    const getRecentAnime = async (): Promise<ApiCallResult<RecentAnime>> => {
        const cached = await redis.get('recent');

        if (cached) {
            console.log("CACHE HIT (recent)");
            const data = JSON.parse(cached);

            console.log("EEEEE", data);

            if (data.results) {
                return data;
            }
        }

        console.log("CACHE MISS (recent)");

        let data;

        // Membuat AbortController
        const controller = new AbortController();
        const { signal } = controller;

        // Set timeout
        const timeout = 8000; // 8 detik

        // Fetch data with timeout
        try {
            const res = await fetch('/api/recent', { signal });
            data = await res.json();
        } catch (error: any) {
            console.log(error);

            // Jika waktu habis, ganti ke URL lain
            if (error.name === 'AbortError') {
                console.log("Timeout tercapai. Mengganti ke URL lain...");
                const secondRequest = fetch('https://api.consumet.org/meta/anilist/recent-episodes');

                // Menggunakan Promise.race untuk menangani timeout
                const timeoutPromise = new Promise((_, reject) =>
                    setTimeout(() => {
                        reject(new Error("Timeout tercapai"));
                        controller.abort();
                    }, timeout)
                );

                try {
                    const result = await Promise.race([secondRequest, timeoutPromise]);
                    if (result instanceof Response) {
                        data = await result.json();
                        console.log("RECENT", data);
                    }
                } catch (secondError) {
                    console.error('Terjadi kesalahan:', secondError);
                }
            } else {
                // Tangani kesalahan lainnya
                console.error('Terjadi kesalahan:', error);
            }
        }

        // Store the data in Redis with a TTL of 30 seconds
        redis.set('recent', JSON.stringify(data), 'EX', 1800);

        return data;
    };


    // const getPopularAnime = async (): Promise<ApiCallResult<PopularAnime>> => {
    //     const cached = await redis.get('popular');

    //     if (cached) {
    //         console.log("CACHE HIT (popular)");
    //         return JSON.parse(cached);
    //     }

    //     console.log("CACHE MISS (popular)");
    //     const res = await fetch('/api/popular');
    //     const data = await res.json();

    //     // Store the data in Redis with a TTL of 30 seconds
    //     redis.set('popular', JSON.stringify(data), 'EX', 1800);

    //     return data;
    // }

    const getTrendingAnime = async (): Promise<ApiCallResult<Anime>> => {
        const cached = await redis.get('trending');
        redis.del('trending');

        let data;

        if (cached) {
            console.log("CACHE HIT (trending)");
            data = JSON.parse(cached);

            console.log("EEEEE", data);

            if (data.results) {
                return data;
            }
        }

        console.log("CACHE MISS (trending)");

        const originalApiUrl = '/api/trending'; // URL asal
        const fallbackApiUrl = 'https://api-consumet-org-chi.vercel.app/meta/anilist/trending'; // URL cadangan

        // Membuat AbortController
        const controller = new AbortController();
        const { signal } = controller;

        // Set timeout
        const timeout = 8000;

        try {
            // Cobalah fetch ke URL asal
            const res = await fetch(originalApiUrl, { signal });
            data = await res.json();

            redis.set('trending', JSON.stringify(data), 'EX', 1800);

            return data;
        } catch (error: any) {
            console.log(error);

            // Jika waktu habis, coba fetch ke URL cadangan
            if (error.name === 'AbortError') {
                console.log("Timeout tercapai. Mencoba URL cadangan...");

                // Menggunakan Promise.race untuk menangani timeout
                const fallbackRequest = fetch(fallbackApiUrl);
                const timeoutPromise = new Promise((_, reject) =>
                    setTimeout(() => {
                        reject(new Error("Timeout tercapai"));
                        controller.abort();
                    }, timeout)
                );

                try {
                    const result = await Promise.race([fallbackRequest, timeoutPromise]);
                    if (result instanceof Response) {
                        data = await result.json();

                        redis.set('trending', JSON.stringify(data), 'EX', 1800);

                        return data;
                    }
                } catch (fallbackError) {
                    console.error('Terjadi kesalahan saat mencoba URL cadangan:', fallbackError);
                }
            } else {
                // Tangani kesalahan lainnya
                console.error('Terjadi kesalahan saat mencoba URL asal:', error);
            }
        }

        return data;
    };



    return {
        recent: getRecentAnime(),
        // popular: getPopularAnime(),
        trending: getTrendingAnime(),
        recentPopups: generatePopupData(getRecentAnime())
    };
}) satisfies PageServerLoad;