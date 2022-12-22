<script lang="ts">
	import Nav from './Nav.svelte';
</script>

<div class="app">
	<Nav />
	<main class="main">
		<slot />
	</main>
</div>

<style>
	.app {
		width: 100vw;
	}

	.main {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 80vh;
	}
</style>
