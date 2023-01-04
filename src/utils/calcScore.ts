export const calcScore = (time: number, correctAns: number) => {
	let ansScore = correctAns * 10; // max ansScore = 50

	let timeScore = 50 - (50 * (time - 5)) / (50 + (time - 5)); // -5 accounts for 5 second delays after each question, max timeScore = 50

	return Math.ceil(ansScore + timeScore);
};

// console.log(calcScore(10, 0));
// console.log(calcScore(10, 1));
// console.log(calcScore(10, 2));
// console.log(calcScore(10, 3));
// console.log(calcScore(10, 4));
// console.log(calcScore(10, 5));
