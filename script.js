//Array of sample quotes for the typing game, swap to api grabber
const quotes = [
    "The quick brown fox jumps over the lazy dog.",
    "Programming is fun!",
    "JavaScript is awesome!",
    "Practice makes perfect.",
    "Coding is a superpower.",
];

//global variables
let startTime;
let score = 0;

//Function to select a random quote from the array
function getRandomQuote() {
    return quotes[Math.floor(Math.random() * quotes.length)];//a random index of the quotes array. Might be useful later
}

//Function to start the game
function startGame() {
    const quote = getRandomQuote();//get a quote
    document.getElementById("target").textContent = quote;//display our quote as target
    document.getElementById("input").value = ""; //our current input
    document.getElementById("score-value").textContent = score;//show players score
    startTime = new Date().getTime();// start our timer
    updateTimer//calls function for timing
}

//Function to update the timer
function updateTimer() { //ngl i got this part from chatgpt 
    const currentTime = new Date().getTime();
    const elapsedTime = (currentTime - startTime) / 1000;
    document.getElementById("time").textContent = elapsedTime.toFixed(2);
    requestAnimationFrame(updateTimer);
}

//Event listener for input field
document.getElementById("input").addEventListener("input", function () {//we are checking input
    const inputText = this.value;//grabs the current input
    const targetText = document.getElementById("target").textContent;//grabs target text
    
    if (inputText === targetText) {//compares if its right
        score++; //increment score
        startGame(); //start next session, move this outside if statement and have start game spawn falling blocks
    }
});

//Start the game when the page loads
window.onload = startGame;
