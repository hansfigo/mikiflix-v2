<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import '@skeletonlabs/skeleton/styles/skeleton.css';

	import '../theme.css';
	import '../app.css';

	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
	import { Toast, storePopup } from '@skeletonlabs/skeleton';

	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });
</script>

<svelte:window class="overflow-x-hidden" />

<div class="flex flex-col min-h-screen h-full justify-between md xl-screen">
	<Toast />
	<Navbar />
	<slot />
	<Footer />
</div>

<style>
	@media (min-width: 1920px) {
		.xl-screen {
			height: 100vh;
		}
	}
</style>
