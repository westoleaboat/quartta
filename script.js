// Initialize variables
let intervalId;
let timerIntervalId;
let previousNumber = null;
let repetitionCount = 0;
let secondsElapsed = 0;

// Function to generate a random number between 0 and 9
function getRandomNumber() {
    const randomNumber = Math.floor(Math.random() * 10);
    console.log(randomNumber);
    return randomNumber;
}

// Function to update the random number and repetition count
function updateRandomNumber() {
    const randomNumberElement = document.getElementById("randomNumber");
    const newNumber = getRandomNumber();

    // Update repetition count if the number repeats consecutively
    repetitionCount = (newNumber === previousNumber) ? repetitionCount + 1 : 0;
    previousNumber = newNumber;

    // Update the displayed number and repetition count
    randomNumberElement.textContent = newNumber;
    document.getElementById("repetitionCount").textContent = `Repetitions: ${repetitionCount}`;
}

// Function to update the timer
function updateTimer() {
    secondsElapsed++;
    const minutes = String(Math.floor(secondsElapsed / 60)).padStart(2, "0");
    const seconds = String(secondsElapsed % 60).padStart(2, "0");
    document.getElementById("timer").textContent = `${minutes}:${seconds}`;
}

// Function to start the game
function startGame() {
    if (!intervalId) {
        console.log("Timer STARTED !");
        // Start updating the random number every second
        intervalId = setInterval(updateRandomNumber, 1000);
        // Start the timer
        timerIntervalId = setInterval(updateTimer, 1000);
        // Show the stop button and hide the start and restart buttons
        document.getElementById("stopButton").style.display = "block";
        document.getElementById("startButton").style.display = "none";
        document.getElementById("restartButton").style.display = "none";
    }
}

// Function to stop the game
function stopGame() {
    if (intervalId) {
        console.log("STOP TIMER");
        clearInterval(intervalId);
        clearInterval(timerIntervalId);
        intervalId = null;
        timerIntervalId = null;
        // Show the start button, change its text to "CONTINUE", show the restart button, and hide the stop button
        document.getElementById("startButton").style.display = "block";
        document.getElementById("startButton").textContent = "CONTINUE";
        document.getElementById("restartButton").style.display = "block";
        document.getElementById("stopButton").style.display = "none";
    }
}

// Function to restart the game
function restartGame() {
    console.log("RESTART");
    // Reset variables
    secondsElapsed = 0;
    previousNumber = null;
    repetitionCount = 0;

    // Reset displayed values
    document.getElementById("randomNumber").textContent = "0";
    document.getElementById("timer").textContent = "00:00";
    document.getElementById("repetitionCount").textContent = "Repetitions: 0";

    // Hide the restart button and show the start button
    document.getElementById("restartButton").style.display = "none";
    document.getElementById("startButton").textContent = "START";
    document.getElementById("startButton").style.display = "block";
}

// Event listeners for buttons
document.getElementById("startButton").addEventListener("click", startGame);
document.getElementById("stopButton").addEventListener("click", stopGame);
document.getElementById("restartButton").addEventListener("click", restartGame);

// Event listener for the start link to hide the overlay after 3 seconds
document.getElementById('startLink').addEventListener('click', function() {
    setTimeout(function() {
        document.getElementById('startGame').style.display = 'none';
    }, 2000); // 2000 milliseconds = 2 seconds
});
