import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const SCORE_LABELS: Record<string, string> = {
  outputQuality: 'Output Quality',
  easeOfUse: 'Ease of Use',
  speed: 'Speed',
  controllability: 'Controllability',
  exportWorkflow: 'Export Workflow',
}

interface ScoreBarProps {
  label: string
  score: number
  index?: number
  compact?: boolean
}

export default function ScoreBar({ label, score, index = 0, compact = false }: ScoreBarProps) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])
  const percentage = Math.min(5, Math.max(0, score)) * 20
  const displayScore = score > 0 ? score.toFixed(1) : '—'

  return (
    <div className={compact ? 'space-y-1' : 'space-y-2'}>
      <div className="flex items-center justify-between">
        <span className={`font-mono ${compact ? 'text-[10px]' : 'text-xs'} text-text-secondary`}>
          {SCORE_LABELS[label] || label}
        </span>
        <span className={`font-mono tabular-nums ${compact ? 'text-[10px]' : 'text-xs'} text-text-muted`}>
          {displayScore} / 5
        </span>
      </div>
      <div className="h-[5px] overflow-hidden rounded-full bg-[rgba(255,255,255,0.06)]" style={{ minWidth: compact ? 80 : 120 }}>
        <motion.div
          className="h-full rounded-full bg-accent"
          initial={{ width: 0 }}
          animate={{ width: mounted ? `${percentage}%` : 0 }}
          transition={{ duration: 0.4, delay: index * 0.08, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}

interface ScoreBarsProps {
  scores: { outputQuality: number; easeOfUse: number; speed: number; controllability: number; exportWorkflow: number }
  compact?: boolean
}

export function ScoreBars({ scores, compact = false }: ScoreBarsProps) {
  const entries = Object.entries(scores) as [keyof typeof scores, number][]
  return (
    <div className={`flex flex-col ${compact ? 'gap-2' : 'gap-4'}`}>
      {entries.map(([key, value], i) => (
        <ScoreBar key={key} label={key} score={value} index={i} compact={compact} />
      ))}
    </div>
  )
}
