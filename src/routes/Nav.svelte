<script lang="ts">
	import { Link } from "svelte-navigator";
	let innerWidth: number;
	import userStore from "../stores/userStore"
	let  user: object;
	userStore.subscribe((data) => {
		user = data
	}) 
</script>

<svelte:window bind:innerWidth />

<header class="header">
	<p class="header__logo">Logo</p>

	<nav class="navbar">
		{#if !user.isLoggedIn}
			<a href="/login">Login</a>
		{:else}
			<a href="/profile">profile</a>
		{/if}
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
		<a href="/leaderboards" class="navbar__link"
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
		border: blue 3px solid;
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
		height: 48px;
		width: 48px;
	}

	.navbar__icon {
		height: 100%;
		width: 100%;
	}
</style>
