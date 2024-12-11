const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
})

function startGame() {
    startButton.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hide')
    setNextQuestion()
}

function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    })
}

function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide')
    } else {
        startButton.innerText = 'Return'
        startButton.classList.remove('hide')
        startButton.addEventListener('click', returnToHome)
    }
}

function returnToHome() {
    window.location.href = 'Bluebeard.html' //Back to the "Little Red Riding Hood" mainpage
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

const questions = [
    {
        question: 'What does Bluebeard give his wife before leaving the castle?',
        answers: [
            { text: 'A treasure map', correct: false },
            { text: 'A set of keys', correct: true },
            { text: 'A list of rules', correct: false },
            { text: 'A golden chest', correct: false }
        ]
    },
    {
        question: 'What is the wife forbidden from doing?',
        answers: [
            { text: 'Leaving the castle', correct: false },
            { text: 'Cooking a specific meal', correct: false },
            { text: 'Using a particular key', correct: true },
            { text: 'Talking to strangers', correct: false }
        ]
    },
    {
        question: 'What does the wife discover in the forbidden room?',
        answers: [
            { text: 'A hidden treasure', correct: false },
            { text: 'A magical mirror', correct: false },
            { text: 'A portal to another world', correct: false },
            { text: 'The bodies of Bluebeard’s previous wives', correct: true }
        ]
    },
    {
        question: 'How does the wife signal for help when Bluebeard plans to kill her?',
        answers: [
            { text: 'By asking her brothers to visit', correct: true },
            { text: 'By shouting from the tower', correct: false },
            { text: 'By sending a letter', correct: false },
            { text: 'By using a secret code', correct: false }
        ]
    },
    {
        question: 'What happens to Bluebeard at the end of the story?',
        answers: [
            { text: 'He is forgiven and changes his ways', correct: false },
            { text: 'He escapes and is never seen again', correct: false },
            { text: 'He is overpowered and killed by the wife’s brothers', correct: true },
            { text: 'He surrenders and leaves the castle', correct: false }
        ]
    }
]