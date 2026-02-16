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

const categoryLabels: Record<string, string> = {
  'static-3d': 'Static 3D Scene Generation',
  'interactive-streaming': 'Interactive Real-Time Streaming',
  'video-generation': 'Video Generation (extending to worlds)',
  jepa: 'Latent Space Prediction (JEPA)',
  'game-engine': 'Game-Specific Engines',
  infrastructure: 'Infrastructure Platform',
}

const categories = [
  'static-3d',
  'interactive-streaming',
  'video-generation',
  'jepa',
  'game-engine',
  'infrastructure',
] as const

export default function Technology() {
  const byCategory = categories.map((cat) => ({
    label: categoryLabels[cat],
    companies: companies.filter((c) => c.technology.category === cat),
  }))

  return (
    <div className="space-y-10">
      {/* Architectural split */}
      <motion.section
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-lg border border-[rgba(255,255,255,0.06)] bg-surface/30 p-6"
      >
        <h3 className="mb-4 font-serif text-lg text-accent">
          Architectural Split in the Market
        </h3>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {byCategory.map(
            (group) =>
              group.companies.length > 0 && (
                <div key={group.label} className="space-y-2">
                  <p className="font-mono text-xs font-semibold text-text-muted">
                    {group.label}
                  </p>
                  <p className="font-mono text-sm text-text-secondary">
                    {group.companies.map((c) => c.overview.name).join(', ')}
                  </p>
                </div>
              )
          )}
        </div>
      </motion.section>

      <hr className="border-[rgba(255,255,255,0.06)]" />

      {/* Per-company technical comparison */}
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
            className="rounded-lg border border-[rgba(255,255,255,0.06)] bg-surface/30 p-6 transition-all duration-200 hover:scale-[1.02] hover:border-accent/30"
          >
            <h3 className="mb-2 font-serif text-lg text-accent">
              {company.overview.name}
            </h3>
            <div className="space-y-2 font-mono text-xs">
              <div>
                <span className="text-text-muted">Architecture: </span>
                <span className="text-text-secondary">
                  {company.technology.architectureType}
                </span>
              </div>
              <div>
                <span className="text-text-muted">Training: </span>
                <span className="text-text-secondary">
                  {company.technology.trainingDataStrategy}
                </span>
              </div>
              <div>
                <span className="text-text-muted">Model Size: </span>
                <span className="tabular-nums text-text-secondary">
                  {company.technology.modelSize}
                </span>
              </div>
              <div>
                <span className="text-text-muted">Output: </span>
                <span className="text-text-secondary">
                  {company.technology.outputQuality}
                </span>
              </div>
              <div>
                <span className="text-text-muted">Open Source: </span>
                <span className="text-text-secondary">
                  {company.technology.openSource}
                </span>
              </div>
              <div className="pt-2 border-t border-[rgba(255,255,255,0.06)]">
                <span className="text-text-muted">Innovation: </span>
                <span className="text-text-secondary">
                  {company.technology.keyTechnicalInnovation}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
