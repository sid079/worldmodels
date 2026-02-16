import { motion } from 'framer-motion'
import { companies } from '../../data/companies'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.03, delayChildren: 0.05 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0 },
}

export default function Pricing() {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-lg border border-accent/30 bg-accent/5 p-6"
      >
        <p className="font-serif text-lg text-accent">Key Insight</p>
        <p className="mt-2 font-mono text-sm leading-relaxed text-text-secondary">
          Only 3 of 12 companies have public, transparent pricing (World Labs, Runway, Google). This pricing immaturity across the market represents a massive opportunity for a BD/GTM hire — whoever establishes pricing sophistication first will set market benchmarks.
        </p>
      </motion.div>

      <div className="overflow-x-auto">
        <motion.table
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full min-w-[800px] border-collapse"
        >
          <thead>
            <tr className="border-b border-[rgba(255,255,255,0.06)]">
              <th className="px-4 py-3 text-left font-mono text-xs font-semibold uppercase tracking-wider text-text-muted">
                Company
              </th>
              <th className="px-4 py-3 text-left font-mono text-xs font-semibold uppercase tracking-wider text-text-muted">
                Model
              </th>
              <th className="px-4 py-3 text-left font-mono text-xs font-semibold uppercase tracking-wider text-text-muted">
                Consumer Tiers
              </th>
              <th className="px-4 py-3 text-left font-mono text-xs font-semibold uppercase tracking-wider text-text-muted">
                API Pricing
              </th>
              <th className="px-4 py-3 text-left font-mono text-xs font-semibold uppercase tracking-wider text-text-muted">
                Enterprise
              </th>
              <th className="px-4 py-3 text-left font-mono text-xs font-semibold uppercase tracking-wider text-text-muted">
                Commercial Rights
              </th>
              <th className="px-4 py-3 text-left font-mono text-xs font-semibold uppercase tracking-wider text-text-muted">
                Revenue Stage
              </th>
            </tr>
          </thead>
          <tbody>
            {companies.map((company) => (
              <motion.tr
                key={company.id}
                variants={itemVariants}
                className="border-b border-[rgba(255,255,255,0.06)] hover:bg-surface/30"
              >
                <td className="px-4 py-3 font-mono text-sm text-text-primary">
                  {company.overview.name}
                </td>
                <td className="px-4 py-3 font-mono text-xs text-text-secondary">
                  {company.pricing.model}
                </td>
                <td className="max-w-[180px] px-4 py-3 font-mono text-xs text-text-secondary">
                  {company.pricing.consumerTiers}
                </td>
                <td className="max-w-[140px] px-4 py-3 font-mono text-xs text-text-secondary">
                  {company.pricing.apiPricing}
                </td>
                <td className="px-4 py-3 font-mono text-xs text-text-secondary">
                  {company.pricing.enterprise}
                </td>
                <td className="px-4 py-3 font-mono text-xs text-text-secondary">
                  {company.pricing.commercialRights}
                </td>
                <td className="px-4 py-3 font-mono text-xs tabular-nums text-text-secondary">
                  {company.pricing.revenueStage}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </motion.table>
      </div>
    </div>
  )
}
