export type Stage = 'revenue' | 'pre-revenue' | 'pre-product' | 'production' | 'research' | 'limited-access';

export interface CompanyOverview {
  id: string;
  name: string;
  founded: string;
  hq: string;
  funding: string;
  valuation: string;
  teamSize: string;
  keyFounders: string;
  stage: Stage;
  category: 'interview-target' | 'adjacent' | 'big-tech';
}

export interface ProductInfo {
  productNames: string[];
  coreCapability: string;
  inputModalities: string[];
  outputFormat: string[];
  keyDifferentiator: string;
  targetVerticals: string[];
  accessModel: string;
}

export interface PricingInfo {
  model: string;
  consumerTiers: string;
  apiPricing: string;
  enterprise: string;
  commercialRights: string;
  revenueStage: string;
}

export interface TechnologyInfo {
  architectureType: string;
  trainingDataStrategy: string;
  modelSize: string;
  outputQuality: string;
  openSource: string;
  keyTechnicalInnovation: string;
  category: 'static-3d' | 'interactive-streaming' | 'video-generation' | 'jepa' | 'game-engine' | 'infrastructure';
}

export interface GTMInfo {
  growthModel: string;
  distributionChannels: string[];
  keyPartnerships: string[];
  bdSalesTeam: string;
  community: string[];
  recommendedStrategy?: string;
}

export interface Company {
  id: string;
  overview: CompanyOverview;
  product: ProductInfo;
  pricing: PricingInfo;
  technology: TechnologyInfo;
  gtm: GTMInfo;
}

