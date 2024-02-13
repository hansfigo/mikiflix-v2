<script lang="ts">
	import { isTabActiveStore } from '$lib/stores/animeInfoTab';

	export let id: String;

	interface Tab {
		text: 'overview' | 'characters' | 'episodes';
		href: string;
	}

	const tabs: Tab[] = [
		{ text: 'overview', href: `/anime/${id}` },
		{ text: 'characters', href: `/anime/characters/${id}` },
		{ text: 'episodes', href: `/anime/episodes/${id}` }
	];
</script>

<div class="flex w-full justify-between">
	{#each tabs as tab}
		<a class={$isTabActiveStore[tab.text] ? 'active' : ''} data-sveltekit-noscroll href={tab.href}
			>{tab.text}</a
		>
	{/each}
</div>

<style lang="postcss">
	 .active {
        @apply border-b-2 border-blue-700;
        transition: border-bottom-color 0.62s ease; /* Tambahkan transisi pada warna border-bottom */
    }

    a {
        @apply border-b-2 py-2 border-transparent;
    }
</style>
