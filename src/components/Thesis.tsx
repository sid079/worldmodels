import { useState, useCallback, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import {
  thesisPillars,
  heroStats,
  rightToWinMoats,
  playerArchetypes,
  strategicTimeline,
} from '../data/companies'
import WorldMesh from './WorldMesh'

/* ─── Animation Variants ─── */

const sectionReveal = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] },
  },
}

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
}

const staggerItem = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] },
  },
}

/* ─── Typewriter Quote ─── */

function TypewriterQuote({ text }: { text: string }) {
  const words = text.split(' ')
  return (
    <>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, filter: 'blur(8px)' }}
          animate={{ opacity: 1, filter: 'blur(0px)' }}
          transition={{
            duration: 0.5,
            delay: 0.6 + i * 0.055,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          style={{ display: 'inline' }}
        >
          {word}
          {i < words.length - 1 ? ' ' : ''}
        </motion.span>
      ))}
      <motion.span
        className="terminal-cursor"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 + words.length * 0.055 + 0.3 }}
      />
    </>
  )
}

/* ─── Neural Divider ─── */

function NeuralDivider() {
  return (
    <motion.div
      initial={{ opacity: 0, scaleX: 0 }}
      whileInView={{ opacity: 1, scaleX: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="py-4"
    >
      <div className="neural-divider" />
    </motion.div>
  )
}

/* ─── Ambient Orbs ─── */

function AmbientOrbs() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="ambient-orb ambient-orb-1" />
      <div className="ambient-orb ambient-orb-2" />
      <div className="ambient-orb ambient-orb-3" />
    </div>
  )
}

/* ─── Tilt Card with Holographic Class ─── */

function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const [style, setStyle] = useState<React.CSSProperties>({})

  const handleMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setStyle({
      transform: `perspective(600px) rotateX(${y * -8}deg) rotateY(${x * 8}deg) scale(1.02)`,
      transition: 'transform 100ms ease-out',
    })
  }, [])

  const handleLeave = useCallback(() => {
    setStyle({
      transform: 'perspective(600px) rotateX(0deg) rotateY(0deg) scale(1)',
      transition: 'transform 400ms ease-out',
    })
  }, [])

  return (
    <div onMouseMove={handleMove} onMouseLeave={handleLeave} style={style} className={className}>
      {children}
    </div>
  )
}

/* ─── Archetype Row ─── */

function ArchetypeRow({
  player,
}: {
  player: (typeof playerArchetypes)[number]
}) {
  const [open, setOpen] = useState(false)

  return (
    <motion.div
      layout
      className="cursor-pointer rounded-lg border border-[rgba(255,255,255,0.06)] bg-surface/30 transition-colors hover:border-accent/20"
      onClick={() => setOpen((v) => !v)}
    >
      <div className="grid grid-cols-1 items-center gap-4 px-5 py-4 sm:grid-cols-[1fr_auto_1fr]">
        <span className="font-serif text-lg text-accent">{player.company}</span>
        <span className="font-mono text-sm uppercase tracking-wider text-text-secondary">
          {player.archetype}
        </span>
        <span className="font-mono text-sm text-text-primary sm:text-right">{player.signal}</span>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <p className="border-t border-[rgba(255,255,255,0.06)] px-5 py-4 font-mono text-sm leading-relaxed text-text-secondary">
              {player.thesis}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

/* ─── Self-Drawing Timeline ─── */

function AnimatedTimeline() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.85', 'end 0.35'],
  })
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={staggerContainer}
      className="relative pl-8"
    >
      <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-accent/10" />
      <motion.div
        className="absolute left-0 top-0 w-[2px] origin-top bg-gradient-to-b from-accent/60 to-accent-mint/40"
        style={{ scaleY, height: '100%' }}
      />

      {strategicTimeline.map((item, i) => (
        <motion.div
          key={item.when}
          variants={staggerItem}
          className={`relative ${i < strategicTimeline.length - 1 ? 'pb-10' : ''}`}
        >
          <span className="absolute -left-[calc(2rem+5px)] top-1">
            <span className="relative block h-2.5 w-2.5">
              <span className="absolute inset-0 rounded-full border-2 border-accent bg-background" />
              <motion.span
                className="absolute inset-0 rounded-full border border-accent/50"
                initial={{ scale: 1, opacity: 0 }}
                whileInView={{ scale: 3, opacity: [0, 0.5, 0] }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: 0.2 + i * 0.15, ease: 'easeOut' }}
              />
            </span>
          </span>

          <span className="font-mono text-sm text-accent">{item.when}</span>
          <h4 className="mt-1 font-serif text-lg text-text-primary">{item.milestone}</h4>
          <p className="mt-0.5 font-mono text-sm text-text-secondary">{item.detail}</p>
          <p className="mt-2 font-mono text-sm leading-relaxed text-text-secondary">
            {item.implication}
          </p>
        </motion.div>
      ))}
    </motion.div>
  )
}

/* ─── Main Thesis Component ─── */

