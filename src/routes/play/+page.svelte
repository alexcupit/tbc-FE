<script lang="ts">
	import type { PageData } from './$types';
	import Results from './Results.svelte';
	export let data: PageData;
	let questionNumber: number = 0;
	// window.localStorage.setItem('quizCompleted', 'false');

	if (!localStorage.todayStats) {
		localStorage.setItem(
			'todayStats',
			JSON.stringify({ date: '', score: 0, timeTaken: '', correctAns: 0, quizCompleted: false })
		);
	}

	let todayStats = { date: '', score: 0, timeTaken: '', correctAns: 0, quizCompleted: false }; // this will reset on each page load, needs fixing!

	// if (localStorage.quizCompleted === 'false') {
	// 	localStorage.setItem(
	// 		'todayStats',
	// 		JSON.stringify({ date: '', score: 0, timeTaken: '', correctAns: 0 })
	// 	);
	// }

	// type stats = { date: string; score: number; timeTaken: string; correctAns: number };

	const handleSubmitAnswer = (e: Event) => {
		const target = e.target as HTMLElement;

		const correctAnswer = data.questions[questionNumber].correctAnswer;
		if (target?.innerText === correctAnswer) {
			target?.classList.add('answer--correct');
			todayStats.correctAns += 1;
		} else {
			target?.classList.add('answer--incorrect');
			let xpath = `//button[contains(text(),'${correctAnswer}')]`; // needs testing with quotes in answers
			let matchingElement: any = document.evaluate(
				xpath,
				document,
				null,
				XPathResult.FIRST_ORDERED_NODE_TYPE,
				null
			).singleNodeValue;
			matchingElement?.classList.add('answer--correct');
		}

		setTimeout(() => {
			questionNumber += 1;
			if (questionNumber === 5) {
				todayStats.quizCompleted = true;
				todayStats.timeTaken = formattedTime;

				// localStorage.setItem(JSON.stringify(todayStats.quizCompleted), 'true');
				// localStorage.setItem(todayStats.timeTaken, formattedTime);
				// localStorage.setItem('quizCompleted', JSON.stringify(quizCompleted));
				localStorage.setItem('todayStats', JSON.stringify(todayStats));

				console.log(
					typeof JSON.parse(localStorage.todayStats).quizCompleted,
					JSON.parse(localStorage.todayStats).quizCompleted
				);
			}
		}, 1000);

		console.dir(localStorage);
	};

	let timer = 0;
	if (todayStats.quizCompleted === false) {
		const timerFunction = setInterval(() => {
			if (todayStats.quizCompleted === true) {
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

{#if JSON.parse(localStorage.todayStats).quizCompleted === false}
	<p>{formattedTime}</p>
	{#each data.questions as question, i}
		{@const answers = [...question.incorrectAnswers, question.correctAnswer]}
		{@const questionIndexes = randomIndex()}

		{#if i === questionNumber}
			<div class="question">
				<h2>{question.question}</h2>
				<h4>{question.category}</h4>
				<button class="answer--button" on:click={handleSubmitAnswer}
					>{answers[questionIndexes[0]]}</button
				>
				<button class="answer--button" on:click={handleSubmitAnswer}
					>{answers[questionIndexes[1]]}</button
				>
				<button class="answer--button" on:click={handleSubmitAnswer}
					>{answers[questionIndexes[2]]}</button
				>
				<button class="answer--button" on:click={handleSubmitAnswer}
					>{answers[questionIndexes[3]]}</button
				>
			</div>
		{/if}
	{/each}
{:else}
	<Results />
{/if}

<style>
	/* .answer--correct {
		background-color: green;
		padding: 100px;
	} */

	:global(.answer--correct) {
		background-color: green;
	}

	:global(.answer--incorrect) {
		background-color: red;
	}
</style>
