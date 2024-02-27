<script lang="ts">
	import { navigating, page } from '$app/stores';
	import logo from '$lib/images/favicon.svg';
	import { ProgressBar } from '@skeletonlabs/skeleton';
	import { writable } from 'svelte/store';
	import SearchBar from './SearchBar.svelte';

	const y = writable(0);

	$: isHome = $page.route.id === '/' ? true : false;
	$: isNavbarShow = $y < 220 ? true : false;
</script>

<svelte:window bind:scrollY={$y} class="overflow-x-hidden" />

<nav
	class={$y === 0
		? `nav-top transition-all ease-in-out duration-500`
		: `nav-class transition-all ease-in-out duration-300`}
>
	{#if $navigating}
		<ProgressBar rounded={'rounded-none'} height={'h-[3px]'} />
	{/if}
	<div class="flex container items-center justify-between w-full px-8 md:px-0 py-3">
		<a href="/">
			<img class="h-8 w-8" src={logo} alt="" />
		</a>
		<div class="flex gap-4 items-center">
			<SearchBar />
		</div>
		<!-- <img class="h-8" src="ic-search.png" alt=""> -->
	</div>
</nav>

<style lang="postcss">
	.nav-class {
		@apply fixed bg-surface-800 w-screen z-20;
	}
	.nav-top {
		@apply fixed bg-surface-800/30 backdrop-blur-sm w-screen z-20;
	}

	nav{
		@apply flex flex-col items-center justify-center w-full
	}
</style>
