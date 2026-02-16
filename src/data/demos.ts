export interface DemoAssessment {
  companySlug: string
  productTested: string
  dateTested: string
  accessMethod: string
  videos: {
    src: string
    caption: string
  }[]
  scores: {
    outputQuality: number
    easeOfUse: number
    speed: number
    controllability: number
    exportWorkflow: number
  }
  verdict: string
  strengths: string[]
  weaknesses: string[]
  bestFor: string
  notAvailableReason?: string
}

export const demoAssessments: DemoAssessment[] = [
  {
    companySlug: 'world-labs',
    productTested: 'Marble',
    dateTested: 'February 2026',
    accessMethod: 'Pro Tier ($35/mo)',
    videos: [
      { src: 'https://www.youtube.com/watch?v=86RXkvfxW70', caption: "This AI Changes Film, Games, and 3D Forever — Marble overview (World Labs official)" },
      { src: 'https://www.youtube.com/watch?v=8OhrVkDRN2Y', caption: 'Image to 3D World — Step into your own 3D image' },
      { src: 'https://www.youtube.com/watch?v=cHqPJLNkCnI', caption: 'Generate your 3D world in minutes — Marble workflow demo' },
    ],
    scores: { outputQuality: 0, easeOfUse: 0, speed: 0, controllability: 0, exportWorkflow: 0 },
    verdict: "[Your verdict here]",
    strengths: ['[Strength 1]', '[Strength 2]', '[Strength 3]'],
    weaknesses: ['[Weakness 1]', '[Weakness 2]'],
    bestFor: '[e.g., Game environment prototyping and architectural visualization]',
  },
  {
    companySlug: 'odyssey',
    productTested: 'Odyssey-2 Pro',
    dateTested: 'February 2026',
    accessMethod: 'Free Experience + API',
    videos: [{ src: 'https://www.youtube.com/watch?v=F883UepANEg', caption: 'The Future of Video Is Here — AI-generated interactive worlds (Odyssey official)' }],
    scores: { outputQuality: 0, easeOfUse: 0, speed: 0, controllability: 0, exportWorkflow: 0 },
    verdict: '[Your verdict here]',
    strengths: ['[Strength 1]', '[Strength 2]'],
    weaknesses: ['[Weakness 1]', '[Weakness 2]'],
    bestFor: '[e.g., Real-time interactive experiences and simulation]',
  },
  {
    companySlug: 'spaitial',
    productTested: 'Echo',
    dateTested: 'February 2026',
    accessMethod: 'Public Gallery (Closed Beta waitlisted)',
    videos: [{ src: 'https://www.youtube.com/watch?v=xsTX8swbQEk', caption: 'Matthias Niessner (SpAItial co-founder) — 3D semantic scene understanding' }],
    scores: { outputQuality: 0, easeOfUse: 0, speed: 0, controllability: 0, exportWorkflow: 0 },
    verdict: '[Your verdict here]',
    strengths: ['[Strength 1]', '[Strength 2]'],
    weaknesses: ['[Weakness 1]', '[Weakness 2]'],
    bestFor: '[e.g., Digital twins and industrial simulation]',
  },
  {
    companySlug: 'runway',
    productTested: 'Gen-4.5 + GWM Worlds',
    dateTested: 'February 2026',
    accessMethod: 'Pro Tier ($28/mo)',
    videos: [{ src: 'https://www.youtube.com/watch?v=uRkfzKYFOxc', caption: 'Introducing Runway Gen-4 — world consistency, physics, multi-camera (official)' }],
    scores: { outputQuality: 0, easeOfUse: 0, speed: 0, controllability: 0, exportWorkflow: 0 },
    verdict: '[Your verdict here]',
    strengths: ['[Strength 1]', '[Strength 2]'],
    weaknesses: ['[Weakness 1]'],
    bestFor: '[e.g., Video production and creative professionals]',
  },
  {
    companySlug: 'nvidia-cosmos',
    productTested: 'Cosmos Predict',
    dateTested: 'February 2026',
    accessMethod: 'Open Source (Hugging Face)',
    videos: [
      { src: 'https://www.youtube.com/watch?v=9Uch931cDx8', caption: 'NVIDIA Cosmos — World Foundation Model Platform for Physical AI (official)' },
      { src: 'https://www.youtube.com/watch?v=kChwwFb5gMU', caption: 'NVIDIA GTC 2025 — Introduction to Cosmos World Foundational Models' },
    ],
    scores: { outputQuality: 0, easeOfUse: 0, speed: 0, controllability: 0, exportWorkflow: 0 },
    verdict: '[Your verdict here]',
    strengths: ['[Strength 1]'],
    weaknesses: ['[Weakness 1]'],
    bestFor: '[e.g., Robotics simulation and autonomous vehicle training]',
  },
  {
    companySlug: 'google-genie',
    productTested: 'Genie 3',
    dateTested: '',
    accessMethod: 'AI Ultra ($250/mo)',
    videos: [{ src: 'https://www.youtube.com/watch?v=PDKhUknuQDg', caption: 'Genie 3 — Creating dynamic worlds you can navigate in real-time (DeepMind official)' }],
    scores: { outputQuality: 0, easeOfUse: 0, speed: 0, controllability: 0, exportWorkflow: 0 },
    verdict: '',
    strengths: [],
    weaknesses: [],
    bestFor: '',
    notAvailableReason: 'Requires Google AI Ultra subscription at $250/month. No API access available. Assessed via published demos and documentation only.',
  },
  {
    companySlug: 'tencent',
    productTested: 'Hunyuan3D 2.1 + HunyuanWorld',
    dateTested: 'February 2026',
    accessMethod: 'Free (3d.hunyuanglobal.com — 20 gen/day)',
    videos: [
      { src: 'https://www.youtube.com/watch?v=LwQF4A-dXi8', caption: 'Tencent Hunyuan3D World Model — Free, open-source 3D world generation' },
      { src: 'https://www.youtube.com/watch?v=WthSqEV2Nt4', caption: 'Hunyuan 3D-2.5 — 3D model creator with automatic rigging' },
    ],
    scores: { outputQuality: 0, easeOfUse: 0, speed: 0, controllability: 0, exportWorkflow: 0 },
    verdict: '[Your verdict here]',
    strengths: ['[Strength 1]'],
    weaknesses: ['[Weakness 1]'],
    bestFor: '[e.g., Rapid 3D asset generation and open-source experimentation]',
  },
  {
    companySlug: 'iconic-ai',
    productTested: 'The Oversight Bureau',
    dateTested: 'February 2026',
    accessMethod: 'Free Steam Demo',
    videos: [{ src: 'https://www.youtube.com/watch?v=ucdba-YXcsM', caption: 'The Oversight Bureau — Official trailer (voice-driven AI NPC gameplay, Steam demo)' }],
    scores: { outputQuality: 0, easeOfUse: 0, speed: 0, controllability: 0, exportWorkflow: 0 },
    verdict: '[Your verdict here]',
    strengths: ['[Strength 1]'],
    weaknesses: ['[Weakness 1]'],
    bestFor: '[e.g., AI-native narrative gaming experiences]',
  },
  {
    companySlug: 'lucid',
    productTested: 'Lucid v1',
    dateTested: '',
    accessMethod: 'Waitlist',
    videos: [],
    scores: { outputQuality: 0, easeOfUse: 0, speed: 0, controllability: 0, exportWorkflow: 0 },
    verdict: '',
    strengths: [],
    weaknesses: [],
    bestFor: '',
    notAvailableReason: 'Lucid v2 is in early access with a waitlist. Only 3-person team, no public product access yet.',
  },
  {
    companySlug: 'meta',
    productTested: 'Meta Spatial AI',
    dateTested: '',
    accessMethod: 'N/A',
    videos: [
      { src: 'https://www.youtube.com/watch?v=Fq96phH2hIg', caption: "Meta SAM 3D — Turn any photo into a 3D model (powers 'View in Room')" },
      { src: 'https://www.youtube.com/watch?v=6d26votfAdE', caption: 'Meta V-JEPA 2 — Real-time streaming video understanding (open source)' },
    ],
    scores: { outputQuality: 0, easeOfUse: 0, speed: 0, controllability: 0, exportWorkflow: 0 },
    verdict: '',
    strengths: [],
    weaknesses: [],
    bestFor: '',
    notAvailableReason: "Most Meta spatial AI capabilities remain internal or research-stage. SAM 3D powers FB Marketplace 'View in Room' but is not independently accessible. V-JEPA 2 is open source but requires significant setup.",
  },
  {
    companySlug: 'ami-labs',
    productTested: 'AMI Labs',
    dateTested: '',
    accessMethod: 'N/A',
    videos: [{ src: 'https://www.youtube.com/watch?v=4X_26j5Z43Y', caption: "V-JEPA — Yann LeCun's vision for AI (JEPA architecture, foundational to AMI Labs)" }],
    scores: { outputQuality: 0, easeOfUse: 0, speed: 0, controllability: 0, exportWorkflow: 0 },
    verdict: '',
    strengths: [],
    weaknesses: [],
    bestFor: '',
    notAvailableReason: 'Pre-product. Announced December 2025, currently raising ~€500M. No public demos, prototypes, or access of any kind.',
  },
  {
    companySlug: 'general-intuition',
    productTested: 'General Intuition',
    dateTested: '',
    accessMethod: 'N/A',
    videos: [],
    scores: { outputQuality: 0, easeOfUse: 0, speed: 0, controllability: 0, exportWorkflow: 0 },
    verdict: '',
    strengths: [],
    weaknesses: [],
    bestFor: '',
    notAvailableReason: 'Pre-product. AI NPCs and game tools planned for H1 2026 launch. Medal.tv clip platform is live but the AI product is not.',
  },
]
