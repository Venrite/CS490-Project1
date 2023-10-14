   const gameContainer = document.getElementById("game-container");//gray area to play in 
        const player = document.getElementById("player");//player box rn
        let score = 0;
		let time = 0;
		let lives=3;
		
        // Function to fetch random words from an API
        async function fetchWords(length) {//length can be our difficulty, can add multiple words to it even
            try {
                const response = await fetch(`https://random-word-api.herokuapp.com/word?number=1&length=${length}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                return data;
            } catch (error) {
                console.error('Error fetching words:', error);
                return [];
            }
        }
		function createHearts() {//yash's make hearts
			const heartsContainer = document.getElementById('lives');
			heartsContainer.innerHTML = ''; // Clear existing hearts
			for (let i = 0; i < lives; i++) {
				const heart = document.createElement('div');
				heart.classList.add('heart');
				heartsContainer.appendChild(heart);
			}
		}
        // Function to create and animate a word
        async function createWord() {//asynce to use await 
            const wordBox = document.createElement("div");//make DOM area
            wordBox.classList.add("word-box");//give it a wordbox
			wordBox.style.left = `${Math.random() * 50 + 25}vw`;//give it a position based on viewport width
            const randomWord = await fetchWords(6);//get word based on 6 length rn
            wordBox.textContent = randomWord;//prolly put await fetch here
            gameContainer.appendChild(wordBox);//add a child node to the game container.

            // Adjust animation duration based on word length
            const animation = wordBox.animate(//set our animation for the words
                [
                    { top: "0%" },    // Start from the top
                    { top: "100%" },  // Move to the bottom
                ],
                {
                    duration: 4000, // Adjust animation speed, can be made faster or slower
                    easing: "linear",
                }
            );

            animation.onfinish = () => {//once the animation is done
                if (!wordBox.classList.contains("killed")) { //if it isnt killed
                    lives--;
					// Update the heart graphic
					const heartsContainer = document.getElementById('lives');
					const hearts = document.querySelectorAll('.heart');
					hearts[lives].remove();
					if (lives<=0){//safer to say lessthan incase any weird bug occurs
							endGame();
					}
                }
            wordBox.remove();//this makes it so you cant type the word after the life is lost and removes a bug. could prolly use a lock =false /true
            };
        }

        // Function to end the game
        function endGame() {
            alert(`Game Over! Score: ${score}`);
			location.reload();
        }
		function updateScore() {
			const scoreElement = document.getElementById("scoreValue");
			scoreElement.textContent = score;
		}
		function updateTimer() {//it turns our clock on
			const currentTime = new Date().getTime();
			const elapsedTime = (currentTime - startTime) / 1000;
			document.getElementById("time").textContent = elapsedTime.toFixed(2);
			requestAnimationFrame(updateTimer);
			}

        // Event listener for typing in the text box
        textbox.addEventListener("input", () => {
            const typedText = textbox.value.trim().toLowerCase();//convert whats typed to lwoercase
            const wordBoxes = document.querySelectorAll(".word-box");//grab every wordbox in the game container
            wordBoxes.forEach((wordBox) => {//a beautiful for loop going through our wordboxes
                const wordText = wordBox.textContent.trim().toLowerCase();//take the target text and make it lowercase
                if (typedText === wordText) {
					startTime = new Date().getTime();//restart our timer for now
                    wordBox.classList.add("killed");//add a killed modifer to the object
                    wordBox.style.backgroundColor = "#0f0"; //change color to green when killed
                    wordBox.style.animation = "shake 0.5s"; //apply the shake animation
                    setTimeout(() => {
                        wordBox.remove(); //remove the word box after the animation
                    }, 500); //wait for the animation to finish
                    score++;
                    textbox.value = ""; //clear the text box
					updateScore();
                }
            });
        });

        // Game loop to create words periodically
        async function gameLoop() {
			if (lives === 3) {
				createHearts();
			}
			startTime = new Date().getTime();//starts timer
			updateTimer();//literally just turns our clock on
            setInterval(() => {
                createWord();
            }, 1000); //adjust the interval for word creation
        }
		
        gameLoop();//this is here to start the game, can be moved to later as a start button
      
