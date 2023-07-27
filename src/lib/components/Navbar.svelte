<script lang>
	import { writable } from "svelte/store";

	const y = writable(0)

	if ($y === 0) {
		console.log('XXX');
	}

</script>

<svelte:window bind:scrollY={$y} />

<nav class={$y === 0 ? `nav-top transition-all ease-in-out duration-500` : `nav-class transition-all ease-in-out duration-300`}>
	<img class="h-8 w-8" src="favicon.svg" alt="" />
	<div />
</nav>

<style>
	.nav-class {
		@apply fixed flex items-center bg-surface-800 w-full z-20 border-b-[1px] border-tertiary-800 py-3 px-8;
	}
	.nav-top {
		@apply fixed flex items-center bg-transparent w-full z-20  border-b-[0px] border-tertiary-800 py-3 px-8;
	}
</style>
