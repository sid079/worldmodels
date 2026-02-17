export type Tier = 'short' | 'medium' | 'long'

export interface ICPSegment {
  id: string
  name: string
  tier: Tier
  tierLabel: string
  icp: string
  decisionMakers: string
  namedTargets: string[]
  valueProposition: string
  chequeSize: {
    low: string
    high: string
    label: string
    math: string
  }
  totalAddressable: string
  conviction: number
  targetAccountCount: string
}

export interface InvestorConnect {
  investor: string
  fund: string
  connectionType: 'Strategic Investor' | 'Angel Investor' | 'Board / Advisor'
  icpSegments: string[]
  warmIntroTargets: { company: string; rationale: string }[]
  dealHypothesis: string
}

export interface ConferenceEvent {
  id: string
  name: string
  dates: string
  location: string
  relevantICPs: string[]
  attendeeProfile: string
  attendeeCount: string
  odysseyPlay: string
  priority: 'Must Attend' | 'High Value' | 'Opportunistic'
  website: string
}

// ── Tier config ──────────────────────────────────────────────

export const tierConfig: Record<Tier, { label: string; color: string; dotColor: string; bgColor: string }> = {
  short: { label: '0–6 months', color: '#4ADE80', dotColor: 'bg-green-400', bgColor: 'bg-green-400/10' },
  medium: { label: '6–18 months', color: '#FBBF24', dotColor: 'bg-amber-400', bgColor: 'bg-amber-400/10' },
  long: { label: '18+ months', color: '#F87171', dotColor: 'bg-red-400', bgColor: 'bg-red-400/10' },
}

// ── ICP Segments ─────────────────────────────────────────────

