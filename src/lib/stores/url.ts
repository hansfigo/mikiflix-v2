import { env } from '$env/dynamic/private';

export const apiUrl = env.USE_CUSTOM_API === 'true' ? '/api' : 'https://mikiflix-api.vercel.app/meta/anilist/'