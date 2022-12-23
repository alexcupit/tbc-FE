<script lang="ts">
	// import type stats from './+page.svelte';
	// export let todayStats: any;
	let todayStats = JSON.parse(localStorage.todayStats);
	// console.log(todayStats);
</script>

<div class="results">
	<p>RESULTS</p>
	<h2>Today, you scored {todayStats.score}</h2>
	<h3>you got {todayStats.correctAns} right!</h3>
	<h3>in a total time of {todayStats.timeTaken}</h3>
</div>

<style></style>