export const icpSegments: ICPSegment[] = [
  {
    id: 'virtual-production',
    name: 'Virtual Production Studios',
    tier: 'short',
    tierLabel: '0–6 months',
    icp: 'Mid-to-large VP studios operating LED volume stages who currently spend weeks building Unreal Engine environments for each shoot.',
    decisionMakers: 'VFX Supervisors, Virtual Production Supervisors',
    namedTargets: ['Garden Studios (London — already validated)', 'Lux Machina', 'DNEG', 'Framestore', 'Pixomondo', 'Netflix VP Stages', 'ILM StageCraft'],
    valueProposition: 'Rapid world prototyping for pre-production. Instead of a 3D team spending 2–4 weeks building an Unreal environment, a director uploads a reference image and Odyssey generates an explorable world in seconds. Used for location scouting, mood boards, and "day of" background generation on LED walls. Already validated at Garden Studios London.',
    chequeSize: {
      low: '$50K',
      high: '$200K',
      label: 'Annual Contract Value',
      math: 'A mid-tier VP studio runs 150–200 production days/year. If Odyssey replaces 20% of environment pre-production (currently $5K–15K per environment in artist time), that\'s 30–40 environments × $10K avg savings = $300K–400K in value delivered. Enterprise contract priced on value, not compute.',
    },
    totalAddressable: '$1.5M–4M',
    conviction: 5,
    targetAccountCount: '15–20',
  },
  {
    id: 'indie-games',
    name: 'Indie Game Studios & Game Jam Devs',
    tier: 'short',
    tierLabel: '0–6 months',
    icp: 'Small-to-mid game studios (5–50 people) looking to prototype interactive worlds without building custom game engines or managing large 3D art pipelines.',
    decisionMakers: 'Creative Directors, Technical Leads',
    namedTargets: ['Devolver Digital', 'Supergiant Games', 'Team Cherry', 'Odyssey Feb 5 Hackathon Alumni (~200 devs)', 'itch.io community', 'Ludum Dare community'],
    valueProposition: 'Radically compressed prototyping. Test a game concept — "what does it feel like to explore a noir city at night?" — in minutes instead of months. Also enables an entirely new game format: AI-generated explorable worlds as the game itself. Odyssey\'s three API modes map directly to game architecture needs.',
    chequeSize: {
      low: '$500',
      high: '$1.2M',
      label: 'Annual (spectrum)',
      math: 'Prototyping: 3–5 concepts/yr × 100 hours each = 300–500 hrs × $1.50 = $450–750/yr. Shipped product with scale: 10K MAU × 30 min avg × 20 sessions/mo = 100K user-hrs/mo × $1 = $100K/mo = $1.2M/yr.',
    },
    totalAddressable: '$5M–15M',
    conviction: 4,
    targetAccountCount: '1,000+',
  },
  {
    id: 'interactive-advertising',
    name: 'Interactive Advertising & Experiential Agencies',
    tier: 'short',
    tierLabel: '0–6 months',
    icp: 'Creative agencies building immersive brand experiences, AR/VR campaigns, and interactive ads for Fortune 500 brands. Budget comes from client media or experiential spend.',
    decisionMakers: 'Executive Creative Directors, Heads of Innovation',
    namedTargets: ['R/GA', 'AKQA', 'Dentsu Creative', 'MediaMonks', 'Unit9', 'Framestore (Commercial)', 'Droga5'],
    valueProposition: '"Explorable ads" — a new format where consumers walk through a brand\'s world. A luxury hotel shows a hero image; the viewer clicks and walks through the lobby. Today, building an interactive 3D brand experience costs $200K–500K. Odyssey compresses this to days and <$10K in API costs.',
    chequeSize: {
      low: '$100K',
      high: '$500K',
      label: 'Annual Contract Value',
      math: 'A top agency runs 5–10 interactive campaigns/yr per major client. API cost per campaign: ~100 hrs of viewable streams = $100–200. Agency markup + platform fee = $25K–75K per campaign. Single agency placing 10 campaigns/yr = $250K–750K.',
    },
    totalAddressable: '$3M–10M',
    conviction: 4,
    targetAccountCount: '20–30',
  },
  {
    id: 'real-estate-tech',
    name: 'Real Estate Technology Platforms',
    tier: 'medium',
    tierLabel: '6–18 months',
    icp: 'Prop-tech companies and listing platforms currently investing in 3D virtual tours (Matterport scans, Zillow 3D Home). Also: commercial RE firms creating virtual tours for leasing.',
    decisionMakers: 'Product VPs, Heads of Listing Experience',
    namedTargets: ['Matterport', 'Zillow', 'Redfin', 'Realtor.com', 'CoStar Group', 'JLL Technologies', 'CBRE Build'],
    valueProposition: 'Single-photo-to-walkable-tour generation. A Matterport scan costs $200–500 per property. ~6M US homes sold/year. Odyssey auto-generates walkable interiors from listing photos for the 80% of listings that don\'t get 3D tours because of cost.',
    chequeSize: {
      low: '$50K',
      high: '$3M',
      label: 'Annual Contract Value',
      math: 'Platform scale (Zillow): 2% of listings (~100K/yr) use auto-generated tours at $5/tour API cost = $500K/yr compute. Platform license: $1M–3M/yr. Mid-size prop-tech: 5K listings/yr × $10/listing = $50K/yr.',
    },
    totalAddressable: '$2M–10M',
    conviction: 4,
    targetAccountCount: '10–15',
  },
  {
    id: 'education-cultural',
    name: 'Education & Cultural Heritage',
    tier: 'medium',
    tierLabel: '6–18 months',
    icp: 'EdTech platforms, museums, and cultural institutions building immersive learning — "walk through ancient Rome" or "explore the inside of a human cell."',
    decisionMakers: 'Product Leads (EdTech), Heads of Digital (Museums)',
    namedTargets: ['Khan Academy', 'National Geographic', 'Coursera', 'Smithsonian Institution', 'British Museum', 'Google Arts & Culture', 'Labster'],
    valueProposition: 'Content velocity. A single history teacher\'s reference image becomes a walkable experience. Today, building one virtual field trip costs $50K–200K. Odyssey generates hundreds from reference images in a weekend. Simulation endpoint for batch video walkthroughs.',
    chequeSize: {
      low: '$50K',
      high: '$300K',
      label: 'Annual Contract Value',
      math: 'Platform (Khan Academy): 500 environments/yr × 20 hrs simulation each = 10K hrs × $1.50 = $15K compute. Platform license: $100K–300K/yr based on student reach. Museum: 50 explorable reconstructions × $5K value each; API cost ~$2K, license ~$50K–100K/yr.',
    },
    totalAddressable: '$1.5M–5M',
    conviction: 3,
    targetAccountCount: '15–25',
  },
  {
    id: 'automotive',
    name: 'Automotive (Showrooms, Configurators, AV Sim)',
    tier: 'medium',
    tierLabel: '6–18 months',
    icp: 'Automotive OEMs and agency partners building virtual showrooms, car configurators, and AV simulation environments.',
    decisionMakers: 'Heads of Digital Experience, AV Simulation Leads',
    namedTargets: ['Samsung (via Samsung Next)', 'BMW', 'Mercedes', 'Porsche', 'Waymo', 'Cruise', 'Applied Intuition'],
    valueProposition: 'Two plays: (1) Virtual showrooms — customer uploads a driveway photo, car appears in walkable simulation. (2) AV simulation — Odyssey\'s real-video-trained world model generates diverse driving scenarios. Oliver & Jeff\'s self-driving backgrounds give credibility.',
    chequeSize: {
      low: '$200K',
      high: '$1M+',
      label: 'Annual Contract Value',
      math: 'Showroom: 10 markets × 500K sessions/yr × 5 min avg = 41.7K user-hrs × $2 = $83K compute. Enterprise license: $200K–500K/yr. AV simulation: companies spend $10M+/yr on sim — even 1% = $100K+/yr.',
    },
    totalAddressable: '$3M–10M',
    conviction: 3,
    targetAccountCount: '10–15',
  },
  {
    id: 'defense',
    name: 'Defense, Intelligence & Training Simulation',
    tier: 'long',
    tierLabel: '18+ months',
    icp: 'Defense contractors and government agencies building simulation for mission rehearsal, training, and intelligence analysis.',
    decisionMakers: 'Program Managers (Defense Primes), Innovation Leads (DoD/DARPA)',
    namedTargets: ['Lockheed Martin', 'Northrop Grumman', 'Booz Allen Hamilton', 'Palantir', 'Anduril', 'DARPA', 'US Army STE Program'],
    valueProposition: 'Instant simulation from a satellite/recon image. Building one military training environment takes 6–12 months, costs $1M+. Odyssey generates interactive rehearsal environments in seconds for rapid mission planning.',
    chequeSize: {
      low: '$500K',
      high: '$10M',
      label: 'Annual Contract Value',
      math: 'Single DoD simulation program (like STE): $500M+ budget. Defense prime\'s annual sim software budget: $50M–200M. Initial Odyssey contract: $500K–1M pilot, scaling to $5M–10M/yr. But: ITAR, FedRAMP, 2–3 year procurement cycles.',
    },
    totalAddressable: '$5M–30M',
    conviction: 3,
    targetAccountCount: '5–10',
  },
  {
    id: 'social-entertainment',
    name: 'Social Media & Consumer Entertainment',
    tier: 'long',
    tierLabel: '18+ months',
    icp: 'Social platforms and streaming services exploring interactive/explorable content formats as a new content primitive.',
    decisionMakers: 'Product VPs (Platforms)',
    namedTargets: ['Meta (Horizon Worlds / Instagram)', 'Snap (Spectacles AR)', 'TikTok', 'Spotify', 'Netflix (Interactive Stories)'],
    valueProposition: 'A new content primitive: explorable AI-generated worlds. A TikTok creator posts a photo and followers walk into it. A musician\'s album becomes an explorable world. Viewable streams endpoint (one stream, many viewers) is purpose-built for this.',
    chequeSize: {
      low: '$5M',
      high: '$20M+',
      label: 'Annual Platform License',
      math: '0.1% of Instagram\'s 2B MAU × 5 min/month = 2M users × 0.083 hrs = 166K user-hrs/mo × $1 = $2M/yr at list. Platform license: $5M–20M/yr with volume discounts. 18–36 month sales cycle.',
    },
    totalAddressable: '$25M–100M',
    conviction: 2,
    targetAccountCount: '5–8',
  },
  {
    id: 'architecture-aec',
    name: 'Architecture, Construction & Digital Twins',
    tier: 'long',
    tierLabel: '18+ months',
    icp: 'Architecture firms, AEC software companies, and digital twin platforms needing explorable 3D environments from blueprints or renders.',
    decisionMakers: 'Design Principals, Product Leads (AEC Tech)',
    namedTargets: ['Autodesk', 'Bentley Systems', 'Matterport (Digital Twin)', 'Unity (AEC)', 'Zaha Hadid Architects', 'Foster + Partners', 'WeWork'],
    valueProposition: 'Client presentations become interactive. An architect shows a single render; the client walks through it in real-time. Today: weeks of 3D modeling. Longer term: drone-photo-to-digital-twin updated daily for construction monitoring.',
    chequeSize: {
      low: '$30K',
      high: '$2M',
      label: 'Annual Contract Value',
      math: 'Top-50 firm: 20 interactive presentations/yr × 10 hrs = 200 hrs × $2 = $400 compute. Enterprise license: $30K–75K/yr on seats. AEC software platform embedding Odyssey: $500K–2M/yr licensing.',
    },
    totalAddressable: '$1M–10M',
    conviction: 3,
    targetAccountCount: '10–20',
  },
]

