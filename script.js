let currentQuestion = 0;
let correctAnswers = 0;
let quizData = [];

// クイズデータをロード
async function loadQuizData() {
  const response = await fetch('data/ai_quiz.json');
  quizData = await response.json();
  showQuestion();
}

// 問題を表示
function showQuestion() {
  const questionElement = document.getElementById('question');
  const optionsElement = document.getElementById('options');
  const nextButton = document.getElementById('next-button');
  const scoreElement = document.getElementById('score');
  const retryButton = document.getElementById('retry-button');

  nextButton.style.display = 'none';
  scoreElement.style.display = 'none';
  retryButton.style.display = 'none';
  optionsElement.innerHTML = '';

  if (currentQuestion < quizData.length) {
    const quiz = quizData[currentQuestion];
    questionElement.textContent = quiz.question;

    quiz.options.forEach((option, index) => {
      const button = document.createElement('button');
      button.textContent = option;
      button.onclick = () => checkAnswer(index);
      optionsElement.appendChild(button);
    });
  } else {
    showScore();
  }
}

// 回答をチェック
function checkAnswer(selected) {
  const nextButton = document.getElementById('next-button');

  if (quizData[currentQuestion].answer === selected) {
    correctAnswers++;
    alert('正解！');
  } else {
    alert('不正解！');
  }

  currentQuestion++;
  nextButton.style.display = 'inline';
}

// スコアを表示
function showScore() {
  const scoreElement = document.getElementById('score');
  const retryButton = document.getElementById('retry-button');

  scoreElement.textContent = `あなたのスコアは ${correctAnswers} / ${quizData.length} です！`;
  scoreElement.style.display = 'block';
  retryButton.style.display = 'inline';

  retryButton.onclick = () => {
    currentQuestion = 0;
    correctAnswers = 0;
    showQuestion();
  };
}

// 「次へ」ボタンの動作
document.getElementById('next-button').addEventListener('click', () => {
  showQuestion();
});

// 初期化
loadQuizData();
