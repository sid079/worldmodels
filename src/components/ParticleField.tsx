import { useRef, useEffect } from 'react'

interface Particle {
  baseX: number
  baseY: number
  baseZ: number
  isAccent: boolean
}

export default function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number
    const PARTICLE_COUNT = 160
    const SPREAD = 350
    const FOCAL_LENGTH = 500
    const CENTER_Z = 250

    const particles: Particle[] = Array.from({ length: PARTICLE_COUNT }, () => {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = SPREAD * (0.3 + Math.random() * 0.7)
      return {
        baseX: r * Math.sin(phi) * Math.cos(theta),
        baseY: r * Math.sin(phi) * Math.sin(theta),
        baseZ: r * Math.cos(phi),
        isAccent: Math.random() > 0.82,
      }
    })

    let angle = 0
    let dpr = window.devicePixelRatio || 1

    const resize = () => {
      dpr = window.devicePixelRatio || 1
      canvas.width = canvas.offsetWidth * dpr
      canvas.height = canvas.offsetHeight * dpr
    }
    resize()
    window.addEventListener('resize', resize)

    const projected: { sx: number; sy: number; r: number; o: number; z: number; accent: boolean }[] = []

    const render = () => {
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, w, h)

      angle += 0.0015
      const cosA = Math.cos(angle)
      const sinA = Math.sin(angle)
      const cosB = Math.cos(angle * 0.3)
      const sinB = Math.sin(angle * 0.3)

      projected.length = 0

      for (const p of particles) {
        const rx = p.baseX * cosA - p.baseZ * sinA
        const rz1 = p.baseX * sinA + p.baseZ * cosA
        const ry = p.baseY * cosB - rz1 * sinB
        const rz = p.baseY * sinB + rz1 * cosB

        const depth = rz + CENTER_Z + FOCAL_LENGTH
        const scale = FOCAL_LENGTH / Math.max(depth, 1)
        const sx = w / 2 + rx * scale
        const sy = h / 2 + ry * scale

        const normalizedDepth = (rz + SPREAD) / (SPREAD * 2)
        const clamped = Math.max(0, Math.min(1, normalizedDepth))

        const dofFactor = Math.abs(clamped - 0.5) * 2
        const radius = (1 + clamped * 2) + dofFactor * 2.5
        const opacity = (0.08 + clamped * 0.35) * (1 - dofFactor * 0.4)

        projected.push({ sx, sy, r: radius, o: opacity, z: rz, accent: p.isAccent })
      }

      projected.sort((a, b) => a.z - b.z)

      for (const pt of projected) {
        ctx.beginPath()
        ctx.arc(pt.sx, pt.sy, pt.r, 0, Math.PI * 2)
        ctx.fillStyle = pt.accent
          ? `rgba(232, 255, 89, ${pt.o * 0.7})`
          : `rgba(255, 255, 255, ${pt.o * 0.25})`
        ctx.fill()
      }

      animationId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full"
      style={{ opacity: 0.55 }}
    />
  )
}
