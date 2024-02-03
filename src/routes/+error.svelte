<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
</script>

<div class="pt-20 flex justify-center flex-col gap-4 items-center h-screen">
	<h1 class="text-2xl">{$page.status}: {$page.error?.message}</h1>
	{#if $page.status === 404}
		<button class="btn variant-filled-primary" on:click={() => goto('/')}>Home Page</button>
	{:else}
		<button class="btn variant-filled-primary" on:click={() => location.reload() }>Reload Page</button>
	{/if}
</div>
