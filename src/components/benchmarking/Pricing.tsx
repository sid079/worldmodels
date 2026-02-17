import { useState, useCallback, useMemo, Fragment } from 'react'
import { motion } from 'framer-motion'
import { companies } from '../../data/companies'
import type { Company } from '../../data/companies'

/* ── Helpers ────────────────────────────────────────────────────────── */

function isEmpty(val: string): boolean {
  const lower = val.toLowerCase().trim()
  return (
    lower === 'n/a' ||
    lower === 'unknown' ||
    lower === 'tbd' ||
    lower.startsWith('none') ||
    lower === ''
  )
}

/* ── Revenue-stage grouping ─────────────────────────────────────────── */

type StageGroup = 'revenue' | 'pre-revenue' | 'pre-product' | 'big-tech'

const STAGE_ORDER: StageGroup[] = ['revenue', 'pre-revenue', 'pre-product', 'big-tech']

interface GroupConfig {
  label: string
  color: string
  glow: string
  pillBg: string
  pillText: string
  pillBorder: string
  dotBg: string
}

const GROUP_CFG: Record<StageGroup, GroupConfig> = {
  revenue: {
    label: 'Revenue / Early Revenue',
    color: 'rgb(34,197,94)',
    glow: 'rgba(34,197,94,0.18)',
    pillBg: 'rgba(34,197,94,0.12)',
    pillText: 'rgb(74,222,128)',
    pillBorder: 'rgba(34,197,94,0.25)',
    dotBg: 'rgb(34,197,94)',
  },
  'pre-revenue': {
    label: 'Pre-Revenue',
    color: 'rgb(234,179,8)',
    glow: 'rgba(234,179,8,0.18)',
    pillBg: 'rgba(234,179,8,0.12)',
    pillText: 'rgb(250,204,21)',
    pillBorder: 'rgba(234,179,8,0.25)',
    dotBg: 'rgb(234,179,8)',
  },
  'pre-product': {
    label: 'Pre-Product',
    color: 'rgb(239,68,68)',
    glow: 'rgba(239,68,68,0.18)',
    pillBg: 'rgba(239,68,68,0.12)',
    pillText: 'rgb(248,113,113)',
    pillBorder: 'rgba(239,68,68,0.25)',
    dotBg: 'rgb(239,68,68)',
  },
  'big-tech': {
    label: 'Big Tech / Internal',
    color: 'rgb(113,113,122)',
    glow: 'rgba(113,113,122,0.18)',
    pillBg: 'rgba(113,113,122,0.12)',
    pillText: 'rgb(161,161,170)',
    pillBorder: 'rgba(113,113,122,0.25)',
    dotBg: 'rgb(113,113,122)',
  },
}

function getRowGroup(company: Company): StageGroup {
  if (company.overview.category === 'big-tech') return 'big-tech'
  const lower = company.pricing.revenueStage.toLowerCase()
  if (
    (lower.includes('revenue') && !lower.includes('pre-revenue')) ||
    lower.includes('arr')
  )
    return 'revenue'
  if (lower.includes('pre-product')) return 'pre-product'
  return 'pre-revenue'
}

function getPillGroup(stage: string): StageGroup {
  const lower = stage.toLowerCase()
  if (lower.includes('internal') || lower.includes('indirect')) return 'big-tech'
  if (
    (lower.includes('revenue') && !lower.includes('pre-revenue')) ||
    lower.includes('arr')
  )
    return 'revenue'
  if (lower.includes('pre-product')) return 'pre-product'
  if (lower.includes('pre-revenue') || lower === 'minimal') return 'pre-revenue'
  return 'big-tech'
}

/* ── Flatten companies into grouped rows ────────────────────────────── */

interface RowData {
  company: Company
  group: StageGroup
  globalIdx: number
  isFirstInGroup: boolean
}

function buildRows(): RowData[] {
  const buckets: Record<StageGroup, Company[]> = {
    revenue: [],
    'pre-revenue': [],
    'pre-product': [],
    'big-tech': [],
  }
  companies.forEach((c) => buckets[getRowGroup(c)].push(c))

  const rows: RowData[] = []
  let idx = 0
  STAGE_ORDER.forEach((g, gi) => {
    if (buckets[g].length === 0) return
    buckets[g].forEach((c, i) => {
      rows.push({
        company: c,
        group: g,
        globalIdx: idx++,
        isFirstInGroup: i === 0 && gi > 0,
      })
    })
  })
  return rows
}


/* ── 3-D tilt card (matches Thesis page) ───────────────────────────── */

function TiltCard({
  children,
  className,
  style: outerStyle,
}: {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
}) {
  const [tilt, setTilt] = useState<React.CSSProperties>({})

  const handleMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setTilt({
      transform: `perspective(600px) rotateX(${y * -8}deg) rotateY(${x * 8}deg) scale(1.02)`,
      transition: 'transform 100ms ease-out',
    })
  }, [])

  const handleLeave = useCallback(() => {
    setTilt({
      transform: 'perspective(600px) rotateX(0deg) rotateY(0deg) scale(1)',
      transition: 'transform 400ms ease-out',
    })
  }, [])

  return (
    <div
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ ...outerStyle, ...tilt }}
      className={className}
    >
      {children}
    </div>
  )
}

/* ── Pricing cell renderer ─────────────────────────────────────────── */

function PricingCell({ value }: { value: string }) {
  if (isEmpty(value)) {
    return (
      <span className="select-none text-text-muted" style={{ opacity: 0.3 }}>
        —
      </span>
    )
  }
  return (
    <span className="inline-block rounded bg-[rgba(255,255,255,0.03)] px-1.5 py-0.5">
      {value}
    </span>
  )
}

/* ── Revenue-stage pill ────────────────────────────────────────────── */

