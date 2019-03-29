"use strict";
const caseValues = [0.01, 1, 5, 10, 25, 50, 75, 100, 200, 300, 400, 500, 750, 1000, 5000, 10000, 25000, 50000, 75000, 100000, 200000, 300000, 400000, 500000, 750000, 1000000];
const roundGuesses = [6, 5, 4, 3, 2, 1, 1, 1, 1];
const playerCase = document.getElementById("player-case");
const newGameElement = document.getElementById("new-game");
const caseContainer = document.getElementById("case-container");
const previousWinningsElement = document.getElementById("previous-winnings");
const roundCounter = document.getElementById("round-counter");
const eliminationsRemaining = document.getElementById("eliminations-remaining");
const bankOfferElement = document.getElementById("bank-offer");
const remainingValues = document.getElementById("remaining-values");
const game = {
    round: 0,
    currentValues: [...caseValues],
    eliminationsRemaining: 0,
    offer: 0
};
function newGame() {
    newGameElement.style.display = "none";
    game.round = 0;
    game.currentValues = [...caseValues];
    game.eliminationsRemaining = 0;
    game.offer = 0;
    caseContainer.innerHTML = "";
    playerCase.innerHTML = "";
    for (let caseNumber = 0; caseNumber < 26; caseNumber++) {
        caseContainer.innerHTML +=
            `<div id="case-${caseNumber}" class="case" onclick="pickCase(${caseNumber})"><span>${caseNumber + 1}</span></div>`;
    }
    roundCounter.innerText = "Pick Your Case";
    updateRemainingValues();
}
function pickCase(caseNumber) {
    caseContainer.removeChild(document.getElementById(`case-${caseNumber}`));
    playerCase.innerHTML =
        `<div class="case"><span>${caseNumber + 1}</span></div>`;
    for (let i = 0; i < 26; i++) {
        if (i === caseNumber)
            continue;
        document.getElementById(`case-${i}`).onclick = () => eliminateCase(i);
    }
    roundCounter.innerHTML = `Round <span>${game.round + 1}</span>`;
    setEliminations(roundGuesses[game.round]);
}
function keepYourCase() {
    if (game.round === 9) {
        endGame(pickValue());
    }
}
function eliminateCase(caseNumber) {
    if (game.round === 9) {
        endGame(pickValue());
        return;
    }
    if (game.eliminationsRemaining <= 0)
        return;
    const caseObj = document.getElementById(`case-${caseNumber}`);
    caseObj.classList.add("open");
    caseObj.onclick = null;
    const value = pickValue();
    caseObj.innerHTML = `<span>$${value}</span>`;
    setEliminations(game.eliminationsRemaining - 1);
    updateRemainingValues();
    if (game.eliminationsRemaining <= 0) {
        const bankOffer = makeBankOffer();
        bankOfferElement.innerText = `$${bankOffer.toFixed(2)}`;
        document.body.classList.add("dark");
        game.offer = bankOffer;
    }
}
function pickValue() {
    const index = Math.floor(Math.random() * game.currentValues.length);
    const value = game.currentValues[index];
    game.currentValues.splice(index, 1);
    return value;
}
function acceptOffer() {
    if (!game.offer)
        return;
    document.body.classList.remove("dark");
    endGame(game.offer);
}
function rejectOffer() {
    if (!game.offer)
        return;
    game.offer = 0;
    bankOfferElement.innerText = "";
    document.body.classList.remove("dark");
    game.round++;
    if (game.round === 9) {
        roundCounter.innerHTML = "make your final choice";
        eliminationsRemaining.innerText = "";
        return;
    }
    roundCounter.innerHTML = `Round <span>${game.round + 1}</span>`;
    setEliminations(roundGuesses[game.round]);
}
function makeBankOffer() {
    const average = game.currentValues.reduce((total, val) => total + val, 0) / game.currentValues.length;
    const deal = average * (10 / (20 - game.round));
    const modifier = Math.random() * 0.2 - 0.1;
    return deal * (1 + modifier);
}
function setEliminations(eliminations) {
    game.eliminationsRemaining = eliminations;
    eliminationsRemaining.innerText = `${eliminations}`;
}
function updateRemainingValues() {
    remainingValues.innerHTML = "";
    for (const val of game.currentValues) {
        remainingValues.innerHTML +=
            `<li>$${val}</li>`;
    }
}
function endGame(winnings) {
    newGameElement.style.display = "block";
    document.getElementById("winnings").innerText = `$${winnings.toFixed(2)}`;
    previousWinningsElement.innerHTML = `<li>$${winnings.toFixed()}</li>` + previousWinningsElement.innerHTML;
}
newGame();
