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
    window.location.href = 'sp.html'
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
        question: 'What causes Sleeping Beauty to fall into a deep sleep?',
        answers: [
            { text: 'Eating a poisoned apple', correct: false },
            { text: 'Pricking her finger on a spinning wheel', correct: true },
            { text: 'Drinking a magical potion', correct: false },
            { text: 'Being cursed by an evil sorcerer', correct: false }
        ]
    },
    {
        question: 'How long is Sleeping Beauty asleep?',
        answers: [
            { text: '10 years', correct: false },
            { text: '50 years', correct: false },
            { text: '100 years', correct: true },
            { text: '1,000 years', correct: false }
        ]
    },
    {
        question: 'What does the evil fairy curse Sleeping Beauty with?',
        answers: [
            { text: 'Eternal darkness', correct: false },
            { text: 'A deep sleep caused by a spinning wheel', correct: true },
            { text: 'Transformation into an animal', correct: false },
            { text: 'Forgetting her family', correct: false }
        ]
    },
    {
        question: 'Who wakes Sleeping Beauty from her sleep?',
        answers: [
            { text: 'Her mother', correct: false },
            { text: 'The king', correct: false },
            { text: 'Her fairy godmother', correct: false },
            { text: 'The prince', correct: true }
        ]
    },
    {
        question: 'What is the ultimate moral of the story?',
        answers: [
            { text: 'True love can conquer anything', correct: true },
            { text: 'Beware of strangers', correct: false },
            { text: 'Magic always has consequences', correct: false },
            { text: 'Work hard, and you’ll be rewarded', correct: false }
        ]
    }
]
