<script lang="ts">
	import { goto } from '$app/navigation';
	import { toastStore, type ToastSettings } from '@skeletonlabs/skeleton';
	import { writable } from 'svelte/store';

	const input = writable('');

	input.set('');

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
	};
</script>

<form on:submit|preventDefault={() => handleSearch()}>
	<input
		bind:value={$input}
		class={`input variant-ghost-tertiary text-white w-44 h-10 md:h-full`}
		title="Input (text)"
		type="text"
		placeholder="search anime"
	/>
</form>

<style>
	input::placeholder {
		/* Chrome, Firefox, Opera, Safari 10.1+ */
		color: white !important;
		opacity: 1; /* Firefox */
	}
</style>
