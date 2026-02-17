import { motion } from 'framer-motion'
import { companies } from '../../data/companies'

const interviewTargets = ['world-labs', 'odyssey', 'spaitial']

export default function GTM() {
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

      {/* Full GTM Comparison — Table */}
      <div>
        <h3 className="mb-6 font-serif text-xl text-text-primary">
          Full GTM Comparison
        </h3>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-x-auto rounded-lg border border-[rgba(255,255,255,0.06)]"
        >
          <table className="w-full border-collapse font-mono text-xs">
            <thead>
              <tr className="border-b border-[rgba(255,255,255,0.1)] bg-surface/40">
                <th className="whitespace-nowrap px-4 py-3 text-left font-semibold text-accent">
                  Company
                </th>
                <th className="whitespace-nowrap px-4 py-3 text-left font-semibold text-accent">
                  Growth Model
                </th>
                <th className="whitespace-nowrap px-4 py-3 text-left font-semibold text-accent">
                  Distribution Channels
                </th>
                <th className="whitespace-nowrap px-4 py-3 text-left font-semibold text-accent">
                  Key Partnerships
                </th>
                <th className="whitespace-nowrap px-4 py-3 text-left font-semibold text-accent">
                  BD/Sales
                </th>
                <th className="whitespace-nowrap px-4 py-3 text-left font-semibold text-accent">
                  Community
                </th>
              </tr>
            </thead>
            <tbody>
              {companies.map((company, idx) => {
                const isTarget = interviewTargets.includes(company.id)
                return (
                  <tr
                    key={company.id}
                    className={`border-b border-[rgba(255,255,255,0.04)] transition-colors hover:bg-surface/40 ${
                      isTarget ? 'bg-accent/[0.03]' : ''
                    } ${idx % 2 === 0 ? 'bg-surface/10' : ''}`}
                  >
                    <td className="whitespace-nowrap px-4 py-3">
                      <span className={isTarget ? 'font-semibold text-accent' : 'text-text-primary'}>
                        {company.overview.name}
                      </span>
                      {isTarget && (
                        <span className="ml-2 rounded-full bg-accent/10 px-1.5 py-0.5 text-[10px] text-accent">
                          target
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-text-secondary">
                      {company.gtm.growthModel}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1">
                        {company.gtm.distributionChannels.map((ch) => (
                          <span
                            key={ch}
                            className="inline-block rounded bg-[rgba(255,255,255,0.05)] px-1.5 py-0.5 text-[10px] text-text-secondary"
                          >
                            {ch}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-text-secondary">
                      {company.gtm.keyPartnerships.join(', ')}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={
                          company.gtm.bdSalesTeam.toLowerCase().includes('no bd') ||
                          company.gtm.bdSalesTeam.toLowerCase().includes('none')
                            ? 'text-red-400'
                            : company.gtm.bdSalesTeam.toLowerCase().includes('early')
                            ? 'text-yellow-400'
                            : 'text-green-400'
                        }
                      >
                        {company.gtm.bdSalesTeam}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-text-secondary">
                      {company.gtm.community.join(', ')}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </motion.div>
      </div>
    </div>
  )
}
