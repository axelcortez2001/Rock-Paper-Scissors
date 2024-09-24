// Variables to track score
let humanScore = 0;
let computerScore = 0;
const maxScore = 5;

// Get the elements
const resultText = document.getElementById("result-text");
const scoreText = document.getElementById("score-text");
const choices = document.querySelectorAll(".choice");
const resetButton = document.getElementById("reset-button");

choices.forEach((choice) => {
  choice.addEventListener("click", () => {
    if (humanScore < maxScore && computerScore < maxScore) {
      const humanChoice = choice.getAttribute("data-choice");
      const computerChoice = getComputerChoice();

      playRound(humanChoice, computerChoice);
      choice.classList.add("animated");
      setTimeout(() => choice.classList.remove("animated"), 500);
    }
  });
});

resetButton.addEventListener("click", resetGame);

function getComputerChoice() {
  const choices = ["rock", "paper", "scissors"];
  const randomIndex = Math.floor(Math.random() * 3);
  return choices[randomIndex];
}
function playRound(humanChoice, computerChoice) {
  console.log(`Human chose: ${humanChoice}`);
  console.log(`Computer chose: ${computerChoice}`);

  if (humanChoice === computerChoice) {
    resultText.textContent = "It's a tie!";
  } else if (
    (humanChoice === "rock" && computerChoice === "scissors") ||
    (humanChoice === "paper" && computerChoice === "rock") ||
    (humanChoice === "scissors" && computerChoice === "paper")
  ) {
    humanScore++;
    resultText.textContent = "You win this round!";
  } else {
    computerScore++;
    resultText.textContent = "Computer wins this round!";
  }

  scoreText.textContent = `You: ${humanScore} | Computer: ${computerScore}`;
  if (humanScore === maxScore) {
    resultText.textContent = "Congratulations! You won the game!";
    endGame();
  } else if (computerScore === maxScore) {
    resultText.textContent = "Game over! Computer wins the game!";
    endGame();
  }
}

function endGame() {
  choices.forEach((choice) => (choice.disabled = true));
  resetButton.classList.remove("hidden");
}

function resetGame() {
  humanScore = 0;
  computerScore = 0;
  resultText.textContent = "Make your move!";
  scoreText.textContent = `You: 0 | Computer: 0`;
  resetButton.classList.add("hidden");
  choices.forEach((choice) => (choice.disabled = false));
}
