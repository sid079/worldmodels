import { useState, useRef, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Odyssey } from '@odysseyml/odyssey'

type StreamState = 'idle' | 'connecting' | 'streaming' | 'error'

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
  const [streamState, setStreamState] = useState<StreamState>('idle')
  const [prompt, setPrompt] = useState('')
  const [interactPrompt, setInteractPrompt] = useState('')
  const odysseyRef = useRef<InstanceType<typeof Odyssey> | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const mediaStreamRef = useRef<MediaStream | null>(null)

  useEffect(() => {
    return () => {
      if (odysseyRef.current) {
        odysseyRef.current.endStream().catch(() => {})
        odysseyRef.current.disconnect()
        odysseyRef.current = null
      }
    }
  }, [])

  // Attach the MediaStream to the <video> element once it mounts
  useEffect(() => {
    if (streamState === 'streaming' && videoRef.current && mediaStreamRef.current) {
      console.log('Attaching stream to video element')
      videoRef.current.srcObject = mediaStreamRef.current
      console.log('Video element srcObject:', videoRef.current.srcObject)
      videoRef.current.play().catch((e) => console.error('video.play() failed:', e))
    }
  }, [streamState])

  const handleStart = useCallback(async () => {
    if (!prompt.trim()) return

    console.log('API Key present:', !!import.meta.env.VITE_ODYSSEY_API_KEY)

    setStreamState('connecting')
    try {
      const odyssey = new Odyssey({
        apiKey: import.meta.env.VITE_ODYSSEY_API_KEY,
      })
      odysseyRef.current = odyssey

      console.log('Attempting to connect...')
      const mediaStream = await odyssey.connect({
        onConnected: (stream) => {
          console.log('onConnected fired, stream:', stream)
          console.log('Stream tracks:', stream?.getTracks())
          if (stream) {
            mediaStreamRef.current = stream
          }
          // Also try attaching immediately in case video is already mounted
          if (videoRef.current && stream) {
            console.log('Attaching stream to video element (onConnected)')
            videoRef.current.srcObject = stream
            videoRef.current.play().catch((e) => console.error('video.play() failed:', e))
          }
        },
        onStreamStarted: (streamId) => {
          console.log('onStreamStarted, id:', streamId)
        },
        onError: (error, fatal) => {
          console.log('onError:', error, fatal)
        },
        onStreamError: (reason, message) => {
          console.log('onStreamError:', reason, message)
        },
        onStatusChange: (status, message) => {
          console.log('Status change:', status, message)
        },
        onDisconnected: () => {
          console.log('onDisconnected fired')
        },
        onStreamEnded: () => {
          console.log('onStreamEnded fired')
        },
        onInteractAcknowledged: (ackPrompt) => {
          console.log('onInteractAcknowledged:', ackPrompt)
        },
      })
      console.log('Connected, mediaStream:', mediaStream)

      // Store the mediaStream in a ref so the useEffect can attach it
      // once the <video> element actually mounts (state transitions to 'streaming')
      if (mediaStream) {
        console.log('Storing mediaStream in ref, tracks:', mediaStream.getTracks())
        mediaStreamRef.current = mediaStream

        // Try SDK helper if available
        if (videoRef.current) {
          console.log('Attaching stream to video element (post-connect)')
          videoRef.current.srcObject = mediaStream
          videoRef.current.play().catch((e) => console.error('video.play() failed:', e))
        }

        // Try SDK-provided attachToVideo if it exists
        if (typeof (odyssey as any).attachToVideo === 'function' && videoRef.current) {
          console.log('Using odyssey.attachToVideo()')
          ;(odyssey as any).attachToVideo(videoRef.current)
        }
      }
      console.log('Video element srcObject:', videoRef.current?.srcObject)

      console.log('Starting stream with prompt:', prompt.trim())
      const streamId = await odyssey.startStream({ prompt: prompt.trim() })
      console.log('Stream started, streamId:', streamId)

      setStreamState('streaming')
    } catch (err) {
      console.error('Odyssey stream error:', err)
      setStreamState('error')
    }
  }, [prompt])

  const handleInteract = useCallback(async () => {
    if (!interactPrompt.trim() || !odysseyRef.current) return

    try {
      await odysseyRef.current.interact({ prompt: interactPrompt.trim() })
      setInteractPrompt('')
    } catch (err) {
      console.error('Odyssey interact error:', err)
    }
  }, [interactPrompt])

  const handleStop = useCallback(async () => {
    try {
      if (odysseyRef.current) {
        await odysseyRef.current.endStream()
        await odysseyRef.current.disconnect()
        odysseyRef.current = null
      }
    } catch (err) {
      console.error('Odyssey disconnect error:', err)
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null
    }
    mediaStreamRef.current = null
    setStreamState('idle')
  }, [])

  const handleRetry = useCallback(() => {
    setStreamState('idle')
  }, [])

  return (
    <motion.div
      className="space-y-10"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* A — Accent-bordered callout */}
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

      {/* B — Problem / Solution two-column cards */}
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

      {/* H — Try it Live: Interactive Stream */}
      <motion.section variants={itemVariants} className="space-y-6">
        <div>
          <h3 className="font-serif text-2xl text-accent">Experience it Live</h3>
          <p className="mt-2 max-w-3xl font-mono text-sm leading-relaxed text-text-secondary">
            Type a property description and explore an AI-generated space in
            real-time — powered by Odyssey's Interactive Streams API
          </p>
        </div>

        <div className="rounded-lg border border-[rgba(255,255,255,0.06)] bg-surface/30 p-6">
          {/* Idle state — prompt input + start button */}
          {streamState === 'idle' && (
            <div className="space-y-4">
              {/* Preset prompt chips */}
              <div className="flex flex-wrap gap-2">
                {[
                  'Santorini villa with infinity pool at sunset',
                  'Tokyo apartment with neon skyline view',
                  'Cozy cabin with stone fireplace and mountain views',
                  'Modern loft with exposed brick and city lights',
                ].map((preset) => (
                  <button
                    key={preset}
                    onClick={() => setPrompt(preset)}
                    className={`rounded-full border px-3.5 py-1.5 font-mono text-xs transition-all duration-200 ${
                      prompt === preset
                        ? 'border-accent/50 bg-accent/10 text-accent'
                        : 'border-[rgba(255,255,255,0.08)] bg-background/60 text-text-secondary hover:border-accent/30 hover:text-text-primary'
                    }`}
                  >
                    {preset}
                  </button>
                ))}
              </div>

              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleStart()
                }}
                placeholder="Describe a space... e.g., A modern penthouse with floor-to-ceiling windows overlooking Manhattan at sunset"
                className="w-full rounded-lg border border-[rgba(255,255,255,0.06)] bg-background px-4 py-3 font-mono text-sm text-text-primary placeholder-text-muted outline-none transition-colors duration-200 focus:border-accent/50"
              />
              <button
                onClick={handleStart}
                disabled={!prompt.trim()}
                className="rounded-lg bg-accent px-6 py-2.5 font-mono text-sm font-semibold text-background transition-opacity duration-200 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Start Exploring
              </button>
            </div>
          )}

          {/* Connecting state — pulsing indicator */}
          {streamState === 'connecting' && (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="mb-4 flex items-center gap-3">
                <span className="inline-block h-2.5 w-2.5 animate-pulse rounded-full bg-accent" />
                <span className="inline-block h-2.5 w-2.5 animate-pulse rounded-full bg-accent [animation-delay:150ms]" />
                <span className="inline-block h-2.5 w-2.5 animate-pulse rounded-full bg-accent [animation-delay:300ms]" />
              </div>
              <p className="font-mono text-sm text-text-secondary">
                Connecting to Odyssey GPU...
              </p>
            </div>
          )}

          {/* Streaming state — video + interact + stop */}
          {streamState === 'streaming' && (
            <div className="space-y-4">
              {/* Video container — 16:9, full-width, with LIVE badge */}
              <div className="relative w-full overflow-hidden rounded-lg border border-[rgba(255,255,255,0.06)] bg-background" style={{ aspectRatio: '16 / 9' }}>
                <video
                  ref={videoRef}
                  className="absolute inset-0 h-full w-full object-cover"
                  autoPlay
                  playsInline
                  muted
                />
                {/* Pulsing LIVE badge */}
                <div className="absolute right-3 top-3 flex items-center gap-1.5 rounded-md bg-black/60 px-2.5 py-1 backdrop-blur-sm">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
                  </span>
                  <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-red-400">
                    Live
                  </span>
                </div>
              </div>

              {/* Navigate / interact input */}
              <div className="flex gap-3">
                <div className="relative flex-1">
                  <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 font-mono text-[11px] font-medium text-accent/60">
                    Navigate:
                  </span>
                  <input
                    type="text"
                    value={interactPrompt}
                    onChange={(e) => setInteractPrompt(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleInteract()
                    }}
                    placeholder="e.g., 'walk toward the window', 'look up', 'turn left'"
                    className="w-full rounded-lg border border-[rgba(255,255,255,0.08)] bg-background py-3 pl-[5.5rem] pr-4 font-mono text-sm text-text-primary placeholder-text-muted outline-none transition-colors duration-200 focus:border-accent/50 focus:ring-1 focus:ring-accent/20"
                  />
                </div>
                <button
                  onClick={handleInteract}
                  disabled={!interactPrompt.trim()}
                  className="group flex shrink-0 items-center gap-2 rounded-lg bg-accent px-5 py-3 font-mono text-sm font-semibold text-background transition-all duration-200 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-30"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="transition-transform duration-200 group-hover:translate-x-0.5"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                  Send
                </button>
              </div>

              <button
                onClick={handleStop}
                className="rounded-lg border border-[rgba(255,255,255,0.12)] bg-surface px-6 py-2.5 font-mono text-sm text-text-secondary transition-colors duration-200 hover:border-[rgba(255,255,255,0.2)] hover:text-text-primary"
              >
                Stop Exploring
              </button>
            </div>
          )}

          {/* Error state — message + retry */}
          {streamState === 'error' && (
            <div className="flex flex-col items-center justify-center py-12">
              <p className="mb-4 font-mono text-sm text-text-secondary">
                GPU currently unavailable — try again in a moment
              </p>
              <button
                onClick={handleRetry}
                className="rounded-lg bg-accent px-6 py-2.5 font-mono text-sm font-semibold text-background transition-opacity duration-200 hover:opacity-90"
              >
                Retry
              </button>
            </div>
          )}
        </div>

        <p className="font-mono text-[11px] leading-relaxed text-text-muted">
          Live demo requires GPU availability. Streams run on Odyssey's H100
          clusters in US/EU. Connection from your location may introduce
          latency.
        </p>
      </motion.section>

      {/* C — 2×2 video demo grid */}
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

      {/* D — "The Code" syntax-highlighted simulate() call */}
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

      {/* E — Integration Architecture horizontal flow */}
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

      {/* F — Unit Economics 3-column comparison */}
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

      {/* G — Bottom callout */}
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
