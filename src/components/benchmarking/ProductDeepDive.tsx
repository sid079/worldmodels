import { motion } from 'framer-motion'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
}

const demos = [
  {
    name: 'Santorini Villa',
    slug: 'santorini',
    prompt:
      'A luxurious Airbnb villa perched on the Santorini caldera. Walk through the open-air terrace with infinity pool overlooking the Aegean Sea at golden hour.',
    frames: 249,
    duration: '14.5s',
    genTime: '~16s',
  },
  {
    name: 'Tokyo Apartment',
    slug: 'tokyo',
    prompt:
      'A minimalist Tokyo apartment in Shibuya. Explore the compact kitchen, tatami sleeping area, and floor-to-ceiling windows revealing the neon cityscape below.',
    frames: 212,
    duration: '12.8s',
    genTime: '~14s',
  },
  {
    name: 'Whistler Cabin',
    slug: 'whistler',
    prompt:
      'A cozy ski-in/ski-out cabin in Whistler. Pan across the stone fireplace, vaulted cedar ceilings, and snow-covered deck with hot tub and mountain views.',
    frames: 237,
    duration: '13.9s',
    genTime: '~15s',
  },
  {
    name: 'Brooklyn Loft',
    slug: 'brooklyn',
    prompt:
      'An industrial-chic Brooklyn loft with exposed brick, steel beams, and oversized factory windows. Walk from the open kitchen through the living space to the rooftop garden.',
    frames: 224,
    duration: '13.2s',
    genTime: '~15s',
  },
]

const codeSnippet = `const job = await odyssey.simulate({
  prompt: "A luxurious Airbnb villa in Santorini, walk through
    the open-air terrace with infinity pool overlooking
    the Aegean Sea at golden hour.",
  source_image: listingPhoto,   // single listing photo
  duration: 15,                 // seconds
  resolution: "1080p",
});

// Poll until complete
const result = await odyssey.waitForCompletion(job.id);
console.log(result.video_url);  // → hosted MP4
console.log(result.thumbnail);  // → poster image`

const flowSteps = [
  { label: 'Listing Photo', icon: '🖼' },
  { label: 'Odyssey Simulate API', icon: '⚡' },
  { label: 'Video + Thumbnail', icon: '🎬' },
  { label: 'Embed on Listing Page', icon: '🌐' },
]

const economics = [
  {
    method: 'Professional Photography',
    cost: '$150–300 / listing',
    details: [
      'Requires scheduling & coordination',
      'Limited to static photos',
      'No spatial understanding',
      '1–2 week turnaround',
    ],
    highlight: false,
  },
  {
    method: 'Matterport 3D Tour',
    cost: '$49–69/mo + $3,000 camera',
    details: [
      'Requires on-site capture',
      'Specialized hardware needed',
      'Per-property monthly cost',
      'Does not scale easily',
    ],
    highlight: false,
  },
  {
    method: 'Odyssey API',
    cost: '~$1–2 / simulation',
    details: [
      'Single photo input',
      'Instant — no scheduling',
      'Scales to millions of listings',
      'No hardware required',
    ],
    highlight: true,
  },
]

