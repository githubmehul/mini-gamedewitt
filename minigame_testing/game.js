const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');
const image = document.querySelector("img")

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []
let counter = 0

let questions = [
    {
        question: "Where did Willem Adriaan de Wit come from before landing in Malacca?",
        choice1: "Johannesburg",
        choice2: "Cape Town",
        choice3: "Durban",
        choice4: "Portugal",
        answer: 2,
    },
    {
        question: "What was the name  given to Petrus Johannes de Wit’s Father In Law, Adriaan Koek by the Malay rulers?",
        choice1: "The Merchant",
        choice2: "Tuan Raja",
        choice3: "The Trader",
        choice4: "Tuan Raja Muda",
        answer: 4,
    },
    {
        question: "Which occupation did the grandfather, John Charles De Witt have that brought the family much recognition?",
        choice1: "Working with Seafield Estates",
        choice2: "Working as a Signal Master at Malayan Railways4",
        choice3: "Main distributor for Singer Sewing Machines for the Southern region of Malaya",
        choice4: "None of the above",
        answer: 3,
    }
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 3

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
    
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })
    availableQuestions.splice(questionsIndex, 1)
    
    acceptingAnswers = true
    img()
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

function img() {
    var image1, image2, image3

    if (currentQuestion.answer == 2) {
        image = image.src = "image1.png"   
        image = "none"
    }
    else if (currentQuestion.answer == 4) {
        image = image.src = "image2.png"   
        image1 = "none"
    } else {
        image = image.src = "image3.png" 
        image1 = "none"   
        image2 = "none"   
    }
}

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()