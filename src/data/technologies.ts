export interface Technology {
  id: string;
  name: string;
  category: 'Core' | 'Languages' | 'Graphics & 3D' | 'AI & Systems' | 'Tools & Infrastructure';
  level: string; // e.g. "Primary Stack", "Interactive Systems", "Toolchain"
  description: string;
  orbitRing: 1 | 2 | 3;
  angleOffset: number;
  speedMultiplier: number;
  color: string;
  iconName: string;
}

export const technologies: Technology[] = [
  // Ring 1 (Inner Orbit - Core Web & Interactive)
  {
    id: 'react',
    name: 'React',
    category: 'Core',
    level: 'Primary UI Framework',
    description: 'Used in building modern modular web applications, audio players, interactive command centers, and UI state architecture.',
    orbitRing: 1,
    angleOffset: 0,
    speedMultiplier: 0.8,
    color: '#00F0FF',
    iconName: 'Atom'
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    category: 'Languages',
    level: 'Core Language',
    description: 'Used in projects for strict type safety, data modeling, algorithms, and scalable frontend architectures.',
    orbitRing: 1,
    angleOffset: Math.PI * 0.5,
    speedMultiplier: 0.8,
    color: '#38BDF8',
    iconName: 'FileCode'
  },
  {
    id: 'threejs',
    name: 'Three.js',
    category: 'Graphics & 3D',
    level: '3D Graphics & WebGL',
    description: 'Used in developing interactive 3D web scenes, geometric particle fields, lighting pipelines, and spatial simulations.',
    orbitRing: 1,
    angleOffset: Math.PI,
    speedMultiplier: 0.8,
    color: '#E2E8F0',
    iconName: 'Box'
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    category: 'Languages',
    level: 'Core Web Runtime',
    description: 'Used across interactive frontends, Web Audio APIs, Canvas 2D graphics, DOM events, and client logic.',
    orbitRing: 1,
    angleOffset: Math.PI * 1.5,
    speedMultiplier: 0.8,
    color: '#FACC15',
    iconName: 'Cpu'
  },

  // Ring 2 (Middle Orbit - Languages & Systems)
  {
    id: 'python',
    name: 'Python',
    category: 'Languages',
    level: 'Algorithms & AI',
    description: 'Used in algorithmic scripting, data processing experiments, backend prototypes, and automation tasks.',
    orbitRing: 2,
    angleOffset: Math.PI * 0.25,
    speedMultiplier: 0.55,
    color: '#60A5FA',
    iconName: 'Terminal'
  },
  {
    id: 'ai',
    name: 'AI & ML',
    category: 'AI & Systems',
    level: 'Applied AI & Search',
    description: 'Used in heuristic search models (A* pathfinding), intelligent bot behaviors, neural visualizations, and automated tooling.',
    orbitRing: 2,
    angleOffset: Math.PI * 0.75,
    speedMultiplier: 0.55,
    color: '#A855F7',
    iconName: 'Sparkles'
  },
  {
    id: 'nodejs',
    name: 'Node.js',
    category: 'Core',
    level: 'Backend Runtime',
    description: 'Used in building lightweight API endpoints, development tooling, WebSocket servers, and automation scripts.',
    orbitRing: 2,
    angleOffset: Math.PI * 1.25,
    speedMultiplier: 0.55,
    color: '#22C55E',
    iconName: 'Server'
  },
  {
    id: 'apis',
    name: 'APIs & Web APIs',
    category: 'AI & Systems',
    level: 'Integration & Protocols',
    description: 'Used in connecting REST APIs, Web Audio API context streams, WebSockets, and third-party data services.',
    orbitRing: 2,
    angleOffset: Math.PI * 1.75,
    speedMultiplier: 0.55,
    color: '#F97316',
    iconName: 'Radio'
  },

  // Ring 3 (Outer Orbit - Tools & Foundations)
  {
    id: 'git',
    name: 'Git',
    category: 'Tools & Infrastructure',
    level: 'Version Control',
    description: 'Used in managing source code versioning, repository branching workflows, and collaboration history.',
    orbitRing: 3,
    angleOffset: Math.PI * 0.1,
    speedMultiplier: 0.35,
    color: '#FB7185',
    iconName: 'GitBranch'
  },
  {
    id: 'github',
    name: 'GitHub',
    category: 'Tools & Infrastructure',
    level: 'Source Hosting & CI',
    description: 'Used for hosting project repositories, sharing open-source code, issue tracking, and deployment pipelines.',
    orbitRing: 3,
    angleOffset: Math.PI * 0.6,
    speedMultiplier: 0.35,
    color: '#E2E8F0',
    iconName: 'Github'
  },
  {
    id: 'html',
    name: 'HTML5',
    category: 'Core',
    level: 'Semantic Markup',
    description: 'Used in structuring accessible web documents, Canvas render surfaces, SEO tags, and modern web layouts.',
    orbitRing: 3,
    angleOffset: Math.PI * 1.1,
    speedMultiplier: 0.35,
    color: '#EA580C',
    iconName: 'Code'
  },
  {
    id: 'css',
    name: 'CSS3 / Tailwind',
    category: 'Core',
    level: 'Design & Motion',
    description: 'Used in crafting responsive layouts, design systems, glassmorphic visual treatments, transitions, and animations.',
    orbitRing: 3,
    angleOffset: Math.PI * 1.6,
    speedMultiplier: 0.35,
    color: '#38BDF8',
    iconName: 'Layers'
  }
];
