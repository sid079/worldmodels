import { motion } from 'framer-motion'
import { investorConnects, icpSegments, tierConfig } from '../../data/odysseyGTM'

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

function ICPBadge({ segmentId }: { segmentId: string }) {
  const segment = icpSegments.find((s) => s.id === segmentId)
  if (!segment) return null
  const cfg = tierConfig[segment.tier]
  return (
    <span
      className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-mono text-[10px]"
      style={{ backgroundColor: `${cfg.color}15`, color: cfg.color }}
    >
      <span className="h-1 w-1 rounded-full" style={{ backgroundColor: cfg.color }} />
      {segment.name.length > 25 ? segment.name.slice(0, 22) + '…' : segment.name}
    </span>
  )
}

function ConnectionBadge({ type }: { type: string }) {
  const isStrategic = type === 'Strategic Investor'
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-0.5 font-mono text-xs ${
        isStrategic
          ? 'bg-accent/10 text-accent'
          : 'bg-[rgba(255,255,255,0.06)] text-text-secondary'
      }`}
    >
      {type}
    </span>
  )
}

export default function InvestorConnects() {
  const strategicInvestors = investorConnects.filter((i) => i.connectionType === 'Strategic Investor')
  const angelInvestors = investorConnects.filter((i) => i.connectionType === 'Angel Investor')

  const allSegmentIds = [...new Set(icpSegments.map((s) => s.id))]
  const allInvestors = investorConnects

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-10"
    >
      {/* Coverage Matrix */}
      <motion.section variants={itemVariants}>
        <h2 className="mb-4 font-serif text-xl text-text-primary">Investor × ICP Coverage Matrix</h2>
        <p className="mb-6 font-mono text-xs text-text-muted">
          Dots indicate an investor has a warm intro path into the ICP segment.
        </p>
        <div className="sticky-table-wrap rounded-lg border border-[rgba(255,255,255,0.06)]">
          <table className="w-full min-w-[700px] border-collapse">
            <thead>
              <tr className="border-b border-[rgba(255,255,255,0.06)]">
                <th className="min-w-[140px] px-3 py-2 text-left font-mono text-[10px] font-semibold uppercase tracking-wider text-text-muted">
                  Investor
                </th>
                {allSegmentIds.map((segId) => {
                  const seg = icpSegments.find((s) => s.id === segId)!
                  const cfg = tierConfig[seg.tier]
                  return (
                    <th
                      key={segId}
                      className="px-2 py-2 text-center font-mono text-[10px] font-semibold uppercase tracking-wider text-text-muted"
                    >
                      <div className="flex flex-col items-center gap-1">
                        <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: cfg.color }} />
                        <span className="max-w-[80px] leading-tight">
                          {seg.name.split(' ').slice(0, 2).join(' ')}
                        </span>
                      </div>
                    </th>
                  )
                })}
              </tr>
            </thead>
            <tbody>
              {allInvestors.map((investor) => (
                <tr
                  key={investor.investor}
                  className="border-b border-[rgba(255,255,255,0.06)] transition-colors hover:bg-surface/30"
                >
                  <td className="px-3 py-2.5 font-mono text-xs text-text-primary whitespace-nowrap">
                    {investor.investor}
                  </td>
                  {allSegmentIds.map((segId) => {
                    const connected = investor.icpSegments.includes(segId)
                    const seg = icpSegments.find((s) => s.id === segId)!
                    const cfg = tierConfig[seg.tier]
                    return (
                      <td key={segId} className="px-2 py-2.5 text-center">
                        {connected ? (
                          <span
                            className="inline-block h-2.5 w-2.5 rounded-full"
                            style={{ backgroundColor: cfg.color }}
                          />
                        ) : (
                          <span className="inline-block h-2.5 w-2.5 rounded-full bg-[rgba(255,255,255,0.04)]" />
                        )}
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.section>

      <hr className="border-[rgba(255,255,255,0.06)]" />

      {/* Strategic Investors */}
      <motion.section variants={containerVariants}>
        <h2 className="mb-6 font-serif text-xl text-text-primary">Strategic Investors</h2>
        <div className="grid gap-6 lg:grid-cols-2">
          {strategicInvestors.map((inv) => (
            <motion.div
              key={inv.investor}
              variants={itemVariants}
              className="rounded-lg border border-[rgba(255,255,255,0.06)] bg-surface/30 transition-all duration-200 hover:scale-[1.01] hover:border-accent/30"
            >
              {/* Card header with tier-colored left border */}
              <div className="border-b border-[rgba(255,255,255,0.06)] px-6 py-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <h3 className="font-serif text-lg text-accent">{inv.investor}</h3>
                    <p className="font-mono text-xs text-text-muted">{inv.fund}</p>
                  </div>
                  <ConnectionBadge type={inv.connectionType} />
                </div>
              </div>

              <div className="space-y-4 p-6">
                {/* Connected ICPs */}
                <div>
                  <p className="mb-2 font-mono text-xs font-semibold uppercase tracking-wider text-text-muted">
                    Connected ICP Segments
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {inv.icpSegments.map((segId) => (
                      <ICPBadge key={segId} segmentId={segId} />
                    ))}
                  </div>
                </div>

                {/* Warm Intro Targets */}
                <div>
                  <p className="mb-2 font-mono text-xs font-semibold uppercase tracking-wider text-text-muted">
                    Warm Intro Targets
                  </p>
                  <div className="space-y-2">
                    {inv.warmIntroTargets.map((target) => (
                      <div
                        key={target.company}
                        className="flex gap-3 rounded border border-[rgba(255,255,255,0.06)] bg-background/50 px-3 py-2"
                      >
                        <span className="shrink-0 font-mono text-xs text-text-primary">
                          {target.company}
                        </span>
                        <span className="font-mono text-xs text-text-muted">→</span>
                        <span className="font-mono text-xs text-text-secondary">
                          {target.rationale}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Deal Hypothesis */}
                <div className="rounded border border-[rgba(255,255,255,0.06)] bg-background/50 p-4">
                  <p className="mb-1 font-mono text-xs font-semibold uppercase tracking-wider text-text-muted">
                    Deal Hypothesis
                  </p>
                  <p className="font-mono text-xs italic leading-relaxed text-text-secondary">
                    {inv.dealHypothesis}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Angel Investors */}
      <motion.section variants={containerVariants}>
        <h2 className="mb-6 font-serif text-xl text-text-primary">Angel Investors</h2>
        <div className="grid gap-6 lg:grid-cols-2">
          {angelInvestors.map((inv) => (
            <motion.div
              key={inv.investor}
              variants={itemVariants}
              className="rounded-lg border border-[rgba(255,255,255,0.06)] bg-surface/30 transition-all duration-200 hover:scale-[1.01] hover:border-accent/30"
            >
              <div className="border-b border-[rgba(255,255,255,0.06)] px-6 py-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <h3 className="font-serif text-lg text-accent">{inv.investor}</h3>
                    <p className="font-mono text-xs text-text-muted">{inv.fund}</p>
                  </div>
                  <ConnectionBadge type={inv.connectionType} />
                </div>
              </div>

              <div className="space-y-4 p-6">
                {/* Connected ICPs */}
                <div>
                  <p className="mb-2 font-mono text-xs font-semibold uppercase tracking-wider text-text-muted">
                    Connected ICP Segments
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {inv.icpSegments.map((segId) => (
                      <ICPBadge key={segId} segmentId={segId} />
                    ))}
                  </div>
                </div>

                {/* Warm Intro Targets */}
                <div>
                  <p className="mb-2 font-mono text-xs font-semibold uppercase tracking-wider text-text-muted">
                    Warm Intro Targets
                  </p>
                  <div className="space-y-2">
                    {inv.warmIntroTargets.map((target) => (
                      <div
                        key={target.company}
                        className="flex gap-3 rounded border border-[rgba(255,255,255,0.06)] bg-background/50 px-3 py-2"
                      >
                        <span className="shrink-0 font-mono text-xs text-text-primary">
                          {target.company}
                        </span>
                        <span className="font-mono text-xs text-text-muted">→</span>
                        <span className="font-mono text-xs text-text-secondary">
                          {target.rationale}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Deal Hypothesis */}
                <div className="rounded border border-[rgba(255,255,255,0.06)] bg-background/50 p-4">
                  <p className="mb-1 font-mono text-xs font-semibold uppercase tracking-wider text-text-muted">
                    Deal Hypothesis
                  </p>
                  <p className="font-mono text-xs italic leading-relaxed text-text-secondary">
                    {inv.dealHypothesis}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </motion.div>
  )
}
