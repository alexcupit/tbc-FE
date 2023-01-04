<script>
	import { fetchLeaderboard } from '../api';
	export let leaderboardName;
	let result = fetchLeaderboard(leaderboardName);
	let position = 0;
	let today = new Date().toISOString().split('T')[0];

	const handleIncrementPosition = () => {
		return (position += 1);
	};
</script>

<svelte:head>
	<link href="https://fonts.googleapis.com/css?family=Oswald|Barrio" rel="stylesheet" />
</svelte:head>

<article class="prose">
	<h2 class="mb-1">Today's Leaderboard</h2>
	<h3 class="text-center mb-1">{today}</h3>
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

<!-- <div id="cont">
	{#await result then leaderboard}
		<p>TODAY'S LEADERBOARD</p>
		<p id="date">{leaderboard.date.split('T')[0]}</p>
		<div id="title">
			<div>USERNAME</div>
			<div>SCORE</div>
			<div>TIME</div>
			<div>ANSWERS</div>
		</div>
		{#each leaderboard.members as member}
			<div id="cont-item">
				<div>{member.username}</div>
				<div>{member.todayStats.score}</div>
				<div>{member.todayStats.timeTaken}</div>
				<div>{member.todayStats.correctAns}</div>
			</div>
		{/each}
	{/await}
</div> -->
<style>
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
