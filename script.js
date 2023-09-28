// Array of sample quotes for the typing game
const quotes = [
    "The quick brown fox jumps over the lazy dog.",
    "Programming is fun!",
    "JavaScript is awesome!",
    "Practice makes perfect.",
    "Coding is a superpower.",
];

let startTime;
let score = 0;

// Function to select a random quote from the array
function getRandomQuote() {
    return quotes[Math.floor(Math.random() * quotes.length)];
}

// Function to start the game
function startGame() {
    const quote = getRandomQuote();
    document.getElementById("target").textContent = quote;
    document.getElementById("input").value = "";
    document.getElementById("score-value").textContent = score;
    startTime = new Date().getTime();
    updateTimer();
}

// Function to update the timer
function updateTimer() {
    const currentTime = new Date().getTime();
    const elapsedTime = (currentTime - startTime) / 1000;
    document.getElementById("time").textContent = elapsedTime.toFixed(2);
    requestAnimationFrame(updateTimer);
}

// Event listener for input field
document.getElementById("input").addEventListener("input", function () {
    const inputText = this.value;
    const targetText = document.getElementById("target").textContent;
    
    if (inputText === targetText) {
        score++;
        startGame();
    }
});

// Start the game when the page loads
window.onload = startGame;
