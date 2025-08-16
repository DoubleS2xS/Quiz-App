const questions = [
    {
      question: 'What is capital of USA?',
      answers: [
        {text: "Moscow", correct: false},
        {text: "Washington, D.C.", correct: true},
        {text: "Ankara", correct: false},
        {text: "Tokyo", correct: false},
      ]
    },
    {
      question: 'Which is the biggest animal in the world?',
      answers: [
          {text: "Tiger", correct: false},
          {text: "Dog", correct: false},
          {text: "Lion", correct: false},
          {text: "Blue Whale", correct: false},
      ]
    },
    {
        question: 'Which is the biggest country in the world?',
        answers: [
            {text: "China", correct: false},
            {text: "Brazil", correct: false},
            {text: "USA", correct: false},
            {text: "Russia", correct: false},
        ]
    },
    {
      question: 'Who created law of gravity?',
      answers:[
          {text: "Sir Isaac Newton", correct: true},
          {text: "Albert Einstein", correct: false},
          {text: "Nikola Tesla", correct: false},
          {text: "Archimedes", correct: false},
      ]
    }
]

const questionTitle = document.querySelector(".question");
const answerButton = document.querySelector(".options");
const nextButton = document.querySelector(".next");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
  currentQuestionIndex = 0;
  score = 0;
  nextButton.textContent = 'Next';
  showQuestion();
}

function showQuestion(){
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionIndex = currentQuestionIndex + 1;
  questionTitle.innerHTML = questionIndex + ". " + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
      const button = document.createElement("button");
      button.textContent = answer.text;
      button.classList.add("btn");
      answerButton.appendChild(button);
      if (answer.correct) {
        button.dataset.correct = answer.correct;
      }
      button.addEventListener("click", selectAnswer);
  });
}

function resetState(){
  nextButton.style.display = "none";
  while (answerButton.firstChild) {
    answerButton.removeChild(answerButton.firstChild);
  }
}

function selectAnswer(e){
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  }
  else{
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButton.children).forEach((button) =>{
    if (button.dataset.correct === "true"){
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

function showScore(){
  resetState();
  questionTitle.innerHTML = `Your score ${score} out of ${questions.length}!`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
}

function handleNextButton(){
  currentQuestionIndex++;
  if(currentQuestionIndex < questions.length){
    showQuestion();
  }
  else{
    showScore();
  }
}

nextButton.addEventListener("click", () =>{
    if (currentQuestionIndex < questions.length){
      handleNextButton();
    }
    else{
      startQuiz();
    }
})

startQuiz();