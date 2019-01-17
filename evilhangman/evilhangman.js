let currentWordList = wordList;
let remainingGuesses = 0;
let totalGuesses = 0;
let modalElement = document.getElementsByClassName(`modal`)[0];
let coverblockElement = document.getElementById(`cover-block`);

function newGame(guesses) {
	currentWordList = wordList;
	remainingGuesses = guesses;
	totalGuesses = guesses;
	if (modalElement && modalElement.classList.contains("active")) {
		document.getElementById(`result`).innerHTML = '';
		document.getElementById(`result`).classList.remove("show");
		modalElement.classList.remove(`active`);
	}
	percentageLeft();
	resetWords();
}

function endGame() {
	endGameText = "";
	if (Object.keys(currentWordList).length == 1) {
		endGameText = "You Won!";
	} else {
		endGameText = "You Lost!";
	}
	document.getElementById(`result`).classList.add("show");
	document.getElementById(`result`).innerHTML = endGameText;
	modalElement.classList.add(`active`);
}

function percentageLeft() {
	remainingPercentage = Math.floor((remainingGuesses / totalGuesses) * 100);
	imageRevealPercentage = Math.floor(100 - remainingPercentage);
	coverblockElement.style.top = imageRevealPercentage + "%";
}

function resetWords() {
	for (i = 0; i < 7; i++) {
		document.getElementById(`letter${i}`).innerHTML = "";
	}

	const letters = [
		"a",
		"b",
		"c",
		"d",
		"e",
		"f",
		"g",
		"h",
		"i",
		"j",
		"k",
		"l",
		"m",
		"n",
		"o",
		"p",
		"q",
		"r",
		"s",
		"t",
		"u",
		"v",
		"w",
		"x",
		"y",
		"z"
	];
	for (const letter of letters) {
		document.getElementById(`key-${letter}`).classList.remove(`disabled`);
	}
}

function submitGuess(letter) {
	if (remainingGuesses-- <= 0) {
		return endGame();
	}

	const indices = guessLetter(letter.toLowerCase());

	for (const index of indices) {
		document.getElementById(
			`letter${index}`
		).innerHTML = letter.toUpperCase();
	}

	document
		.getElementById(`key-${letter.toLowerCase()}`)
		.classList.add(`disabled`);

	percentageLeft();
	guessesLeft = remainingGuesses;
	wordPickedButNotGuessed =
		Object.keys(currentWordList).length === 1 && guessesLeft <= 0
			? true
			: false;
	if (wordPickedButNotGuessed || guessesLeft <= 0) {
		return endGame();
	}
}

function guessLetter(letter) {
	// Categorize words.
	const wordSignatures = {};

	for (const word of currentWordList) {
		const signature = buildWordSignature(word, letter);

		if (!wordSignatures[signature]) {
			wordSignatures[signature] = [word];
		} else {
			wordSignatures[signature].push(word);
		}
	}

	// Choose longest list.
	let longestLength = 0;
	let longestSignature = "";

	for (const signature in wordSignatures) {
		const currentLength = wordSignatures[signature].length;
		// console.log(`Got signature ${signature} with length ${currentLength}`);

		if (currentLength > longestLength) {
			longestLength = currentLength;
			longestSignature = signature;
			// console.log(
			// 	`Found new longest signature: ${longestSignature} at ${longestLength} words.`
			// );
		}
	}

	// Make longest list the new list.
	currentWordList = wordSignatures[longestSignature];

	// Return the indices of the letters.
	return longestSignature
		.split(",")
		.map(index => {
			if (index) return Number(index);
			else return;
		})
		.filter(index => typeof index === "number");
}

function buildWordSignature(word, letter) {
	let depth = 0;
	let indices = [];
	let index = word.indexOf(letter);

	while (index !== -1) {
		indices.push(index + depth);
		word = word.slice(index + 1);
		depth += index + 1;
		index = word.indexOf(letter);
	}

	return indices.join(",");
}
