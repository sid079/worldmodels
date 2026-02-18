import { useState } from 'react'
import { motion } from 'framer-motion'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
}

/* ─── Skillset columns ─── */

interface CompanyRef {
  name: string
  logo?: string
  url: string
  invertLogo?: boolean
}

const skillsetColumns: {
  title: string
  subtitle?: string
  borderColor: string
  companies: CompanyRef[]
  tags: string[]
}[] = [
  {
    title: 'Consulting',
    borderColor: 'rgba(232,255,89,0.4)',
    companies: [
      { name: 'BCG', logo: '/logos/bcg.png', url: 'https://www.bcg.com/' },
    ],
    tags: [
      'Market sizing',
      'Competitive analysis',
      'Due diligence',
      'Sector mapping',
    ],
  },
  {
    title: 'Venture Capital',
    borderColor: 'rgba(0,255,209,0.4)',
    companies: [
      {
        name: 'Accel',
        logo: '/logos/accel.png',
        url: 'https://www.accel.com/',
      },
    ],
    tags: [
      'Deal sourcing',
      'Portfolio support',
      'Gaming & fintech',
      'Thesis development',
    ],
  },
  {
    title: 'Startups',
    subtitle: 'Strategy & GTM',
    borderColor: 'rgba(34,197,94,0.4)',
    companies: [
      { name: 'KGen', logo: '/logos/kgen.png', url: 'https://kgen.io/' },
      {
        name: 'MetaGravity',
        logo: '/logos/metagravity-icon.png',
        url: 'https://metagravity.com/',
      },
      {
        name: 'Mixi',
        logo: '/logos/mixi.png',
        url: 'https://mixi.co.jp/en/',
      },
      {
        name: 'CSM',
        logo: '/logos/csm-icon.png',
        url: 'https://csm.ai/',
      },
      {
        name: 'mem0',
        logo: '/logos/mem0.png',
        url: 'https://mem0.ai/',
        invertLogo: true,
      },
    ],
    tags: [
      'Web3 gaming',
      'Deeptech gaming infra',
      '3D AI tools',
      'AI Memory infra',
      'Business Development',
      'SaaS GTM',
      'Market Entry',
    ],
  },
]

/* ─── Education ─── */

const education = {
  name: 'IIT Bombay',
  logo: '/logos/iitb.png',
  url: 'https://www.iitb.ac.in/',
  degree: 'B.Tech',
  years: '2015\u20132019',
  jeeAir: 239,
}

/* ─── Company chip ─── */

