<script>
	import { fetchLeaderboard } from '../api';
	export let leaderboardName;
	let result = fetchLeaderboard(leaderboardName);
	let position = 0;
	let today = new Date().toISOString().split('T')[0];
	let [year, month, day] = today.split('-');

	const handleIncrementPosition = () => {
		return (position += 1);
	};
</script>

<svelte:head>
	<link href="https://fonts.googleapis.com/css?family=Oswald|Barrio" rel="stylesheet" />
</svelte:head>

<article class="prose">
	<h2 class="mb-1">Today's {leaderboardName} Leaderboard</h2>
	<h3 class="text-center mb-1">{day}-{month}-{year}</h3>
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

<style>
</style>
