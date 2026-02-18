import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import type { DemoAssessment } from '../../data/demos'
import { companies } from '../../data/companies'

interface DemoCardProps {
  assessment: DemoAssessment
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

function RecordingPlayer({ src, onError }: { src: string; onError: () => void }) {
  const normalizedSrc = src.startsWith('/') ? src : `/${src}`
  return (
    <video
      key={src}
      src={normalizedSrc}
      controls
      className="w-full"
      playsInline
      onError={onError}
    />
  )
}

export default function DemoCard({ assessment }: DemoCardProps) {
  const [activeRecordingIndex, setActiveRecordingIndex] = useState(0)
  const [recordingError, setRecordingError] = useState(false)
  const [imageError, setImageError] = useState(false)

  useEffect(() => { setRecordingError(false) }, [activeRecordingIndex])

  const hasRecordings = assessment.recordings.length > 0
  const isAvailable = !assessment.notAvailableReason

  if (!isAvailable) {
    const firstVideo = assessment.videos[0]
    const embedUrl = firstVideo && isYouTubeUrl(firstVideo.src) ? getYouTubeEmbedUrl(firstVideo.src) : null
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-4 rounded-lg border border-[rgba(255,255,255,0.06)] bg-surface/20 p-8 opacity-90"
        style={{ backgroundImage: `repeating-linear-gradient(-45deg, transparent, transparent 10px, rgba(255,255,255,0.02) 10px, rgba(255,255,255,0.02) 20px)` }}
      >
        <h3 className="font-serif text-lg text-text-muted">{getCompanyName(assessment.companySlug)}</h3>
        <p className="font-mono text-sm text-text-secondary">{assessment.productTested}</p>
        {embedUrl && (
          <div className="aspect-video overflow-hidden rounded-lg border border-[rgba(255,255,255,0.08)]">
            <iframe src={embedUrl} title="Official demo" className="h-full w-full" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
          </div>
        )}
        {firstVideo?.caption && <p className="font-mono text-xs text-text-muted">{firstVideo.caption}</p>}
        <p className="font-mono text-sm leading-relaxed text-text-muted">{assessment.notAvailableReason}</p>
      </motion.div>
    )
  }

  const activeRecording = hasRecordings ? assessment.recordings[activeRecordingIndex] : null

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div>
        <h2 className="font-serif text-2xl text-accent">{getCompanyName(assessment.companySlug)}</h2>
        <p className="mt-1 font-mono text-sm font-semibold text-text-primary">{assessment.productTested}</p>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          {assessment.dateTested && <span className="font-mono text-xs text-text-muted">Tested: {assessment.dateTested}</span>}
          <span className="rounded bg-accent/20 px-2 py-0.5 font-mono text-xs text-accent">{assessment.accessMethod}</span>
        </div>
      </div>

      {hasRecordings && (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 animate-pulse rounded-full bg-red-500" />
            <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-text-primary">My Recording</h3>
          </div>
          <div className="overflow-hidden rounded-lg border border-accent/30 bg-black/40 shadow-lg" style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.3), 0 0 0 1px rgba(var(--accent-rgb, 139 92 246), 0.15)' }}>
            {recordingError ? (
              <div className="flex min-h-[200px] flex-col items-center justify-center gap-3 bg-surface/50 p-8">
                <div className="rounded-full bg-accent/10 p-3">
                  <svg className="h-6 w-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" />
                  </svg>
                </div>
                <p className="font-mono text-sm text-text-muted">Recording not found</p>
                <p className="font-mono text-xs text-text-muted/60">
                  Add your video to <code className="rounded bg-surface/80 px-1.5 py-0.5 text-accent">public/demos/{assessment.companySlug}/</code>
                </p>
              </div>
            ) : (
              <RecordingPlayer
                src={activeRecording!.src}
                onError={() => setRecordingError(true)}
              />
            )}
          </div>
          {assessment.recordings.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-2">
              {assessment.recordings.map((r, i) => (
                <button
                  key={r.src}
                  onClick={() => setActiveRecordingIndex(i)}
                  className={`shrink-0 rounded border px-3 py-2 text-left transition-colors ${activeRecordingIndex === i ? 'border-accent bg-accent/10' : 'border-[rgba(255,255,255,0.08)] bg-surface/50 hover:border-accent/50'}`}
                >
                  <span className={`block font-mono text-xs ${activeRecordingIndex === i ? 'text-accent' : 'text-text-secondary'}`}>{r.title}</span>
                </button>
              ))}
            </div>
          )}
          {activeRecording && (
            <div>
              <p className="font-mono text-sm font-medium text-text-primary">{activeRecording.title}</p>
              <p className="mt-0.5 font-mono text-xs text-text-muted">{activeRecording.description}</p>
            </div>
          )}
        </div>
      )}

      {assessment.referenceImage ? (
        <div className="space-y-3">
          <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-text-muted">Reference Image</h3>
          <div className="overflow-hidden rounded-lg border border-[rgba(255,255,255,0.08)] bg-black/20">
            {imageError ? (
              <div className="flex min-h-[200px] flex-col items-center justify-center gap-3 bg-surface/50 p-8">
                <svg className="h-6 w-6 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0 0 22.5 18.75V5.25A2.25 2.25 0 0 0 20.25 3H3.75A2.25 2.25 0 0 0 1.5 5.25v13.5A2.25 2.25 0 0 0 3.75 21Z" />
                </svg>
                <p className="font-mono text-sm text-text-muted">Image not found</p>
                <p className="font-mono text-xs text-text-muted/60">
                  Add your image to <code className="rounded bg-surface/80 px-1.5 py-0.5 text-accent">public/demos/reference/</code>
                </p>
              </div>
            ) : (
              <img
                src={assessment.referenceImage}
                alt={`Reference image for ${getCompanyName(assessment.companySlug)}`}
                className="w-full"
                onError={() => setImageError(true)}
              />
            )}
          </div>
        </div>
      ) : isAvailable ? (
        <div className="space-y-3">
          <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-text-muted">Reference Image</h3>
          <div className="flex min-h-[100px] items-center justify-center rounded-lg border border-dashed border-[rgba(255,255,255,0.1)] bg-surface/10 p-6">
            <p className="font-mono text-sm text-text-muted">N/A</p>
          </div>
        </div>
      ) : null}
    </motion.div>
  )
}