function CompanyChip({ company }: { company: CompanyRef }) {
  const [imgFailed, setImgFailed] = useState(false)

  return (
    <a
      href={company.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex h-9 items-center gap-1.5 rounded border border-[rgba(255,255,255,0.1)] bg-surface/50 px-3 transition-all duration-200 hover:scale-[1.02] hover:border-accent/30"
    >
      {company.logo && !imgFailed && (
        <img
          src={company.logo}
          alt={company.name}
          className="h-5 max-w-[80px] object-contain"
          style={
            company.invertLogo
              ? { filter: 'invert(1)' }
              : undefined
          }
          onError={() => setImgFailed(true)}
        />
      )}
      <span className="font-mono text-xs text-[#d4d4d8]">
        {company.name}
      </span>
    </a>
  )
}

/* ─── Main component ─── */

export default function AboutMe() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="mx-auto max-w-4xl space-y-12"
    >
      {/* ── Header ── */}
      <motion.section
        variants={itemVariants}
        className="flex flex-col items-center gap-6 md:flex-row md:items-start"
      >
        <img
          src="/profile.png"
          alt="Siddesh Choudhary"
          className="h-24 w-24 shrink-0 rounded-full border-2 border-accent/30 bg-surface object-cover"
        />
        <div>
          <h1 className="font-serif text-3xl text-text-primary">
            Siddesh Choudhary
          </h1>
          <p className="mt-2 font-mono text-sm text-accent">
            GTM &amp; Strategy for Spatial AI &times; World Models
          </p>
          <p className="mt-1 font-mono text-xs text-[#a1a1aa]">
            Bengaluru, Karnataka, India
          </p>
        </div>
      </motion.section>

      <hr className="border-[rgba(255,255,255,0.08)]" />

      {/* ── Why World Models callout ── */}
      <motion.section variants={itemVariants}>
        <div className="rounded-lg border border-accent/30 bg-accent/5 p-6">
          <p className="font-serif text-lg text-accent">
            Why a World Model Startup?
          </p>
          <p className="mt-2 font-mono text-sm leading-relaxed text-[#d4d4d8]">
            The first non-tech hire needs to understand the technology to
            position it, the market to sell against, and the cross-functional
            range to wear every hat from day one. My career has been
            deliberately building towards this exact intersection.
          </p>
        </div>
      </motion.section>

      <hr className="border-[rgba(255,255,255,0.08)]" />

      {/* ── Career Thesis — Visual Timeline ── */}
      <motion.section variants={itemVariants}>
        <h2 className="mb-1 font-serif text-2xl text-text-primary">
          Motivation
        </h2>
        <p className="mb-8 font-mono text-xs text-[#a1a1aa]">
          A consistent thesis towards spatial AI &mdash; not a pivot
        </p>

        <div className="relative">
          {/* Connecting timeline line — desktop only */}
          <div
            className="pointer-events-none absolute left-0 right-0 top-[5px] hidden h-px md:block"
            style={{
              background:
                'linear-gradient(to right, transparent 8%, rgba(232,255,89,0.25) 20%, rgba(232,255,89,0.25) 80%, transparent 92%)',
            }}
          />

          <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:items-stretch">
            {/* ── Step 1: Accel — Thesis formed ── */}
            <motion.div
              variants={itemVariants}
              className="relative flex flex-col items-center text-center"
            >
              <div className="mb-5 hidden flex-col items-center gap-1 md:flex">
                <div className="h-2.5 w-2.5 rounded-full bg-accent/60" />
                <span className="font-mono text-[10px] font-medium text-accent/70">
                  2022–23
                </span>
              </div>

              <div className="flex w-full flex-1 items-start gap-4 rounded-lg border border-[rgba(255,255,255,0.1)] bg-surface/40 p-5 md:flex-col md:items-center md:p-6">
                <div className="mt-1 flex shrink-0 items-center gap-2 md:hidden">
                  <div className="h-2.5 w-2.5 rounded-full bg-accent/60" />
                  <span className="font-mono text-[10px] font-medium text-accent/70">
                    2022–23
                  </span>
                </div>
                <div className="flex-1 md:text-center">
                  <img
                    src="/logos/accel.png"
                    alt="Accel"
                    className="mb-3 h-10 object-contain md:mx-auto"
                  />
                  <p className="font-mono text-sm font-semibold text-text-primary">
                    Accel
                  </p>
                  <p className="font-mono text-xs text-[#a1a1aa]">
                    Venture Capital
                  </p>
                  <p className="mt-4 font-mono text-sm leading-relaxed text-text-primary">
                    Decided to build my career in the{' '}
                    <span className="font-semibold text-accent">
                      metaverse space
                    </span>
                    . Bet on gaming as the gateway to virtual worlds.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* ── Step 2: Gaming across geos ── */}
            <motion.div
              variants={itemVariants}
              className="relative flex flex-col items-center text-center"
            >
              <div className="mb-5 hidden flex-col items-center gap-1 md:flex">
                <div className="h-2.5 w-2.5 rounded-full bg-accent/60" />
                <span className="font-mono text-[10px] font-medium text-accent/70">
                  2023–26
                </span>
              </div>

              <div className="flex w-full flex-1 items-start gap-4 rounded-lg border border-[rgba(255,255,255,0.1)] bg-surface/40 p-5 md:flex-col md:items-center md:p-6">
                <div className="mt-1 flex shrink-0 items-center gap-2 md:hidden">
                  <div className="h-2.5 w-2.5 rounded-full bg-accent/60" />
                  <span className="font-mono text-[10px] font-medium text-accent/70">
                    2023–26
                  </span>
                </div>
                <div className="flex-1 md:text-center">
                  {/* Three logos with company names */}
                  <div className="mb-3 flex items-start justify-center gap-4 md:gap-5">
                    <div className="flex flex-col items-center gap-1">
                      <img
                        src="/logos/kgen.png"
                        alt="KGen"
                        className="h-8 object-contain"
                      />
                      <span className="font-mono text-[10px] text-[#d4d4d8]">
                        KGen
                      </span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <img
                        src="/logos/metagravity-icon.png"
                        alt="MetaGravity"
                        className="h-8 object-contain"
                      />
                      <span className="font-mono text-[10px] text-[#d4d4d8]">
                        MetaGravity
                      </span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <img
                        src="/logos/mixi.png"
                        alt="Mixi"
                        className="h-8 object-contain"
                      />
                      <span className="font-mono text-[10px] text-[#d4d4d8]">
                        Mixi
                      </span>
                    </div>
                  </div>
                  <p className="font-mono text-sm font-semibold text-text-primary">
                    Gaming Across Geos
                  </p>
                  <p className="font-mono text-xs text-[#a1a1aa]">
                    India &middot; UK &middot; Japan
                  </p>
                  <p className="mt-4 font-mono text-sm leading-relaxed text-text-primary">
                    <span className="font-semibold text-accent">
                      3 years
                    </span>{' '}
                    at India, UK, and Japan based companies — building
                    deep market understanding in gaming and virtual worlds.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* ── Step 3: NOW — World Models ── */}
            <motion.div
              variants={itemVariants}
              className="relative flex flex-col items-center text-center"
            >
              <div className="mb-5 hidden flex-col items-center gap-1 md:flex">
                <div className="h-2.5 w-2.5 rounded-full bg-accent shadow-[0_0_8px_rgba(232,255,89,0.5)]" />
                <span className="font-mono text-[10px] font-bold text-accent">
                  2026
                </span>
              </div>

              <div className="flex w-full flex-1 items-start gap-4 rounded-lg border border-accent/30 bg-accent/5 p-5 md:flex-col md:items-center md:p-6">
                <div className="mt-1 flex shrink-0 items-center gap-2 md:hidden">
                  <div className="h-2.5 w-2.5 rounded-full bg-accent shadow-[0_0_6px_rgba(232,255,89,0.5)]" />
                  <span className="font-mono text-[10px] font-bold text-accent">
                    2026
                  </span>
                </div>
                <div className="flex-1 md:text-center">
                  <span className="mb-3 inline-block rounded-full bg-accent/15 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-widest text-accent">
                    Now
                  </span>
                  <p className="mt-2 font-mono text-sm font-semibold text-accent">
                    World Models
                  </p>
                  <p className="mt-4 font-mono text-sm leading-relaxed text-text-primary">
                    Time to{' '}
                    <span className="font-semibold text-accent">
                      revolutionise the world
                    </span>{' '}
                    with world models. The thesis meets the moment.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      <hr className="border-[rgba(255,255,255,0.08)]" />

      {/* ── Skillset — Three Pillars ── */}
      <motion.section variants={itemVariants}>
        <h2 className="mb-1 font-serif text-2xl text-text-primary">
          Skillset
        </h2>
        <p className="mb-6 font-mono text-xs text-[#a1a1aa]">
          The diverse skill set a world model startup&apos;s first non-tech hire
          needs
        </p>

        <div className="grid gap-5 md:grid-cols-3">
          {skillsetColumns.map((col) => (
            <div
              key={col.title}
              className="rounded-lg border border-[rgba(255,255,255,0.1)] bg-surface/40 p-5"
              style={{ borderLeft: `2px solid ${col.borderColor}` }}
            >
              <h3 className="font-mono text-sm font-bold uppercase tracking-wider text-text-primary">
                {col.title}
              </h3>
              {col.subtitle && (
                <p className="mt-0.5 font-mono text-xs text-[#a1a1aa]">
                  {col.subtitle}
                </p>
              )}

              {/* Company chips */}
              <div className="mb-4 mt-4 flex flex-wrap gap-2">
                {col.companies.map((c) => (
                  <CompanyChip key={c.name} company={c} />
                ))}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5">
                {col.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.04)] px-2.5 py-1 font-mono text-xs text-[#d4d4d8]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      <hr className="border-[rgba(255,255,255,0.08)]" />

      {/* ── Education ── */}
      <motion.section variants={itemVariants}>
        <h2 className="mb-6 font-serif text-xl text-text-primary">
          Education
        </h2>
        <div className="flex items-center gap-8 overflow-hidden rounded-lg border border-[rgba(255,255,255,0.1)] bg-surface/40 px-8 py-6">
          <a
            href={education.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex shrink-0 items-center gap-6 transition-opacity hover:opacity-100"
          >
            <img
              src={education.logo}
              alt={`${education.name} logo`}
              className="h-14 max-w-[140px] object-contain"
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.style.display = 'none'
                const fallback = target.nextElementSibling as HTMLElement
                if (fallback) fallback.classList.remove('hidden')
              }}
            />
            <span className="hidden font-mono text-xl font-semibold text-[#d4d4d8] group-hover:text-accent">
              {education.name}
            </span>
          </a>
          <div className="min-w-0 flex-1">
            <p className="font-mono font-semibold text-text-primary">
              {education.name}
            </p>
            <p className="font-mono text-sm text-[#d4d4d8]">
              {education.degree} &bull; {education.years}
            </p>
            <p className="mt-1 font-mono text-sm text-accent">
              JEE Advanced AIR {education.jeeAir}
            </p>
          </div>
        </div>
      </motion.section>

      <hr className="border-[rgba(255,255,255,0.08)]" />

      {/* ── Books Read ── */}
      <motion.section variants={itemVariants}>
        <h2 className="mb-6 font-serif text-xl text-text-primary">
          Books Read
        </h2>
        <div className="flex gap-6">
          {[
            {
              title: 'The Metaverse',
              author: 'Matthew Ball',
              cover: '/books/metaverse.png',
            },
            {
              title: 'The Worlds I See',
              author: 'Dr. Fei-Fei Li',
              cover: '/books/worlds-i-see.jpg',
            },
            {
              title: 'Once Upon a Tomorrow',
              author: 'Shurick Agapitov',
              cover: '/books/once-upon-tomorrow.png',
            },
          ].map((book) => (
            <div
              key={book.title}
              className="group rounded-lg border border-[rgba(255,255,255,0.1)] bg-surface/40 p-4 transition-all duration-300 hover:border-accent/30 hover:shadow-[0_0_20px_rgba(232,255,89,0.08)]"
            >
              <div className="overflow-hidden rounded">
                <img
                  src={book.cover}
                  alt={`${book.title} cover`}
                  className="h-48 w-full rounded object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <p className="mt-3 font-mono text-xs text-[#d4d4d8]">
                {book.title}
              </p>
              <p className="font-mono text-[10px] text-[#a1a1aa]">
                {book.author}
              </p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* ── Contact ── */}
      <motion.section variants={itemVariants}>
        <h2 className="mb-4 font-serif text-xl text-text-primary">Contact</h2>
        <div className="flex flex-wrap gap-6 font-mono text-sm text-[#d4d4d8]">
          <a
            href="https://wa.me/917798905544"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-accent hover:underline"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            WhatsApp: +91-7798905544
          </a>
        </div>
      </motion.section>
    </motion.div>
  )
}
