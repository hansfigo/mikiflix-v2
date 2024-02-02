<script lang="ts">
	import Footer from '$lib/components/Footer.svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	import '@skeletonlabs/skeleton/styles/skeleton.css';

	import '../app.css';
	import '../theme.css';

	import { arrow, autoUpdate, computePosition, flip, offset, shift } from '@floating-ui/dom';
	import { Toast, storePopup } from '@skeletonlabs/skeleton';

	import { afterNavigate, beforeNavigate } from '$app/navigation';

	import locomotiveScroll from '$lib/utils/locomotiveScroll';
	import { Flip } from 'gsap/dist/Flip';
	import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
	import { gsap } from 'gsap/dist/gsap';

	gsap.registerPlugin(Flip, ScrollTrigger);

	gsap.timeline();

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

<svelte:window class="overflow-hidden" />

<div
	class="flex flex-col h-screen justify-between md xl-screen"
	data-scroll-container
>
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
