function checkFunFactPrompt() {
    // Check if the fun fact has already been shown
    if (!localStorage.getItem('funFactPromptShown')) {
        // Show the prompt to the user
        document.getElementById('fun-prompt').classList.remove('transparent');
        // Set localStorage to indicate that the prompt has been shown
        localStorage.setItem('funFactPromptShown', 'true');
    }
}

function showFunFact() {
    // Show the fun fact popup
    document.getElementById('fun-popup').classList.remove('transparent');
    // Close the prompt
    closePrompt();
}

function closePrompt() {
    // Hide the prompt
    document.getElementById('fun-prompt').classList.add('transparent');
}

function closePopup(popupId) {
    document.getElementById(popupId).classList.add('transparent'); // Hide the popup
}

// Call the prompt function on page load
window.onload = checkFunFactPrompt;
const WORD_OF_THE_DAY = 'paper'; // Change this daily
const MAX_GUESSES = 6;
let currentGuess = '';
let guessCount = 0;

const board = document.getElementById('board');
const guessInput = document.getElementById('guessInput');
const submitGuessButton = document.getElementById('submitGuess');
const message = document.getElementById('message');

function createBoard() {
    for (let i = 0; i < MAX_GUESSES; i++) {
        const row = document.createElement('div');
        row.classList.add('row');
        for (let j = 0; j < 5; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            row.appendChild(cell);
        }
        board.appendChild(row);
    }
}

function updateBoard(guess, rowIndex) {
    const row = board.children[rowIndex];
    for (let i = 0; i < 5; i++) {
        const cell = row.children[i];
        cell.textContent = guess[i];

        if (guess[i] === WORD_OF_THE_DAY[i]) {
            cell.classList.add('correct');
        } else if (WORD_OF_THE_DAY.includes(guess[i])) {
            cell.classList.add('present');
        } else {
            cell.classList.add('absent');
        }
    }
}

function checkGuess() {
    if (currentGuess.length === 5) {
        updateBoard(currentGuess, guessCount);
        if (currentGuess === WORD_OF_THE_DAY) {
            message.textContent = 'Congratulations! You guessed the word!';
            guessInput.disabled = true;
        } else {
            guessCount++;
            if (guessCount >= MAX_GUESSES) {
                message.textContent = `Game over! The word was "${WORD_OF_THE_DAY}".`;
                guessInput.disabled = true;
            }
        }
        currentGuess = '';
        guessInput.value = '';
    } else {
        message.textContent = 'Please enter a 5-letter word.';
    }
}

submitGuessButton.addEventListener('click', () => {
    currentGuess = guessInput.value.toLowerCase();
    checkGuess();
});

guessInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        submitGuessButton.click();
    }
});

// Initialize the game
createBoard();
