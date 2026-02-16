import { motion } from 'framer-motion'
import { companies } from '../../data/companies'

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

const verticalIcons: Record<string, string> = {
  Gaming: '🎮',
  'Film/VFX': '🎬',
  Robotics: '🤖',
  Architecture: '🏛️',
  'E-commerce': '🛒',
  Film: '🎬',
  Simulation: '📐',
  Healthcare: '🏥',
  Industrial: '🏭',
  'Real Estate': '🏠',
  Social: '💬',
  Research: '🔬',
  'China market': '🌏',
}

export default function Product() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
    >
      {companies.map((company) => (
        <motion.div
          key={company.id}
          variants={itemVariants}
          className="group rounded-lg border border-[rgba(255,255,255,0.06)] bg-surface/30 p-6 transition-all duration-200 hover:scale-[1.02] hover:border-accent/30 hover:shadow-[0_0_20px_rgba(232,255,89,0.05)]"
        >
          <h3 className="mb-2 font-serif text-lg text-accent">
            {company.overview.name}
          </h3>
          <p className="mb-3 font-mono text-xs font-semibold uppercase tracking-wider text-text-muted">
            {company.product.productNames.join(', ')}
          </p>
          <p className="mb-4 font-mono text-sm text-text-secondary">
            {company.product.coreCapability}
          </p>
          <div className="space-y-2 border-t border-[rgba(255,255,255,0.06)] pt-4">
            <div>
              <span className="font-mono text-xs text-text-muted">Input: </span>
              <span className="font-mono text-xs text-text-secondary">
                {company.product.inputModalities.join(', ')}
              </span>
            </div>
            <div>
              <span className="font-mono text-xs text-text-muted">Output: </span>
              <span className="font-mono text-xs text-text-secondary">
                {company.product.outputFormat.join(', ')}
              </span>
            </div>
            <div>
              <span className="font-mono text-xs text-text-muted">Differentiator: </span>
              <span className="font-mono text-xs text-text-secondary">
                {company.product.keyDifferentiator}
              </span>
            </div>
            <div className="flex flex-wrap gap-1 pt-2">
              {company.product.targetVerticals.map((v) => (
                <span
                  key={v}
                  className="rounded bg-surface px-2 py-0.5 font-mono text-xs text-text-secondary"
                  title={v}
                >
                  {verticalIcons[v] || '•'} {v}
                </span>
              ))}
            </div>
            <div>
              <span className="font-mono text-xs text-text-muted">Access: </span>
              <span className="font-mono text-xs text-accent">
                {company.product.accessModel}
              </span>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}
