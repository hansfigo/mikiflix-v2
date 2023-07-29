<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import '@skeletonlabs/skeleton/styles/skeleton.css';

	import '../theme.css';
	import '../app.css';

	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
	import { Toast, storePopup } from '@skeletonlabs/skeleton';

	import { afterNavigate, beforeNavigate } from '$app/navigation';

	import { Flip } from 'gsap/dist/Flip';
	import { gsap } from 'gsap/dist/gsap';

	gsap.registerPlugin(Flip);

	gsap.timeline()

	let state: Flip.FlipState;
	
	beforeNavigate(async () => {
		state = Flip.getState('.cover, .title');
	});

	afterNavigate(async () => {
		Flip.from(state, {
			targets: '.cover, .title',
			duration: 0.3,
			scale: true,
			ease: 'power1.easeInOut'
		});
	});

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
