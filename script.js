// Global variables
let startTime;
let score = 0;
let intervalId;//handles position, might need to be come a class object
let wordPosition;

// Function to select a random word from the API, make separate functions to change difficulty IE length=7,8,9,10..etc
async function getRandomWord() {
  try {
    const response = await fetch('https://random-word-api.herokuapp.com/word?number=1&length=6');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const words = await response.json();
    return words; // Return the first word from the array
  } catch (error) {
    console.error('Error fetching word:', error);
    return '';
  }
}

// Function to start the game
async function startGame() {
  try {//handles issues
    const word = await getRandomWord(); // Get a word from a function (can be used to change difficulty later)
   // console.log('Fetched word:', word); // Log the fetched word to the console, might be needed for multiple words falling
    const gameContainer = document.getElementById("game-container");//set playing area
    const player = document.getElementById("player");//make player zone 
    document.getElementById('target').textContent = word; // Display the word falling down
    document.getElementById("input").value = ""; //our current input for the one falling box
    document.getElementById("score-value").textContent = score;//show players score
    startTime = new Date().getTime();// start our timer
    updateTimer();//call update timer function
	
    // Set a random initial position for the word at the top
    const windowWidth = window.innerWidth;//grab windows width
    const initialPosition = Math.random() * (windowWidth - 100); // the 100 makes sure it stays on screen with no side scrolling needed
    wordPosition = -30; // Starting just above the screen
    document.getElementById('target').style.left = `${initialPosition}px`;//take the previous drop point and move by pixels, so drop isnt from same spot
    
    clearInterval(intervalId); // Clear any existing interval PROBABLY GOING TO BE CHANGED when multiple drop
    intervalId = setInterval(moveWord, 20); // Start moving the word, handles animation
  } catch (error) {//incase of failure with the await command, this is redundant but errors slipped through in testing
    console.error('Error starting the game:', error);
  }
}

// Function to move the word downward
function moveWord() {
  const wordElement = document.getElementById('target');//grab our one target currently
  wordPosition += 3; // Adjust the speed by changing this value

  // Set the position of the word
  wordElement.style.position = 'absolute';//poisition near previous ancestor
  wordElement.style.top = `${wordPosition}px`;// at the top of the screen 30 px's above screen

  // If the word is out of the screen, start a new game and display scores
  if (wordPosition > window.innerHeight) {
    clearInterval(intervalId);
	endGame();
  }
}
function endGame() {
    alert(`Game Over! Score: ${score}`);
    location.reload(); // For simplicity, reload the page to restart, however we could just use startgame with a score and timer wipe.
     }
// Function to update the timer, 100% not made by me, couldnt figure it out so had chatgpt help with the timer
function updateTimer() {
    const currentTime = new Date().getTime();
    const elapsedTime = (currentTime - startTime) / 1000;
    document.getElementById("time").textContent = elapsedTime.toFixed(2);
    requestAnimationFrame(updateTimer);
}
// Event listener for input field, monitors what we type to match with the target.
//overall this feels slow in the game, it lags when matching, might need to optimize somehow
document.getElementById('input').addEventListener('input', async function () {
  const inputText = this.value;
  const targetText = document.getElementById('target').textContent;

  if (inputText === targetText) {
    score++;
    startGame(); // Wait for startGame to complete before moving to the next game
  }
});

// Start the game when the page loads
window.onload = startGame;
