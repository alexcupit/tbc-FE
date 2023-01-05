<script>
	let audio;
	let play = true;
	const handlePlay = () => {
		if (!play) {
			audio.pause();
			play = true;
		} else {
			audio.play();
			play = false;
		}
	};
</script>

<svelte:head>
	<link
		href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css"
		rel="stylesheet"
	/>
</svelte:head>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
	id="start_stop"
	on:click={handlePlay}
	class="btn btn-outline btn-accent mt-5"
	style="opacity:0.7"
>
	<i class="fa-solid fa-play" />
	<i class="fa-solid fa-pause" />
	<audio
		src="https://github.com/felcard/portfolio/raw/master/pizza-survey/joakim.mp3"
		bind:this={audio}
	/>
	<div style="text-transform:lowercase">&nbsp; music by Joakim Karud</div>
</div>
