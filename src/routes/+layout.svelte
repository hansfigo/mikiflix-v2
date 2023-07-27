<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import '@skeletonlabs/skeleton/styles/skeleton.css';

	import '../theme.css';
	import '../app.css';

	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';

	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });

</script>


<div class="overflow-hidden">
	<Navbar />
	<slot />
	<Footer />
</div>
