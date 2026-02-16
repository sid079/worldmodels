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

const LINKEDIN_URL = 'https://www.linkedin.com/in/sid239/'

const companyCategories = [
  {
    label: 'Consulting',
    companies: [
      { name: 'BCG', logo: '/logos/bcg.png', url: 'https://www.bcg.com/' },
    ],
  },
  {
    label: 'Venture Capital',
    companies: [
      { name: 'Accel', logo: '/logos/accel.png', url: 'https://www.accel.com/' },
    ],
  },
  {
    label: 'Startups',
    companies: [
      { name: 'KGen', logo: '/logos/kgen.png', url: 'https://kgen.io/' },
      { name: 'MetaGravity', logo: '/logos/metagravity-icon.png', logoText: '/logos/metagravity-text.png', url: 'https://metagravity.com/' },
      { name: 'Mixi', logo: '/logos/mixi.png', url: 'https://mixi.co.jp/en/' },
    ],
  },
]

const education = {
  name: 'IIT Bombay',
  logo: '/logos/iitb.png',
  url: 'https://www.iitb.ac.in/',
  degree: 'B.Tech',
  years: '2015–2019',
  jeeAir: 239,
}


export default function AboutMe() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="mx-auto max-w-3xl space-y-12"
    >
      {/* Header */}
      <motion.section variants={itemVariants} className="flex flex-col items-center gap-6 md:flex-row md:items-start">
        <img src="/profile.png" alt="Siddesh Choudhary" className="h-24 w-24 shrink-0 rounded-full border-2 border-accent/30 bg-surface object-cover" />
        <div>
          <h1 className="font-serif text-3xl text-text-primary">Siddesh Choudhary</h1>
          <p className="mt-2 font-mono text-accent">
            BD/GTM strategist passionate about spatial AI commercialization
          </p>
          <p className="mt-1 font-mono text-xs text-text-muted">
            Bengaluru, Karnataka, India
          </p>
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center text-accent transition-opacity hover:opacity-80"
            title="LinkedIn Profile"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
        </div>
      </motion.section>

      <hr className="border-[rgba(255,255,255,0.06)]" />

      {/* Bio */}
      <motion.section variants={itemVariants}>
        <h2 className="mb-4 font-serif text-xl text-text-primary">Bio</h2>
        <div className="space-y-4 font-mono text-sm leading-relaxed text-text-secondary">
          <p>
            With a diverse set of experience in consulting, venture capital, and startups, I bring a cross-functional lens to BD and GTM strategy. I graduated from the Indian Institute of Technology, Bombay (2015–2019) and have since worked across strategy, partnerships, and growth — including at MIXI, Inc, where I can introduce you to 10+ people across the organization.
          </p>
          <p>
            Spatial AI excites me because of the 12–24 month strategic window. World Labs, Odyssey, and SpAItial each represent a distinct playbook — PLG, developer-led, and European deep-tech — and big tech (NVIDIA, Google, Meta, Tencent) is already commoditizing the foundation layer. The companies that nail enterprise customers, pricing sophistication, and partnership ecosystems now will define the category.
          </p>
          <p>
            I've followed the space closely — from Yann LeCun's AMI Labs bet on world models to Odyssey's progress toward the "GPT-3 of world models." This site reflects hands-on research: I've tested competitor products, recorded demos, and built a systematic view of the landscape. I'm ready to contribute that rigor to a BD/GTM role at a spatial AI company.
          </p>
        </div>
      </motion.section>

      {/* Companies I've worked with — categorised */}
      <motion.section variants={itemVariants}>
        <h2 className="mb-6 font-serif text-xl text-text-primary">Companies I've worked with</h2>
        <div className="space-y-6">
          {companyCategories.map((cat) => (
            <div key={cat.label}>
              <p className="mb-3 font-mono text-xs font-semibold uppercase tracking-wider text-text-muted">
                {cat.label}
              </p>
              <div className="flex flex-wrap items-center gap-6">
                {cat.companies.map((company) => (
                  <a
                    key={company.name}
                    href={company.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex h-14 items-center gap-2 rounded-lg border border-[rgba(255,255,255,0.06)] bg-surface/50 px-4 transition-all duration-200 hover:scale-[1.03] hover:border-accent/30"
                  >
                    <img
                      src={company.logo}
                      alt={`${company.name} logo`}
                      className="h-10 max-w-[120px] object-contain"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.style.display = 'none'
                      }}
                    />
                    {'logoText' in company && (company as { logoText: string }).logoText && (
                      <img
                        src={(company as { logoText: string }).logoText}
                        alt={`${company.name} text`}
                        className="h-6 object-contain"
                        style={{ imageRendering: 'auto' }}
                      />
                    )}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Education — horizontal strip with IIT Bombay logo */}
      <motion.section variants={itemVariants}>
        <h2 className="mb-6 font-serif text-xl text-text-primary">Education</h2>
        <div className="flex items-center gap-8 overflow-hidden rounded-lg border border-[rgba(255,255,255,0.06)] bg-surface/30 px-8 py-6">
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
            <span className="hidden font-mono text-xl font-semibold text-text-secondary group-hover:text-accent">
              {education.name}
            </span>
          </a>
          <div className="min-w-0 flex-1">
            <p className="font-mono font-semibold text-text-primary">
              {education.name}
            </p>
            <p className="font-mono text-sm text-text-secondary">
              {education.degree} • {education.years}
            </p>
            <p className="mt-1 font-mono text-sm text-accent">
              JEE Advanced AIR (All India Rank) {education.jeeAir}
            </p>
          </div>
        </div>
      </motion.section>

      {/* Contact */}
      <motion.section variants={itemVariants}>
        <h2 className="mb-4 font-serif text-xl text-text-primary">Contact</h2>
        <div className="flex flex-wrap gap-6 font-mono text-sm text-text-secondary">
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline"
          >
            LinkedIn: linkedin.com/in/sid239
          </a>
          <a
            href="https://wa.me/917798905544"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline"
          >
            WhatsApp: +91-7798905544
          </a>
        </div>
      </motion.section>
    </motion.div>
  )
}
