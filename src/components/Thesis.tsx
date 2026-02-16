import { motion } from 'framer-motion'
import { thesisPillars, marketCategories } from '../data/companies'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
}

export default function Thesis() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-16"
    >
      {/* Hero */}
      <motion.section variants={itemVariants} className="max-w-4xl">
        <blockquote className="font-serif text-4xl font-normal leading-tight text-text-primary md:text-5xl">
          "The spatial AI market is at its commercialization inflection point. The GTM playbooks being written right now will determine who captures the $10B+ opportunity."
        </blockquote>
      </motion.section>

      <hr className="border-[rgba(255,255,255,0.06)]" />

      {/* Thesis Pillars */}
      <section className="grid gap-6 md:grid-cols-3">
        {thesisPillars.map((pillar) => (
          <motion.div
            key={pillar.title}
            variants={itemVariants}
            className="group cursor-default rounded-lg border border-[rgba(255,255,255,0.06)] bg-surface/50 p-6 transition-all duration-200 hover:scale-[1.02] hover:border-accent/30 hover:shadow-[0_0_20px_rgba(232,255,89,0.05)]"
          >
            <h3 className="mb-3 font-serif text-xl text-accent">
              {pillar.title}
            </h3>
            <p className="font-mono text-sm leading-relaxed text-text-secondary">
              {pillar.content}
            </p>
          </motion.div>
        ))}
      </section>

      <hr className="border-[rgba(255,255,255,0.06)]" />

      {/* Market Landscape */}
      <motion.section variants={itemVariants}>
        <h2 className="mb-6 font-serif text-2xl text-text-primary">
          Market Landscape
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          {Object.entries(marketCategories).map(([category, companies]) => (
            <div
              key={category}
              className="rounded-lg border border-[rgba(255,255,255,0.06)] bg-surface/30 p-6"
            >
              <h3 className="mb-4 font-mono text-xs font-semibold uppercase tracking-wider text-text-muted">
                {category}
              </h3>
              <ul className="space-y-2">
                {companies.map((company) => (
                  <li
                    key={company}
                    className="font-mono text-sm text-text-secondary"
                  >
                    • {company}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </motion.section>
    </motion.div>
  )
}
