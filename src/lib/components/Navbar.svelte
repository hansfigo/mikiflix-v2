<script lang="ts">
	import { goto } from '$app/navigation';
	import { navigating } from '$app/stores';
	import { toastStore, type ToastSettings, ProgressBar } from '@skeletonlabs/skeleton';
	import { writable } from 'svelte/store';
	import { page } from '$app/stores';

	const y = writable(0);

	const input = writable('');

	const errorToast: ToastSettings = {
		message: 'Input tidak boleh kosong'
	};

	const handleSearch = () => {
		if (!$input || $input === ' ') {
			input.set('');
			toastStore.trigger(errorToast);
			return;
		}

		goto(`/search?q=${$input}`);
		input.set('');
	};

	$: isHome = $page.route.id === '/' ? true : false;
	$: isNavbarShow = $y < 220 ? true : false;

	console.log(isNavbarShow);
	
</script>

<svelte:window bind:scrollY={$y} />

<nav
	class={$y === 0
		? `nav-top transition-all ease-in-out duration-500`
		: `nav-class transition-all ease-in-out duration-300`}
>
	<div class="flex items-center justify-between w-full px-8 py-3">
		<a href="/">
			<img class="h-8 w-8" src="favicon.svg" alt="" />
		</a>
		<form on:submit|preventDefault={() => handleSearch()}>
			<input
				bind:value={$input}
				class="input variant-glass-secondary w-44"
				title="Input (text)"
				type="text"
				placeholder="search anime"
			/>
		</form>
	</div>
	{#if $navigating }
		{#if isHome && isNavbarShow }
			<ProgressBar rounded={'rounded-none'} height={'h-[0.5px]'} />
		{/if}
		<ProgressBar rounded={'rounded-none'} height={'h-[3px]'} />
	{/if}
</nav>

<style>
	.nav-class {
		@apply fixed  bg-surface-800 w-screen z-20 border-b-[1px] border-secondary-800;
	}
	.nav-top {
		@apply fixed  bg-transparent w-screen z-20  border-b-[0px] border-secondary-800;
	}
</style>
