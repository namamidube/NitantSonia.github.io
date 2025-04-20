const words = ["heart", "smile", "namami", "prabhav", "sonia", "nitant", "bopal", "gift", "sweet", "mumma", "papa"];
let usedWords = [];
let currentWord = "";
let correctCount = 0;

function shuffle(word) {
  return word.split('').sort(() => Math.random() - 0.5).join('');
}

function getNewWord() {
  const availableWords = words.filter(w => !usedWords.includes(w));
  if (availableWords.length === 0) return null;
  currentWord = availableWords[Math.floor(Math.random() * availableWords.length)];
  usedWords.push(currentWord);
  document.getElementById("scrambledWord").textContent = shuffle(currentWord.toUpperCase());
  document.getElementById("guessInput").value = "";
  document.getElementById("message").textContent = "";
}

function checkGuess() {
  const guess = document.getElementById("guessInput").value.toLowerCase();
  if (guess === currentWord) {
    correctCount++;
    document.getElementById("score").textContent = correctCount;
    if (correctCount === 2) {
      document.getElementById("message").textContent = "🎉 Great job!";
      setTimeout(() => {
        window.location.href = "../gallery.html?year=2010";
      }, 1000);
    } else {
      getNewWord();
    }
  } else {
    document.getElementById("message").textContent = "❌ Try again!";
  }
}

// Skip the current word and get a new one
function skipWord() {
  getNewWord();
}

window.onload = getNewWord;
