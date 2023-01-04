<script lang="ts">
	import userStore from '../../stores/userStore';
	import { onMount } from 'svelte';
	import { fetchUser, postLeaderBoard, updateUser } from '../../api';
	import { achievements } from './badges/achievements';
	import Badge from '../../components/Badge.svelte';
	import FormInput from '../../components/FormInput.svelte';
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
</script>

{#if userStats}
	<div class="account">
		<h3>profile</h3>
		<div class="profile">
			<img src={user.photoURL} alt="profile picture" />
			<div>
				<p>{userStats.username} <span>🖊️</span></p>
				<p>Last played {userStats.dateLastPlayed}</p>
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
				<p>highest score</p>
			</div>
		</div>
		<h2>statistics</h2>
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
				<a href={`/leaderboards/${leaderboard}`}>
					<div class="badge badge-lg badge-accent">{leaderboard}</div>
				</a>
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
		/* margin-top: 400px; */
		align-items: center;
	}
	.profile {
		display: flex;
		align-items: center;
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
</style>
