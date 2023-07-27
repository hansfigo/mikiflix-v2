<script lang="ts">
	import anime from '@consumet/extensions/dist/providers/anime';
	import { popup, type PopupSettings } from '@skeletonlabs/skeleton';

	export let popupData: PopupSettings;
	export let index: number;
	export let image: string;
	export let title: string;
	export let type: string;
	export let episodeNumber: string;
</script>

<div
	class="card card-hover w-40 variant-ghost-tertiary flex justify-center flex-col items-center"
	use:popup={popupData}
>
	<header class="card-header w-36">
		<img class="h-auto object-cover max-w-full" src={image} alt="Anime Cover" />
	</header>
	<section class="p-4 break-words text-xs">{title}</section>
</div>
<div class="card p-4 variant-ghost-tertiary text-white" data-popup={`popupHover${index}`}>
	<p>{type}</p>
	<p>Ep {episodeNumber}</p>
	<div class="arrow variant-filled-tertiary" />
</div>
