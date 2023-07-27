<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import '@skeletonlabs/skeleton/styles/skeleton.css';

	import '../theme.css';
	import '../app.css';

	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';

	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });

	let y : number;
</script>

<svelte:window bind:scrollY={y} />

<div class="overflow-hidden">
	<Navbar />
	<slot />
	<Footer />
</div>
