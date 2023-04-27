const quizContainer = document.getElementById("quiz");
const questionElement = document.getElementById('question');
const optionElements = document.querySelectorAll('.answer');
const optionA = document.getElementById('option_a');
const optionB = document.getElementById('option_b');
const optionC = document.getElementById('option_c');
const optionD = document.getElementById('option_d');
const nextBtn = document.getElementById('next');
const submitBtn = document.getElementById('submit');


let currentQuestion = 0;
let score = 0;

const questions = [
    {
        question: "In a switch statement, the ________ case clause is used to process exceptional conditions and is usually listed last.",
        options: [
            { text: "break", correct: false },
            { text: "default", correct: true },
            { text: "else", correct: false },
            { text: "then", correct: false }    
        ]
    },
    {
        question: "The technique of developing and maintaining a large program by constructing it from small, simple pieces is called ________.",
        options: [
            { text: "divide and conquer", correct: true },
            { text: "modular programming", correct: false },
            { text: "multitasking", correct: false },
            { text: "multiprogramming", correct: false }
        ]
    },
    {
        question: "All variables declared in function definitions are ________.",
        options: [
            { text: "global variables", correct: false },
            { text: "static variables", correct: false },
            { text: "constant variables", correct: false },
            { text: "local variables", correct: true }
        ] 
    },
    {
        question: "A function’s ________ are also considered to be local variables.",
        options: [
            { text: "parameters", correct: true },
            { text: "static variables", correct: false },
            { text: "register variables", correct: false },
            { text: "constant variables", correct: false }
        ]
    },
    {
        question: "The style of programming in which the user interacts with a GUI component is called ________ programming.",
        options: [
            { text: "modula", correct: false },
            { text: "automatic", correct: false },
            { text: "event driven", correct: true },
            { text: "object oriented", correct: false },
        ]   
    }
];

function startQuiz(){
    resetQuiz();
    showQuestion();
}

function resetQuiz(){
    currentQuestion = 0;
    score = 0;
    deselectOptions();
}

function showQuestion() {
    deselectOptions();
    const question = questions[currentQuestion];
    questionElement.innerText = question.question;
    optionA.innerText = question.options[0].text;
    optionB.innerText = question.options[1].text;
    optionC.innerText = question.options[2].text;
    optionD.innerText = question.options[3].text;

    if (currentQuestion === questions.length - 1) {
        nextBtn.style.display = 'none';
        nextBtn.removeEventListener('click', nextQuestion);
    } else {
        nextBtn.style.display = 'block';
        nextBtn.addEventListener('click', nextQuestion);
    }
}

function selectOption() {
    let selectedOption = "";
    optionElements.forEach(option => {
      if (option.checked) {
        selectedOption = option.nextElementSibling.innerText;
      }
    });
    return selectedOption;
}

function deselectOptions() {
    optionElements.forEach(option => {
      option.checked = false;
    });
}

function checkAnswer(answer) {
    const question = questions[currentQuestion];
    const correctAnswer = question.options.find(option => option.correct);
    if (correctAnswer && answer === correctAnswer.text) {
      score++;
    }
}

function nextQuestion() {
    const selectedOption = selectOption();
    if (selectedOption !== "") { // only proceed if an option is selected
      checkAnswer(selectedOption);
      currentQuestion++;
      if (currentQuestion < questions.length) {
        showQuestion();
      } else {
        endQuiz();
      }
    }
}

function endQuiz() {
    questionElement.classList.add("center");
    questionElement.innerText = "Quiz completed. Your score is " + score + " out of " + questions.length;
    nextBtn.style.display = 'none';
    submitBtn.style.display = 'none';

    const optionsContainer = document.getElementById('options-container');
    optionsContainer.style.display = 'none';
}

window.onload = function(){
    startQuiz();
}

nextBtn.addEventListener('click', nextQuestion);
submitBtn.addEventListener('click', endQuiz);
