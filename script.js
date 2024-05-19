const choices = document.querySelectorAll('.choice');
const playerChoiceDisplay = document.getElementById('player-choice');
const computerChoiceDisplay = document.getElementById('computer-choice');
const resultMessageDisplay = document.getElementById('result-message');
const playerScoreDisplay = document.getElementById('player-score');
const computerScoreDisplay = document.getElementById('computer-score');
const difficultySelect = document.getElementById('difficulty');
const resetButton = document.getElementById('reset-button');

let playerScore = 0;
let computerScore = 0;
let playerChoices = { rock: 0, paper: 0, scissors: 0 };

choices.forEach(choice => choice.addEventListener('click', playGame));
resetButton.addEventListener('click', resetGame);

function playGame(event) {
    const playerChoice = event.target.id;
    playerChoices[playerChoice]++;
    const computerChoice = getComputerChoice();
    const winner = getWinner(playerChoice, computerChoice);

    playerChoiceDisplay.textContent = playerChoice;
    computerChoiceDisplay.textContent = computerChoice;

    if (winner === 'player') {
        resultMessageDisplay.textContent = 'You Win!';
        playerScore++;
    } else if (winner === 'computer') {
        resultMessageDisplay.textContent = 'You Lose!';
        computerScore++;
    } else {
        resultMessageDisplay.textContent = 'It\'s a Draw!';
    }

    updateScore();
}

function getComputerChoice() {
    const difficulty = difficultySelect.value;

    if (difficulty === 'easy') {
        const choices = ['rock', 'paper', 'scissors'];
        const randomIndex = Math.floor(Math.random() * 3);
        return choices[randomIndex];
    }

    if (difficulty === 'hard') {
        const maxChoice = Object.keys(playerChoices).reduce((a, b) => playerChoices[a] > playerChoices[b] ? a : b);
        if (maxChoice === 'rock') return 'paper';
        if (maxChoice === 'paper') return 'scissors';
        if (maxChoice === 'scissors') return 'rock';
    }
}

function getWinner(playerChoice, computerChoice) {
    if (playerChoice === computerChoice) {
        return 'draw';
    } else if (
        (playerChoice === 'rock' && computerChoice === 'scissors') ||
        (playerChoice === 'scissors' && computerChoice === 'paper') ||
        (playerChoice === 'paper' && computerChoice === 'rock')
    ) {
        return 'player';
    } else {
        return 'computer';
    }
}

function updateScore() {
    playerScoreDisplay.textContent = playerScore;
    computerScoreDisplay.textContent = computerScore;
}

function resetGame() {
    playerScore = 0;
    computerScore = 0;
    playerChoices = { rock: 0, paper: 0, scissors: 0 };
    playerChoiceDisplay.textContent = '';
    computerChoiceDisplay.textContent = '';
    resultMessageDisplay.textContent = '';
    updateScore();
}
