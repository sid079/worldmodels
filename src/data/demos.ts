export interface DemoRecording {
  src: string
  title: string
  description: string
}

export interface DemoAssessment {
  companySlug: string
  productTested: string
  dateTested: string
  accessMethod: string
  recordings: DemoRecording[]
  referenceImage: string | null
  videos: {
    src: string
    caption: string
  }[]
  notAvailableReason?: string
}

export const demoAssessments: DemoAssessment[] = [
  {
    companySlug: 'world-labs',
    productTested: 'Marble',
    dateTested: 'February 2026',
    accessMethod: 'Pro Tier ($35/mo)',
    recordings: [
      { src: '/demos/world-labs/World Labs.mov', title: 'Marble Walkthrough', description: 'Full walkthrough of World Labs Marble — image-to-3D world generation, camera controls, and export pipeline' },
    ],
    referenceImage: '/demos/reference/Test Image.jpg',
    videos: [],
  },
  {
    companySlug: 'odyssey',
    productTested: 'Odyssey-2 Pro',
    dateTested: 'February 2026',
    accessMethod: 'Free Experience + API',
    recordings: [
      { src: '/demos/odyssey/Odyssey.mov', title: 'Odyssey Explorer Demo', description: 'Hands-on with Odyssey Explorer — real-time world generation and interactive navigation' },
    ],
    referenceImage: '/demos/reference/Test Image.jpg',
    videos: [],
  },
  {
    companySlug: 'spaitial',
    productTested: 'Echo',
    dateTested: 'February 2026',
    accessMethod: 'Public Gallery (Closed Beta waitlisted)',
    recordings: [
      { src: '/demos/spaitial/Spaitial.mov', title: 'SpAItial Echo Demo', description: 'Testing SpAItial Echo — 3D scene generation from text and image prompts' },
    ],
    referenceImage: null,
    videos: [],
  },
  {
    companySlug: 'runway',
    productTested: 'Gen-4.5 + GWM Worlds',
    dateTested: 'February 2026',
    accessMethod: 'Pro Tier ($28/mo)',
    recordings: [
      { src: '/demos/runway/Runway.mov', title: 'Runway Gen-4.5 Demo', description: 'Testing Runway Gen-4.5 and GWM Worlds — video generation with world consistency and camera control' },
    ],
    referenceImage: '/demos/reference/Test Image.jpg',
    videos: [],
  },
  {
    companySlug: 'nvidia-cosmos',
    productTested: 'Cosmos Predict',
    dateTested: '',
    accessMethod: 'Open Source (Hugging Face)',
    recordings: [],
    referenceImage: null,
    videos: [
      { src: 'https://www.youtube.com/watch?v=9Uch931cDx8', caption: 'NVIDIA Cosmos — World Foundation Model Platform for Physical AI (official)' },
      { src: 'https://www.youtube.com/watch?v=kChwwFb5gMU', caption: 'NVIDIA GTC 2025 — Introduction to Cosmos World Foundational Models' },
    ],
    notAvailableReason: 'Open-source model available on Hugging Face but requires significant local infrastructure to run. Assessed via published demos and documentation only.',
  },
  {
    companySlug: 'google-genie',
    productTested: 'Genie 3',
    dateTested: '',
    accessMethod: 'AI Ultra ($250/mo)',
    recordings: [],
    referenceImage: null,
    videos: [{ src: 'https://www.youtube.com/watch?v=PDKhUknuQDg', caption: 'Genie 3 — Creating dynamic worlds you can navigate in real-time (DeepMind official)' }],
    notAvailableReason: 'Requires Google AI Ultra subscription at $250/month. No API access available. Assessed via published demos and documentation only.',
  },
  {
    companySlug: 'tencent',
    productTested: 'Hunyuan3D 2.1 + HunyuanWorld',
    dateTested: '',
    accessMethod: 'Free (3d.hunyuanglobal.com — 20 gen/day)',
    recordings: [],
    referenceImage: null,
    videos: [
      { src: 'https://www.youtube.com/watch?v=LwQF4A-dXi8', caption: 'Tencent Hunyuan3D World Model — Free, open-source 3D world generation' },
      { src: 'https://www.youtube.com/watch?v=WthSqEV2Nt4', caption: 'Hunyuan 3D-2.5 — 3D model creator with automatic rigging' },
    ],
    notAvailableReason: 'Free web tool available but not personally tested. Assessed via published demos and documentation only.',
  },
  {
    companySlug: 'iconic-ai',
    productTested: 'The Oversight Bureau',
    dateTested: '',
    accessMethod: 'Free Steam Demo',
    recordings: [],
    referenceImage: null,
    videos: [{ src: 'https://www.youtube.com/watch?v=ucdba-YXcsM', caption: 'The Oversight Bureau — Official trailer (voice-driven AI NPC gameplay, Steam demo)' }],
    notAvailableReason: 'Free Steam demo available but not personally tested. Assessed via published trailers and documentation only.',
  },
  {
    companySlug: 'lucid',
    productTested: 'Lucid v1',
    dateTested: '',
    accessMethod: 'Waitlist',
    recordings: [],
    referenceImage: null,
    videos: [],
    notAvailableReason: 'Lucid v2 is in early access with a waitlist. Only 3-person team, no public product access yet.',
  },
  {
    companySlug: 'meta',
    productTested: 'Meta Spatial AI',
    dateTested: '',
    accessMethod: 'N/A',
    recordings: [],
    referenceImage: null,
    videos: [
      { src: 'https://www.youtube.com/watch?v=Fq96phH2hIg', caption: "Meta SAM 3D — Turn any photo into a 3D model (powers 'View in Room')" },
      { src: 'https://www.youtube.com/watch?v=6d26votfAdE', caption: 'Meta V-JEPA 2 — Real-time streaming video understanding (open source)' },
    ],
    notAvailableReason: "Most Meta spatial AI capabilities remain internal or research-stage. SAM 3D powers FB Marketplace 'View in Room' but is not independently accessible. V-JEPA 2 is open source but requires significant setup.",
  },
  {
    companySlug: 'ami-labs',
    productTested: 'AMI Labs',
    dateTested: '',
    accessMethod: 'N/A',
    recordings: [],
    referenceImage: null,
    videos: [{ src: 'https://www.youtube.com/watch?v=4X_26j5Z43Y', caption: "V-JEPA — Yann LeCun's vision for AI (JEPA architecture, foundational to AMI Labs)" }],
    notAvailableReason: 'Pre-product. Announced December 2025, currently raising ~€500M. No public demos, prototypes, or access of any kind.',
  },
  {
    companySlug: 'general-intuition',
    productTested: 'General Intuition',
    dateTested: '',
    accessMethod: 'N/A',
    recordings: [],
    referenceImage: null,
    videos: [],
    notAvailableReason: 'Pre-product. AI NPCs and game tools planned for H1 2026 launch. Medal.tv clip platform is live but the AI product is not.',
  },
]
