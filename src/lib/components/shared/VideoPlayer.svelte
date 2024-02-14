<!-- <script lang="ts">
	import { onMount } from 'svelte';
	import videojs from 'video.js';
	import 'video.js/dist/video-js.min.css';

	export let src: string;
	export let options: any;

	let player: any;

	console.log(src);

	onMount(() => {
		const videoEl = document.getElementById('video')!;
		player = videojs(videoEl, options);
		videoEl.classList.add('vjs-big-play-centered');
		player.src(src);
	});
</script>

<div>
	<video id="video" controls />
</div> -->

<script lang="ts">
	import '@videojs/themes/dist/sea/index.css';
	import { onDestroy, onMount } from 'svelte';
	import videojs from 'video.js';
	import 'video.js/dist/video-js.css';

	export let options: any;
	export let src: string;
	export let onReady: any;

	let videoRef: HTMLDivElement;
	let player: any;

	onMount(() => {
		// Create the video element
		const videoElement = document.createElement('video-js');

		videoElement.classList.add('vjs-theme-sea');
		videoRef.appendChild(videoElement);

		// Initialize Video.js player
		player = videojs(videoElement, options, () => {
			console.log('player is ready');
			onReady && onReady(player!);
		});

		// player.fluid(true);

		// Set video source
		player.src(src);
	});
</script>

<div bind:this={videoRef} data-vjs-player />

