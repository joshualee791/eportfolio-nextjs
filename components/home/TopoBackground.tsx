'use client'

import { useEffect, useRef } from 'react'

const THRESHOLDS = Array.from(
  { length: 11 },
  (_, i) => -0.72 + (i * (0.72 - -0.72)) / 10
)

const CELL_SIZE = 10

function noise(x: number, y: number, t: number) {
  return (
    Math.sin(x * 0.016 + t * 0.9) * Math.cos(y * 0.013 + t * 0.5) * 0.5 +
    Math.sin(x * 0.028 - t * 0.4) * Math.cos(y * 0.02 + t * 0.7) * 0.32 +
    Math.sin((x + y) * 0.009 + t * 0.3) * 0.18
  )
}

export default function TopoBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let cols = 0
    let rows = 0
    let grid: number[][] = []
    let animationFrameId = 0
    let t = 0
    let resizeTimeout: ReturnType<typeof setTimeout> | undefined

    function setSize() {
      if (!canvas) return
      const dpr = window.devicePixelRatio || 1
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx?.setTransform(dpr, 0, 0, dpr, 0, 0)

      cols = Math.ceil(window.innerWidth / CELL_SIZE)
      rows = Math.ceil(window.innerHeight / CELL_SIZE)
      grid = Array.from({ length: rows + 1 }, () => new Array(cols + 1).fill(0))
    }

    function computeGrid() {
      for (let r = 0; r <= rows; r++) {
        for (let c = 0; c <= cols; c++) {
          grid[r][c] = noise(c * CELL_SIZE, r * CELL_SIZE, t)
        }
      }
    }

    function drawContours() {
      if (!ctx) return
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
      ctx.strokeStyle = '#E5E7EB'
      ctx.lineWidth = 0.6
      ctx.globalAlpha = 0.85

      for (const th of THRESHOLDS) {
        ctx.beginPath()
        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            const tl = grid[r][c]
            const tr = grid[r][c + 1]
            const bl = grid[r + 1][c]
            const br = grid[r + 1][c + 1]

            const x = c * CELL_SIZE
            const y = r * CELL_SIZE

            const points: [number, number][] = []

            if (tl < th !== tr < th) {
              const px = x + ((th - tl) / (tr - tl)) * CELL_SIZE
              points.push([px, y])
            }
            if (bl < th !== br < th) {
              const px = x + ((th - bl) / (br - bl)) * CELL_SIZE
              points.push([px, y + CELL_SIZE])
            }
            if (tl < th !== bl < th) {
              const py = y + ((th - tl) / (bl - tl)) * CELL_SIZE
              points.push([x, py])
            }
            if (tr < th !== br < th) {
              const py = y + ((th - tr) / (br - tr)) * CELL_SIZE
              points.push([x + CELL_SIZE, py])
            }

            if (points.length >= 2) {
              ctx.moveTo(points[0][0], points[0][1])
              ctx.lineTo(points[1][0], points[1][1])
            }
          }
        }
        ctx.stroke()
      }
    }

    function tick() {
      t += 0.004
      computeGrid()
      drawContours()
      animationFrameId = requestAnimationFrame(tick)
    }

    function handleResize() {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(() => {
        setSize()
      }, 150)
    }

    setSize()
    animationFrameId = requestAnimationFrame(tick)
    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animationFrameId)
      clearTimeout(resizeTimeout)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0"
      style={{ pointerEvents: 'none' }}
    />
  )
}
