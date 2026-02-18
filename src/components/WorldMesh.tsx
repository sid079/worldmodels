import { useRef, useEffect } from 'react'

interface FloatingParticle {
  colT: number
  rowT: number
  life: number
  speed: number
}

export default function WorldMesh() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouse = useRef({ x: 0.5, y: 0.5 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number
    let time = 0
    let dpr = window.devicePixelRatio || 1

    const COLS = 28
    const ROWS = 20
    const FLOAT_COUNT = 14

    const floaters: FloatingParticle[] = Array.from({ length: FLOAT_COUNT }, () => ({
      colT: Math.random(),
      rowT: 0.3 + Math.random() * 0.7,
      life: Math.random(),
      speed: 0.0008 + Math.random() * 0.0018,
    }))

    const resize = () => {
      dpr = window.devicePixelRatio || 1
      canvas.width = canvas.offsetWidth * dpr
      canvas.height = canvas.offsetHeight * dpr
    }
    resize()

    const handleMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouse.current.x = (e.clientX - rect.left) / rect.width
      mouse.current.y = (e.clientY - rect.top) / rect.height
    }

    document.addEventListener('mousemove', handleMove)
    window.addEventListener('resize', resize)

    const render = () => {
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, w, h)

      time += 0.004
      const mx = mouse.current.x
      const my = mouse.current.y

      const horizonY = h * 0.15
      const bottomY = h * 1.1
      const minWidth = w * 0.12
      const maxWidth = w * 1.4
      const centerX = w / 2

      const waveCycle = (time * 0.18) % 1.5
      const waveFront = waveCycle <= 1.0 ? waveCycle : 2.0

      const points: { x: number; y: number; depth: number; height: number }[][] = []

      for (let row = 0; row < ROWS; row++) {
        points[row] = []
        const rowT = row / (ROWS - 1)
        const perspT = rowT * rowT
        const baseY = horizonY + (bottomY - horizonY) * perspT
        const rowWidth = minWidth + (maxWidth - minWidth) * perspT

        for (let col = 0; col < COLS; col++) {
          const colT = col / (COLS - 1)
          const baseX = centerX + (colT - 0.5) * rowWidth

          const wave1 = Math.sin(col * 0.22 + time * 2.2) * 8 * perspT
          const wave2 = Math.cos(row * 0.18 + time * 1.4) * 6 * perspT
          const wave3 = Math.sin((col * 0.13 + row * 0.09) + time * 0.9) * 4 * perspT

          const dx = colT - mx
          const dy = rowT - my
          const dist = Math.sqrt(dx * dx + dy * dy)
          const mouseWave = Math.exp(-dist * dist * 6) * 18 * perspT

          const totalHeight = wave1 + wave2 + wave3 + mouseWave

          points[row][col] = {
            x: baseX,
            y: baseY - totalHeight,
            depth: perspT,
            height: totalHeight,
          }
        }
      }

      const renderFactors: number[] = []
      for (let row = 0; row < ROWS; row++) {
        const rowT = row / (ROWS - 1)
        const behindWave = (waveFront - rowT) * 8
        renderFactors[row] = Math.max(0.06, Math.min(1, behindWave + 0.5))
      }

      for (let row = 0; row < ROWS; row++) {
        const rf = renderFactors[row]
        const depth = points[row][0].depth
        const opacity = (0.02 + depth * 0.1) * rf
        const lw = 0.3 + depth * 0.7

        ctx.beginPath()
        for (let col = 0; col < COLS - 1; col++) {
          const a = points[row][col]
          const b = points[row][col + 1]
          ctx.moveTo(a.x, a.y)
          ctx.lineTo(b.x, b.y)
        }
        ctx.strokeStyle = `rgba(232, 255, 89, ${opacity})`
        ctx.lineWidth = lw
        ctx.stroke()
      }

      for (let row = 0; row < ROWS - 1; row++) {
        const rf = Math.min(renderFactors[row], renderFactors[row + 1])
        const depth = points[row][0].depth
        const opacity = (0.015 + depth * 0.07) * rf
        const lw = 0.3 + depth * 0.5

        ctx.beginPath()
        for (let col = 0; col < COLS; col++) {
          const a = points[row][col]
          const b = points[row + 1][col]
          ctx.moveTo(a.x, a.y)
          ctx.lineTo(b.x, b.y)
        }
        ctx.strokeStyle = `rgba(232, 255, 89, ${opacity})`
        ctx.lineWidth = lw
        ctx.stroke()
      }

      if (waveCycle <= 1.0) {
        const wfRow = Math.min(Math.floor(waveFront * (ROWS - 1)), ROWS - 1)
        if (wfRow >= 0) {
          ctx.save()
          ctx.shadowColor = 'rgba(232, 255, 89, 0.35)'
          ctx.shadowBlur = 10
          ctx.beginPath()
          for (let col = 0; col < COLS - 1; col++) {
            const a = points[wfRow][col]
            const b = points[wfRow][col + 1]
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
          }
          ctx.strokeStyle = 'rgba(232, 255, 89, 0.2)'
          ctx.lineWidth = 1.2
          ctx.stroke()
          ctx.restore()
        }
      }

      for (let row = Math.floor(ROWS * 0.3); row < ROWS; row += 2) {
        for (let col = 1; col < COLS - 1; col += 3) {
          const p = points[row][col]
          const threshold = 8 * Math.max(p.depth, 0.05)
          if (p.height > threshold) {
            const intensity = Math.min(0.6, (p.height - threshold) / (25 * Math.max(p.depth, 0.1)))
            const rf = renderFactors[row]
            ctx.beginPath()
            ctx.arc(p.x, p.y, 1 + intensity * 1.5, 0, Math.PI * 2)
            ctx.fillStyle = `rgba(232, 255, 89, ${intensity * 0.35 * rf})`
            ctx.fill()
          }
        }
      }

      for (const fp of floaters) {
        fp.life += fp.speed
        if (fp.life > 1) {
          fp.life = 0
          fp.colT = Math.random()
          fp.rowT = 0.3 + Math.random() * 0.7
        }
        const col = Math.min(Math.floor(fp.colT * (COLS - 1)), COLS - 1)
        const row = Math.min(Math.floor(fp.rowT * (ROWS - 1)), ROWS - 1)
        const gp = points[row][col]
        const floatY = fp.life * 30 * Math.max(gp.depth, 0.05)
        const opacity = Math.sin(fp.life * Math.PI) * 0.25

        ctx.beginPath()
        ctx.arc(gp.x, gp.y - floatY, 1.2, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(0, 255, 209, ${opacity})`
        ctx.fill()
      }

      const grad = ctx.createLinearGradient(0, horizonY - 15, 0, horizonY + 30)
      grad.addColorStop(0, 'rgba(232, 255, 89, 0)')
      grad.addColorStop(0.5, 'rgba(232, 255, 89, 0.008)')
      grad.addColorStop(1, 'rgba(232, 255, 89, 0)')
      ctx.fillStyle = grad
      ctx.fillRect(0, horizonY - 15, w, 45)

      animationId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animationId)
      document.removeEventListener('mousemove', handleMove)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full"
      style={{ opacity: 0.5 }}
    />
  )
}
