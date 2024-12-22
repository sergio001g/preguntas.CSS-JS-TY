'use client'

import React, { useEffect, useRef } from 'react'

const AnimatedBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const squares: { x: number; y: number; size: number }[] = []
    const squareSize = 20
    const circleRadius = Math.min(canvas.width, canvas.height) * 0.4
    const centerX = canvas.width / 2
    const centerY = canvas.height / 2

    // Create squares positioned in a circle
    for (let angle = 0; angle < 360; angle += 15) {
      const x = centerX + circleRadius * Math.cos(angle * Math.PI / 180)
      const y = centerY + circleRadius * Math.sin(angle * Math.PI / 180)
      squares.push({ x, y, size: squareSize })
    }

    let rotation = 0

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      rotation += 0.005
      
      squares.forEach((square, index) => {
        const angle = (index * 15 + rotation * 180 / Math.PI) * Math.PI / 180
        const x = centerX + circleRadius * Math.cos(angle)
        const y = centerY + circleRadius * Math.sin(angle)
        
        ctx.save()
        ctx.translate(x, y)
        ctx.rotate(rotation)
        ctx.fillStyle = `rgba(255, 255, 255, ${0.1 + 0.1 * Math.sin(rotation + index)})`
        ctx.fillRect(-square.size / 2, -square.size / 2, square.size, square.size)
        ctx.restore()
      })
      
      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10" />
}

export default AnimatedBackground