export const companies: Company[] = [
  {
    id: 'world-labs',
    overview: {
      id: 'world-labs',
      name: 'World Labs',
      founded: '2024',
      hq: 'San Francisco',
      funding: '$230M+',
      valuation: '$1B ($5B pending)',
      teamSize: '~50+',
      keyFounders: 'Fei-Fei Li, Justin Johnson, Christoph Lassner, Ben Mildenhall',
      stage: 'revenue',
      category: 'interview-target',
    },
    product: {
      productNames: ['Marble'],
      coreCapability: 'Persistent, explorable, editable 3D environments from text/image/video',
      inputModalities: ['Text', 'Image', 'Video'],
      outputFormat: ['3D scenes', 'Gaussian splats', 'Triangle mesh', 'Unity/Unreal/Houdini/Blender compatible'],
      keyDifferentiator: 'AI-native Chisel editor. Browser-based, no install. Apple Vision Pro + Meta Quest 3 support.',
      targetVerticals: ['Gaming', 'Film/VFX', 'Architecture', 'E-commerce'],
      accessModel: 'Free Tier / Paid / API',
    },
    pricing: {
      model: 'Freemium + API',
      consumerTiers: 'Free ($0, 4 gen/mo) / Standard ($20, 12 gen) / Pro ($35, 25 gen) / Max ($95, 75 gen)',
      apiPricing: '$1.20/generation (standard) via credits',
      enterprise: 'Custom',
      commercialRights: 'Pro tier minimum ($35/mo)',
      revenueStage: 'Early Revenue',
    },
    technology: {
      architectureType: 'World model / 3D generation',
      trainingDataStrategy: 'Proprietary capture / Internet scraping',
      modelSize: 'Undisclosed',
      outputQuality: 'High-res 3D, Gaussian splat + mesh export',
      openSource: 'No',
      keyTechnicalInnovation: 'Multimodal input → persistent downloadable 3D. Browser-native.',
      category: 'static-3d',
    },
    gtm: {
      growthModel: 'PLG',
      distributionChannels: ['Web app', 'API', 'Browser-based'],
      keyPartnerships: ['120K+ free accounts in 8 weeks'],
      bdSalesTeam: 'No BD/sales hires — opportunity',
      community: ['Discord', 'Hackathons'],
      recommendedStrategy: 'Hybrid PLG + enterprise sales. Priority: gaming studios, film/VFX, architecture. Top deals: Unity/Unreal plugins, AAA studio pilot, NVIDIA Omniverse integration, cloud marketplace listing, VFX studio case study.',
    },
  },
  {
    id: 'odyssey',
    overview: {
      id: 'odyssey',
      name: 'Odyssey',
      founded: '~2023',
      hq: 'San Francisco',
      funding: '$27M+',
      valuation: 'Undisclosed',
      teamSize: '~46',
      keyFounders: 'Oliver Cameron (ex-Cruise), Jeff Hawke (ex-Wayve)',
      stage: 'pre-revenue',
      category: 'interview-target',
    },
    product: {
      productNames: ['Odyssey-2 Pro'],
      coreCapability: 'Real-time interactive video streaming — WASD-controllable worlds',
      inputModalities: ['Text', 'Image', '360° capture'],
      outputFormat: ['Interactive video streams', 'Real-time API'],
      keyDifferentiator: '3 API endpoints: Simulations (batch), Interactive Streams (real-time), Viewable Streams (scalable). Custom 360° data capture.',
      targetVerticals: ['Film', 'Gaming', 'Simulation'],
      accessModel: 'API / Gated',
    },
    pricing: {
      model: 'API-first (gated)',
      consumerTiers: 'Free consumer experience',
      apiPricing: '~$1-2/user-hour (disclosed, not public)',
      enterprise: 'Likely custom',
      commercialRights: 'Unknown',
      revenueStage: 'Pre-Revenue',
    },
    technology: {
      architectureType: 'Interactive real-time streaming',
      trainingDataStrategy: 'Proprietary 360° capture',
      modelSize: 'Undisclosed',
      outputQuality: 'Real-time interactive',
      openSource: 'No',
      keyTechnicalInnovation: 'WASD-controllable real-time video. Three distinct API modes.',
      category: 'interactive-streaming',
    },
    gtm: {
      growthModel: 'Developer-led',
      distributionChannels: ['API', 'Developer platform'],
      keyPartnerships: ['Catmull (Pixar network)'],
      bdSalesTeam: 'No BD/sales hires — opportunity',
      community: ['Developer docs'],
      recommendedStrategy: 'Developer-led growth. Priority: developer platform, gaming, film. Top deals: consumer game on Odyssey, Pixar network via Catmull, Samsung device integration, defense contract, Vercel integration.',
    },
  },
  {
    id: 'spaitial',
    overview: {
      id: 'spaitial',
      name: 'SpAItial',
      founded: '~2024',
      hq: 'Munich / London',
      funding: '$13M',
      valuation: 'Undisclosed',
      teamSize: '1–10',
      keyFounders: 'Matthias Niessner (TU Munich, Synthesia co-founder)',
      stage: 'pre-revenue',
      category: 'interview-target',
    },
    product: {
      productNames: ['Echo'],
      coreCapability: '3D world generation from text/image',
      inputModalities: ['Text', 'Image'],
      outputFormat: ['3D scenes', 'Browser gallery'],
      keyDifferentiator: 'Research-backed (ScanNet, MeshGPT). Interior redesign, real-estate viz highlighted.',
      targetVerticals: ['Architecture', 'Real Estate', 'Gaming'],
      accessModel: 'Closed Beta / Planned API',
    },
    pricing: {
      model: 'Planned API licensing',
      consumerTiers: 'None (closed beta)',
      apiPricing: 'None yet',
      enterprise: 'Planned',
      commercialRights: 'Unknown',
      revenueStage: 'Pre-Revenue',
    },
    technology: {
      architectureType: '3D diffusion / World model',
      trainingDataStrategy: 'ScanNet, MeshGPT, academic datasets',
      modelSize: 'Undisclosed',
      outputQuality: '3D scenes',
      openSource: 'Partial (research)',
      keyTechnicalInnovation: 'European deep-tech credibility. Academic moat.',
      category: 'static-3d',
    },
    gtm: {
      growthModel: 'Partner-led enterprise',
      distributionChannels: ['Browser gallery', 'Planned API'],
      keyPartnerships: ['Synthesia connection', 'TU Munich'],
      bdSalesTeam: 'No BD/sales hires — opportunity',
      community: ['Research publications'],
      recommendedStrategy: 'Partner-led enterprise. Priority: digital twins/industrial, gaming, architecture. Top deals: German automotive pilot (BMW/Siemens/Bosch), game engine integration, Zoopla real estate, Black Forest Labs combo, Synthesia partnership.',
    },
  },
  {
    id: 'runway',
    overview: {
      id: 'runway',
      name: 'Runway',
      founded: '2018',
      hq: 'New York',
      funding: '$860M',
      valuation: '$5.3B',
      teamSize: '~100+',
      keyFounders: 'Cristóbal Valenzuela',
      stage: 'revenue',
      category: 'adjacent',
    },
    product: {
      productNames: ['Gen-4.5', 'GWM-1', 'GWM Worlds', 'GWM Robotics', 'GWM Avatars'],
      coreCapability: 'Video generation + world models (GWM Worlds, GWM Robotics, GWM Avatars)',
      inputModalities: ['Text', 'Image', 'Video'],
      outputFormat: ['24fps/720p interactive environments', 'Video', 'Python SDK for robotics'],
      keyDifferentiator: 'Adobe partnership. Established video gen brand extending to worlds.',
      targetVerticals: ['Film/VFX', 'Gaming', 'Robotics'],
      accessModel: 'Freemium / Paid / API / Enterprise',
    },
    pricing: {
      model: 'Freemium + API + Enterprise',
      consumerTiers: 'Free (125 credits) / Standard ($12) / Pro ($28) / Unlimited ($76)',
      apiPricing: 'Credit-based (varies by model)',
      enterprise: 'Custom',
      commercialRights: 'Standard tier+',
      revenueStage: '~$90M ARR',
    },
    technology: {
      architectureType: 'Video diffusion extending to worlds',
      trainingDataStrategy: 'Internet scraping / Proprietary',
      modelSize: 'Undisclosed',
      outputQuality: '24fps/720p interactive',
      openSource: 'No',
      keyTechnicalInnovation: 'Video gen → world model extension. Python SDK for robotics.',
      category: 'video-generation',
    },
    gtm: {
      growthModel: 'PLG + Enterprise',
      distributionChannels: ['Web app', 'API', 'Adobe partnership'],
      keyPartnerships: ['Adobe'],
      bdSalesTeam: 'Established',
      community: ['Discord', 'Creative community'],
    },
  },
  {
    id: 'ami-labs',
    overview: {
      id: 'ami-labs',
      name: 'AMI Labs',
      founded: '2025',
      hq: 'Paris',
      funding: '~€500M (raising)',
      valuation: '~€3B (target)',
      teamSize: 'Early',
      keyFounders: 'Yann LeCun, Alex LeBrun',
      stage: 'pre-product',
      category: 'adjacent',
    },
    product: {
      productNames: ['JEPA (architecture)'],
      coreCapability: 'Predicts in latent space, not pixels. No product yet.',
      inputModalities: ['TBD'],
      outputFormat: ['TBD'],
      keyDifferentiator: 'JEPA architecture. Healthcare (Nabla partnership), robotics, industrial control.',
      targetVerticals: ['Healthcare', 'Robotics', 'Industrial'],
      accessModel: 'Open source commitment / B2B',
    },
    pricing: {
      model: 'B2B licensing',
      consumerTiers: 'None',
      apiPricing: 'None',
      enterprise: 'Nabla exclusive first access',
      commercialRights: 'N/A',
      revenueStage: 'Pre-Product',
    },
    technology: {
      architectureType: 'JEPA (Joint Embedding Predictive Architecture)',
      trainingDataStrategy: 'Proprietary / Research',
      modelSize: 'Undisclosed',
      outputQuality: 'Latent space prediction',
      openSource: 'Planned',
      keyTechnicalInnovation: 'Predicts in latent space, not pixels. Different paradigm.',
      category: 'jepa',
    },
    gtm: {
      growthModel: 'Research-led / Enterprise',
      distributionChannels: ['Nabla partnership'],
      keyPartnerships: ['Nabla (healthcare)'],
      bdSalesTeam: 'Early',
      community: ['Research', 'Open source'],
    },
  },
  {
    id: 'general-intuition',
    overview: {
      id: 'general-intuition',
      name: 'General Intuition',
      founded: '2025',
      hq: 'SF / Geneva',
      funding: '$133.7M',
      valuation: 'Undisclosed',
      teamSize: '~10-20',
      keyFounders: 'Pim de Witte (Medal), Vincent Micheli, Eloi Alonso',
      stage: 'pre-product',
      category: 'adjacent',
    },
    product: {
      productNames: ['DIAMOND world model'],
      coreCapability: 'AI-powered NPCs, adaptive bots from 3.8B action-labeled gaming clips (Medal dataset)',
      inputModalities: ['Gaming clips', 'Action labels'],
      outputFormat: ['NPC behavior', 'Adaptive game AI'],
      keyDifferentiator: 'Medal dataset. Public Benefit Corporation. Launching H1 2026.',
      targetVerticals: ['Gaming'],
      accessModel: 'B2B (planned)',
    },
    pricing: {
      model: 'B2B (planned)',
      consumerTiers: 'None',
      apiPricing: 'None',
      enterprise: 'Planned H1 2026',
      commercialRights: 'N/A',
      revenueStage: 'Pre-Product',
    },
    technology: {
      architectureType: 'Game-specific world model',
      trainingDataStrategy: '3.8B action-labeled gaming clips (Medal)',
      modelSize: 'Undisclosed',
      outputQuality: 'NPC behavior',
      openSource: 'No',
      keyTechnicalInnovation: 'Action-labeled gaming data. DIAMOND architecture.',
      category: 'game-engine',
    },
    gtm: {
      growthModel: 'Gaming / B2B',
      distributionChannels: ['Planned API'],
      keyPartnerships: ['Medal data'],
      bdSalesTeam: 'Early',
      community: ['Gaming'],
    },
  },
  {
    id: 'iconic-ai',
    overview: {
      id: 'iconic-ai',
      name: 'Iconic AI',
      founded: '2023',
      hq: 'London',
      funding: '~$17M',
      valuation: 'Undisclosed',
      teamSize: '~15-20',
      keyFounders: 'Andrew Bowell (ex-Unity), John Lusty (ex-Square Enix/Meta)',
      stage: 'pre-revenue',
      category: 'adjacent',
    },
    product: {
      productNames: ['The Oversight Bureau'],
      coreCapability: 'On-device AI-native game engine. Voice-input gameplay.',
      inputModalities: ['Voice', 'Text'],
      outputFormat: ['Game engine', 'Steam demo'],
      keyDifferentiator: 'Patent-pending Narrative Engine. No cloud inference needed. NVIDIA ACE partnership.',
      targetVerticals: ['Gaming'],
      accessModel: 'Free demo / Steam',
    },
    pricing: {
      model: 'Free demo',
      consumerTiers: 'Free Steam demo',
      apiPricing: 'None',
      enterprise: 'None',
      commercialRights: 'N/A',
      revenueStage: 'Pre-Revenue',
    },
    technology: {
      architectureType: 'Game engine / On-device',
      trainingDataStrategy: 'Proprietary',
      modelSize: 'Undisclosed',
      outputQuality: 'On-device, 87% Steam positive',
      openSource: 'No',
      keyTechnicalInnovation: 'On-device. No cloud. Voice-input gameplay.',
      category: 'game-engine',
    },
    gtm: {
      growthModel: 'Product-led / Gaming',
      distributionChannels: ['Steam', 'Demo'],
      keyPartnerships: ['NVIDIA ACE'],
      bdSalesTeam: 'Early',
      community: ['Steam community'],
    },
  },
  {
    id: 'lucid',
    overview: {
      id: 'lucid',
      name: 'Lucid',
      founded: '2025',
      hq: 'SF (YC W25)',
      funding: '$10.1M',
      valuation: 'Undisclosed',
      teamSize: '3',
      keyFounders: 'Alberto Hojel (UC Berkeley), Rami Seid',
      stage: 'pre-revenue',
      category: 'adjacent',
    },
    product: {
      productNames: ['Lucid World Model'],
      coreCapability: 'Fastest world model — 20+ FPS on 4090 GPU. 128x spatial compression.',
      inputModalities: ['Text', 'Image'],
      outputFormat: ['Minecraft simulation', 'Interactive worlds'],
      keyDifferentiator: 'Speed. 20+ FPS. 128x compression. Minecraft sim.',
      targetVerticals: ['Gaming', 'Robotics'],
      accessModel: 'Early access / Waitlist',
    },
    pricing: {
      model: 'TBD',
      consumerTiers: 'None (waitlist)',
      apiPricing: 'None',
      enterprise: 'None',
      commercialRights: 'N/A',
      revenueStage: 'Pre-Revenue',
    },
    technology: {
      architectureType: 'Interactive real-time',
      trainingDataStrategy: 'Proprietary',
      modelSize: 'Undisclosed',
      outputQuality: '20+ FPS on 4090',
      openSource: 'No',
      keyTechnicalInnovation: '128x spatial compression. Fastest inference.',
      category: 'interactive-streaming',
    },
    gtm: {
      growthModel: 'Developer / Early access',
      distributionChannels: ['Waitlist'],
      keyPartnerships: ['YC W25'],
      bdSalesTeam: 'None',
      community: ['Waitlist'],
    },
  },
  {
    id: 'nvidia-cosmos',
    overview: {
      id: 'nvidia-cosmos',
      name: 'NVIDIA Cosmos',
      founded: '2025 (CES)',
      hq: 'Santa Clara',
      funding: 'N/A (NVIDIA division)',
      valuation: 'N/A',
      teamSize: 'N/A',
      keyFounders: 'Jensen Huang (NVIDIA CEO)',
      stage: 'production',
      category: 'big-tech',
    },
    product: {
      productNames: ['Cosmos Predict', 'Cosmos Transfer', 'Cosmos Reason'],
      coreCapability: 'Cosmos Predict (2B-14B params), Cosmos Transfer (sim-to-real), Cosmos Reason (physics reasoning)',
      inputModalities: ['Multi-modal'],
      outputFormat: ['3D', 'Simulation', 'Physics'],
      keyDifferentiator: '9,000T tokens training data. Free models, Apache 2.0. Monetizes via GPU sales.',
      targetVerticals: ['Robotics', 'Gaming', 'Simulation'],
      accessModel: 'Open Source / Free / DGX Cloud',
    },
    pricing: {
      model: 'Free models + ecosystem',
      consumerTiers: 'Free (open license)',
      apiPricing: 'Via DGX Cloud / NIM',
      enterprise: 'AI Enterprise ~$4,500/GPU/yr',
      commercialRights: 'Apache 2.0 (code)',
      revenueStage: 'Indirect (GPU sales)',
    },
    technology: {
      architectureType: 'Infrastructure platform',
      trainingDataStrategy: '9,000T tokens',
      modelSize: '2B-14B params',
      outputQuality: 'Production',
      openSource: 'Yes (Apache 2.0)',
      keyTechnicalInnovation: 'Full stack. Sim-to-real. Physics reasoning.',
      category: 'infrastructure',
    },
    gtm: {
      growthModel: 'Platform / Ecosystem',
      distributionChannels: ['Open source', 'HuggingFace', 'DGX Cloud'],
      keyPartnerships: ['2M+ downloads'],
      bdSalesTeam: 'NVIDIA sales',
      community: ['Open source', '2M+ downloads'],
    },
  },
  {
    id: 'google-genie',
    overview: {
      id: 'google-genie',
      name: 'Google Genie 3',
      founded: '2025',
      hq: 'London/Mountain View',
      funding: 'N/A (DeepMind)',
      valuation: 'N/A',
      teamSize: 'N/A',
      keyFounders: 'DeepMind team',
      stage: 'limited-access',
      category: 'big-tech',
    },
    product: {
      productNames: ['Genie 3'],
      coreCapability: 'Real-time interactive worlds at 24 FPS/720p. Text-to-world. Learned physics.',
      inputModalities: ['Text'],
      outputFormat: ['24 FPS/720p interactive', '60-second sessions'],
      keyDifferentiator: 'SIMA agent integration. $250/month walled garden.',
      targetVerticals: ['Gaming', 'Simulation'],
      accessModel: 'Enterprise Only ($250/mo AI Ultra)',
    },
    pricing: {
      model: 'Premium subscription',
      consumerTiers: '$250/month (AI Ultra)',
      apiPricing: 'None',
      enterprise: 'None',
      commercialRights: 'Unknown',
      revenueStage: 'Minimal',
    },
    technology: {
      architectureType: 'Interactive real-time streaming',
      trainingDataStrategy: 'Proprietary / DeepMind',
      modelSize: 'Undisclosed',
      outputQuality: '24 FPS/720p',
      openSource: 'No',
      keyTechnicalInnovation: 'Learned physics. SIMA integration.',
      category: 'interactive-streaming',
    },
    gtm: {
      growthModel: 'Research / Premium',
      distributionChannels: ['AI Ultra subscription'],
      keyPartnerships: ['Internal'],
      bdSalesTeam: 'Google',
      community: ['Limited'],
    },
  },
  {
    id: 'meta',
    overview: {
      id: 'meta',
      name: 'Meta',
      founded: 'Various',
      hq: 'Menlo Park',
      funding: 'N/A (Meta division)',
      valuation: 'N/A',
      teamSize: 'N/A',
      keyFounders: '(Yann LeCun departed to AMI)',
      stage: 'research',
      category: 'big-tech',
    },
    product: {
      productNames: ['AssetGen 2.0', 'WorldGen', 'V-JEPA 2', 'SAM 3D', 'Horizon Studio'],
      coreCapability: '5 product lines. V-JEPA 2 claimed 30x faster than Cosmos. SAM 3D powers FB Marketplace "View in Room".',
      inputModalities: ['Multi-modal'],
      outputFormat: ['3D assets', 'Worlds', 'View in Room'],
      keyDifferentiator: 'V-JEPA 2 open source. Mostly research/internal.',
      targetVerticals: ['E-commerce', 'Social', 'Research'],
      accessModel: 'Internal / Open Source (V-JEPA 2)',
    },
    pricing: {
      model: 'Internal / Open Source',
      consumerTiers: 'N/A',
      apiPricing: 'N/A',
      enterprise: 'Internal',
      commercialRights: 'V-JEPA 2 open source',
      revenueStage: 'Internal',
    },
    technology: {
      architectureType: 'JEPA / Latent space',
      trainingDataStrategy: 'Proprietary / Research',
      modelSize: 'Undisclosed',
      outputQuality: 'V-JEPA 2: 30x faster than Cosmos',
      openSource: 'Partial (V-JEPA 2)',
      keyTechnicalInnovation: 'V-JEPA 2. SAM 3D for Marketplace.',
      category: 'jepa',
    },
    gtm: {
      growthModel: 'Internal / Research',
      distributionChannels: ['Internal', 'Open source'],
      keyPartnerships: ['Internal products'],
      bdSalesTeam: 'Meta',
      community: ['Research', 'Open source'],
    },
  },
  {
    id: 'tencent',
    overview: {
      id: 'tencent',
      name: 'Tencent',
      founded: '2024-2025',
      hq: 'Shenzhen',
      funding: 'N/A (Tencent division)',
      valuation: 'N/A',
      teamSize: 'N/A',
      keyFounders: 'Tencent AI Lab',
      stage: 'production',
      category: 'big-tech',
    },
    product: {
      productNames: ['Hunyuan3D', 'HunyuanWorld 1.5'],
      coreCapability: 'Open-source 3D generation with PBR materials. HunyuanWorld 1.5 at 24 FPS interactive.',
      inputModalities: ['Text', 'Image'],
      outputFormat: ['3D with PBR', '24 FPS interactive'],
      keyDifferentiator: '3M+ HuggingFace downloads. Tencent Cloud API. Unity China + Bambu Lab partnerships.',
      targetVerticals: ['Gaming', 'E-commerce', 'China market'],
      accessModel: 'Open Source / Cloud API',
    },
    pricing: {
      model: 'Open Source + Cloud API',
      consumerTiers: '20 free gen/day (web)',
      apiPricing: '200 free credits (Cloud)',
      enterprise: '150+ enterprises (China)',
      commercialRights: 'Open source',
      revenueStage: 'Early Revenue (China)',
    },
    technology: {
      architectureType: 'Static 3D + Interactive',
      trainingDataStrategy: 'Proprietary / Open datasets',
      modelSize: 'Undisclosed',
      outputQuality: '24 FPS, PBR materials',
      openSource: 'Yes',
      keyTechnicalInnovation: '3M+ HuggingFace. Open source blitz.',
      category: 'static-3d',
    },
    gtm: {
      growthModel: 'Open source / China market',
      distributionChannels: ['HuggingFace', 'Tencent Cloud', 'Unity China'],
      keyPartnerships: ['Unity China', 'Bambu Lab', '3M+ downloads'],
      bdSalesTeam: 'Tencent',
      community: ['3M+ HuggingFace', 'Open source'],
    },
  },
];