export default function ProductDeepDive() {
  return (
    <motion.div
      className="space-y-10"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* A — Hero Callout */}
      <motion.div
        variants={itemVariants}
        className="rounded-lg border border-accent/30 bg-accent/5 p-6"
      >
        <h2 className="font-serif text-2xl text-accent">
          Custom ICP Demo: Airbnb × Odyssey
        </h2>
        <p className="mt-3 max-w-3xl font-mono text-sm leading-relaxed text-text-secondary">
          A Chief of Staff's first deliverable — a working proof-of-concept built with
          the Odyssey Simulate API, targeting travel/hospitality as an immediate
          revenue vertical.
        </p>
      </motion.div>

      {/* B — Problem / Solution */}
      <motion.div
        variants={itemVariants}
        className="grid gap-6 md:grid-cols-2"
      >
        <div className="rounded-lg border border-[rgba(255,255,255,0.06)] bg-surface/30 p-6">
          <h3 className="mb-3 font-serif text-lg text-text-primary">
            The Problem
          </h3>
          <p className="font-mono text-sm leading-relaxed text-text-secondary">
            7M+ Airbnb listings rely on static photos. Guests can't spatially
            understand a space before booking. Professional photography costs{' '}
            <span className="text-text-primary">$150–300/listing</span>,
            Matterport 3D tours cost{' '}
            <span className="text-text-primary">$49–69/month</span> per
            property.
          </p>
        </div>
        <div className="rounded-lg border border-accent/20 bg-accent/5 p-6">
          <h3 className="mb-3 font-serif text-lg text-accent">The Solution</h3>
          <p className="font-mono text-sm leading-relaxed text-text-secondary">
            One listing photo + one Odyssey API call = an AI-generated
            interactive walkthrough. Cost:{' '}
            <span className="text-accent">~$1–2 per simulation</span>. No
            photographer, no camera rig, no 3D modeling.
          </p>
        </div>
      </motion.div>

      {/* C — Demo Grid */}
      <motion.section variants={itemVariants}>
        <h3 className="mb-6 font-serif text-xl text-text-primary">
          Live Demos
        </h3>
        <div className="grid gap-6 md:grid-cols-2">
          {demos.map((demo) => (
            <motion.div
              key={demo.slug}
              variants={itemVariants}
              className="overflow-hidden rounded-lg border border-[rgba(255,255,255,0.06)] bg-surface/30 transition-all duration-200 hover:border-accent/20"
            >
              <div className="aspect-video w-full bg-background">
                <video
                  className="h-full w-full object-cover"
                  poster={`/demos/odyssey-airbnb/${demo.slug}-thumb.jpg`}
                  controls
                  preload="none"
                  playsInline
                >
                  <source
                    src={`/demos/odyssey-airbnb/${demo.slug}.mp4`}
                    type="video/mp4"
                  />
                </video>
              </div>
              <div className="p-4">
                <h4 className="font-serif text-base text-text-primary">
                  {demo.name}
                </h4>
                <pre className="mt-2 overflow-x-auto whitespace-pre-wrap rounded border border-[rgba(255,255,255,0.06)] bg-background/60 p-2.5 font-mono text-[11px] leading-relaxed text-text-muted">
                  {demo.prompt}
                </pre>
                <p className="mt-3 font-mono text-xs tabular-nums text-text-secondary">
                  <span className="text-accent">{demo.frames}</span> frames
                  <span className="mx-1.5 text-text-muted">•</span>
                  <span className="text-accent">{demo.duration}</span>
                  <span className="mx-1.5 text-text-muted">•</span>
                  Generated in{' '}
                  <span className="text-accent">{demo.genTime}</span>
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* D — The Code */}
      <motion.section variants={itemVariants}>
        <h3 className="mb-2 font-serif text-xl text-text-primary">The Code</h3>
        <p className="mb-4 font-mono text-xs text-text-muted">
          10 lines of code to generate an interactive property walkthrough
        </p>
        <div className="overflow-x-auto rounded-lg border border-[rgba(255,255,255,0.06)] bg-background/80 p-5">
          <pre className="font-mono text-xs leading-relaxed">
            {codeSnippet.split('\n').map((line, i) => (
              <div key={i}>
                {line.startsWith('//') || line.includes('// →') ? (
                  <span className="text-text-muted">{line}</span>
                ) : line.includes('await') || line.includes('const') ? (
                  <>
                    <span className="text-accent">
                      {line.match(/^(const |  const )/)?.[0] ?? ''}
                    </span>
                    <span className="text-text-secondary">
                      {line.replace(/^(const |  const )/, '')}
                    </span>
                  </>
                ) : (
                  <span className="text-text-secondary">{line}</span>
                )}
              </div>
            ))}
          </pre>
        </div>
      </motion.section>

      {/* E — Integration Architecture */}
      <motion.section variants={itemVariants}>
        <h3 className="mb-6 font-serif text-xl text-text-primary">
          Integration Architecture
        </h3>
        <div className="flex flex-wrap items-center justify-center gap-0 rounded-lg border border-[rgba(255,255,255,0.06)] bg-surface/30 px-4 py-8">
          {flowSteps.map((step, i) => (
            <div key={step.label} className="flex items-center">
              <div className="flex flex-col items-center gap-2 px-4">
                <span className="text-2xl">{step.icon}</span>
                <span className="whitespace-nowrap font-mono text-xs text-text-primary">
                  {step.label}
                </span>
              </div>
              {i < flowSteps.length - 1 && (
                <div className="flex items-center px-2 text-accent">
                  <svg
                    width="32"
                    height="12"
                    viewBox="0 0 32 12"
                    fill="none"
                    className="shrink-0"
                  >
                    <path
                      d="M0 6h28m0 0l-4-4m4 4l-4 4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap justify-center gap-6">
          <span className="rounded border border-[rgba(255,255,255,0.06)] bg-background/60 px-3 py-1.5 font-mono text-xs text-text-secondary">
            Viewable Streams API for scalable embedding
          </span>
          <span className="rounded border border-[rgba(255,255,255,0.06)] bg-background/60 px-3 py-1.5 font-mono text-xs text-text-secondary">
            Interactive Streams API for premium explore experience
          </span>
        </div>
      </motion.section>

      {/* F — Unit Economics */}
      <motion.section variants={itemVariants}>
        <h3 className="mb-6 font-serif text-xl text-text-primary">
          Unit Economics
        </h3>
        <div className="grid gap-6 md:grid-cols-3">
          {economics.map((item) => (
            <div
              key={item.method}
              className={`rounded-lg border p-5 transition-all duration-200 ${
                item.highlight
                  ? 'border-accent/30 bg-accent/5'
                  : 'border-[rgba(255,255,255,0.06)] bg-surface/30'
              }`}
            >
              <h4
                className={`font-serif text-base ${item.highlight ? 'text-accent' : 'text-text-primary'}`}
              >
                {item.method}
              </h4>
              <p
                className={`mt-2 font-mono text-lg font-semibold tabular-nums ${item.highlight ? 'text-accent' : 'text-text-secondary'}`}
              >
                {item.cost}
              </p>
              <ul className="mt-3 space-y-1.5">
                {item.details.map((d) => (
                  <li
                    key={d}
                    className="flex items-start gap-2 font-mono text-xs text-text-muted"
                  >
                    <span
                      className={`mt-1 h-1 w-1 shrink-0 rounded-full ${item.highlight ? 'bg-accent' : 'bg-text-muted'}`}
                    />
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </motion.section>

      {/* G — Bottom Callout */}
      <motion.div
        variants={itemVariants}
        className="rounded-lg border border-accent/30 bg-accent/5 p-6"
      >
        <p className="font-mono text-sm leading-relaxed text-text-secondary">
          This demo was built in a single afternoon using Odyssey's public API.
          As a Chief of Staff, this is the kind of vertical-specific proof-of-concept
          I'd build for every target prospect — showing them exactly how Odyssey
          fits into their product, with{' '}
          <span className="text-accent">working code</span> and{' '}
          <span className="text-accent">real numbers</span>.
        </p>
      </motion.div>
    </motion.div>
  )
}