function StagePill({ stage }: { stage: string }) {
  const c = GROUP_CFG[getPillGroup(stage)]
  return (
    <span
      className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-2.5 py-0.5 font-mono text-[10px] font-medium"
      style={{
        background: c.pillBg,
        color: c.pillText,
        borderColor: c.pillBorder,
      }}
    >
      <span
        className="h-1.5 w-1.5 shrink-0 rounded-full"
        style={{ background: c.dotBg }}
      />
      {stage}
    </span>
  )
}

/* ── Insight cards data ────────────────────────────────────────────── */

const insights = [
  {
    title: 'The Pricing Vacuum',
    body: "Only World Labs and Runway have transparent, tiered consumer pricing. Everyone else is either gated, enterprise-only, or hasn't launched. First mover on pricing clarity wins developer trust.",
  },
  {
    title: 'API = Unlocked Revenue',
    body: 'API pricing is virtually nonexistent. World Labs charges ~$1.20/generation, Odyssey hints at $1-2/user-hour, but no one has a mature, self-serve API pricing page. This is the biggest GTM gap in the market.',
  },
  {
    title: 'Enterprise is Wide Open',
    body: 'Zero companies have standardized enterprise pricing. Every deal is \u201ccustom.\u201d The first company to publish transparent enterprise tiers captures the procurement pipeline.',
  },
  {
    title: 'Big Tech Subsidizes, Startups Must Monetize',
    body: "NVIDIA gives Cosmos away to sell GPUs. Google bundles Genie into a $250/mo subscription. Meta open-sources everything. Startups can\u2019t compete on free \u2014 they must compete on value, speed, and vertical specialization.",
  },
]

/* ── Column headers ────────────────────────────────────────────────── */

const COLUMNS = [
  'Company',
  'Model',
  'Consumer Tiers',
  'API Pricing',
  'Enterprise',
  'Commercial Rights',
  'Revenue Stage',
] as const

/* ── Main component ────────────────────────────────────────────────── */

export default function Pricing() {
  const rows = useMemo(buildRows, [])

  return (
    <div className="space-y-10">
      {/* ── Key Insight ───────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-lg border border-accent/30 bg-accent/5 p-6"
      >
        <p className="font-serif text-lg text-accent">Key Insight</p>
        <p className="mt-2 font-mono text-sm leading-relaxed text-text-secondary">
          Only 3 of 12 companies have public, transparent pricing (World Labs,
          Runway, Google). This pricing immaturity across the market represents a
          massive opportunity for a BD/GTM hire — whoever establishes pricing
          sophistication first will set market benchmarks.
        </p>
      </motion.div>

      {/* ── Grouped pricing table ─────────────────────────────────── */}
      <div className="sticky-table-wrap rounded-lg border border-[rgba(255,255,255,0.06)]">
        <table className="w-full min-w-[900px] border-collapse">
          <thead>
            <tr className="border-b border-[rgba(255,255,255,0.08)]">
              {COLUMNS.map((col, i) => (
                <th
                  key={col}
                  className={`px-4 py-3 text-left font-mono text-xs font-semibold uppercase tracking-wider text-text-muted ${i === 0 ? 'min-w-[140px]' : ''}`}
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {rows.map((row) => {
              const cfg = GROUP_CFG[row.group]
              const p = row.company.pricing

              return (
                <Fragment key={row.company.id}>
                  {row.isFirstInGroup && (
                    <tr aria-hidden>
                      <td
                        colSpan={7}
                        className="h-2"
                        style={{
                          background:
                            'linear-gradient(to right, rgba(255,255,255,0.03), transparent)',
                        }}
                      />
                    </tr>
                  )}

                  <motion.tr
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.15 + row.globalIdx * 0.03,
                      duration: 0.35,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                    whileHover={{
                      backgroundColor: 'rgba(255,255,255,0.025)',
                      boxShadow: `inset 5px 0 18px -6px ${cfg.glow}`,
                    }}
                    className="border-b border-[rgba(255,255,255,0.04)] transition-colors"
                    style={{ borderLeft: `3px solid ${cfg.color}` }}
                  >
                    <td className="px-4 py-3 font-mono text-sm font-medium text-text-primary whitespace-nowrap">
                      {row.company.overview.name}
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-text-secondary">
                      <PricingCell value={p.model} />
                    </td>
                    <td className="max-w-[200px] px-4 py-3 font-mono text-xs text-text-secondary">
                      <PricingCell value={p.consumerTiers} />
                    </td>
                    <td className="max-w-[150px] px-4 py-3 font-mono text-xs text-text-secondary">
                      <PricingCell value={p.apiPricing} />
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-text-secondary">
                      <PricingCell value={p.enterprise} />
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-text-secondary">
                      <PricingCell value={p.commercialRights} />
                    </td>
                    <td className="px-4 py-3">
                      <StagePill stage={p.revenueStage} />
                    </td>
                  </motion.tr>
                </Fragment>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* ── What This Means — Insight cards ───────────────────────── */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <h2 className="mb-6 font-serif text-2xl text-text-primary">
          What This Means
        </h2>

        <div className="grid gap-5 md:grid-cols-2">
          {insights.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 + i * 0.09, duration: 0.4 }}
            >
              <TiltCard
                className="group h-full cursor-default rounded-lg border border-[rgba(255,255,255,0.06)] bg-surface/50 p-6 transition-shadow duration-200 hover:shadow-[0_0_24px_rgba(232,255,89,0.06)]"
                style={{ borderTop: '2px solid rgba(232,255,89,0.3)' }}
              >
                <h3 className="mb-3 font-serif text-lg text-accent">
                  {card.title}
                </h3>
                <p className="font-mono text-xs leading-relaxed text-text-secondary">
                  {card.body}
                </p>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  )
}
