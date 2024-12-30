// Generate a random 4-digit number with no repeated digits
function getFourDigitNumber() {
    let numArr = [];
    while (numArr.length < 4) {
        let digit = Math.floor(Math.random() * 10);
        if (!numArr.includes(digit)) {
            numArr.push(digit);
        }
    }
    return numArr.join("");
}

let targetNumber = getFourDigitNumber();
let numGuesses = 0;

// Compare the guess to the target number and return the result
function compareNumbers(guess) {
    let numCorrectPositions = 0;
    let numCorrectNumbers = 0;
    for (let i = 0; i < 4; i++) {
        let guessDigit = guess.charAt(i);
        if (guessDigit === targetNumber.charAt(i)) {
            numCorrectPositions++;
        } else if (targetNumber.includes(guessDigit)) {
            numCorrectNumbers++;
        }
    }
    return [numCorrectPositions, numCorrectPositions + numCorrectNumbers];
}

// Add a row to the table displaying the guess and its result
function addTableRow(guess, posCorrect, numGot) {
    let table = document.getElementById("guessTable");
    let newRow = table.insertRow(-1);
    let guessCell = newRow.insertCell(0);
    let posCorrectCell = newRow.insertCell(1);
    let numGotCell = newRow.insertCell(2);
    guessCell.innerHTML = guess;
    posCorrectCell.innerHTML = posCorrect;
    numGotCell.innerHTML = numGot;
}

// Check the user's guess and update the table with the result
function guess() {
    let guessInput = document.getElementById("guessInput");
    let guessValue = guessInput.value;
    if (guessValue.length !== 4 || !/^\d{4}$/.test(guessValue)) {
        alert("Please enter a valid 4-digit number.");
        return;
    }
    numGuesses++;
    let result = compareNumbers(guessValue);
    addTableRow(guessValue, result[0], result[1]);
    if (result[0] === 4) {
        alert("Congratulations! You guessed the number in " + numGuesses + " tries." + " The number was indeed " + guessInput.value);
        location.reload();
    }
    guessInput.value = "";
}
