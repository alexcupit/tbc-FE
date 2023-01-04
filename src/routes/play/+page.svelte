<script lang="ts">
	import type { PageData } from './$types';
	import { writable } from 'svelte/store';
	import Results from './Results.svelte';
	import { browser } from '$app/environment';
	export let data: PageData;
	import { calcScore } from '../../utils/calcScore';
	import userStore from '../../stores/userStore';
	import { getUser, patchLeaderBoard, patchUser } from '../../api';

	let questionRadial: number = 0;

	let user = {};
	userStore.subscribe((value) => {
		user = value;
	});

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
	}

	export const completedCheck = writable<boolean>(
		browser && JSON.parse(localStorage.todayStats).quizCompleted
	);
	completedCheck.subscribe((value) => {
		if (browser) return (JSON.parse(localStorage.todayStats).quizCompleted = value);
	});

	export let questionNumber: any;
	if (browser) {
		questionNumber = writable<number>(JSON.parse(localStorage.questionNumber));
		questionNumber.subscribe((value: number) => {
			if (browser) return (localStorage.questionNumber = value);
		});
	}

	let todayStats = { date: '', score: 0, timeTaken: '', correctAns: 0, quizCompleted: false }; // this will reset on each page load, needs fixing!

	// type stats = { date: string; score: number; timeTaken: string; correctAns: number };

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
			questionRadial += 25;
			if ($questionNumber === 5) {
				todayStats.quizCompleted = true;
				todayStats.date = new Date().toISOString().split('T')[0];
				todayStats.timeTaken = formattedTime;
				todayStats.score = calcScore(timer, todayStats.correctAns);
				localStorage.setItem('todayStats', JSON.stringify(todayStats));
				$completedCheck = JSON.parse(localStorage.todayStats).quizCompleted;

				if (user.isLoggedIn) {
					patchUser(user.userId, { todayStats });
					patchLeaderBoard('global', { username: user.username, todayStats });
					getUser(user.userId).then((user) => {
						if (user.leaderBoards.length) {
							user.leaderBoards.forEach((leaderBoard) => {
								patchLeaderBoard(leaderBoard, { username: user.username, todayStats });
							});
						}
					});
				}
			}
		}, 1000);
	};

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
	<p class="text-center text-xl text-accent">{formattedTime}</p>

	{#each data.questions as question, i}
		{@const answers = [...question.incorrectAnswers, question.correctAnswer]}
		{@const questionIndexes = randomIndex()}

		{#if i === $questionNumber}
			<div class="text-center mb-2">
				<article class="prose">
					<h2 class="text-center m-2">{question.question}</h2>
					<h4 class="text-center italic text-secondary mb-2">{question.category}</h4>
				</article>
				<div class="">
					<button class="btn btn-primary btn-wide mb-3" on:click={handleSubmitAnswer}
						>{answers[questionIndexes[0]]}</button
					>
				</div>
				<div>
					<button class="btn btn-primary btn-wide mb-3" on:click={handleSubmitAnswer}
						>{answers[questionIndexes[1]]}</button
					>
				</div>
				<div>
					<button class="btn btn-primary btn-wide mb-3" on:click={handleSubmitAnswer}
						>{answers[questionIndexes[2]]}</button
					>
				</div>
				<div>
					<button class="btn btn-primary btn-wide mb-3" on:click={handleSubmitAnswer}
						>{answers[questionIndexes[3]]}</button
					>
				</div>
			</div>
		{/if}
	{/each}
	<div
		class="radial-progress bg-secondary text-secondary-content border-4 border-secondary"
		style={`--value:${questionRadial};`}
	>
		{questionRadial}%
	</div>
{:else}
	<Results />
{/if}

<style>
</style>
