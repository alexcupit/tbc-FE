<script lang="ts">
	import '.././global.css';
	import Nav from '../components/Nav.svelte';
	import Song from '../components/Song.svelte';
</script>

<div class="app">
	<Nav />
	<main class="main">
		<slot />
	</main>
</div>
<Song />

<style>
	.app {
		width: 100%;
	}

	.main {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 80vh;
	}
</style>
