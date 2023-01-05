<script lang="ts">
	import userStore from '../../stores/userStore';
	import { onMount } from 'svelte';
	import { fetchUser, postLeaderBoard, updateUser } from '../../api';
	import { achievements } from './badges/achievements';
	import Badge from '../../components/Badge.svelte';
	import FormInput from '../../components/FormInput.svelte';
	import { goto } from '$app/navigation';

	console.log(achievements);
	let user;
	let userStats;
	let leaderboards;
	let value = '';
	let addToLeaderboard = false;
	userStore.subscribe((data) => (user = data));
	onMount(async () => {
		userStats = await fetchUser(user.userId);
		leaderboards = ['global', ...userStats.leaderBoards];
		leaderboards = [...userStats.leaderBoards];
	});
	const submitHandleSingUp = async () => {
		console.log('creating leaderboard', value);
		const body = { leaderboardName: value };
		const body2 = {
			leaderBoards: {
				leaderBoard: value,
				addTo: true
			}
		};
		const newLeaderboard = await postLeaderBoard(body);
		const updatedUser = await updateUser(user.userId, body2);
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
		goto('/');
	};

</script>

{#if userStats}
	<div class="account">
		<h3>profile</h3>
		<div class="profile">
			<img src={user.photoURL} alt="profile picture" />
			<div>
				<p>{userStats.username} <span>🖊️</span></p>
				<p>Last played {userStats.dateLastPlayed}</p>
				<br />
				{#if userStats.dateLastPlayed}
					<p>Last played {userStats.dateLastPlayed}</p>
				{/if}
				<br />
			</div>
		</div>
		<div class="stats">
			<div class="today">
				<h1>{userStats.todayStats.score}</h1>
				<p>today score</p>
			</div>
			<div class="current">
				<h1>{userStats.currentStreak}</h1>
				<p>current streak</p>
			</div>
			<div class="max">
				<h1>{userStats.highestScore}</h1>
				<p>max streak</p>
			</div>
		</div>
		<h2>statistics</h2>
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
		<h2>achievements</h2>
		<div class="leaderboards">
			{#each leaderboards as leaderboard}
				<div class="badge badge-lg badge-accent">{leaderboard}</div>
			{/each}
			{#if !addToLeaderboard}
				<span class="" on:click={(e) => (addToLeaderboard = true)}>+</span>
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
							required
						/>
					</label>
					<button>add</button>
				</form>
			{/if}
		</div>
		<h2>leaderboards</h2>
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
						<span on:click={deleteLeaderboard(leaderboard)}>x</span>
					{/if}
				{/each}
			</div>
			<div class="add-to-leaderboard">
				{#if !addToLeaderboard}
					<span class="" on:click={(e) => (addToLeaderboard = true)}>+</span>
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
								required
								placeholder="new leaderboard name"
							/>
						</label>
						<button>add</button>
					</form>
				{/if}
			</div>
		</div>
		<br />
		<button class="btn btn-wide btn-secondary" on:click={logout}>logout</button>
	</div>
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
		margin-top: 400px;
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
	.leaderboards {
		display: flex;
		align-items: center;
	}
	.leaderboards > * {
		margin: 5px;
	}
	.leaderboards span {
		cursor: pointer;
	}
	.leaderboards form {
		display: flex;
	}
	.leaderboards form > * {
		margin: 5px;
	}

	/* .loader {
		background: #000;
		background: radial-gradient(#222, #000);
		bottom: 0;
		left: 0;
		overflow: hidden;
		position: fixed;
		right: 0;
		top: 0;
		z-index: 99999;
	} */

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
</style>
