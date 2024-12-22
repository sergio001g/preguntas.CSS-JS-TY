'use client'

import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

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
  // ... (include all 40 questions here)
]

export default function Quiz() {
  const [playerName, setPlayerName] = useState('')
  const [gameState, setGameState] = useState<'start' | 'quiz' | 'end'>('start')
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>([])

  useEffect(() => {
    const shuffled = [...questions].sort(() => 0.5 - Math.random()).slice(0, 10)
    setShuffledQuestions(shuffled)
  }, [])

  const startGame = () => {
    if (playerName.trim() !== '') {
      setGameState('quiz')
    }
  }

  const handleAnswer = (correct: boolean) => {
    if (correct) setScore(score + 1)
    
    if (currentQuestionIndex < shuffledQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      setGameState('end')
    }
  }

  const restartGame = () => {
    setPlayerName('')
    setGameState('start')
    setCurrentQuestionIndex(0)
    setScore(0)
    const shuffled = [...questions].sort(() => 0.5 - Math.random()).slice(0, 10)
    setShuffledQuestions(shuffled)
  }

  return (
    <div className="container mx-auto p-4">
      <Card className="w-full max-w-md mx-auto">
        <CardContent className="p-6">
          {gameState === 'start' && (
            <div className="space-y-4">
              <h1 className="text-2xl font-bold text-center">Quiz de Cultura General</h1>
              <Input
                type="text"
                placeholder="Ingresa tu nombre"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
              />
              <Button onClick={startGame} className="w-full">Empezar</Button>
            </div>
          )}

          {gameState === 'quiz' && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">{shuffledQuestions[currentQuestionIndex].question}</h2>
              {shuffledQuestions[currentQuestionIndex].answers.map((answer, index) => (
                <Button
                  key={index}
                  onClick={() => handleAnswer(answer.correct)}
                  className="w-full mb-2"
                >
                  {answer.text}
                </Button>
              ))}
            </div>
          )}

          {gameState === 'end' && (
            <div className="space-y-4 text-center">
              <h2 className="text-2xl font-bold">¡Juego terminado!</h2>
              <p className="text-xl">
                {playerName}, tu puntuación es: {score} de {shuffledQuestions.length}
              </p>
              <Button onClick={restartGame} className="w-full">Jugar de nuevo</Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

