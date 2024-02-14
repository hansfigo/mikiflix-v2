<script lang="ts">
	import { animeDetail } from '$lib/stores/animeInfoTab';
</script>

<div class="text-left flex flex-col gap-4">
	{#each $animeDetail as anime}
		<section>
			<h3>{anime.title}</h3>
			<p>{anime.value}</p>
		</section>
	{/each}
</div>

<style lang="postcss">
	h3 {
		@apply text-lg font-bold;
	}
	p {
		@apply text-lg;
	}
</style>
