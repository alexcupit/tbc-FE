<script lang="ts">
	import '.././global.css';
	import Nav from '../components/Nav.svelte';
	import Song from '../components/Song.svelte';
</script>

<div class="app">
	<Nav />
	<main class="main">
		<slot />
		<div class="song">
			<Song />
		</div>
	</main>
</div>

<style>
	.app {
		width: 100%;
		height: 100%;
	}

	.main {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		margin: 10 vh 5vw;
	}

	.song {
		align-self: flex-start;
		margin-left: 1.5rem;
	}

	@media only screen and (max-width: 600px) {
		.song {
			margin: 0;
			align-self: center;
		}
	}
</style>
