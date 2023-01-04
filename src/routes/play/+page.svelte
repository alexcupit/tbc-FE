<script lang="ts">
	import type { PageData } from './$types';
	import { writable, type Writable } from 'svelte/store';
	import Results from './Results.svelte';
	import { browser } from '$app/environment';
	export let data: PageData;
	import { calcScore } from '../../utils/calcScore';
	import userStore from '../../stores/userStore';
	import { getUser, patchLeaderBoard, patchUser } from '../../api';

	let user = {};
	userStore.subscribe((value) => {
		user = value;
	});

	const today = new Date().toISOString().split('T')[0];
	// type stats = { date: string; score: number; timeTaken: string; correctAns: number };
	let todayStats = { date: '', score: 0, timeTaken: '', correctAns: 0, quizCompleted: false }; // this will reset on each page load

	// for player's initial vist, create the below in localStorage
	if (browser) {
		if (!localStorage.todayStats) {
			localStorage.setItem(
				'todayStats',
				JSON.stringify({ date: '', score: 0, timeTaken: '', correctAns: 0, quizCompleted: false })
			);
		}
		if (!localStorage.questionNumber) {
			localStorage.setItem('questionNumber', '0');
		}
		if (!localStorage.currentStreak) {
			localStorage.setItem('currentStreak', '0');
		}
		if (!localStorage.dateLastPlayed) {
			localStorage.setItem('dateLastPlayed', '');
		}
	}

	export const completedCheck = writable<boolean>(
		browser && JSON.parse(localStorage.todayStats).quizCompleted
	);
	completedCheck.subscribe((value) => {
		if (browser) return (JSON.parse(localStorage.todayStats).quizCompleted = value);
	});

	export let questionNumber: Writable<number>;
	export let currentStreak: Writable<number>;
	if (browser) {
		questionNumber = writable(JSON.parse(localStorage.questionNumber));
		questionNumber.subscribe((value) => {
			return (localStorage.questionNumber = value);
		});
		currentStreak = writable(JSON.parse(localStorage.currentStreak));
		currentStreak.subscribe((value) => {
			return (localStorage.currentStreak = value);
		});
		// check how long since last played and if streak needs resetting
		let timeSinceLastPlay =
			new Date().setUTCHours(0, 0, 0, 0) -
			new Date(localStorage.dateLastPlayed).setUTCHours(0, 0, 0, 0);

		if (timeSinceLastPlay > 86400000) {
			$currentStreak = 0;
			$completedCheck = false;
			localStorage.setItem('todayStats', JSON.stringify(todayStats));
		}
	}

	const handleSubmitAnswer = (e: Event) => {
		const target = e.target as HTMLElement;

		const correctAnswer = data.questions[$questionNumber].correctAnswer;
		if (target?.innerText === correctAnswer.toUpperCase()) {
			target?.classList.add('btn-success');
			todayStats.correctAns += 1;
		} else {
			target?.classList.add('btn-error');
			let xpath = `//button[contains(text(),'${correctAnswer}')]`; // needs testing with quotes in answers
			let matchingElement: any = document.evaluate(
				xpath,
				document,
				null,
				XPathResult.FIRST_ORDERED_NODE_TYPE,
				null
			).singleNodeValue;
			matchingElement?.classList.add('btn-success');
		}

		setTimeout(() => {
			$questionNumber += 1;
			if ($questionNumber === 5) {
				// update todayStats
				todayStats.quizCompleted = true;
				todayStats.date = today;
				todayStats.timeTaken = formattedTime;
				todayStats.score = calcScore(timer, todayStats.correctAns);
				localStorage.setItem('todayStats', JSON.stringify(todayStats));
				$completedCheck = JSON.parse(localStorage.todayStats).quizCompleted;

				// update streak on quiz completion
				$currentStreak += 1;

				localStorage.setItem('dateLastPlayed', today);

				if (user.isLoggedIn) {
					//update user in DB
					patchUser(user.userId, {
						todayStats,
						dateLastPlayed: today,
						currentStreak: $currentStreak
					});
					//update leaderboards in DB
					patchLeaderBoard('global', { username: user.username, todayStats });
					getUser(user.userId).then((user) => {
						if (user.leaderBoards.length) {
							user.leaderBoards.forEach((leaderBoard) => {
								patchLeaderBoard(leaderBoard, { username: user.username, todayStats });
							});
						}
						// update user in DB with relevant achievements
						if ($currentStreak === 2 && !user.achievements.includes('2 day streak')) {
							patchUser(user.userId, { achievements: '2 day streak' });
						}
						if ($currentStreak === 10 && !user.achievements.includes('10 day streak')) {
							patchUser(user.userId, { achievements: '10 day streak' });
						}
						if (todayStats.score >= 50 && !user.achievements.includes('score 50')) {
							patchUser(user.userId, { achievements: 'score 50' });
						}
						if (todayStats.score >= 90 && !user.achievements.includes('score 90')) {
							patchUser(user.userId, { achievements: 'score 90' });
						}
						if (timer <= 20 && !user.achievements.includes('under 20s')) {
							patchUser(user.userId, { achievements: 'under 20s' });
						}
						if (timer <= 10 && !user.achievements.includes('under 10s')) {
							patchUser(user.userId, { achievements: 'under 10s' });
						}
					});
				}
			}
		}, 1000);
	};

	// Increments and formats a timer to count up for the duration of the quiz
	let timer = 0;
	if (todayStats.quizCompleted === false) {
		const timerFunction = setInterval(() => {
			if (todayStats.quizCompleted === true) {
				// meant to not add 1s to timer after final Q but currently not working, this if statement not accessible.
				clearInterval(timerFunction);
			} else {
				timer++;
			}
		}, 1000);
	}
	$: minutes = Math.floor(timer / 60);
	$: seconds = Math.floor(timer - minutes * 60);
	$: formattedTime = `${minutes < 10 ? `0${minutes}` : minutes}:${
		seconds < 10 ? `0${seconds}` : seconds
	}`;

	// Creates and array of four random numbers 0-3 that will be used to randomise the position of the correct answer for each question.
	const randomIndex = () => {
		const arr = [];
		const uniqueNumbers = new Set();
		while (uniqueNumbers.size < 4) {
			const randomNumber = Math.floor(Math.random() * 4);
			if (!uniqueNumbers.has(randomNumber)) {
				uniqueNumbers.add(randomNumber);
				arr.push(randomNumber);
			}
		}
		return arr;
	};
</script>

{#if !$completedCheck}
	<p>{formattedTime}</p>
	{#each data.questions as question, i}
		{@const answers = [...question.incorrectAnswers, question.correctAnswer]}
		{@const questionIndexes = randomIndex()}

		{#if i === $questionNumber}
			<div class="question">
				<h2>{question.question}</h2>
				<h4>{question.category}</h4>
				<button class="btn btn-primary" on:click={handleSubmitAnswer}
					>{answers[questionIndexes[0]]}</button
				>
				<button class="btn btn-primary" on:click={handleSubmitAnswer}
					>{answers[questionIndexes[1]]}</button
				>
				<button class="btn btn-primary" on:click={handleSubmitAnswer}
					>{answers[questionIndexes[2]]}</button
				>
				<button class="btn btn-primary" on:click={handleSubmitAnswer}
					>{answers[questionIndexes[3]]}</button
				>
			</div>
		{/if}
	{/each}
{:else}
	<Results />
{/if}

<style>
	:global(.answer--correct) {
		background-color: green;
	}

	:global(.answer--incorrect) {
		background-color: red;
	}
</style>
