<script lang="ts">
	import Hamburger from 'hamburger-menu-svelte';
	const menu_list = [{ name: 'Leaderboard', url: '/' }];
	let innerWidth: number;
</script>

<svelte:window bind:innerWidth />

<header class="header">
	<p class="header__logo">Logo</p>

	<nav class="navbar">
		{#if innerWidth <= 425}
			<Hamburger {menu_list} />
		{:else}
			<a href="/" class="navbar__link">Leaderboard</a>
			<a href="/" class="navbar__link">How to play</a>
			<a href="/" class="navbar__link">Log in</a>
		{/if}
	</nav>
</header>

<style>
	.header {
		display: flex;
		justify-content: space-between;
		width: 100vw;
		border: blue 3px solid;
	}

	.header__logo {
		border: 2px green solid;
		height: 100%;
	}

	.navbar {
		border: 2px solid black;
		display: flex;
		align-items: center;
	}

	.navbar__link {
		margin: 0 5px;
		border: black 1px solid;
	}
</style>
