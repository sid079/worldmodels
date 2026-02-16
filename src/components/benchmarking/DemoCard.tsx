import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import type { DemoAssessment } from '../../data/demos'
import { companies } from '../../data/companies'
import { ScoreBars } from './ScoreBar'

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

export default function DemoCard({ assessment }: DemoCardProps) {
  const [activeVideoIndex, setActiveVideoIndex] = useState(0)
  const [videoError, setVideoError] = useState(false)
  useEffect(() => { setVideoError(false) }, [activeVideoIndex])

  const hasVideos = assessment.videos.length > 0
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

  const activeVideo = hasVideos ? assessment.videos[activeVideoIndex] : null
  const videoSrc = activeVideo?.src ?? null
  const isYouTube = videoSrc && isYouTubeUrl(videoSrc)
  const youtubeEmbedUrl = videoSrc && isYouTube ? getYouTubeEmbedUrl(videoSrc) : null

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

      {hasVideos && (
        <div className="space-y-3">
          <div className="overflow-hidden rounded-lg border border-[rgba(255,255,255,0.08)] bg-black/40 shadow-lg" style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.3)' }}>
            {isYouTube && youtubeEmbedUrl ? (
              <div className="aspect-video w-full">
                <iframe key={youtubeEmbedUrl} src={youtubeEmbedUrl} title={activeVideo?.caption ?? 'Demo video'} className="h-full w-full" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
              </div>
            ) : videoError ? (
              <div className="flex min-h-[200px] items-center justify-center bg-surface/50 p-8 font-mono text-sm text-text-muted">
                Video file not found — add your recording to public/demos/{assessment.companySlug}/
              </div>
            ) : (
              <video key={videoSrc} src={videoSrc?.startsWith('/') ? videoSrc : `/${videoSrc}`} controls className="w-full" playsInline onError={() => setVideoError(true)} />
            )}
          </div>
          {assessment.videos.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-2">
              {assessment.videos.map((v, i) => (
                <button key={v.src} onClick={() => setActiveVideoIndex(i)} className={`shrink-0 rounded border px-3 py-2 font-mono text-xs transition-colors ${activeVideoIndex === i ? 'border-accent bg-accent/10 text-accent' : 'border-[rgba(255,255,255,0.08)] bg-surface/50 text-text-secondary hover:border-accent/50 hover:text-accent'}`}>
                  Video {i + 1}
                </button>
              ))}
            </div>
          )}
          {activeVideo && <p className="font-mono text-xs text-text-muted">{activeVideo.caption}</p>}
        </div>
      )}

      <div className="rounded-lg border border-[rgba(255,255,255,0.06)] bg-surface/30 p-6">
        <h4 className="mb-4 font-serif text-base text-accent">Personal Assessment</h4>
        <div className="mb-6">
          <p className="mb-3 font-mono text-xs font-semibold uppercase tracking-wider text-text-muted">Scores (1–5)</p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            <ScoreBars scores={assessment.scores} compact />
          </div>
        </div>
        <div className="mb-6 grid gap-6 sm:grid-cols-2">
          <div>
            <p className="mb-2 font-mono text-xs font-semibold uppercase tracking-wider text-accent">Strengths</p>
            <ul className="space-y-1">
              {assessment.strengths.map((s, i) => (
                <li key={i} className="flex items-start gap-2 font-mono text-sm text-text-secondary">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  {s}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-2 font-mono text-xs font-semibold uppercase tracking-wider text-[#FF6B6B]">Weaknesses</p>
            <ul className="space-y-1">
              {assessment.weaknesses.map((w, i) => (
                <li key={i} className="flex items-start gap-2 font-mono text-sm text-text-secondary">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#FF6B6B]" />
                  {w}
                </li>
              ))}
            </ul>
          </div>
        </div>
        {assessment.verdict && (
          <blockquote className="mb-6 border-l-4 border-accent bg-accent/5 py-3 pl-4 font-serif text-lg italic leading-relaxed text-text-primary">
            {assessment.verdict}
          </blockquote>
        )}
        {assessment.bestFor && (
          <div className="rounded-full bg-accent/10 px-4 py-2 font-mono text-sm text-accent">
            Best for: {assessment.bestFor}
          </div>
        )}
      </div>
    </motion.div>
  )
}
