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
    window.location.href = 'LRRH.html' //Back to the "Little Red Riding Hood" mainpage
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
        question: 'What was Little Red Riding Hood carrying to her grandmother house?',
        answers: [
            { text: 'basket of flowers', correct: false },
            { text: 'basket of food', correct: true },
            { text: 'basket of toys', correct: false },
            { text: 'basket of books', correct: false }
        ]
    },
    {
        question: 'Who reached the grandmother’s house first?',
        answers: [
            { text: 'Little Red Riding Hood', correct: false },
            { text: 'The wolf', correct: true },
            { text: 'The huntsman', correct: false },
            { text: 'The grandmother herself', correct: false }
        ]
    },
    {
        question: 'How was the wolf defeated in most versions of the story?',
        answers: [
            { text: 'Little Red Riding Hood outsmarts him', correct: false },
            { text: 'The grandmother defeats him', correct: false },
            { text: 'A huntsman or lumberjack saves the day', correct: true },
            { text: 'The wolf simply leaves', correct: false }
        ]
    },
    {
        question: 'What lesson does "Little Red Riding Hood" teach?',
        answers: [
            { text: 'Always share your food with strangers', correct: false },
            { text: 'Wolves are misunderstood creatures', correct: false },
            { text: 'Always carry a weapon', correct: false },
            { text: 'Never stray off the path or talk to strangers', correct: true }
        ]
    },
    {
        question: 'What happens to the grandmother in older versions of the story?',
        answers: [
            { text: 'She is eaten by the wolf', correct: true },
            { text: 'She runs away and hides', correct: false },
            { text: 'She defeats the wolf herself', correct: false },
            { text: 'She is saved by Little Red Riding Hood', correct: false }
        ]
    }
]
