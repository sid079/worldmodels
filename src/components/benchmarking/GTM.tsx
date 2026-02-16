import { motion } from 'framer-motion'
import { companies } from '../../data/companies'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.05 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0 },
}

const interviewTargets = ['world-labs', 'odyssey', 'spaitial']

export default function GTM() {
  const targetCompanies = companies.filter((c) =>
    interviewTargets.includes(c.id)
  )
  const otherCompanies = companies.filter(
    (c) => !interviewTargets.includes(c.id)
  )

  return (
    <div className="space-y-10">
      {/* BD/Sales opportunity callout */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-lg border border-accent/30 bg-accent/5 p-6"
      >
        <p className="font-serif text-lg text-accent">The Opportunity</p>
        <p className="mt-2 font-mono text-sm leading-relaxed text-text-secondary">
          World Labs, Odyssey, and SpAItial have <strong className="text-accent">NO BD/sales hires</strong> — this is the opportunity. Runway serves as the benchmark with established GTM.
        </p>
      </motion.div>

      {/* Interview targets with recommended strategy */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <h3 className="mb-6 font-serif text-xl text-text-primary">
          Interview Targets — Recommended Strategy
        </h3>
        <div className="space-y-6">
          {targetCompanies.map((company) => (
            <motion.div
              key={company.id}
              variants={itemVariants}
              className="rounded-lg border border-[rgba(255,255,255,0.06)] bg-surface/30 p-6 transition-all duration-200 hover:scale-[1.01] hover:border-accent/30"
            >
              <h4 className="mb-4 font-serif text-lg text-accent">
                {company.overview.name}
              </h4>
              <div className="mb-4 grid gap-2 font-mono text-xs md:grid-cols-2">
                <div>
                  <span className="text-text-muted">Growth Model: </span>
                  <span className="text-text-secondary">
                    {company.gtm.growthModel}
                  </span>
                </div>
                <div>
                  <span className="text-text-muted">Channels: </span>
                  <span className="text-text-secondary">
                    {company.gtm.distributionChannels.join(', ')}
                  </span>
                </div>
                <div>
                  <span className="text-text-muted">Partnerships: </span>
                  <span className="text-text-secondary">
                    {company.gtm.keyPartnerships.join(', ')}
                  </span>
                </div>
                <div>
                  <span className="text-text-muted">BD/Sales: </span>
                  <span className="text-accent">{company.gtm.bdSalesTeam}</span>
                </div>
                <div className="md:col-span-2">
                  <span className="text-text-muted">Community: </span>
                  <span className="text-text-secondary">
                    {company.gtm.community.join(', ')}
                  </span>
                </div>
              </div>
              {company.gtm.recommendedStrategy && (
                <div className="rounded border border-[rgba(255,255,255,0.06)] bg-background/50 p-4">
                  <p className="font-mono text-xs font-semibold text-text-muted">
                    Recommended Strategy
                  </p>
                  <p className="mt-2 font-mono text-sm leading-relaxed text-text-secondary">
                    {company.gtm.recommendedStrategy}
                  </p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.section>

      <hr className="border-[rgba(255,255,255,0.06)]" />

      {/* All companies GTM summary */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <h3 className="mb-6 font-serif text-xl text-text-primary">
          Full GTM Comparison
        </h3>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {otherCompanies.map((company) => (
            <motion.div
              key={company.id}
              variants={itemVariants}
              className="rounded-lg border border-[rgba(255,255,255,0.06)] bg-surface/30 p-5 transition-all duration-200 hover:scale-[1.01] hover:border-accent/20"
            >
              <h4 className="mb-3 font-serif text-base text-accent">
                {company.overview.name}
              </h4>
              <div className="space-y-1.5 font-mono text-xs">
                <div>
                  <span className="text-text-muted">Model: </span>
                  <span className="text-text-secondary">
                    {company.gtm.growthModel}
                  </span>
                </div>
                <div>
                  <span className="text-text-muted">Channels: </span>
                  <span className="text-text-secondary">
                    {company.gtm.distributionChannels.join(', ')}
                  </span>
                </div>
                <div>
                  <span className="text-text-muted">Partners: </span>
                  <span className="text-text-secondary">
                    {company.gtm.keyPartnerships.slice(0, 2).join(', ')}
                    {company.gtm.keyPartnerships.length > 2 && '...'}
                  </span>
                </div>
                <div>
                  <span className="text-text-muted">BD/Sales: </span>
                  <span className="text-text-secondary">
                    {company.gtm.bdSalesTeam}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  )
}
