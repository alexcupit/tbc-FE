<script lang="ts">
	// import type stats from './+page.svelte';
	// export let todayStats: any;
	let todayStats = JSON.parse(localStorage.todayStats);

	let currTime = new Date().toTimeString().split(' ')[0].split(':');
	setInterval(() => {
		currTime = new Date().toTimeString().split(' ')[0].split(':');
	}, 1000);
	$: hours = 23 - +currTime[0];
	$: mins = 59 - +currTime[1];
	$: secs = 60 - +currTime[2];
</script>

<div class="results">
	<p>RESULTS</p>
	<h2>Today, you scored {todayStats.score}</h2>
	<h3>you got {todayStats.correctAns} right!</h3>
	<h3>in a total time of {todayStats.timeTaken}</h3>
	<br />
	<div class="grid grid-flow-col gap-5 text-center auto-cols-max">
		<div class="flex flex-col">
			<span class="countdown font-mono text-5xl">
				<span style="--value:{hours}" />
			</span>
			hours
		</div>
		<div class="flex flex-col">
			<span class="countdown font-mono text-5xl">
				<span style="--value:{mins};" />
			</span>
			min
		</div>
		<div class="flex flex-col">
			<span class="countdown font-mono text-5xl">
				<span style="--value:{secs};" />
			</span>
			sec
		</div>
	</div>
	<br />
	<p>until the next quiz!</p>
</div>

<style></style>