// ── Investor → ICP Connections ───────────────────────────────

export const investorConnects: InvestorConnect[] = [
  {
    investor: 'NVentures',
    fund: 'NVIDIA Venture Capital',
    connectionType: 'Strategic Investor',
    icpSegments: ['virtual-production', 'automotive', 'defense'],
    warmIntroTargets: [
      { company: 'NVIDIA Omniverse team', rationale: 'Odyssey as world generation layer within Omniverse digital twin pipeline' },
      { company: 'NVIDIA DGX Cloud customers', rationale: 'Cross-sell Odyssey API to existing GPU compute customers' },
      { company: 'Applied Intuition / Waymo', rationale: 'NVIDIA is supplier to both — warm intro for AV simulation deals' },
    ],
    dealHypothesis: 'NVIDIA invests in ecosystem plays that drive GPU consumption. Every Odyssey API call runs on H100 clusters. A showcase integration (Odyssey on Omniverse, or Odyssey at GTC as a demo) validates the platform and drives developer adoption.',
  },
  {
    investor: 'Samsung Next',
    fund: 'Samsung Venture Investment Corporation',
    connectionType: 'Strategic Investor',
    icpSegments: ['indie-games', 'social-entertainment', 'interactive-advertising'],
    warmIntroTargets: [
      { company: 'Samsung Mobile (Galaxy team)', rationale: 'Odyssey as native "AI Explore" feature on Galaxy devices — differentiate vs. iPhone' },
      { company: 'Samsung Ads', rationale: 'Interactive explorable ads on Samsung TV Plus and Galaxy devices' },
      { company: 'Samsung Gaming Hub', rationale: 'AI-generated game worlds playable on Samsung displays' },
    ],
    dealHypothesis: 'Samsung invested to get early access to a differentiating AI feature for Galaxy devices. The play is an exclusive mobile launch — "Powered by Odyssey" on the next Galaxy flagship. This puts Odyssey on hundreds of millions of devices instantly.',
  },
  {
    investor: 'GV (Google Ventures)',
    fund: 'Google Ventures',
    connectionType: 'Strategic Investor',
    icpSegments: ['education-cultural', 'social-entertainment', 'real-estate-tech'],
    warmIntroTargets: [
      { company: 'GV portfolio companies', rationale: 'Cross-pollination with GV\'s 500+ portfolio companies across consumer, enterprise, and deep tech' },
      { company: 'Google Cloud Partnerships', rationale: 'GV-backed companies often get preferential Google Cloud terms — Odyssey distribution play' },
      { company: 'Alphabet moonshots', rationale: 'GV sits at the intersection of Alphabet\'s innovation efforts' },
    ],
    dealHypothesis: 'GV as lead Seed investor provides Alphabet ecosystem access. The highest-leverage play is a Google Cloud distribution deal where Odyssey is available as a managed service, reducing friction for enterprise customers.',
  },
  {
    investor: 'EQT Ventures',
    fund: 'EQT Ventures',
    connectionType: 'Strategic Investor',
    icpSegments: ['virtual-production', 'interactive-advertising', 'architecture-aec'],
    warmIntroTargets: [
      { company: 'EQT European portfolio (200+ companies)', rationale: 'EQT is Europe\'s largest PE/VC — massive enterprise intro pipeline' },
      { company: 'European automotive OEMs', rationale: 'EQT has deep European industrial connections (BMW, Siemens, etc.)' },
      { company: 'European media companies', rationale: 'EQT portfolio includes media and entertainment assets' },
    ],
    dealHypothesis: 'EQT\'s European network is the gateway to the European enterprise market. For Odyssey\'s film/VP ambitions, European studios (Garden Studios is London-based) are a natural fit. EQT can also connect to European automotive and industrial customers.',
  },
  {
    investor: 'Ed Catmull',
    fund: 'Angel (Pixar Co-Founder)',
    connectionType: 'Angel Investor',
    icpSegments: ['virtual-production'],
    warmIntroTargets: [
      { company: 'Pixar / Walt Disney Animation', rationale: 'Pre-visualization and rapid world prototyping for animated films' },
      { company: 'Disney Imagineering', rationale: 'Interactive experiences for theme parks and attractions' },
      { company: 'Industrial Light & Magic (ILM)', rationale: 'StageCraft LED volume stage — world generation pipeline' },
    ],
    dealHypothesis: 'Catmull\'s involvement signals film/animation credibility. A Pixar pilot for pre-viz — even informal — would be the highest-signal case study possible for the VP studio vertical. His network opens doors at every major studio.',
  },
  {
    investor: 'Guillermo Rauch',
    fund: 'Angel (Vercel CEO)',
    connectionType: 'Angel Investor',
    icpSegments: ['indie-games', 'interactive-advertising', 'education-cultural'],
    warmIntroTargets: [
      { company: 'Vercel', rationale: 'One-click deploy of Odyssey-powered apps on Vercel — the developer GTM dream' },
      { company: 'Next.js developer community', rationale: 'Odyssey SDK integration in Next.js templates and showcases' },
      { company: 'Vercel Enterprise customers', rationale: 'Cross-sell interactive world experiences to Vercel\'s enterprise clients (agencies, brands)' },
    ],
    dealHypothesis: 'Vercel is the deployment platform for the modern web. An official Odyssey + Vercel integration (like "Deploy an Odyssey world with one click") supercharges the developer-led GTM motion. Rauch can amplify via his massive Twitter following.',
  },
  {
    investor: 'Garry Tan',
    fund: 'Angel (Y Combinator President)',
    connectionType: 'Angel Investor',
    icpSegments: ['indie-games', 'real-estate-tech', 'interactive-advertising'],
    warmIntroTargets: [
      { company: 'YC W25/S25 batch startups', rationale: 'Seed Odyssey adoption in the next generation of YC startups building on world models' },
      { company: 'YC prop-tech alumni (e.g., Opendoor, Matterport)', rationale: 'Warm intros to real estate tech companies for the virtual tour use case' },
      { company: 'YC gaming/creator startups', rationale: 'Direct pipeline to early-stage companies that would build on Odyssey API' },
    ],
    dealHypothesis: 'YC is the world\'s largest startup accelerator. Garry can make Odyssey a recommended tool in YC\'s internal resources — like how Stripe became the default payment processor for YC companies. This seeds long-tail developer adoption.',
  },
  {
    investor: 'Jeff Dean',
    fund: 'Angel (Google Chief Scientist)',
    connectionType: 'Angel Investor',
    icpSegments: ['education-cultural', 'social-entertainment'],
    warmIntroTargets: [
      { company: 'Google Arts & Culture', rationale: 'Explorable historical reconstructions powered by Odyssey for Google\'s cultural platform' },
      { company: 'Google Cloud AI team', rationale: 'Odyssey as a showcase model on Google Cloud (similar to how Runway runs on GCP)' },
      { company: 'YouTube', rationale: 'Interactive video format experiments on YouTube' },
    ],
    dealHypothesis: 'Jeff Dean\'s name is instant credibility in the AI research community. His involvement can open doors at Google Cloud (distribution deal) and Google Arts & Culture (lighthouse cultural heritage project).',
  },
  {
    investor: 'Kyle Vogt',
    fund: 'Angel (Cruise Co-Founder)',
    connectionType: 'Angel Investor',
    icpSegments: ['automotive', 'defense'],
    warmIntroTargets: [
      { company: 'Aurora Innovation', rationale: 'AV simulation data generation — Vogt knows the AV simulation market intimately' },
      { company: 'Nuro', rationale: 'Delivery robot simulation environments' },
      { company: 'Defense/robotics startups', rationale: 'Vogt\'s network spans the autonomous systems community' },
    ],
    dealHypothesis: 'Vogt built Cruise from zero to $30B+ valuation. He understands exactly what AV companies need from simulation. His warm intros carry weight in the autonomous vehicle community where Odyssey\'s founders also have deep roots.',
  },
]

