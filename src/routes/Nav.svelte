<script lang="ts">
	let innerWidth: number;
</script>

<svelte:window bind:innerWidth />

<header class="header">
	<p class="header__logo">Logo</p>

	<nav class="navbar">
		<a href="/" class="navbar__link"
			><img
				class="navbar__icon"
				src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"
				alt=""
			/></a
		>
		<a href="/" class="navbar__link"
			><img
				class="navbar__icon"
				src="https://static.thenounproject.com/png/3165598-200.png"
				alt=""
			/></a
		>
		<a href="/" class="navbar__link"
			><img
				class="navbar__icon"
				src="https://cdn-icons-png.flaticon.com/512/4489/4489655.png"
				alt=""
			/></a
		>
	</nav>
</header>

<style>
	.header {
		display: flex;
		justify-content: space-between;
		width: 100%;
		border: blue 3px solid;
		/* height: 10vh; */
	}

	.header__logo {
		border: 2px green solid;
		font-size: 2rem;
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

	.navbar__icon {
		height: 48px;
		width: 48px;
	}
</style>
