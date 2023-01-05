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
	<article class="prose">
		<h2 class="text-center text-primary">RESULTS</h2>
		<h3 class="text-center">
			Today, you scored <span class="text-accent">{todayStats.score}</span>.
		</h3>
		<h3 class="text-center">
			You got <span class="text-accent">{todayStats.correctAns}/5</span> right!
		</h3>
		<h3 class="text-center">
			In a total time of <span class="text-accent">{todayStats.timeTaken}</span>.
		</h3>
		<h3 class="text-center">
			Your current streak is <span class="text-accent">{localStorage.currentStreak}</span>
			day{localStorage.currentStreak > 1 ? 's' : ''}.
		</h3>
	</article>
	<br />
	<div class="grid grid-flow-col gap-5 text-center auto-cols-max">
		<div class="flex flex-col">
			<span class="countdown font-mono text-5xl text-secondary">
				<span style="--value:{hours}" />
			</span>
			<span class="text-secondary">hour</span>
		</div>
		<div class="flex flex-col">
			<span class="countdown font-mono text-5xl text-secondary">
				<span style="--value:{mins};" />
			</span>
			<span class="text-secondary">min</span>
		</div>
		<div class="flex flex-col">
			<span class="countdown font-mono text-5xl text-secondary">
				<span style="--value:{secs};" />
			</span>
			<span class="text-secondary">sec</span>
		</div>
	</div>
	<br />
	<p class="text-center">Until the next quiz!</p>
</div>

<style>
	.results {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>
