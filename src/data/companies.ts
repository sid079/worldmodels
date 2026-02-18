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
    id: 'decart',
    overview: {
      id: 'decart',
      name: 'Decart',
      founded: '2023',
      hq: 'Tel Aviv',
      funding: '$153M',
      valuation: 'Undisclosed',
      teamSize: '~20',
      keyFounders: 'Ido Hakimi, Yonatan Sharvit',
      stage: 'pre-revenue',
      category: 'adjacent',
    },
    product: {
      productNames: ['Oasis'],
      coreCapability: 'Real-time interactive world generation. 1M users in 72 hours.',
      inputModalities: ['Text', 'Image', 'Game actions'],
      outputFormat: ['Interactive worlds', 'Real-time streaming'],
      keyDifferentiator: 'Fastest viral adoption in world models. Burns <$10M of $153M raised.',
      targetVerticals: ['Gaming', 'Consumer'],
      accessModel: 'Consumer app / API',
    },
    pricing: {
      model: 'Consumer + API (planned)',
      consumerTiers: 'Free access',
      apiPricing: 'None yet',
      enterprise: 'Planned',
      commercialRights: 'Unknown',
      revenueStage: 'Pre-Revenue',
    },
    technology: {
      architectureType: 'Real-time interactive world model',
      trainingDataStrategy: 'Proprietary / User interaction data',
      modelSize: 'Undisclosed',
      outputQuality: 'Real-time interactive',
      openSource: 'No',
      keyTechnicalInnovation: 'Consumer-scale real-time world generation. Viral distribution loop.',
      category: 'interactive-streaming',
    },
    gtm: {
      growthModel: 'Consumer viral / PLG',
      distributionChannels: ['Consumer app', 'Web'],
      keyPartnerships: ['Sequoia', 'a16z'],
      bdSalesTeam: 'Early',
      community: ['1M+ users'],
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

export const heroStats = [
  { label: 'Capital deployed (12mo)', value: '$3.4B+' },
  { label: 'World model startups founded (2024-25)', value: '15+' },
  { label: 'Open-source model downloads', value: '5M+' },
  { label: 'Adjacent TAM (Digital Twins, 2030)', value: '$150B' },
  { label: 'Spatial AI market CAGR (2025-30)', value: '~40%' },
];

export const thesisPillars = [
  {
    title: 'The GPT-3 Moment for Spatial AI',
    stat: '39%',
    statLabel: 'US adult GenAI adoption in 2 yrs',
    thesis: 'LLMs taught machines to read and write. World models teach them to see and build.',
    bullets: [
      { highlight: 'World Labs', text: 'Founding → unicorn in 4 months, raising at $5B' },
      { highlight: 'AMI Labs', text: '€3B pre-product — largest pre-launch raise in AI history' },
      { highlight: 'Runway', text: '~$90M ARR, multi-year Adobe partnership' },
      { highlight: 'Allocators', text: 'a16z, Sequoia, NEA, General Atlantic, Khosla' },
    ],
  },
  {
    title: 'Two Architectures Splitting the Market',
    stat: '2',
    statLabel: 'paradigms, different economics',
    thesis: 'Different customers, different moats. Understanding this split is essential.',
    bullets: [
      { highlight: 'Exportable 3D', text: 'World Labs, SpAItial — meshes → Unity/Unreal/Blender' },
      { highlight: 'Real-time Sim', text: 'Odyssey, Genie 3, Runway — 20-24 FPS interactive streams' },
      { highlight: 'JEPA', text: 'AMI Labs — bets the autoregressive approach is wrong entirely' },
    ],
  },
  {
    title: 'Foundation Layer Commoditizes by Late 2027',
    stat: '~24mo',
    statLabel: 'historical time-to-commodity',
    thesis: 'Durable value = proprietary data + workflow integration + vertical expertise. Not model params.',
    bullets: [
      { highlight: 'NVIDIA Cosmos', text: 'Free, 2M+ downloads' },
      { highlight: 'Tencent', text: 'Open-source, 3M+ HuggingFace downloads' },
      { highlight: 'Meta', text: 'V-JEPA 2 under MIT license' },
      { highlight: 'Precedent', text: 'Midjourney ($500M rev, 0 funding) > Stability AI ($225M raised, nearly collapsed)' },
    ],
  },
];

export const rightToWinMoats = [
  {
    icon: '◆',
    type: 'PROPRIETARY DATA',
    definition: 'Training data that cannot be scraped, licensed, or replicated.',
    companies: ['General Intuition', 'Odyssey', 'NVIDIA'],
    details: ['3.8B action-labeled gaming clips', '360° camera rigs', '20M hours curated'],
  },
  {
    icon: '◆',
    type: 'WORKFLOW LOCK-IN',
    definition: 'Deep integration into tools professionals already use daily.',
    companies: ['Runway', 'World Labs'],
    details: ['Adobe Premiere/Firefly partnership', 'Unity/Unreal/Blender export'],
  },
  {
    icon: '◆',
    type: 'DISTRIBUTION AT SCALE',
    definition: 'Can you reach 100K users in your first quarter?',
    companies: ['World Labs', 'NVIDIA Cosmos', 'Runway'],
    details: ['120K accounts, 8 weeks', '2M+ downloads, open source', '300K+ customers'],
  },
  {
    icon: '◆',
    type: 'TALENT DENSITY',
    definition: 'Concentration of foundational researchers who invented the underlying tech.',
    companies: ['World Labs', 'AMI Labs', 'SpAItial'],
    details: ['Fei-Fei Li, NeRF inventor', 'Yann LeCun, Turing Award', 'Matthias Niessner, Stable Diffusion angel'],
  },
  {
    icon: '◆',
    type: 'REGULATORY MOAT',
    definition: 'Geographic or compliance advantages that create structural barriers.',
    companies: ['SpAItial', 'AMI Labs'],
    details: ['EU AI Act native, Munich', 'Paris, €109B French AI commitment'],
  },
];

export const playerArchetypes = [
  {
    company: 'World Labs',
    archetype: 'First-Mover Platform',
    signal: '$5B valuation talks, 120K accounts',
    thesis:
      'Strongest brand and broadest positioning, but only ~43 employees and no BD/sales hires. The Adobe-Runway partnership model is the template World Labs needs to replicate with a major game engine or VFX studio.',
  },
  {
    company: 'Odyssey',
    archetype: 'Developer Infrastructure',
    signal: 'Proprietary 360° data capture, Ex-Cruise/Wayve DNA',
    thesis:
      'Oliver Cameron (ex-Cruise VP) and Jeff Hawke (ex-Wayve) bring autonomous vehicle perception DNA. At $27M raised, Odyssey is leaner but its proprietary data capture creates a genuine moat. Critical gap: pre-revenue with an API only weeks old.',
  },
  {
    company: 'Runway',
    archetype: 'GTM-Mature Category Leader',
    signal: '~$90M ARR, Adobe partnership, $5.3B valuation',
    thesis:
      'The revenue benchmark. $860M raised, GWM-1 launch extends into world models. Risk: world model capabilities are incremental extensions of video generation rather than architecturally native to 3D.',
  },
  {
    company: 'SpAItial',
    archetype: 'European Deep-Tech Contender',
    signal: 'Synthesia playbook, Matthias Niessner, $13M seed',
    thesis:
      'Follows the Synthesia playbook: academic research at TU Munich → deep-tech startup → category leader. Spatial foundation model operates natively on 3D structures. The angel investor roster — Robin Rombach, Jon Barron — reads like a spatial AI hall of fame.',
  },
  {
    company: 'AMI Labs',
    archetype: 'Anti-LLM Philosophical Bet',
    signal: 'JEPA architecture, €3B pre-product, Turing Award founder',
    thesis:
      "The highest-risk, highest-conviction play. If JEPA delivers robust controllability and physical understanding, AMI captures robotics, healthcare, and industrial verticals where LLM-style hallucinations are disqualifying. If it doesn't, €3B on a pre-product thesis.",
  },
  {
    company: 'NVIDIA Cosmos',
    archetype: 'Open-Source Commoditizer',
    signal: 'Free models → GPU revenue, 2M+ downloads',
    thesis:
      "NVIDIA's strategy is elegant: give away foundation models for free, then monetize via GPU sales and DGX Cloud. Cosmos (2B-14B params, 9,000T tokens) with Apache 2.0 licensing validates the market while compressing the differentiation timeline for every startup in the space.",
  },
  {
    company: 'Tencent',
    archetype: 'Open-Source Commoditizer',
    signal: '3M+ HuggingFace downloads, triple distribution',
    thesis:
      "Tencent's triple distribution — open source + Tencent Cloud API + consumer web — is the most aggressive go-to-market in the space. Hunyuan3D with PBR materials, Unity China and Bambu Lab partnerships, and 150+ enterprise customers in China. A commoditizer that's already monetizing.",
  },
  {
    company: 'General Intuition',
    archetype: 'Data-Moat Specialist',
    signal: '3.8B gaming clips, OpenAI offered $500M for data',
    thesis:
      "GI's 3.8B action-labeled gaming clips from Medal are irreplaceable — OpenAI reportedly offered $500M for the dataset. The DIAMOND world model architecture combined with this unique training data creates a moat that no amount of compute can replicate. Public Benefit Corporation launching H1 2026.",
  },
  {
    company: 'Decart',
    archetype: 'Viral Consumer Specialist',
    signal: '1M users in 72hrs with Oasis, $153M raised',
    thesis:
      "Decart generated 1M users in 72 hours with Oasis — the fastest viral adoption in world model history — and burns less than $10M of its $153M raised. Proves that consumer-facing world model products can achieve explosive distribution. Unique data from user interactions may matter more than model architecture.",
  },
];

export const strategicTimeline = [
  {
    when: 'Now (Q1 2026)',
    milestone: 'APIs launching, $3.4B deployed',
    detail: 'World Labs Jan 21, Odyssey Jan 23',
    implication: 'The starting gun has fired. Commercial execution begins now.',
  },
  {
    when: 'End of 2026',
    milestone: 'Product-market fit or bust',
    detail: '1 enterprise customer, $1-5M ARR, 1M+ proprietary examples',
    implication: 'Product-market fit must be proven. No more "research-stage" positioning.',
  },
  {
    when: 'End of 2027',
    milestone: 'Foundation models commoditize',
    detail: 'Open-source catches up',
    implication: '$10-30M ARR with 120%+ NRR, or you\'re competing on price against free.',
  },
  {
    when: '2028+',
    milestone: 'Platform consolidation',
    detail: 'Snowflake-scale outcomes for workflow owners',
    implication: 'The companies that own specific verticals (VFX, gaming, robotics sim) build $1B+ businesses above the commodity model layer.',
  },
];

export const marketCategories = {
  'Pure-Play Startups (Interview Targets)': ['World Labs', 'Odyssey', 'SpAItial'],
  'Pure-Play Startups (Adjacent)': ['Runway', 'AMI Labs', 'General Intuition', 'Decart', 'Iconic AI', 'Lucid'],
  'Big Tech / Platform': ['NVIDIA Cosmos', 'Google DeepMind Genie 3', 'Meta', 'Tencent'],
};
