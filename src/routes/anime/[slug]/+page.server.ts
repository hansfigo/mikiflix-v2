import type { PageServerLoad } from './$types';
import type { AnimeInfo } from '$lib/types/anime';
import { redirect } from '@sveltejs/kit';
import { redis } from '$lib/server/Redis';

export const load: PageServerLoad = async ({ params, fetch }) => {
    const id = params.slug;

    if (!id || id === '') {
        throw redirect(300, '/');
    }

    const originalApiUrl = `/api/info/${id}`;
    const fallbackApiUrl = `https://api.consumet.org/meta/anilist/info/${id}`;

    const getAnimeInfo = async (): Promise<AnimeInfo> => {
        // Membuat AbortController
        const controller = new AbortController();
        const { signal } = controller;

        // Set timeout 8 menit (480 detik)
        const timeout = 8000;

        let data

        try {
            const res = await fetch(originalApiUrl, { signal });
            data = await res.json();

            redis.set(id, JSON.stringify(data), 'EX', 600);

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
                        const data = await result.json();

                        redis.set(id, JSON.stringify(data), 'EX', 600);

                        return data;
                    }
                } catch (fallbackError) {
                    console.error('Terjadi kesalahan saat mencoba URL cadangan:', fallbackError);
                    throw new Error('Gagal mengambil data dari URL cadangan');
                }
            } else {
                // Tangani kesalahan lainnya
                console.error('Terjadi kesalahan saat mencoba URL asal:', error);
                throw new Error('Gagal mengambil data dari URL asal');
            }
        }
        return data
    };

    return {
        id: id,
        info: await getAnimeInfo(), // Pastikan untuk menunggu hasil dari getAnimeInfo()
    };
};
