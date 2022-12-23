<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
	let questionNumber = 0;
	let result;

	const handleSubmitAnswer = (e) => {
		console.log(e.target);

		const correctAnswer = data.questions[questionNumber].correctAnswer;
		if (e.target.innerText === correctAnswer) {
			e.target.classList.add('answer--correct');
			console.log('correct');
			result = 'correct';
		} else {
			e.target.classList.add('answer--incorrect');
			let xpath = `//button[text()='${correctAnswer}']`;
			let matchingElement = document.evaluate(
				xpath,
				document,
				null,
				XPathResult.FIRST_ORDERED_NODE_TYPE,
				null
			).singleNodeValue;
			console.log(matchingElement);
			matchingElement.classList.add('answer--correct');
		}

		setTimeout(() => {
			questionNumber += 1;
		}, 3000);

		// questionNumber += 1;
	};

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
