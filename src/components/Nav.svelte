<script lang="ts">
	let innerWidth: number;
	import userStore from '../stores/userStore';
	let user: object;
	userStore.subscribe((data) => {
		user = data;
	});
</script>

<div class="modal" id="my-modal-2">
	<div class="modal-box">
		<h3 class="font-bold text-lg">Welcome to Know It All</h3>
		<section class="prose">
			<p>Can you take on the daily quiz and prove you Know It All?</p>
			<h4>How To Play</h4>
			<ol>
				<li>Clicking on PLAY will start the timer...</li>
				<li>Choose the correct answer for each of the five questions</li>
				<li>
					Your score will be based on how long it takes you to complete the quiz and the number of
					correct answers you select
				</li>
				<li>Every day, the quiz will refresh with five new questions!</li>
			</ol>
			<h4>Create an Account</h4>
			<p>
				Registering for an account will let you join the global leaderboard with your score from
				each day.
			</p>
			<p>You can also set up your own leaderboard with friends and see how you compare each day!</p>
		</section>
		<div class="modal-action">
			<a href="/#" class="btn">Got it!</a>
		</div>
	</div>
</div>

<svelte:window bind:innerWidth />
<header>
	<nav />
	<div class="navbar bg-base-100">
		<div class="flex-1">
			<a href="/" class="btn btn-ghost normal-case text-xl">Know It All</a>
		</div>
		<div class="flex-none">
			<ul class="menu menu-horizontal px-1">
				<li>
					<a href="/leaderboards"
						><img src="src/icons/002-leaderboard.svg" alt="" height="25" width="25" /></a
					>
				</li>
				<li>
					<a href="#my-modal-2"
						><img src="src/icons/003-question-mark.svg" alt="" height="25" width="25" /></a
					>
				</li>
				<li>
					{#if !user.isLoggedIn}
						<a href="/login"><img src="src/icons/001-user.svg" alt="" height="25" width="25" /></a>
					{:else}
						<a href="/profile"><img src="src/icons/001-user.svg" alt="" height="25" width="25" /></a
						>
					{/if}
				</li>
			</ul>
		</div>
	</div>
</header>
