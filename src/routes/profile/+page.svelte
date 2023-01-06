<script lang="ts">
	import userStore from '../../stores/userStore';
	import { onMount } from 'svelte';
	import { fetchUser, postLeaderBoard, updateUser, patchLeaderBoard } from '../../api';
	import { achievements } from './achievements';
	import Badge from '../../components/Badge.svelte';
	import FormInput from '../../components/FormInput.svelte';
	import { goto } from '$app/navigation';
	console.log(achievements);
	let user;
	let userStats;
	let leaderboards;
	let value = '';
	let addToLeaderboard = false;
	let [year, month, day] = [];
	userStore.subscribe((data) => (user = data));
	onMount(async () => {
		userStats = await fetchUser(user.userId);
		[year, month, day] = userStats.dateLastPlayed.split('-');

		leaderboards = [...userStats.leaderBoards];
	});

	const submitHandleSingUp = async () => {
		console.log('creating leaderboard', value);
		if (!value) {
			addToLeaderboard = false;
			return '';
		}
		const body = { leaderboardName: value };
		const body2 = {
			leaderBoards: {
				leaderBoard: value,
				addTo: true
			}
		};
		const newLeaderboard = await postLeaderBoard(body);
		const updatedUser = await updateUser(user.userId, body2);
		const addLeaderMemerber = await patchLeaderBoard(value, {
			username: user.username,
			todayStats: JSON.parse(localStorage.todayStats)
		});
		addToLeaderboard = false;
		leaderboards = [...leaderboards, value];
		value = '';
	};
	const deleteLeaderboard = async (name) => {
		const index = leaderboards.indexOf(name);
		console.log(index);
		const body = {
			leaderBoards: {
				leaderBoard: name,
				addTo: false
			}
		};

		const updatedUser = await updateUser(user.userId, body);
		leaderboards.splice(index, 1);
		leaderboards = leaderboards;
	};
	const logout = async () => {
		userStore.update((user) => {
			(user.isLoggedIn = false), (user.username = ''), (user.userId = ''), (user.photoURL = '');
			return user;
		});
		localStorage.removeItem('user');
		goto('/');
	};
</script>