// ── Events & Conferences ─────────────────────────────────────

export const conferences: ConferenceEvent[] = [
  {
    id: 'gdc-2026',
    name: 'GDC — Game Developers Conference (Festival of Gaming)',
    dates: 'Mar 9–13, 2026',
    location: 'Moscone Center, San Francisco, CA',
    relevantICPs: ['indie-games'],
    attendeeProfile: 'Game developers, publishers, designers, technical artists, studio heads',
    attendeeCount: '~30,000',
    odysseyPlay: 'Demo booth showing live Odyssey-powered game prototypes. Host a side-event hackathon. Target indie studios for API adoption. NVIDIA is present (GTC follows one week later) — coordinate joint messaging.',
    priority: 'Must Attend',
    website: 'https://gdconf.com',
  },
  {
    id: 'nvidia-gtc-2026',
    name: 'NVIDIA GTC 2026',
    dates: 'Mar 16–19, 2026',
    location: 'San Jose, CA (Downtown venues + SAP Center)',
    relevantICPs: ['automotive', 'defense', 'virtual-production'],
    attendeeProfile: 'AI researchers, developers, enterprise decision-makers, GPU customers',
    attendeeCount: '~25,000+',
    odysseyPlay: 'Leverage NVentures relationship for a featured demo. Position Odyssey as "the world model running on NVIDIA infrastructure." Target AV simulation leads and enterprise buyers. Jensen keynote is the highest-visibility moment in AI each year.',
    priority: 'Must Attend',
    website: 'https://www.nvidia.com/gtc/',
  },
  {
    id: 'nab-2026',
    name: 'NAB Show 2026',
    dates: 'Apr 18–22, 2026 (Exhibits: Apr 19–22)',
    location: 'Las Vegas Convention Center, Las Vegas, NV',
    relevantICPs: ['virtual-production', 'social-entertainment'],
    attendeeProfile: 'Broadcast, streaming, post-production, VFX supervisors, VP supervisors, studio execs',
    attendeeCount: '~55,000',
    odysseyPlay: 'Demo Odyssey on an LED volume stage (even a small one). Target VP supervisors and post-production leads. The "AI in media" track is perfect for a speaking slot. This is where Garden Studios-type deals get seeded.',
    priority: 'Must Attend',
    website: 'https://www.nabshow.com/las-vegas/',
  },
  {
    id: 'cannes-lions-2026',
    name: 'Cannes Lions International Festival of Creativity',
    dates: 'Jun 22–26, 2026',
    location: 'Palais des Festivals, Cannes, France',
    relevantICPs: ['interactive-advertising'],
    attendeeProfile: 'Creative directors, agency heads, brand CMOs, media buyers, innovation leads',
    attendeeCount: '~12,000',
    odysseyPlay: 'Launch "Explorable Ads" as a new format. Partner with one major agency (R/GA, AKQA) to showcase a live interactive brand world on the Croisette. Cannes is where agency budgets get unlocked — a viral demo here = pipeline for the year.',
    priority: 'High Value',
    website: 'https://www.canneslions.com',
  },
  {
    id: 'siggraph-2026',
    name: 'SIGGRAPH 2026',
    dates: 'Jul 19–23, 2026',
    location: 'Los Angeles, CA',
    relevantICPs: ['virtual-production', 'indie-games', 'architecture-aec'],
    attendeeProfile: 'CG researchers, VFX artists, technical directors, game engine developers, academic researchers',
    attendeeCount: '~12,000–15,000',
    odysseyPlay: 'Submit a Real-Time Live! demo (perfect for interactive world generation). Ed Catmull is deeply connected to SIGGRAPH community. Present a technical paper or production session on world model inference. This is where the CG community discovers new tech.',
    priority: 'Must Attend',
    website: 'https://s2026.siggraph.org',
  },
  {
    id: 'gamescom-2026',
    name: 'Gamescom 2026',
    dates: 'Aug 19–23, 2026 (est.)',
    location: 'Koelnmesse, Cologne, Germany',
    relevantICPs: ['indie-games'],
    attendeeProfile: 'Game publishers, developers, media, consumers (B2B + B2C)',
    attendeeCount: '~320,000 (B2B: ~30,000)',
    odysseyPlay: 'European gaming market entry. Showcase Odyssey-powered game demos in the B2B area (devcom). Important for reaching European studios and publishers not present at GDC.',
    priority: 'Opportunistic',
    website: 'https://www.gamescom.global',
  },
  {
    id: 'mipcom-2026',
    name: 'MIPCOM Cannes 2026',
    dates: 'Oct 12–15, 2026',
    location: 'Palais des Festivals, Cannes, France',
    relevantICPs: ['virtual-production', 'social-entertainment'],
    attendeeProfile: 'TV/streaming execs, content buyers, producers, platform operators, brand storytelling leads',
    attendeeCount: '~10,600',
    odysseyPlay: 'Position Odyssey as the next evolution of interactive content for streaming. Target Netflix, Disney+, Amazon Studios for interactive show experiences. The "Creator Economy" focus in 2026 is a natural fit for world-model-powered creator tools.',
    priority: 'High Value',
    website: 'https://www.mipcom.com',
  },
  {
    id: 'nab-ny-2026',
    name: 'NAB Show New York 2026',
    dates: 'Oct 21–22, 2026',
    location: 'New York, NY',
    relevantICPs: ['virtual-production', 'interactive-advertising'],
    attendeeProfile: 'East Coast media, advertising, and production professionals',
    attendeeCount: '~10,000',
    odysseyPlay: 'Smaller, more intimate than NAB Vegas. Good for 1-on-1 meetings with NYC-based agency and studio decision-makers. Follow-up from NAB Vegas relationships.',
    priority: 'Opportunistic',
    website: 'https://www.nabshow.com',
  },
  {
    id: 'ces-2027',
    name: 'CES 2027',
    dates: 'Jan 5–8, 2027 (est.)',
    location: 'Las Vegas Convention Center, Las Vegas, NV',
    relevantICPs: ['automotive', 'social-entertainment', 'interactive-advertising'],
    attendeeProfile: 'Consumer electronics execs, automotive OEMs, platform companies, brand marketers',
    attendeeCount: '~130,000',
    odysseyPlay: 'Samsung Next relationship → joint Samsung + Odyssey demo at Samsung booth. Position "interactive AI worlds" as a consumer electronics feature. Automotive OEM meetings for virtual showroom pilots. CES is where device partnerships get announced.',
    priority: 'High Value',
    website: 'https://www.ces.tech',
  },
]
