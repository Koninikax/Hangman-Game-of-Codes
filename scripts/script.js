
const wordDisplay = document.querySelector(".word-display");
const guessesText = document.querySelector(".guesses-text b");
const keyboardDiv = document.querySelector(".keyboard");
const hangmanImage = document.querySelector(".hangman-box img");
const gameModal = document.querySelector(".game-modal");
const playAgainBtn = gameModal.querySelector("button");

// Initializing game variables
let currentWord, correctLetters, wrongGuessCount;
const maxGuesses = 6;

const resetGame = () => {
    // Ressetting game variables and UI elements
    correctLetters = [];
    wrongGuessCount = 0;
    hangmanImage.src = "images/hangman-0.svg";
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;
    wordDisplay.innerHTML = currentWord.split("").map(() => `<li class="letter"></li>`).join("");
    keyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled = false);
    gameModal.classList.remove("show");
}

const getRandomWord = () => {
    // Selecting a random word and hint from the wordList
    const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
    currentWord = word; // Making currentWord as random word
    document.querySelector(".hint-text b").innerText = hint;
    resetGame();
}

const gameOver = (isVictory) => {
    // After game complete.. showing modal with relevant details
    const modalText = isVictory ? `You found the word:` : 'The correct word was:';
    gameModal.querySelector("img").src = `images/${isVictory ? 'victory' : 'lost'}.gif`;
    gameModal.querySelector("h4").innerText = isVictory ? 'Congrats!' : 'Game Over!';
    gameModal.querySelector("p").innerHTML = `${modalText} <b>${currentWord}</b>`;
    gameModal.classList.add("show");
}


const initGame = (button, clickedLetter) => {
    // Checking if clickedLetter is exist on the currentWord
    if(currentWord.includes(clickedLetter)) {
        // Showing all correct letters on the word display
        [...currentWord].forEach((letter, index) => {
            if(letter === clickedLetter) {
                correctLetters.push(letter);
                wordDisplay.querySelectorAll("li")[index].innerText = letter;
                wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
            }
        });
    } else {
        // If clicked letter doesn't exist then update the wrongGuessCount and hangman image
        wrongGuessCount++;
        hangmanImage.src = `images/hangman-${wrongGuessCount}.svg`;
    }
    button.disabled = true; // Disabling the clicked button so user can't click again
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;

    // Calling gameOver function if any of these condition meets
    if(wrongGuessCount === maxGuesses) return gameOver(false);
    if(correctLetters.length === currentWord.length) return gameOver(true);
}

// Creating keyboard buttons and adding event listeners
for (let i = 97; i <= 122; i++) {
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(i);
    keyboardDiv.appendChild(button);
    button.addEventListener("click", (e) => initGame(e.target, String.fromCharCode(i)));
}

getRandomWord();
playAgainBtn.addEventListener("click", getRandomWord);
// JavaScript code for the Hangman game
// Initialize an empty array to store game results
const gameResults = [];

// Function to show the name popup and handle game results
function showNamePopup() {
    const namePopup = document.querySelector('.name-popup');
    namePopup.style.display = 'block';

    document.getElementById('nameSubmit').addEventListener('click', function () {
        const playerName = document.getElementById('playerName').value;

        if (playerName) {
            namePopup.style.display = 'none';

            // Replace this with your game logic to check if the guess is correct
            const isCorrectGuess = true; // Example: Replace with your actual logic

            // Initialize the player's score to 0 if it doesn't exist
            if (!gameResults[playerName]) {
                gameResults[playerName] = { score: 0 };
            }

            // Update the player's score only if the guess is correct
            if (isCorrectGuess) {
                gameResults[playerName].score += 10; // Add 10 points for a correct guess
            }


            // Update the leaderboard
            updateLeaderboard();
        } else {
            alert('Please enter your name.');
        }
    });
}

function updateLeaderboard() {
    const leaderboardList = document.getElementById('leaderboard-list');
    leaderboardList.innerHTML = '';

    // Convert the game results object into an array
    const leaderboardArray = Object.entries(gameResults);

    // Sort the leaderboard array by player score in descending order
    leaderboardArray.sort((a, b) => b[1].score - a[1].score);

    // Display the top 10 game results in the leaderboard
    const topResults = leaderboardArray.slice(0, 10);
    topResults.forEach((result, index) => {
        const playerName = result[0];
        const playerScore = result[1].score;
        const listItem = document.createElement('li');
        listItem.textContent = `${index + 1}. ${playerName}: ${playerScore} points`;
        leaderboardList.appendChild(listItem);
    });
}

// Call showNamePopup when you want to start a new game
showNamePopup();
// Function to start a new game or reset the game state
function startNewGame() {
    // Reset game-related variables here
    playerScore = 0;
    roundsPlayed = 0;
    // Add any other game reset logic you need

    // Show the name popup to enter the player's name
    showNamePopup();
}

// Add an event listener for the "Play Again" button
document.querySelector('.play-again').addEventListener('click', startNewGame);

// Call this function to start a new game or when the page loads
startNewGame();
