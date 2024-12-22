document.addEventListener('DOMContentLoaded', () => {
    const startScreen = document.getElementById('start-screen');
    const quizScreen = document.getElementById('quiz-screen');
    const endScreen = document.getElementById('end-screen');
    const startBtn = document.getElementById('start-btn');
    const nextBtn = document.getElementById('next-btn');
    const questionContainer = document.getElementById('question-container');
    const answerButtonsElement = document.getElementById('answer-buttons');
    const scoreElement = document.getElementById('score');
    const restartBtn = document.getElementById('restart-btn');
    const playerNameInput = document.getElementById('player-name');

    let shuffledQuestions, currentQuestionIndex, score;

    const questions = [
        {
            question: '¿En qué año comenzó la Primera Guerra Mundial?',
            answers: [
                { text: '1914', correct: true },
                { text: '1918', correct: false },
                { text: '1939', correct: false },
                { text: '1945', correct: false }
            ]
        },
        {
            question: '¿Quién pintó "La noche estrellada"?',
            answers: [
                { text: 'Pablo Picasso', correct: false },
                { text: 'Vincent van Gogh', correct: true },
                { text: 'Leonardo da Vinci', correct: false },
                { text: 'Claude Monet', correct: false }
            ]
        },
        {
            question: '¿Cuál es el río más largo del mundo?',
            answers: [
                { text: 'Amazonas', correct: true },
                { text: 'Nilo', correct: false },
                { text: 'Misisipi', correct: false },
                { text: 'Yangtsé', correct: false }
            ]
        },
        {
            question: '¿En qué año se fundó la ONU?',
            answers: [
                { text: '1945', correct: true },
                { text: '1918', correct: false },
                { text: '1939', correct: false },
                { text: '1955', correct: false }
            ]
        },
        {
            question: '¿Quién escribió "Cien años de soledad"?',
            answers: [
                { text: 'Gabriel García Márquez', correct: true },
                { text: 'Mario Vargas Llosa', correct: false },
                { text: 'Julio Cortázar', correct: false },
                { text: 'Isabel Allende', correct: false }
            ]
        },
        {
            question: '¿Cuál es el elemento químico más abundante en el universo?',
            answers: [
                { text: 'Hidrógeno', correct: true },
                { text: 'Oxígeno', correct: false },
                { text: 'Carbono', correct: false },
                { text: 'Helio', correct: false }
            ]
        },
        {
            question: '¿En qué año llegó el hombre a la Luna?',
            answers: [
                { text: '1969', correct: true },
                { text: '1961', correct: false },
                { text: '1975', correct: false },
                { text: '1982', correct: false }
            ]
        },
        {
            question: '¿Cuál es la capital de Australia?',
            answers: [
                { text: 'Canberra', correct: true },
                { text: 'Sídney', correct: false },
                { text: 'Melbourne', correct: false },
                { text: 'Brisbane', correct: false }
            ]
        },
        {
            question: '¿Quién fue el primer presidente de Estados Unidos?',
            answers: [
                { text: 'George Washington', correct: true },
                { text: 'Thomas Jefferson', correct: false },
                { text: 'Abraham Lincoln', correct: false },
                { text: 'Benjamin Franklin', correct: false }
            ]
        },
        {
            question: '¿En qué año cayó el Muro de Berlín?',
            answers: [
                { text: '1989', correct: true },
                { text: '1991', correct: false },
                { text: '1985', correct: false },
                { text: '1975', correct: false }
            ]
        },
        {
            question: '¿Cuál es el océano más grande del mundo?',
            answers: [
                { text: 'Océano Pacífico', correct: true },
                { text: 'Océano Atlántico', correct: false },
                { text: 'Océano Índico', correct: false },
                { text: 'Océano Ártico', correct: false }
            ]
        },
        {
            question: '¿Quién escribió "Romeo y Julieta"?',
            answers: [
                { text: 'William Shakespeare', correct: true },
                { text: 'Charles Dickens', correct: false },
                { text: 'Jane Austen', correct: false },
                { text: 'Mark Twain', correct: false }
            ]
        },
        {
            question: '¿Cuál es el planeta más grande del sistema solar?',
            answers: [
                { text: 'Júpiter', correct: true },
                { text: 'Saturno', correct: false },
                { text: 'Neptuno', correct: false },
                { text: 'Urano', correct: false }
            ]
        },
        {
            question: '¿En qué año se proclamó la Declaración de Independencia de los Estados Unidos?',
            answers: [
                { text: '1776', correct: true },
                { text: '1789', correct: false },
                { text: '1812', correct: false },
                { text: '1492', correct: false }
            ]
        },
        {
            question: '¿Quién pintó "La última cena"?',
            answers: [
                { text: 'Leonardo da Vinci', correct: true },
                { text: 'Miguel Ángel', correct: false },
                { text: 'Rafael', correct: false },
                { text: 'Donatello', correct: false }
            ]
        },
        {
            question: '¿Cuál es el metal más abundante en la corteza terrestre?',
            answers: [
                { text: 'Aluminio', correct: true },
                { text: 'Hierro', correct: false },
                { text: 'Cobre', correct: false },
                { text: 'Oro', correct: false }
            ]
        },
        {
            question: '¿En qué año comenzó la Revolución Francesa?',
            answers: [
                { text: '1789', correct: true },
                { text: '1799', correct: false },
                { text: '1804', correct: false },
                { text: '1776', correct: false }
            ]
        },
        {
            question: '¿Quién fue el primer ser humano en orbitar la Tierra?',
            answers: [
                { text: 'Yuri Gagarin', correct: true },
                { text: 'Neil Armstrong', correct: false },
                { text: 'Buzz Aldrin', correct: false },
                { text: 'Alan Shepard', correct: false }
            ]
        },
        {
            question: '¿Cuál es la montaña más alta del mundo?',
            answers: [
                { text: 'Monte Everest', correct: true },
                { text: 'K2', correct: false },
                { text: 'Kangchenjunga', correct: false },
                { text: 'Lhotse', correct: false }
            ]
        },
        {
            question: '¿En qué año se firmó la Declaración Universal de los Derechos Humanos?',
            answers: [
                { text: '1948', correct: true },
                { text: '1945', correct: false },
                { text: '1955', correct: false },
                { text: '1939', correct: false }
            ]
        },
        {
            question: '¿Quién inventó la bombilla eléctrica?',
            answers: [
                { text: 'Thomas Edison', correct: true },
                { text: 'Nikola Tesla', correct: false },
                { text: 'Alexander Graham Bell', correct: false },
                { text: 'Benjamin Franklin', correct: false }
            ]
        },
        {
            question: '¿Cuál es el país más grande del mundo por área terrestre?',
            answers: [
                { text: 'Rusia', correct: true },
                { text: 'Canadá', correct: false },
                { text: 'China', correct: false },
                { text: 'Estados Unidos', correct: false }
            ]
        },
        {
            question: '¿En qué año se fundó la Unión Europea?',
            answers: [
                { text: '1993', correct: true },
                { text: '1957', correct: false },
                { text: '1989', correct: false },
                { text: '2002', correct: false }
            ]
        },
        {
            question: '¿Quién escribió "El Principito"?',
            answers: [
                { text: 'Antoine de Saint-Exupéry', correct: true },
                { text: 'Jules Verne', correct: false },
                { text: 'Victor Hugo', correct: false },
                { text: 'Albert Camus', correct: false }
            ]
        },
        {
            question: '¿Cuál es el elemento químico más pesado que se encuentra naturalmente en la Tierra?',
            answers: [
                { text: 'Uranio', correct: true },
                { text: 'Plutonio', correct: false },
                { text: 'Torio', correct: false },
                { text: 'Radón', correct: false }
            ]
        },
        {
            question: '¿En qué año se produjo la Revolución Rusa?',
            answers: [
                { text: '1917', correct: true },
                { text: '1905', correct: false },
                { text: '1923', correct: false },
                { text: '1939', correct: false }
            ]
        },
        {
            question: '¿Quién fue el primer ser humano en pisar la Luna?',
            answers: [
                { text: 'Neil Armstrong', correct: true },
                { text: 'Buzz Aldrin', correct: false },
                { text: 'Yuri Gagarin', correct: false },
                { text: 'John Glenn', correct: false }
            ]
        },
        {
            question: '¿Cuál es el río más largo de Europa?',
            answers: [
                { text: 'Volga', correct: true },
                { text: 'Danubio', correct: false },
                { text: 'Rin', correct: false },
                { text: 'Dniéper', correct: false }
            ]
        },
        {
            question: '¿En qué año se produjo la caída del Imperio Romano de Occidente?',
            answers: [
                { text: '476 d.C.', correct: true },
                { text: '410 d.C.', correct: false },
                { text: '527 d.C.', correct: false },
                { text: '330 d.C.', correct: false }
            ]
        },
        {
            question: '¿Quién pintó "El grito"?',
            answers: [
                { text: 'Edvard Munch', correct: true },
                { text: 'Vincent van Gogh', correct: false },
                { text: 'Pablo Picasso', correct: false },
                { text: 'Salvador Dalí', correct: false }
            ]
        },
        {
            question: '¿Cuál es el segundo planeta más cercano al Sol?',
            answers: [
                { text: 'Venus', correct: true },
                { text: 'Mercurio', correct: false },
                { text: 'Marte', correct: false },
                { text: 'Tierra', correct: false }
            ]
        },
        {
            question: '¿En qué año se firmó la Declaración de Independencia de México?',
            answers: [
                { text: '1810', correct: true },
                { text: '1821', correct: false },
                { text: '1836', correct: false },
                { text: '1848', correct: false }
            ]
        },
        {
            question: '¿Quién descubrió la penicilina?',
            answers: [
                { text: 'Alexander Fleming', correct: true },
                { text: 'Louis Pasteur', correct: false },
                { text: 'Marie Curie', correct: false },
                { text: 'Robert Koch', correct: false }
            ]
        },
        {
            question: '¿Cuál es la capital de Canadá?',
            answers: [
                { text: 'Ottawa', correct: true },
                { text: 'Toronto', correct: false },
                { text: 'Montreal', correct: false },
                { text: 'Vancouver', correct: false }
            ]
        },
        {
            question: '¿En qué año terminó la Segunda Guerra Mundial?',
            answers: [
                { text: '1945', correct: true },
                { text: '1939', correct: false },
                { text: '1941', correct: false },
                { text: '1943', correct: false }
            ]
        },
        {
            question: '¿Quién escribió "Don Quijote de la Mancha"?',
            answers: [
                { text: 'Miguel de Cervantes', correct: true },
                { text: 'Federico García Lorca', correct: false },
                { text: 'Gabriel García Márquez', correct: false },
                { text: 'Pablo Neruda', correct: false }
            ]
        }
    ];

    if (startBtn) startBtn.addEventListener('click', startGame);
    if (nextBtn) nextBtn.addEventListener('click', () => {
        currentQuestionIndex++;
        setNextQuestion();
    });
    if (restartBtn) restartBtn.addEventListener('click', startGame);

    function startGame() {
        if (startScreen) startScreen.classList.add('hidden');
        shuffledQuestions = questions.sort(() => Math.random() - 0.5).slice(0, 10);
        currentQuestionIndex = 0;
        score = 0;
        if (quizScreen) quizScreen.classList.remove('hidden');
        setNextQuestion();
    }

    function setNextQuestion() {
        resetState();
        showQuestion(shuffledQuestions[currentQuestionIndex]);
    }

    function showQuestion(question) {
        if (questionContainer) questionContainer.innerText = question.question;
        question.answers.forEach(answer => {
            const button = document.createElement('button');
            button.innerText = answer.text;
            button.classList.add('btn');
            if (answer.correct) {
                button.dataset.correct = answer.correct;
            }
            button.addEventListener('click', selectAnswer);
            if (answerButtonsElement) answerButtonsElement.appendChild(button);
        });
    }

    function resetState() {
        clearStatusClass(document.body);
        if (nextBtn) nextBtn.classList.add('hidden');
        while (answerButtonsElement && answerButtonsElement.firstChild) {
            answerButtonsElement.removeChild(answerButtonsElement.firstChild);
        }
    }

    function selectAnswer(e) {
        const selectedButton = e.target;
        const correct = selectedButton.dataset.correct;
        setStatusClass(document.body, correct);
        Array.from(answerButtonsElement.children).forEach(button => {
            setStatusClass(button, button.dataset.correct);
        });
        if (shuffledQuestions.length > currentQuestionIndex + 1) {
            if (nextBtn) nextBtn.classList.remove('hidden');
        } else {
            endGame();
        }
        if (correct) score++;
    }

    function setStatusClass(element, correct) {
        clearStatusClass(element);
        if (correct) {
            element.classList.add('correct');
        } else {
            element.classList.add('wrong');
        }
    }

    function clearStatusClass(element) {
        element.classList.remove('correct');
        element.classList.remove('wrong');
    }

    function endGame() {
        if (quizScreen) quizScreen.classList.add('hidden');
        if (endScreen) endScreen.classList.remove('hidden');
        if (scoreElement) scoreElement.innerText = `${score} de ${shuffledQuestions.length}`;
    }
});

