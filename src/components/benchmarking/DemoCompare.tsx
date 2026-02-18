import { useState } from 'react'
import { motion } from 'framer-motion'
import type { DemoAssessment } from '../../data/demos'
import { companies } from '../../data/companies'

interface DemoCompareProps {
  assessments: DemoAssessment[]
}

function getCompanyName(slug: string): string {
  return companies.find((c) => c.id === slug)?.overview.name ?? slug
}

function RecordingEmbed({ src, title }: { src: string; title: string }) {
  const [error, setError] = useState(false)
  const normalizedSrc = src.startsWith('/') ? src : `/${src}`
  return (
    <div className="overflow-hidden rounded border border-accent/30">
      {error ? (
        <div className="flex aspect-video items-center justify-center bg-surface/50">
          <p className="font-mono text-[10px] text-text-muted">Recording not found</p>
        </div>
      ) : (
        <video src={normalizedSrc} controls className="w-full" playsInline onError={() => setError(true)} />
      )}
      <div className="flex items-center gap-1.5 px-2 py-1">
        <div className="h-1.5 w-1.5 rounded-full bg-red-500" />
        <p className="font-mono text-[10px] text-text-primary">{title}</p>
      </div>
    </div>
  )
}

export default function DemoCompare({ assessments }: DemoCompareProps) {
  const availableAssessments = assessments.filter((a) => !a.notAvailableReason)

  if (availableAssessments.length === 0) {
    return (
      <div className="rounded-lg border border-[rgba(255,255,255,0.06)] bg-surface/30 p-8 text-center">
        <p className="font-mono text-sm text-text-muted">Select 2–3 companies with available demos to compare.</p>
      </div>
    )
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid gap-6" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))' }}>
      {availableAssessments.map((assessment) => (
        <div key={assessment.companySlug} className="flex flex-col rounded-lg border border-[rgba(255,255,255,0.06)] bg-surface/30 p-5">
          <h3 className="mb-1 font-serif text-lg text-accent">{getCompanyName(assessment.companySlug)}</h3>
          <p className="mb-3 font-mono text-xs text-text-muted">{assessment.productTested} • {assessment.accessMethod}</p>

          {assessment.recordings.length > 0 && (
            <div className="mb-4 space-y-2">
              {assessment.recordings.slice(0, 1).map((r) => (
                <RecordingEmbed key={r.src} src={r.src} title={r.title} />
              ))}
            </div>
          )}

          {assessment.referenceImage ? (
            <div className="mb-4">
              <p className="mb-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-text-muted">Reference</p>
              <div className="overflow-hidden rounded border border-[rgba(255,255,255,0.08)]">
                <img src={assessment.referenceImage} alt={`Reference for ${getCompanyName(assessment.companySlug)}`} className="w-full" />
              </div>
            </div>
          ) : (
            <div className="mb-4">
              <p className="mb-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-text-muted">Reference</p>
              <div className="flex min-h-[60px] items-center justify-center rounded border border-dashed border-[rgba(255,255,255,0.1)] bg-surface/10">
                <p className="font-mono text-[10px] text-text-muted">N/A</p>
              </div>
            </div>
          )}
        </div>
      ))}
    </motion.div>
  )
}
