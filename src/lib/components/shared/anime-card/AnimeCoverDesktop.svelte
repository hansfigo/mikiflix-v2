<script lang="ts">
	import type { Anime } from '$lib/types/anime';

	export let anim: Anime;

	const resizeImage = (img : string | undefined) => {
		function urlParser(oldUrl: string): string {
			// Menggunakan encodeURIComponent() untuk mengkodekan karakter khusus
			const encodedUrl = encodeURIComponent(oldUrl);
			// Menambahkan parameter ?width=300 ke akhir URL
			const newUrl = encodedUrl + '?width=300';
			return newUrl;
		}
		const url = `https://imagecdn.app/v2/image/${urlParser(img!)}?width=200`;
		return url;
	};
</script>

<div class="cover relative w-full h-full hidden md:block" data-flip-id={`img-${anim.id}`}>
	<section class="absolute h-full w-full bg-gradient-to-t from-surface-600 opacity-80" />
	<img class="rounded-lg bg-gray-800 min-h-[14rem]" src={resizeImage(anim.image)} alt="Anime Cover" />
</div>

<style>
	.cover {
		width: 100%;
		border-radius: 0.5rem;
		max-width: 100%;
	}
</style>
