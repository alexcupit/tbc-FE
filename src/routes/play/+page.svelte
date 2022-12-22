<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
	let questionNumber = 0;

	const handleSubmitAnswer = () => {
		questionNumber += 1;
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
			<button on:click={handleSubmitAnswer}>{answers[questionIndexes[0]]}</button>
			<button on:click={handleSubmitAnswer}>{answers[questionIndexes[1]]}</button>
			<button on:click={handleSubmitAnswer}>{answers[questionIndexes[2]]}</button>
			<button on:click={handleSubmitAnswer}>{answers[questionIndexes[3]]}</button>
		</div>
	{/if}
{/each}

<style></style>
