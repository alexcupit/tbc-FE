<script lang="ts">
	import { onMount } from 'svelte';
	import { fetchLeaderboard } from '../api';
	import userStore from '../stores/userStore';

	let user = {};
	userStore.subscribe((value) => {
		user = value;
	});

	export let leaderboardName: any;

	export let isLoading = true;

	let result: any;
	let position = 0;
	let today = new Date().toISOString().split('T')[0];
	let [year, month, day] = today.split('-');

	onMount(async () => {
		result = await fetchLeaderboard(leaderboardName);
		isLoading = false;
	});

	const handleIncrementPosition = () => {
		return (position += 1);
	};
</script>

{#if !isLoading}
	<article class="prose">
		<h2 class="mb-1">
			Today's {leaderboardName === 'global' ? 'Global' : leaderboardName} Leaderboard
		</h2>
		<h3 class="text-center mb-1">{day} - {month} - {year}</h3>
	</article>
	<div class="overflow-x-auto">
		<table class=" table table-compact w-full text-center">
			<thead class="bg-accent">
				<tr>
					<th class="bg-primary text-primary-content">#</th>
					<th class="bg-primary text-primary-content">Username</th>
					<th class="bg-primary text-primary-content">Time</th>
					<th class="bg-primary text-primary-content">Answers</th>
					<th class="bg-primary text-primary-content">Score</th>
				</tr>
			</thead>
			<tbody>
				{#await result then leaderboard}
					{#each leaderboard.members as member}
						<tr>
							<th class="bg-accent text-primary-content">{handleIncrementPosition()}</th>
							<td class="bg-secondary text-primary-content">{member.username}</td>
							<td class="bg-secondary text-primary-content">{member.todayStats.timeTaken}</td>
							<td class="bg-secondary text-primary-content">{member.todayStats.correctAns}</td>
							<td class="bg-secondary text-primary-content"
								><span class="font-bold">{member.todayStats.score}</span></td
							>
						</tr>
					{/each}
				{/await}
			</tbody>
		</table>
	</div>
	{#if !user.isLoggedIn}
		<br />
		<div class="alert shadow-lg">
			<div>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					class="stroke-info flex-shrink-0 w-6 h-6"
					><path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
					/></svg
				>
				<span>Log in to join this leaderboard and create your own leaderboards with friends!</span>
			</div>
		</div>
	{/if}
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
	.alert {
		width: max-content;
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
	/* p {
		font-family: Barrio;
		font-size: 2em;
		margin: 5px;
	}
	#cont {
		padding: 0.8em;
		color: rgb(81, 14, 83);
		display: flex;
		flex-direction: column;
		background: rgb(211, 159, 208);
	}
	#date {
		align-self: center;
	}
	#title {
		display: flex;
		justify-content: space-between;
	}
	#cont-item {
		padding-right: 0.8em;
		font-family: Oswald;
		font-size: 1.3em;
		white-space: nowrap;
		display: grid;
		grid-template-columns: 25% 25% 25% 25%;
		text-align: right;
	} */
</style>
