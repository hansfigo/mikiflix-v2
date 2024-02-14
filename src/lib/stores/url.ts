import { env } from '$env/dynamic/private';

const vercelAPiUrl = 'https://mikiflix-api.vercel.app/meta/anilist/';
const railwayAPiUrl = 'https://consumet-api-production-e852.up.railway.app/meta/anilist';

export const apiUrl = env.USE_CUSTOM_API === 'true' ? '/api' : railwayAPiUrl;
