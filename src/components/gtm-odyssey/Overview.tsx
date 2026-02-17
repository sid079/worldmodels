import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { icpSegments, tierConfig } from '../../data/odysseyGTM'
import type { Tier } from '../../data/odysseyGTM'

function AcvTooltip({ low, high, math }: { low: string; high: string; math: string }) {
  const [open, setOpen] = useState(false)
  const [above, setAbove] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (open && wrapperRef.current && tooltipRef.current) {
      const triggerRect = wrapperRef.current.getBoundingClientRect()
      const tooltipHeight = tooltipRef.current.offsetHeight
      const spaceAbove = triggerRect.top
      const spaceBelow = window.innerHeight - triggerRect.bottom
      setAbove(spaceAbove > tooltipHeight + 12 && spaceBelow < tooltipHeight + 12)
    }
  }, [open])

  return (
    <div
      ref={wrapperRef}
      className="relative inline-block"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <span className="cursor-help border-b border-dashed border-accent/40 font-mono text-sm tabular-nums text-accent">
        {low}–{high}
      </span>
      {open && (
        <div
          ref={tooltipRef}
          className={`absolute left-1/2 z-50 w-72 -translate-x-1/2 rounded-lg border border-accent/20 bg-[#1a1a1a] p-4 shadow-xl shadow-black/40 ${
            above ? 'bottom-full mb-2.5' : 'top-full mt-2.5'
          }`}
        >
          <div
            className={`absolute left-1/2 -translate-x-1/2 h-0 w-0 border-x-[6px] border-x-transparent ${
              above
                ? 'top-full border-t-[6px] border-t-accent/20'
                : 'bottom-full border-b-[6px] border-b-accent/20'
            }`}
          />
          <p className="mb-1.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-accent/70">
            ACV Math
          </p>
          <p className="font-mono text-xs leading-relaxed text-text-secondary">
            {math}
          </p>
        </div>
      )}
    </div>
  )
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.04, delayChildren: 0.05 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0 },
}

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
      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 font-mono text-xs"
      style={{ backgroundColor: `${cfg.color}15`, color: cfg.color }}
    >
      <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: cfg.color }} />
      {cfg.label}
    </span>
  )
}

export default function Overview() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-10"
    >
      {/* Context Banner */}
      <motion.div
        variants={itemVariants}
        className="rounded-lg border border-accent/30 bg-accent/5 p-6"
      >
        <p className="font-serif text-lg text-accent">The GTM Greenfield</p>
        <p className="mt-2 font-mono text-sm leading-relaxed text-text-secondary">
          Odyssey launched the Odyssey-2 Pro API on January 23, 2026 — three weeks ago. They have{' '}
          <strong className="text-accent">zero announced enterprise customers</strong>, no BD/sales hires, and three API endpoints (interactive streams, viewable streams, simulations) priced at ~$1–2/user-hour. This is the entire GTM greenfield.{' '}
          <strong className="text-text-primary">The Chief of Staff builds it all.</strong>
        </p>
      </motion.div>

      {/* Summary Pipeline Table */}
      <motion.section variants={itemVariants}>
        <h2 className="mb-6 font-serif text-xl text-text-primary">Full Pipeline Summary</h2>
        <div className="sticky-table-wrap rounded-lg border border-[rgba(255,255,255,0.06)]">
          <table className="w-full min-w-[800px] border-collapse">
            <thead>
              <tr className="border-b border-[rgba(255,255,255,0.06)]">
                {['Segment', 'Time Horizon', '# Accounts', 'ACV Range', 'Conviction'].map(
                  (header, i) => (
                    <th
                      key={header}
                      className={`px-4 py-3 text-left font-mono text-xs font-semibold uppercase tracking-wider text-text-muted ${i === 0 ? 'min-w-[180px]' : ''}`}
                    >
                      {header}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {icpSegments.map((seg) => (
                <tr
                  key={seg.id}
                  className="border-b border-[rgba(255,255,255,0.06)] transition-colors hover:bg-surface/30"
                >
                  <td className="px-4 py-3 font-mono text-sm text-text-primary whitespace-nowrap">{seg.name}</td>
                  <td className="px-4 py-3">
                    <TierBadge tier={seg.tier} />
                  </td>
                  <td className="px-4 py-3 font-mono text-sm tabular-nums text-text-secondary">
                    {seg.targetAccountCount}
                  </td>
                  <td className="px-4 py-3">
                    <AcvTooltip low={seg.chequeSize.low} high={seg.chequeSize.high} math={seg.chequeSize.math} />
                  </td>
                  <td className="px-4 py-3">
                    <ConvictionStars count={seg.conviction} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.section>

      {/* Strategic Insight */}
      <motion.section variants={itemVariants} className="space-y-6">
        <div className="rounded-lg border border-[rgba(255,255,255,0.06)] bg-surface/30 p-6">
          <h2 className="mb-4 font-serif text-xl text-text-primary">
            Developer-Led vs. Enterprise Sales
          </h2>
          <p className="font-mono text-sm leading-relaxed text-text-secondary">
            Odyssey faces a classic two-speed GTM tension. The <strong className="text-text-primary">developer-led motion</strong> (indie games, hackathon community, API adoption) builds volume and brand — but generates small cheques ($500–$5K/yr). The{' '}
            <strong className="text-text-primary">enterprise motion</strong> (VP studios, agencies, automotive) generates $50K–500K contracts — but requires dedicated BD, longer cycles, and custom integrations.{' '}
            <strong className="text-accent">The Chief of Staff resolves this tension</strong> by running both motions simultaneously: seeding developer adoption for inbound pipeline while directly hunting the three lighthouse enterprise deals that validate the platform for larger buyers.
          </p>
        </div>

      </motion.section>
    </motion.div>
  )
}
