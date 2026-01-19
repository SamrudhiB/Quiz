const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const answerContainer = document.getElementById("ans-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");
const progressBar  = document.getElementById("progress");

const quizQuestions = [
    {
        question: "What is the capital of France?",
        answers:[
            {text: "London", correct: false},
            {text: "Berlin", correct: false},
            {text: "Paris", correct: true},
            {text: "Madrid", correct: false},
        ],
    },
    
    {
        question: "Which is the smallest planet in our Solar System?",
        answers:[
            {text: "Earth", correct: false},
            {text: "Mars", correct: false},
            {text: "Mercury", correct: true},
            {text: "Venus", correct: false},
        ],
    },
    
    {
        question: "Who is known as the “Father of the Indian Constitution”?",
        answers:[
            {text: "Jawaharlal Nehru", correct: false},
            {text: "Mahatma Gandhi", correct: false},
            {text: "Sardar Vallabhbhai Patel", correct: false},
            {text: "Dr. B. R. Ambedkar", correct: true},
        ],
    },
    
    {
        question: "What is the capital city of Australia?",
        answers:[
            {text: "Sydney", correct: false},
            {text: "Canberra", correct: true},
            {text: "Melbourne", correct: false},
            {text: "Perth", correct: false},
        ],
    },
    
    {
        question: "Which gas is most abundant in the Earth’s atmosphere?",
        answers:[
            {text: "Nitrogen", correct: true},
            {text: "Carbondioxide", correct: false},
            {text: "Oxygen", correct: false},
            {text: "Hydrogen", correct: false},
        ],
    },
    
];

let currentQuestionIndex = 0;
let score = 0;
let answersDisabled = false;

totalQuestionSpan.textContent=quizQuestions.length;
maxScoreSpan.textContent=quizQuestions.length;

startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);

function startQuiz(){
    //reset vars
    currentQuestionIndex = 0;
    scoreSpan.textContent = 0;

    startScreen.classList.remove("active");
    quizScreen.classList.add("active");

    showQuestion();
}

function showQuestion(){
    //reset state
    answersDisabled = false;

    const currentQuestion = quizQuestions[currentQuestionIndex];
    currentQuestionSpan.textContent = currentQuestionIndex + 1;
    const progressPercent = (currentQuestionIndex / quizQuestions.length) * 100;
    progressBar.style.width = progressPercent+"%";
    questionText.textContent = currentQuestion.question;

    answerContainer.innerHTML="";

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.textContent = answer.text;
        button.classList.add("ans-btn");


        button.dataset.correct = answer.correct;

        button.addEventListener("click", selectAnswer)

        answerContainer.appendChild(button);
    })
}

function selectAnswer(event){
    if(answersDisabled) return;

    answersDisabled=true;

    const selectedButton = event.target;
    const isCorrect = selectedButton.dataset.correct === "true"

    Array.from(answerContainer.children).forEach(button => {
        if( button.dataset.correct === "true"){
            button.classList.add("correct");
        } else{
            button.classList.add("incorrect");
        }
    });

    if(isCorrect){
        score++;
        scoreSpan.textContent = score;
    }

    setTimeout(() => {
        currentQuestionIndex++;
        if(currentQuestionIndex < quizQuestions.length){
            showQuestion()
        }
        else{
            showResults();
        }
        
    }, 1000);
}


function showResults(){
    quizScreen.classList.remove("active");
    resultScreen.classList.add("active");

    finalScoreSpan.textContent = score;

    const percentage = (score/quizQuestions.length)*100;

    if(percentage === 100){
        resultMessage.textContent="Perfect! You're a genius!";
    } else if(percentage >= 80){
        resultMessage.textContent="Great Job! You know you stuff!";
    } else if(percentage >= 60){
        resultMessage.textContent="Great effort! Keep learning!";
    } else if(percentage >= 40){
        resultMessage.textContent="Not bad! Try again to improve!";
    } else{
        resultMessage.textContent = "Keep studying! You'll get better!";
    }
}
function restartQuiz(){
    resultScreen.classList.remove("active");
    startQuiz();
}