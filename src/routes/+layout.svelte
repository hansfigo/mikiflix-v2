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
	import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
	import { gsap } from 'gsap/dist/gsap';
	import { onMount } from 'svelte';
	import locomotiveScroll from '$lib/utils/locomotiveScroll';

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

	// onMount(async () => {
	// 	await locomotiveScroll();
	// });
</script>

<svelte:window class="overflow-x-hidden" />

<div
	class="flex flex-col h-screen justify-between md xl-screen overflow-scroll
"
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
