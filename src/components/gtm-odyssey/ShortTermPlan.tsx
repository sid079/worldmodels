import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { icpSegments, tierConfig } from '../../data/odysseyGTM'
import type { Tier } from '../../data/odysseyGTM'

function ConvictionStars({ count }: { count: number }) {
  return (
    <span className="inline-flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} className={i <= count ? 'text-accent' : 'text-text-muted/30'}>
          ★
        </span>
      ))}
    </span>
  )
}

function TierBadge({ tier }: { tier: Tier }) {
  const cfg = tierConfig[tier]
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 font-mono text-[10px]"
      style={{ backgroundColor: `${cfg.color}15`, color: cfg.color }}
    >
      <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: cfg.color }} />
      {cfg.label}
    </span>
  )
}

interface FlatRow {
  targetName: string
  segmentName: string
  tier: Tier
  acvLow: string
  acvHigh: string
  conviction: number
  isHighlighted: boolean
}

export default function ShortTermPlan() {
  const shortTermSegments = icpSegments.filter((s) => s.tier === 'short')

  const rows: FlatRow[] = useMemo(() => {
    return shortTermSegments.flatMap((seg) =>
      seg.namedTargets.map((target) => ({
        targetName: target,
        segmentName: seg.name,
        tier: seg.tier,
        acvLow: seg.chequeSize.low,
        acvHigh: seg.chequeSize.high,
        conviction: seg.conviction,
        isHighlighted:
          target.includes('already validated') || target.includes('Hackathon Alumni'),
      }))
    )
  }, [shortTermSegments])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      {/* Intro */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-lg border border-accent/30 bg-accent/5 p-6"
      >
        <p className="font-serif text-lg text-accent">Short Term: 0–6 Months</p>
        <p className="mt-2 font-mono text-sm leading-relaxed text-text-secondary">
          These are the segments where Odyssey can close deals{' '}
          <strong className="text-text-primary">today</strong>. The product fits, the buyers are identifiable, and in one case (Garden Studios) the value is{' '}
          <strong className="text-accent">already validated</strong>. The Chief of Staff should be closing these within 90 days.
        </p>
      </motion.div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.3 }}
        className="overflow-x-auto rounded-lg border border-[rgba(255,255,255,0.06)]"
      >
        <table className="w-full border-collapse font-mono text-xs">
          <thead>
            <tr className="border-b border-[rgba(255,255,255,0.1)] bg-surface/40">
              <th className="whitespace-nowrap px-4 py-3 text-left font-semibold text-accent">
                Target Company
              </th>
              <th className="whitespace-nowrap px-4 py-3 text-left font-semibold text-accent">
                ICP
              </th>
              <th className="whitespace-nowrap px-4 py-3 text-left font-semibold text-accent">
                ACV Range
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, idx) => (
              <tr
                key={`${row.targetName}-${idx}`}
                className={`border-b border-[rgba(255,255,255,0.04)] transition-colors hover:bg-surface/40 ${
                  row.isHighlighted ? 'bg-accent/[0.03]' : idx % 2 === 0 ? 'bg-surface/10' : ''
                }`}
              >
                <td className="whitespace-nowrap px-4 py-3">
                  <span className={row.isHighlighted ? 'font-semibold text-accent' : 'text-text-primary'}>
                    {row.targetName}
                  </span>
                </td>
                <td className="px-4 py-3 text-text-secondary">
                  {row.segmentName}
                </td>
                <td className="whitespace-nowrap px-4 py-3 font-semibold text-accent">
                  {row.acvLow}–{row.acvHigh}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </motion.div>
  )
}