{#if userStats}
	<div class="account">
		<div class="profile">
			<img src={user.photoURL} alt="profile picture" />
			<div>
				<br />
				<p class="text-center">{userStats.username}</p>
				<br />
				{#if userStats.dateLastPlayed}
					<p class="text-center">last played on</p>
					<p class="text-center">{day} - {month} - {year}</p>
				{/if}
				<br />
			</div>
		</div>
		<div class="stats">
			<div class="today">
				<h1>{userStats.todayStats.score}</h1>
				<p>today's score</p>
			</div>
			<div class="current">
				<h1>{userStats.currentStreak}</h1>
				<p>current streak</p>
			</div>
			<div class="max">
				<h1>{userStats.highestScore}</h1>
				<p>high score</p>
			</div>
		</div>
		<br />
		<h2>achievements</h2>
		<div class="achiements-container">
			{#each achievements as badge}
				<div class="achievement">
					<Badge {badge} locked={!userStats.achievements.includes(badge.type)} />
				</div>
			{/each}
		</div>
		<br />
		<h2>leaderboards</h2>
		<div class="leaderboards-container">
			<div class="leaderboards">
				{#each leaderboards as leaderboard}
					<a href={`/leaderboards/${leaderboard}`}>
						<div class="badge badge-lg badge-accent">{leaderboard}</div>
					</a>
					{#if addToLeaderboard}
						<span on:click={deleteLeaderboard(leaderboard)}>✖️</span>
					{/if}
				{/each}
			</div>
			<div class="add-to-leaderboard">
				{#if !addToLeaderboard}
					<span class="" on:click={(e) => (addToLeaderboard = true)}
						><svg
							height="40"
							width="40"
							viewBox="0 0 512 512"
							xmlns="http://www.w3.org/2000/svg"
							xmlns:xlink="http://www.w3.org/1999/xlink"
							><linearGradient
								id="a"
								gradientTransform="matrix(1 0 0 -1 0 -16402)"
								gradientUnits="userSpaceOnUse"
								x1="0"
								x2="512"
								y1="-16658"
								y2="-16658"
								><stop offset="0" stop-color="#31d8ff" /><stop
									offset="1"
									stop-color="#ff80ff"
								/></linearGradient
							><path
								d="m512 256c0 141.386719-114.613281 256-256 256s-256-114.613281-256-256 114.613281-256 256-256 256 114.613281 256 256zm0 0"
								fill="url(#a)"
							/><g fill="#fff"
								><path
									d="m256 56c-8.285156 0-15 6.714844-15 15s6.714844 15 15 15c93.738281 0 170 76.261719 170 170s-76.261719 170-170 170-170-76.261719-170-170c0-8.285156-6.714844-15-15-15s-15 6.714844-15 15c0 110.28125 89.71875 200 200 200s200-89.71875 200-200-89.71875-200-200-200zm0 0"
								/><path
									d="m175.070312 104.285156c1.914063 0 3.855469-.367187 5.734376-1.144531l20.277343-8.398437c7.652344-3.171876 11.289063-11.945313 8.117188-19.601563-3.167969-7.652344-11.945313-11.285156-19.597657-8.117187l-20.277343 8.398437c-7.652344 3.171875-11.289063 11.945313-8.121094 19.601563 2.394531 5.777343 7.980469 9.261718 13.867187 9.261718zm0 0"
								/><path
									d="m117.425781 147.945312c3.839844 0 7.675781-1.464843 10.605469-4.394531l15.519531-15.519531c5.859375-5.859375 5.859375-15.355469 0-21.214844-5.855469-5.855468-15.355469-5.855468-21.210937 0l-15.523438 15.523438c-5.855468 5.855468-5.855468 15.351562 0 21.210937 2.929688 2.929688 6.769532 4.394531 10.609375 4.394531zm0 0"
								/><path
									d="m75.144531 209.199219c1.875.777343 3.820313 1.148437 5.734375 1.148437 5.882813 0 11.46875-3.488281 13.863282-9.265625l8.398437-20.277343c3.167969-7.652344-.464844-16.429688-8.117187-19.597657-7.65625-3.171875-16.429688.464844-19.601563 8.117188l-8.398437 20.277343c-3.167969 7.65625.464843 16.429688 8.121093 19.597657zm0 0"
								/><path
									d="m256 178.289062c-8.285156 0-15 6.714844-15 15v47.710938h-47.710938c-8.285156 0-15 6.714844-15 15s6.714844 15 15 15h47.710938v47.710938c0 8.285156 6.714844 15 15 15s15-6.714844 15-15v-47.710938h47.710938c8.285156 0 15-6.714844 15-15s-6.714844-15-15-15h-47.710938v-47.710938c0-8.285156-6.714844-15-15-15zm0 0"
								/></g
							></svg
						></span
					>
				{/if}
				{#if addToLeaderboard}
					<form on:submit|preventDefault={submitHandleSingUp}>
						<label>
							<input
								class="input input-bordered input-sm w-full max-w-xs"
								type="text"
								on:change={(e) => {
									value = e.target.value;
								}}
								{value}
								placeholder="new leaderboard name"
							/>
						</label>
						<button
							><svg
								height="30"
								width="30"
								viewBox="0 0 512 512"
								xmlns="http://www.w3.org/2000/svg"
								xmlns:xlink="http://www.w3.org/1999/xlink"
								><linearGradient
									id="a"
									gradientTransform="matrix(1 0 0 -1 0 -16402)"
									gradientUnits="userSpaceOnUse"
									x1="0"
									x2="512"
									y1="-16658"
									y2="-16658"
									><stop offset="0" stop-color="#31d8ff" /><stop
										offset="1"
										stop-color="#ff80ff"
									/></linearGradient
								><path
									d="m512 256c0 141.386719-114.613281 256-256 256s-256-114.613281-256-256 114.613281-256 256-256 256 114.613281 256 256zm0 0"
									fill="url(#a)"
								/><g fill="#fff"
									><path
										d="m256 56c-8.285156 0-15 6.714844-15 15s6.714844 15 15 15c93.738281 0 170 76.261719 170 170s-76.261719 170-170 170-170-76.261719-170-170c0-8.285156-6.714844-15-15-15s-15 6.714844-15 15c0 110.28125 89.71875 200 200 200s200-89.71875 200-200-89.71875-200-200-200zm0 0"
									/><path
										d="m175.070312 104.285156c1.914063 0 3.855469-.367187 5.734376-1.144531l20.277343-8.398437c7.652344-3.171876 11.289063-11.945313 8.117188-19.601563-3.167969-7.652344-11.945313-11.285156-19.597657-8.117187l-20.277343 8.398437c-7.652344 3.171875-11.289063 11.945313-8.121094 19.601563 2.394531 5.777343 7.980469 9.261718 13.867187 9.261718zm0 0"
									/><path
										d="m117.425781 147.945312c3.839844 0 7.675781-1.464843 10.605469-4.394531l15.519531-15.519531c5.859375-5.859375 5.859375-15.355469 0-21.214844-5.855469-5.855468-15.355469-5.855468-21.210937 0l-15.523438 15.523438c-5.855468 5.855468-5.855468 15.351562 0 21.210937 2.929688 2.929688 6.769532 4.394531 10.609375 4.394531zm0 0"
									/><path
										d="m75.144531 209.199219c1.875.777343 3.820313 1.148437 5.734375 1.148437 5.882813 0 11.46875-3.488281 13.863282-9.265625l8.398437-20.277343c3.167969-7.652344-.464844-16.429688-8.117187-19.597657-7.65625-3.171875-16.429688.464844-19.601563 8.117188l-8.398437 20.277343c-3.167969 7.65625.464843 16.429688 8.121093 19.597657zm0 0"
									/><path
										d="m256 178.289062c-8.285156 0-15 6.714844-15 15v47.710938h-47.710938c-8.285156 0-15 6.714844-15 15s6.714844 15 15 15h47.710938v47.710938c0 8.285156 6.714844 15 15 15s15-6.714844 15-15v-47.710938h47.710938c8.285156 0 15-6.714844 15-15s-6.714844-15-15-15h-47.710938v-47.710938c0-8.285156-6.714844-15-15-15zm0 0"
									/></g
								></svg
							></button
						>
					</form>
				{/if}
			</div>
		</div>
		<br />
		<button class="btn btn-wide btn-secondary" on:click={logout}>logout</button>
	</div>
{:else if !user.isLoggedIn}
	<a class="btn" href="/login">log in</a>
{:else}
	<div class="loader">
		<div class="loader-inner">
			<div class="loader-line-wrap">
				<div class="loader-line" />
			</div>
			<div class="loader-line-wrap">
				<div class="loader-line" />
			</div>
			<div class="loader-line-wrap">
				<div class="loader-line" />
			</div>
			<div class="loader-line-wrap">
				<div class="loader-line" />
			</div>
			<div class="loader-line-wrap">
				<div class="loader-line" />
			</div>
		</div>
	</div>
{/if}

<style>
	.account {
		display: flex;
		flex-direction: column;
		background-color: #2f3a51;
		border-radius: 10px;
		padding: 40px;
		align-items: center;
	}
	.profile {
		display: flex;
		align-items: center;
		flex-direction: column;
	}
	.profile span {
		cursor: pointer;
	}
	.stats {
		display: flex;
		justify-content: center;
	}
	.stats div {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin: 20px;
		border: none;
	}
	.stats div > h1 {
		font-size: 3em;
	}
	.account h2 {
		font-size: 1.3em;
		align-self: center;
		margin-top: 5px;
	}
	.achiements-container {
		margin: 20px;
		width: 25vw;
		height: fit-content;
		display: flex;
		flex-wrap: wrap;
		height: fit-content;
		justify-content: center;
	}
	.achievement {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 150px;
	}
	.leaderboards-container {
		display: flex;
		align-items: center;
	}
	.leaderboards-container > * {
		margin: 5px;
	}
	.leaderboards-container span {
		cursor: pointer;
	}
	.leaderboards-container form {
		display: flex;
	}
	.leaderboards-container form > * {
		margin: 5px;
	}
	.add-to-leaderboard {
		display: flex;
	}
	.leaderboards {
		display: flex;
		flex-wrap: wrap;
		max-width: 260px;
	}
	.leaderboards > * {
		margin: 5px;
	}
	.leaderboards > span {
		margin: 1;
	}
	.loader-inner {
		bottom: 0;
		height: 60px;
		left: 0;
		margin: auto;
		position: absolute;
		right: 0;
		top: 0;
		width: 100px;
	}

	.loader-line-wrap {
		animation: spin 2000ms cubic-bezier(0.175, 0.885, 0.32, 1.275) infinite;
		box-sizing: border-box;
		height: 50px;
		left: 0;
		overflow: hidden;
		position: absolute;
		top: 0;
		transform-origin: 50% 100%;
		width: 100px;
	}
	.loader-line {
		border: 4px solid transparent;
		border-radius: 100%;
		box-sizing: border-box;
		height: 100px;
		left: 0;
		margin: 0 auto;
		position: absolute;
		right: 0;
		top: 0;
		width: 100px;
	}
	.loader-line-wrap:nth-child(1) {
		animation-delay: -50ms;
	}
	.loader-line-wrap:nth-child(2) {
		animation-delay: -100ms;
	}
	.loader-line-wrap:nth-child(3) {
		animation-delay: -150ms;
	}
	.loader-line-wrap:nth-child(4) {
		animation-delay: -200ms;
	}
	.loader-line-wrap:nth-child(5) {
		animation-delay: -250ms;
	}

	.loader-line-wrap:nth-child(1) .loader-line {
		border-color: hsl(0, 80%, 60%);
		height: 90px;
		width: 90px;
		top: 7px;
	}
	.loader-line-wrap:nth-child(2) .loader-line {
		border-color: hsl(60, 80%, 60%);
		height: 76px;
		width: 76px;
		top: 14px;
	}
	.loader-line-wrap:nth-child(3) .loader-line {
		border-color: hsl(120, 80%, 60%);
		height: 62px;
		width: 62px;
		top: 21px;
	}
	.loader-line-wrap:nth-child(4) .loader-line {
		border-color: hsl(180, 80%, 60%);
		height: 48px;
		width: 48px;
		top: 28px;
	}
	.loader-line-wrap:nth-child(5) .loader-line {
		border-color: hsl(240, 80%, 60%);
		height: 34px;
		width: 34px;
		top: 35px;
	}

	@keyframes spin {
		0%,
		15% {
			transform: rotate(0);
		}
		100% {
			transform: rotate(360deg);
		}
	}
</style>
