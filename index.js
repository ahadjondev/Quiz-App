 const questions = [
    {
        question: "Which is the largest country in the world",
        answers: [
            {text: "Russia", correct: true},
            {text: "China", correct: false},
            {text: "Japan", correct: false},
            {text: "India", correct: false},
        ]
    },

    {
        question: "Which country speaks Russian",
        answers: [
            {text: "Russia", correct: true},
            {text: "China", correct: false},
            {text: "Japan", correct: false},
            {text: "India", correct: false},
        ]
    },

    {
        question: "Which country produces anime",
        answers: [
            {text: "Russia", correct: false},
            {text: "China", correct: false},
            {text: "Japan", correct: true},
            {text: "India", correct: false},
        ]
    },

    {
        question: "Which country has the highest number of people in the world",
        answers: [
            {text: "Russia", correct: false},
            {text: "China", correct: true},
            {text: "Japan", correct: false},
            {text: "India", correct: false},
        ]
    },

    {
        question: "Did I pass the test? 😊",
        answers: [
            {text: "Yes", correct: true},
            {text: "China", correct: false},
        ]
    },
    
 ];

 const questionElement = document.getElementById("question");
 const answerButton = document.getElementById("answer-buttons");
 const nextBtn = document.getElementById("next-btn");


 let currentQuestionIndex = 0;
 let score = 0;


 function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextBtn.innerHTML = "Next";
    showQuestion();
 }

 function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextBtn.style.display = "none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(e){
     const selectedBtn = e.target;
     const isCorrect = selectedBtn.dataset.correct === "true";
     if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
     } else {
        selectedBtn.classList.add("incorrect");
     }
     Array.from(answerButton.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }   
         button.disabled = true;
    });
    nextBtn.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `Your score is ${score} out of ${questions.length}!`;
    nextBtn.innerHTML = "Play Again";
    nextBtn.style.display = "block";
}
function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    } else {
        showScore();
    } 
}

nextBtn.addEventListener("click", () => {
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
}); 

startQuiz();
