import { useState, useMemo } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { demoAssessments } from '../../data/demos'
import { companies } from '../../data/companies'
import DemoCard from './DemoCard'
import DemoCompare from './DemoCompare'

type ViewMode = 'single' | 'compare'

function getCompanyName(slug: string): string {
  return companies.find((c) => c.id === slug)?.overview.name ?? slug
}

export default function Demos() {
  const [selectedSlug, setSelectedSlug] = useState<string | null>(() => {
    const firstAvailable = demoAssessments.find((a) => !a.notAvailableReason)
    return firstAvailable?.companySlug ?? demoAssessments[0]?.companySlug ?? null
  })
  const [viewMode, setViewMode] = useState<ViewMode>('single')
  const [compareSlugs, setCompareSlugs] = useState<Set<string>>(new Set())

  const selectedAssessment = useMemo(() => demoAssessments.find((a) => a.companySlug === selectedSlug), [selectedSlug])
  const compareAssessments = useMemo(() => demoAssessments.filter((a) => compareSlugs.has(a.companySlug)), [compareSlugs])

  const toggleCompare = (slug: string) => {
    setCompareSlugs((prev) => {
      const next = new Set(prev)
      if (next.has(slug)) next.delete(slug)
      else if (next.size < 3) next.add(slug)
      return next
    })
  }

  return (
    <div className="flex flex-col gap-6 lg:flex-row">
      <aside className="w-full shrink-0 lg:w-[30%]">
        <div className="flex flex-row gap-2 overflow-x-auto pb-2 lg:sticky lg:top-24 lg:max-h-[calc(100vh-8rem)] lg:flex-col lg:overflow-x-visible lg:overflow-y-auto lg:pb-0">
          <div className="flex min-w-0 shrink-0 gap-1 lg:flex-col lg:space-y-1 lg:pr-2">
            {demoAssessments.map((assessment) => {
              const isTested = !assessment.notAvailableReason
              const isSelected = selectedSlug === assessment.companySlug
              const isCompareSelected = compareSlugs.has(assessment.companySlug)
              const hasRecording = assessment.recordings.length > 0
              return (
                <button
                  key={assessment.companySlug}
                  onClick={() => (viewMode === 'single' ? setSelectedSlug(assessment.companySlug) : toggleCompare(assessment.companySlug))}
                  className={`flex shrink-0 flex-col items-start gap-1 rounded-r px-3 py-2.5 text-left transition-colors hover:bg-surface/50 lg:w-full ${viewMode === 'single' && isSelected ? 'border-l-[3px] border-accent bg-surface/50' : viewMode === 'compare' && isCompareSelected ? 'border-l-[3px] border-accent bg-surface/50' : 'border-l-[3px] border-transparent'}`}
                >
                  <span className="font-mono text-sm text-text-primary">{getCompanyName(assessment.companySlug)}</span>
                  <div className="flex items-center gap-1.5">
                    {hasRecording && (
                      <span className="flex items-center gap-1 rounded bg-red-500/20 px-1.5 py-0.5 font-mono text-[10px] text-red-400">
                        <span className="inline-block h-1.5 w-1.5 rounded-full bg-red-500" />
                        Recorded
                      </span>
                    )}
                    <span className={`rounded px-1.5 py-0.5 font-mono text-[10px] ${isTested ? 'bg-accent/20 text-accent' : 'bg-[rgba(255,255,255,0.06)] text-text-muted'}`}>
                      {isTested ? 'Tested' : 'Not Available'}
                    </span>
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </aside>

      <main className="min-w-0 flex-1">
        <div className="mb-6 flex items-center justify-end gap-2">
          <span className="font-mono text-xs text-text-muted">View:</span>
          <div className="flex rounded border border-[rgba(255,255,255,0.08)] p-0.5">
            <button onClick={() => setViewMode('single')} className={`rounded px-3 py-1.5 font-mono text-xs transition-colors ${viewMode === 'single' ? 'bg-accent/20 text-accent' : 'text-text-secondary hover:text-text-primary'}`}>
              Single View
            </button>
            <button onClick={() => setViewMode('compare')} className={`rounded px-3 py-1.5 font-mono text-xs transition-colors ${viewMode === 'compare' ? 'bg-accent/20 text-accent' : 'text-text-secondary hover:text-text-primary'}`}>
              Compare
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {viewMode === 'single' ? (
            <motion.div key="single" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
              {selectedAssessment ? <DemoCard assessment={selectedAssessment} /> : (
                <div className="rounded-lg border border-[rgba(255,255,255,0.06)] bg-surface/30 p-12 text-center">
                  <p className="font-mono text-sm text-text-muted">Select a company from the sidebar.</p>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div key="compare" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
              <p className="mb-4 font-mono text-xs text-text-muted">Select 2–3 companies from the sidebar to compare side-by-side.</p>
              <DemoCompare assessments={compareAssessments} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  )
}
