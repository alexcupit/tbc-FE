<script>
	import Leaderboard from '../../../components/Leaderboard.svelte';
	import { page } from '$app/stores';
	import userStore from '../../../stores/userStore';
	import { getUser, patchUser } from '../../../api';

	let user = {};
	userStore.subscribe((value) => {
		user = value;
	});

	const currentLeaderboard = $page.params.leaderboardName;
	let leaderboardStatus = '';

	const joinHandler = () => {
		getUser(user.userId).then((user) => {
			if (user.leaderBoards.includes(currentLeaderboard)) {
				leaderboardStatus = 'already member';
			} else {
				patchUser(user.userId, {
					leaderBoards: { leaderBoard: currentLeaderboard, addTo: true }
				}).then((res) => {
					leaderboardStatus = 'added to leaderboard';
				});
			}
		});
	};
</script>

<Leaderboard leaderboardName={currentLeaderboard} />

{#if user.isLoggedIn}
	<br />
	<a class="btn" on:click={joinHandler}>JOIN {currentLeaderboard.toUpperCase()} LEADERBOARD</a>
{/if}
<br />
{#if leaderboardStatus === 'already member'}
	<div class="alert alert-error shadow-lg">
		<div>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="stroke-current flex-shrink-0 h-6 w-6"
				fill="none"
				viewBox="0 0 24 24"
				><path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
				/></svg
			>
			<span
				>You're already a member of the {currentLeaderboard} leaderboard, your score will be added when
				you next complete the quiz!</span
			>
		</div>
	</div>
{:else if leaderboardStatus === 'added to leaderboard'}
	<div class="alert alert-success shadow-lg">
		<div>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="stroke-current flex-shrink-0 h-6 w-6"
				fill="none"
				viewBox="0 0 24 24"
				><path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
				/></svg
			>
			<span
				>You've successfully joined the {currentLeaderboard} leaderboard! Your score will be added when
				you next complete the quiz!</span
			>
		</div>
	</div>
{/if}

<style>
	.alert {
		margin: 0 20vw;
	}
</style>
