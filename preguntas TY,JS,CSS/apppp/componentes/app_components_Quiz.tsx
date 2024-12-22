'use client'

import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { motion, AnimatePresence } from 'framer-motion'

interface Question {
  question: string
  answers: { text: string; correct: boolean }[]
}

const questions: Question[] = [
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
  }
]

export default function Quiz() {
  const [playerName, setPlayerName] = useState('')
  const [gameState, setGameState] = useState<'start' | 'quiz' | 'end'>('start')
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [shakeScreen, setShakeScreen] = useState(false)
  const [freezeEffect, setFreezeEffect] = useState(false)
  const [burnEffect, setBurnEffect] = useState(false)

  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://buttons.github.io/buttons.js'
    script.async = true
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  const startGame = () => {
    if (playerName.trim() !== '') {
      setGameState('quiz')
    }
  }

  const handleAnswer = (correct: boolean) => {
    if (correct) {
      setScore(score + 1)
      setBurnEffect(true)
      setTimeout(() => setBurnEffect(false), 1000)
    } else {
      setFreezeEffect(true)
      setTimeout(() => setFreezeEffect(false), 1000)
    }
    
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      setGameState('end')
    }
  }

  const restartGame = () => {
    setCurrentQuestionIndex(0)
    setScore(0)
    setGameState('quiz')
  }

  return (
    <div className={`relative min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 to-indigo-900 overflow-hidden ${shakeScreen ? 'shake' : ''} ${freezeEffect ? 'freeze' : ''} ${burnEffect ? 'burn' : ''}`}>
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5 z-0"></div>
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-[10%] left-[10%] w-20 h-20 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-[20%] right-[20%] w-20 h-20 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[20%] left-[20%] w-20 h-20 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>
      <Card className="w-full max-w-md bg-opacity-90 backdrop-filter backdrop-blur-lg bg-gray-800 z-10 shadow-2xl">
        <CardContent className="p-6">
          <AnimatePresence mode="wait">
            {gameState === 'start' && (
              <motion.div
                key="start"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="space-y-4"
              >
                <h1 className="text-3xl font-bold text-center text-yellow-400">Quiz de Cultura General</h1>
                <Input
                  type="text"
                  placeholder="Ingresa tu nombre"
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  className="bg-gray-700 text-white placeholder-gray-400 border-gray-600"
                />
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button 
                    onClick={startGame} 
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 px-6 rounded-lg text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                    onMouseEnter={() => setShakeScreen(true)}
                    onMouseLeave={() => setShakeScreen(false)}
                  >
                    Empezar
                  </Button>
                </motion.div>
              </motion.div>
            )}

            {gameState === 'quiz' && (
              <motion.div
                key="quiz"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="space-y-4"
              >
                <div className="flex justify-between items-center mb-4">
                  <span className="font-bold text-yellow-400 text-lg">Pregunta {currentQuestionIndex + 1}/10</span>
                  <span className="font-bold text-yellow-400 text-lg">Puntuación: {score}</span>
                </div>
                <h2 className="text-2xl font-semibold text-white mb-4">{questions[currentQuestionIndex].question}</h2>
                {questions[currentQuestionIndex].answers.map((answer, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <Button
                      onClick={() => handleAnswer(answer.correct)}
                      className="w-full mb-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-lg text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                      onMouseEnter={() => setShakeScreen(true)}
                      onMouseLeave={() => setShakeScreen(false)}
                    >
                      {answer.text}
                    </Button>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {gameState === 'end' && (
              <motion.div
                key="end"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.5 }}
                className="space-y-4 text-center"
              >
                <h2 className="text-3xl font-bold text-yellow-400">¡Juego terminado!</h2>
                <p className="text-2xl text-white">
                  {playerName}, tu puntuación final es: {score} de {questions.length}
                </p>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button 
                    onClick={restartGame} 
                    className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-bold py-3 px-6 rounded-lg text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                    onMouseEnter={() => setShakeScreen(true)}
                    onMouseLeave={() => setShakeScreen(false)}
                  >
                    Jugar de nuevo
                  </Button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
      <div className="absolute bottom-4 right-4 z-20">
        <a className="github-button" href="https://github.com/sergio001g" data-size="large" aria-label="Follow @sergio001g on GitHub">Follow @sergio001g</a>
      </div>
    </div>
  )
}

