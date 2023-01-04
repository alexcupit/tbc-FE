<script>
	import { fetchLeaderboard } from '../api';
	export let leaderboardName;
	let result = fetchLeaderboard(leaderboardName);
</script>

<svelte:head>
	<link href="https://fonts.googleapis.com/css?family=Oswald|Barrio" rel="stylesheet" />
</svelte:head>
<div id="cont">
	{#await result then leaderboard}
		<p>TODAY'S {leaderboardName.toUpperCase()} LEADERBOARD</p>
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
</div>

<style>
	p {
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
	}
</style>
