<script lang="ts">
	import { isTabActiveStore, tabStore } from '$lib/stores/animeInfoTab';

	function capitalizeFirstLetter(str: string) {
		return str.charAt(0).toUpperCase() + str.slice(1);
	}
</script>

<div class="flex w-full justify-between">
	{#each $tabStore as tab}
		<a class={$isTabActiveStore[tab.text] ? 'active' : ''} data-sveltekit-noscroll href={tab.href}
			>{capitalizeFirstLetter(tab.text)}</a
		>
	{/each}
</div>

<style lang="postcss">
	.active {
		@apply border-b-2 border-blue-700;
		transition: border-bottom-color 0.62s ease; /* Tambahkan transisi pada warna border-bottom */
	}

	a {
		@apply border-b-2 py-2 border-transparent md:text-lg font-semibold;
	}
</style>
