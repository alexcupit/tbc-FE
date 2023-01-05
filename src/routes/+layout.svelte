<script lang="ts">
	import '.././global.css';
	import Nav from '../components/Nav.svelte';
</script>

<div class="app">
	<Nav />
	<main class="main">
		<slot />
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
		margin: 20vh 5vw;
	}
</style>
