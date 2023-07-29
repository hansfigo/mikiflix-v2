<script lang="ts">
	import type { PageData } from './$types';
	import SvelteMarkdown from 'svelte-markdown';

	export let data: PageData;

	const anim = data.info;
</script>

<svelte:head>
	<title>{anim.title?.romaji}</title>
</svelte:head>

<div>
	<div class="w-screen h-72 relative">
		<div class="bg-black opacity-40 absolute w-full h-full" />
		<img class="object-cover w-full h-full" src={anim.cover} alt="" />
	</div>
	<div class="flex justify-center w-full">
		<div class="w-screen relative container hidden flex-row lg:flex">
			<div class="absolute top-[-8rem] left-20 max-w-[18rem] flex rounded-md shadow-lg z-10">
				<div
					class="cover max-w-[18rem] rounded-lg shadow-lg relative overflow-hidden"
					data-flip-id={`img-${anim.id}`}
				>
					<img src={anim.image} alt={anim.title?.romaji} />
				</div>
			</div>
			<div class="min-w-[26rem]" />
			<div
				class="relative pt-12 flex flex-col items-start gap-4 h-full w-full overflow-hidden pb-4"
			>
				<div class="h-[50%] w-full absolute bg-gradient-to-t from-surface-600 bottom-0 z-0" />
				<h1 class="">{anim.title?.romaji}</h1>
				<div class="prose lg:prose-base prose-p:text-white">
					<SvelteMarkdown source={anim.description} />
				</div>
			</div>
		</div>

		<div class=" w-screen relative container flex flex-col lg:hidden">
			<div class="absolute top-[-8rem] left-0 right-0 w-ful flex justify-center">
				<div
					class="cover max-w-[18rem] rounded-lg shadow-lg relative overflow-hidden z-10"
					data-flip-id={`img-${anim.id}-mob`}
				>
					<img src={anim.image} alt={anim.title?.romaji} />
				</div>
			</div>

			<div
				class="relative pt-80 flex flex-col items-center gap-4 h-full w-full overflow-hidden pb-4 px-8"
			>
				<h1 class="">{anim.title?.romaji}</h1>
				<div class="prose lg:prose-base prose-p:text-white">
					<SvelteMarkdown source={anim.description} />
				</div>
			</div>
		</div>
	</div>
	<hr class="h-[2px] my-8 bg-surface-400 border-0" />
</div>

<style lang="postcss">
	h1 {
		@apply text-center font-semibold text-xl md:text-3xl;
	}

	.cover {
		width: 100%;
		display: block;
	}
</style>