export default function Thesis() {
  return (
    <div className="relative">
      <AmbientOrbs />

      <div className="space-y-16">
        {/* ── SECTION 1: Hero — Conviction Statement ── */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          className="scan-line relative flex min-h-[460px] flex-col justify-center overflow-hidden rounded-xl bg-background py-16"
        >
          <WorldMesh />

          <blockquote className="relative z-10 max-w-4xl font-serif text-3xl font-normal leading-tight text-text-primary md:text-4xl lg:text-5xl">
            <TypewriterQuote text="World models are the most consequential AI paradigm shift since large language models — and the window to build category-defining companies is exactly 18 months." />
          </blockquote>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 2.4, ease: 'easeOut' }}
            className="relative z-10 mt-6 max-w-3xl font-mono text-base leading-relaxed text-text-secondary"
          >
            More than $3.4 billion has flooded into this space in the past 12 months alone; the
            companies that establish workflow integration and vertical dominance before foundation
            models commoditize will own the intelligence layer for how machines see, simulate, and
            build reality.
          </motion.p>

          <div className="relative z-10 mt-8 flex flex-wrap justify-center gap-3">
            {heroStats.map((stat, i) => (
              <motion.span
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 2.8 + i * 0.1, ease: 'easeOut' }}
                className="rounded-full border border-[rgba(255,255,255,0.08)] bg-surface/60 px-3.5 py-1.5 font-mono text-sm backdrop-blur-sm"
              >
                <span className="text-text-secondary">{stat.label} </span>
                <span className="text-accent">{stat.value}</span>
              </motion.span>
            ))}
          </div>
        </motion.section>

        <NeuralDivider />

        {/* ── SECTION 2: Why Now — Three Conviction Pillars ── */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={sectionReveal}
        >
          <h2 className="mb-2 font-mono text-sm uppercase tracking-wider text-text-muted">
            Why Now
          </h2>
          <h3 className="mb-8 font-serif text-2xl text-text-primary">Three Conviction Pillars</h3>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid gap-6 md:grid-cols-3"
          >
            {thesisPillars.map((pillar) => (
              <motion.div key={pillar.title} variants={staggerItem}>
                <TiltCard className="holographic-card group flex h-full cursor-default flex-col rounded-lg border border-[rgba(255,255,255,0.06)] bg-surface/50 p-6 transition-shadow duration-200 hover:border-accent/30 hover:shadow-[0_0_20px_rgba(232,255,89,0.05)]">
                  <div className="mb-4">
                    <span className="font-mono text-3xl font-semibold text-accent">
                      {pillar.stat}
                    </span>
                    <span className="ml-2 font-mono text-sm text-text-secondary">
                      {pillar.statLabel}
                    </span>
                  </div>
                  <h4 className="mb-2 font-serif text-lg text-text-primary">{pillar.title}</h4>
                  <p className="mb-4 font-mono text-sm leading-relaxed text-text-secondary">
                    {pillar.thesis}
                  </p>
                  <ul className="mt-auto space-y-2.5">
                    {pillar.bullets.map((b) => (
                      <li key={b.highlight} className="font-mono text-sm leading-snug">
                        <span className="font-semibold text-accent">{b.highlight}</span>{' '}
                        <span className="text-text-secondary">— {b.text}</span>
                      </li>
                    ))}
                  </ul>
                </TiltCard>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        <NeuralDivider />

        {/* ── SECTION 3: Right to Win — Evaluation Framework ── */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={sectionReveal}
        >
          <h2 className="mb-2 font-mono text-sm uppercase tracking-wider text-text-muted">
            Right to Win
          </h2>
          <h3 className="mb-8 font-serif text-2xl text-text-primary">Evaluation Framework</h3>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {rightToWinMoats.map((moat) => (
              <motion.div
                key={moat.type}
                variants={staggerItem}
                className="holographic-card rounded-lg border-l-2 border-accent/40 bg-surface/30 p-5"
              >
                <span className="font-mono text-base text-accent">{moat.icon}</span>
                <h4 className="mt-2 font-mono text-sm uppercase tracking-wider text-text-primary">
                  {moat.type}
                </h4>
                <p className="mt-2 font-mono text-sm leading-relaxed text-text-secondary">
                  {moat.definition}
                </p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {moat.companies.map((c, ci) => (
                    <span
                      key={c}
                      className="rounded bg-accent/10 px-2 py-0.5 font-mono text-xs text-accent"
                      title={moat.details[ci]}
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        <NeuralDivider />

        {/* ── SECTION 4: Who Wins Where — Player Archetype Map ── */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={sectionReveal}
        >
          <h2 className="mb-2 font-mono text-sm uppercase tracking-wider text-text-muted">
            Who Wins Where
          </h2>
          <h3 className="mb-8 font-serif text-2xl text-text-primary">Player Archetype Map</h3>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="space-y-3"
          >
            {playerArchetypes.map((player) => (
              <motion.div key={player.company} variants={staggerItem}>
                <ArchetypeRow player={player} />
              </motion.div>
            ))}
          </motion.div>
          <p className="mt-4 text-center font-mono text-sm text-text-muted">
            Click any row to expand thesis
          </p>
        </motion.section>

        <NeuralDivider />

        {/* ── SECTION 5: The Clock is Ticking — Strategic Timeline ── */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={sectionReveal}
        >
          <h2 className="mb-2 font-mono text-sm uppercase tracking-wider text-text-muted">
            The Clock is Ticking
          </h2>
          <h3 className="mb-8 font-serif text-2xl text-text-primary">Strategic Timeline</h3>
          <AnimatedTimeline />
        </motion.section>
      </div>
    </div>
  )
}
