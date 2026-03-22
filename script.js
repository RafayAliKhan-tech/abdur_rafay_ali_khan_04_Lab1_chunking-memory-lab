let original = "";
let chunked = "";
let isChunked = false;
let timerInterval;

// 🔥 Random generator
function randomDigits(length) {
  let result = "";
  for (let i = 0; i < length; i++) {
    result += Math.floor(Math.random() * 10);
  }
  return result;
}

// 🔥 Generate harder data
function generateData(type) {
  if (type === "phone") {
    original = randomDigits(11);
    chunked = original.replace(/(\d{4})(\d{3})(\d{4})/, "$1 $2 $3");
  }
  else if (type === "pin") {
    original = randomDigits(6); // harder than 4
    chunked = original.replace(/(\d{2})(\d{2})(\d{2})/, "$1 $2 $3");
  }
  else if (type === "cnic") {
    original = randomDigits(13);
    chunked = original.replace(/(\d{5})(\d{7})(\d{1})/, "$1 $2 $3");
  }
}

// ⏱ Timer function
function startTimer(seconds) {
  let time = seconds;
  document.getElementById("timer").innerText = "⏱ " + time;

  timerInterval = setInterval(() => {
    time--;
    document.getElementById("timer").innerText = "⏱ " + time;

    if (time === 0) {
      clearInterval(timerInterval);
      document.getElementById("display").innerText = "❓ Type what you remember";
    }
  }, 1000);
}

function startTest(chunk) {
  let type = document.getElementById("testType").value;

  generateData(type);

  isChunked = chunk;

  document.getElementById("display").innerText = chunk ? chunked : original;
  document.getElementById("result").innerText = "";
  document.getElementById("userInput").value = "";

  clearInterval(timerInterval);
  startTimer(5);
}

// 📊 Better scoring
function checkAnswer() {
  let user = document.getElementById("userInput").value.replace(/\s/g, "");
  let correct = original;

  let correctCount = 0;

  for (let i = 0; i < correct.length; i++) {
    if (user[i] === correct[i]) {
      correctCount++;
    }
  }

  let accuracy = ((correctCount / correct.length) * 100).toFixed(1);

  let resultText = `Correct: ${correctCount}/${correct.length} | Accuracy: ${accuracy}%`;

  resultText += isChunked ? " (Chunked)" : " (Ungrouped)";

  document.getElementById("result").innerText = resultText;
}