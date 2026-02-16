import { motion } from 'framer-motion'
import type { DemoAssessment } from '../../data/demos'
import { companies } from '../../data/companies'
import { ScoreBars } from './ScoreBar'

interface DemoCompareProps {
  assessments: DemoAssessment[]
}

function getCompanyName(slug: string): string {
  return companies.find((c) => c.id === slug)?.overview.name ?? slug
}

function getYouTubeEmbedUrl(src: string): string | null {
  const m = src.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/)
  return m ? `https://www.youtube.com/embed/${m[1]}?rel=0` : null
}

function isYouTubeUrl(src: string): boolean {
  return /youtube\.com|youtu\.be/i.test(src)
}

function VideoEmbed({ src, caption }: { src: string; caption: string }) {
  if (isYouTubeUrl(src)) {
    const embedUrl = getYouTubeEmbedUrl(src)
    if (embedUrl)
      return (
        <div className="overflow-hidden rounded border border-[rgba(255,255,255,0.08)]">
          <div className="aspect-video">
            <iframe src={embedUrl} title={caption} className="h-full w-full" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
          </div>
          <p className="px-2 py-1 font-mono text-[10px] text-text-muted">{caption}</p>
        </div>
      )
  }
  return (
    <div className="overflow-hidden rounded border border-[rgba(255,255,255,0.08)]">
      <video src={src.startsWith('/') ? src : `/${src}`} controls className="w-full" playsInline />
      <p className="px-2 py-1 font-mono text-[10px] text-text-muted">{caption}</p>
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
          {assessment.videos.length > 0 && (
            <div className="mb-4 space-y-2">
              {assessment.videos.slice(0, 2).map((v) => (
                <VideoEmbed key={v.src} src={v.src} caption={v.caption} />
              ))}
            </div>
          )}
          <div className="mb-4 flex-1">
            <p className="mb-2 font-mono text-[10px] font-semibold uppercase tracking-wider text-text-muted">Scores</p>
            <ScoreBars scores={assessment.scores} compact />
          </div>
          <div className="grid grid-cols-2 gap-3 border-t border-[rgba(255,255,255,0.06)] pt-4">
            <div>
              <p className="mb-1 font-mono text-[10px] text-accent">Strengths</p>
              <ul className="space-y-0.5">
                {assessment.strengths.slice(0, 2).map((s, i) => (
                  <li key={i} className="flex gap-1.5 font-mono text-[11px] text-text-secondary">
                    <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-accent" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="mb-1 font-mono text-[10px] text-[#FF6B6B]">Weaknesses</p>
              <ul className="space-y-0.5">
                {assessment.weaknesses.slice(0, 2).map((w, i) => (
                  <li key={i} className="flex gap-1.5 font-mono text-[11px] text-text-secondary">
                    <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-[#FF6B6B]" />
                    {w}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {assessment.bestFor && <p className="mt-3 font-mono text-[11px] text-accent">Best for: {assessment.bestFor}</p>}
        </div>
      ))}
    </motion.div>
  )
}
