import { useState, useEffect, useRef, useCallback } from 'react'

const KONAMI = [
  'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
  'b', 'a',
]

export default function KonamiEasterEgg() {
  const [active, setActive] = useState(false)
  const [showMsg, setShowMsg] = useState(false)
  const [showGhost, setShowGhost] = useState(false)
  const seqRef = useRef<string[]>([])
  const ghostRef = useRef<HTMLDivElement>(null)
  const posRef = useRef({ x: 0, y: 0 })

  const onKey = useCallback((e: KeyboardEvent) => {
    seqRef.current.push(e.key)
    if (seqRef.current.length > KONAMI.length) seqRef.current.shift()
    if (seqRef.current.join(',') === KONAMI.join(',')) {
      setActive(true)
      setShowMsg(true)
      setShowGhost(true)
      seqRef.current = []
    }
  }, [])

  useEffect(() => {
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onKey])

  useEffect(() => {
    if (!active) return

    const onMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener('mousemove', onMove)

    const ghostLoop = setInterval(() => {
      if (ghostRef.current) {
        ghostRef.current.style.left = `${posRef.current.x}px`
        ghostRef.current.style.top = `${posRef.current.y}px`
      }
    }, 16)

    const msgTimer = setTimeout(() => setShowMsg(false), 2500)
    const ghostTimer = setTimeout(() => setShowGhost(false), 5000)
    const cleanupTimer = setTimeout(() => setActive(false), 5600)

    return () => {
      window.removeEventListener('mousemove', onMove)
      clearInterval(ghostLoop)
      clearTimeout(msgTimer)
      clearTimeout(ghostTimer)
      clearTimeout(cleanupTimer)
    }
  }, [active])

  if (!active) return null

  return (
    <>
      {/* Overlay message */}
      <div
        className="pointer-events-none fixed inset-0 z-[9999] flex items-center justify-center"
        style={{
          opacity: showMsg ? 1 : 0,
          transition: 'opacity 500ms ease',
        }}
      >
        <div className="rounded-lg border border-accent/30 bg-background/95 px-8 py-6 text-center shadow-[0_0_40px_rgba(232,255,89,0.1)] backdrop-blur-lg">
          <p className="font-mono text-base text-accent">
            World model activated
          </p>
          <p className="mt-1.5 font-mono text-xs text-text-muted">
            predicting your next action...
          </p>
        </div>
      </div>

      {/* Ghost cursor */}
      <div
        ref={ghostRef}
        className="pointer-events-none fixed z-[9998]"
        style={{
          opacity: showGhost ? 0.55 : 0,
          transition: 'left 200ms ease-out, top 200ms ease-out, opacity 500ms ease',
          transform: 'translate(-2px, -2px)',
        }}
      >
        <svg width="20" height="24" viewBox="0 0 20 24" fill="none">
          <path
            d="M1 1L17 10L9 12L7 20L1 1Z"
            fill="#E8FF59"
            fillOpacity="0.6"
            stroke="#E8FF59"
            strokeWidth="1"
            strokeOpacity="0.8"
          />
        </svg>
      </div>
    </>
  )
}
