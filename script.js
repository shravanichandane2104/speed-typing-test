const quotes = [
    "The quick brown fox jumps over the lazy dog.",
    "Practice makes perfect.",
    "Typing fast improves productivity and efficiency.",
    "Programming is the art of algorithm design and debugging.",
    "Keep practicing to improve your speed and accuracy."
];

let timeLeft = 60;
let errors = 0;
let totalTyped = 0;
let correctTyped = 0;
let isPlaying = false;
let timer;
let currentQuote = "";

// Get elements
const timeLeftDisplay = document.getElementById("timeLeft");
const errorsDisplay = document.getElementById("errors");
const accuracyDisplay = document.getElementById("accuracy");
const wpmDisplay = document.getElementById("wpm");
const cpmDisplay = document.getElementById("cpm");
const quoteDisplay = document.getElementById("quote");
const inputArea = document.getElementById("input-area");
const startBtn = document.getElementById("start-btn");
const restartBtn = document.getElementById("restart-btn");

// Load a new quote
function loadQuote() {
    currentQuote = quotes[Math.floor(Math.random() * quotes.length)];
    quoteDisplay.innerHTML = "";
    inputArea.value = "";
    inputArea.disabled = false;
    inputArea.focus();

    // Display quote with span for highlighting
    currentQuote.split("").forEach((char) => {
        let span = document.createElement("span");
        span.innerText = char;
        quoteDisplay.appendChild(span);
    });
}

// Start game
startBtn.addEventListener("click", function () {
    if (!isPlaying) {
        isPlaying = true;
        timeLeft = 60;
        errors = 0;
        totalTyped = 0;
        correctTyped = 0;
        loadQuote();
        timer = setInterval(updateTime, 1000);
        startBtn.style.display = "none";
        restartBtn.style.display = "none";
    }
});

// Timer function
function updateTime() {
    if (timeLeft > 0) {
        timeLeft--;
        timeLeftDisplay.innerHTML = timeLeft;
    } else {
        endGame();
    }
}

// Handle typing input and highlight mistakes
inputArea.addEventListener("input", function () {
    if (!isPlaying) return;
    totalTyped++;

    let inputText = inputArea.value;
    let quoteSpans = quoteDisplay.querySelectorAll("span");
    let correctText = currentQuote.substring(0, inputText.length);

    errors = 0;

    quoteSpans.forEach((span, index) => {
        let typedChar = inputText[index];

        if (typedChar == null) {
            span.classList.remove("correct");
            span.classList.remove("incorrect");
        } else if (typedChar === span.innerText) {
            span.classList.add("correct");
            span.classList.remove("incorrect");
        } else {
            span.classList.add("incorrect");
            span.classList.remove("correct");
            errors++;
        }
    });

    updateStats();
});

// Update statistics
function updateStats() {
    errorsDisplay.innerHTML = errors;
    let accuracy = ((totalTyped - errors) / totalTyped) * 100;
    accuracyDisplay.innerHTML = isNaN(accuracy) ? "100%" : accuracy.toFixed(1) + "%";

    let minutes = (60 - timeLeft) / 60;
    let words = correctTyped / 5;
    wpmDisplay.innerHTML = Math.round(words / minutes) || 0;
    cpmDisplay.innerHTML = correctTyped || 0;
}

// End game
function endGame() {
    clearInterval(timer);
    isPlaying = false;
    inputArea.disabled = true;
    restartBtn.style.display = "block";
}

// Restart game
restartBtn.addEventListener("click", function () {
    restartGame();
});

function restartGame() {
    timeLeft = 60;
    errors = 0;
    totalTyped = 0;
    correctTyped = 0;
    timeLeftDisplay.innerHTML = timeLeft;
    errorsDisplay.innerHTML = errors;
    accuracyDisplay.innerHTML = "100%";
    wpmDisplay.innerHTML = "0";
    cpmDisplay.innerHTML = "0";
    restartBtn.style.display = "none";
    startBtn.style.display = "block";
}
