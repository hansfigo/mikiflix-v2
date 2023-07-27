<script>
	import Navbar from '$lib/components/Navbar.svelte';
	import '@skeletonlabs/skeleton/styles/skeleton.css';
    
    import '../theme.css'
	import '../app.css';
</script>

<div>
	<Navbar />
	<slot />
</div>