export const thesisPillars = [
  {
    title: 'The Window is Narrow',
    content: 'Spatial AI companies must establish enterprise customers, pricing sophistication, and partnership ecosystems before big tech (NVIDIA, Google, Meta, Tencent) commoditizes the foundation model layer. The strategic window is 12–24 months.',
  },
  {
    title: 'Three Distinct Playbooks',
    content: 'World Labs leads with PLG (120K+ free accounts in 8 weeks). Odyssey bets on developer-led growth with a real-time interactive API. SpAItial leverages European deep-tech credibility and academic moat. Each requires a fundamentally different BD/GTM approach.',
  },
  {
    title: 'Big Tech is the Tide, Not the Competition',
    content: "NVIDIA Cosmos (free models, 2M+ downloads), Tencent's open-source blitz (3M+ HuggingFace downloads), and Google's $250/month walled garden reshape competitive dynamics. Startups must differentiate on UX, vertical specialization, and speed — not model scale.",
  },
];

export const marketCategories = {
  'Pure-Play Startups (Interview Targets)': ['World Labs', 'Odyssey', 'SpAItial'],
  'Pure-Play Startups (Adjacent)': ['Runway', 'AMI Labs', 'General Intuition', 'Iconic AI', 'Lucid'],
  'Big Tech / Platform': ['NVIDIA Cosmos', 'Google DeepMind Genie 3', 'Meta', 'Tencent'],
};
