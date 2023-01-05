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
		localStorage.removeItem('user');
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
{:else if !user.isLoggedIn}
	<a class="btn" href="/login">log in</a>
{:else}
	<h2>loading</h2>
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
</style>
