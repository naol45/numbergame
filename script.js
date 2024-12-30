const player1Secret = document.getElementById('player1-secret');
const player1Guess = document.getElementById('player1-guess');
const player1Submit = document.getElementById('player1-submit');
const player1Guesses = document.getElementById('player1-guesses');

const player2Secret = document.getElementById('player2-secret');
const player2Guess = document.getElementById('player2-guess');
const player2Submit = document.getElementById('player2-submit');
const player2Guesses = document.getElementById('player2-guesses');

const overlay = document.getElementById('overlay');
const winnerPopup = document.getElementById('winner-popup');
const winnerText = document.getElementById('winner-text');
const winnerRestart = document.getElementById('restart');
const winnerTell = document.getElementById('Teller');


function checkGuess(secret, guess) {
    let positionsGot = 0;
    let numbersGot = 0;

    // Check if the secret and guess are valid 4-digit numbers
    if (secret.length !== 4 || guess.length !== 4 || !/^\d+$/.test(secret) || !/^\d+$/.test(guess)) {
        alert('Please enter a valid 4-digit number for both the secret and the guess.');
        return;
    }

    // Check if the numbers in the secret and guess are all unique
    const secretUniqueNumbers = new Set(secret.split(''));
    const guessUniqueNumbers = new Set(guess.split(''));
    if (secretUniqueNumbers.size !== 4) {
        alert('Please enter a secret number with unrepeated digits.');
        return;
    }
    if (guessUniqueNumbers.size !== 4) {
        alert('Please enter a guess number with unrepeated digits.');
        return;
    }

    secret = secret.toString().split('');
    guess = guess.toString().split('');

    for (let i = 0; i < secret.length; i++) {
        if (secret[i] === guess[i]) {
            positionsGot++;
            secret[i] = null;
            guess[i] = null;
        }
    }

    for (let i = 0; i < secret.length; i++) {
        if (guess.includes(secret[i])) {
            numbersGot++;
            guess[guess.indexOf(secret[i])] = null;
        }
    }

    return { positionsGot, numbersGot };
}

function displayResult(player, guess, positionsGot, numbersGot) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${guess}</td>
        <td>${positionsGot}</td>
        <td>${numbersGot}</td>
    `;
    if (player === 1) {
        player1Guesses.appendChild(row);
    } else {
        player2Guesses.appendChild(row);
    }
}

function declareWinner(player) {
    overlay.classList.remove('hidden');
    winnerPopup.classList.remove('hidden');
    winnerText.textContent = `Player ${player} wins!\n
    Player1's number was ${player1Secret.value}
    Player2's number was ${player2Secret.value}`;
    winnerRestart.textContent = 'Restart';
    winnerRestart.addEventListener('click', restartGame);
    winnerPopup.appendChild(winnerRestart);
};

player1Submit.addEventListener('click', () => {
    const secret = player2Secret.value;
    const guess = player1Guess.value;

    if (secret.length === 4 && guess.length === 4) {
        const { positionsGot, numbersGot } = checkGuess(secret, guess);
        displayResult(1, guess, positionsGot, numbersGot);

        // Block the input field if a value has been entered
        if (player1Secret.value) {
            player1Secret.setAttribute("disabled", "disabled");
        }

        if (positionsGot === 4 && numbersGot === 4) {
            declareWinner(1);
        }
    }
});

player2Submit.addEventListener('click', () => {
    const secret = player1Secret.value;
    const guess = player2Guess.value;

    if (secret.length === 4 && guess.length === 4) {
        const { positionsGot, numbersGot } = checkGuess(secret, guess);
        displayResult(2, guess, positionsGot, numbersGot);

        if (player2Secret.value) {
            player2Secret.setAttribute("disabled", "disabled");
        }

        if (positionsGot === 4 && numbersGot === 4) {
            declareWinner(2);
        }
    }
});
function restartGame() {
    player1Secret.removeAttribute("disabled");
    player2Secret.removeAttribute("disabled");
    player1Guesses.innerHTML = '';
    player2Guesses.innerHTML = '';
    overlay.classList.add('hidden');
    winnerPopup.classList.add('hidden');
    player1Secret.value = '';
    player2Secret.value = '';
    player2Guess.value = '';
    player1Guess.value = '';
}