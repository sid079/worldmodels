import { motion } from 'framer-motion'
import { icpSegments, tierConfig } from '../../data/odysseyGTM'
import type { Tier } from '../../data/odysseyGTM'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.05 },
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

function TargetPill({ name }: { name: string }) {
  const isHighlighted = name.includes('already validated') || name.includes('Hackathon Alumni')
  return (
    <span
      className={`inline-block rounded-full px-3 py-1 font-mono text-xs transition-colors ${
        isHighlighted
          ? 'border border-accent/40 bg-accent/10 text-accent'
          : 'border border-[rgba(255,255,255,0.06)] bg-surface/50 text-text-secondary'
      }`}
    >
      {name}
    </span>
  )
}

export default function ShortTermPlan() {
  const shortTermSegments = icpSegments.filter((s) => s.tier === 'short')

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-10"
    >
      {/* Intro */}
      <motion.div
        variants={itemVariants}
        className="rounded-lg border border-accent/30 bg-accent/5 p-6"
      >
        <p className="font-serif text-lg text-accent">Short Term: 0–6 Months</p>
        <p className="mt-2 font-mono text-sm leading-relaxed text-text-secondary">
          These are the segments where Odyssey can close deals{' '}
          <strong className="text-text-primary">today</strong>. The product fits, the buyers are identifiable, and in one case (Garden Studios) the value is{' '}
          <strong className="text-accent">already validated</strong>. The Chief of Staff should be closing these within 90 days.
        </p>
      </motion.div>

      {/* Segment Deep Dives */}
      {shortTermSegments.map((seg) => (
        <motion.div
          key={seg.id}
          variants={itemVariants}
          className="rounded-lg border border-[rgba(255,255,255,0.06)] bg-surface/30 transition-all duration-200 hover:border-accent/20"
        >
          {/* Header */}
          <div className="border-b border-[rgba(255,255,255,0.06)] px-6 py-5">
            <div className="flex flex-wrap items-center gap-3">
              <h3 className="font-serif text-xl text-accent">{seg.name}</h3>
              <TierBadge tier={seg.tier} />
              <ConvictionStars count={seg.conviction} />
            </div>
          </div>

          <div className="space-y-6 p-6">
            {/* ICP + Decision Makers */}
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <p className="mb-1 font-mono text-xs font-semibold uppercase tracking-wider text-text-muted">
                  ICP Definition
                </p>
                <p className="font-mono text-sm leading-relaxed text-text-secondary">{seg.icp}</p>
              </div>
              <div>
                <p className="mb-1 font-mono text-xs font-semibold uppercase tracking-wider text-text-muted">
                  Decision Makers
                </p>
                <p className="font-mono text-sm text-text-secondary">{seg.decisionMakers}</p>
              </div>
            </div>

            {/* Named Targets */}
            <div>
              <p className="mb-3 font-mono text-xs font-semibold uppercase tracking-wider text-text-muted">
                Named Targets
              </p>
              <div className="flex flex-wrap gap-2">
                {seg.namedTargets.map((target) => (
                  <TargetPill key={target} name={target} />
                ))}
              </div>
            </div>

            {/* Value Proposition */}
            <div>
              <p className="mb-1 font-mono text-xs font-semibold uppercase tracking-wider text-text-muted">
                Value Proposition
              </p>
              <p className="font-mono text-sm leading-relaxed text-text-secondary">
                {seg.valueProposition}
              </p>
            </div>

            {/* Cheque Size Math — the star section */}
            <div className="rounded-lg border border-accent/20 bg-accent/5 p-5">
              <div className="flex flex-wrap items-baseline justify-between gap-4">
                <div>
                  <p className="mb-1 font-mono text-xs font-semibold uppercase tracking-wider text-text-muted">
                    {seg.chequeSize.label}
                  </p>
                  <p className="font-mono text-2xl font-semibold text-accent">
                    {seg.chequeSize.low}–{seg.chequeSize.high}
                    <span className="ml-2 text-sm text-text-muted">/yr</span>
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="font-mono text-xs text-text-muted">Total Addressable</p>
                    <p className="font-mono text-lg text-text-primary">{seg.totalAddressable}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-mono text-xs text-text-muted">Target Accounts</p>
                    <p className="font-mono text-lg text-text-primary">{seg.targetAccountCount}</p>
                  </div>
                </div>
              </div>
              <div className="mt-4 border-t border-accent/10 pt-4">
                <p className="font-mono text-xs font-semibold uppercase tracking-wider text-text-muted">
                  The Math
                </p>
                <p className="mt-1 font-mono text-xs leading-relaxed text-text-secondary">
                  {seg.chequeSize.math}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}
