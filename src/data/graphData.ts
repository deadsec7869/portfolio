export type CapabilityCategory =
  | 'identity'
  | 'frontend'
  | 'ai'
  | 'graphics'
  | 'language'
  | 'tools';

export type NodeType = 'central' | 'domain' | 'tech';

export interface CapabilityNode {
  id: string;
  label: string;
  type: NodeType;
  category: CapabilityCategory;
  importance: number; // 1 to 3
  position: [number, number, number]; // 3D coordinates
  description: string;
  role?: string;
  usedInProjects: {
    name: string;
    url?: string;
    github?: string;
  }[];
  connections: string[]; // Connected node IDs
  tag?: string;
}

export interface CapabilityEdge {
  source: string;
  target: string;
  weight: 'primary' | 'secondary';
}

export const CAPABILITY_NODES: CapabilityNode[] = [
  // CENTRAL IDENTITY ROOT
  {
    id: 'tamim',
    label: 'TAMIM',
    type: 'central',
    category: 'identity',
    importance: 3,
    position: [0, 0, 0],
    description: 'Engineering student, developer, and builder specializing in modern TypeScript architectures, interactive 3D web systems, and applied AI heuristics.',
    role: 'Full-Stack Architecture & 3D Interactive Engineering',
    usedInProjects: [
      { name: 'AI Robot Command Center', url: 'https://ai-robot-command-center.vercel.app', github: 'https://github.com/deadsec7869/AI-Robot-Command-Center' },
      { name: 'AApesh Spatial Workstation', github: 'https://github.com/deadsec7869/AApesh' },
      { name: 'VTU Study Companion', url: 'https://vtu-study-app-tau.vercel.app', github: 'https://github.com/deadsec7869/vtu-study-app' },
    ],
    connections: ['domain-web', 'domain-ai', 'domain-3d', 'domain-lang', 'domain-tools'],
    tag: 'SYSTEM ROOT'
  },

  // DOMAIN 1: WEB SYSTEMS
  {
    id: 'domain-web',
    label: 'WEB SYSTEMS',
    type: 'domain',
    category: 'frontend',
    importance: 2.5,
    position: [-2.6, 1.3, 0.4],
    description: 'Modern component architectures, reactive state engines, strict TypeScript lifecycles, and high-performance client rendering.',
    role: 'Frontend Systems & Component Architecture',
    usedInProjects: [
      { name: 'AI Robot Command Center', url: 'https://ai-robot-command-center.vercel.app' },
      { name: 'AApesh', github: 'https://github.com/deadsec7869/AApesh' },
      { name: 'VTU Study Companion', url: 'https://vtu-study-app-tau.vercel.app' }
    ],
    connections: ['tamim', 'react', 'nextjs', 'tailwind'],
    tag: 'DOMAIN 01'
  },

  // DOMAIN 2: AI & HEURISTICS
  {
    id: 'domain-ai',
    label: 'AI & HEURISTICS',
    type: 'domain',
    category: 'ai',
    importance: 2.5,
    position: [2.5, 1.4, -0.6],
    description: 'Algorithmic state-space search, heuristic pathfinding, collision conflict matrices, and large language model SDK integration.',
    role: 'Heuristic Algorithms & GenAI Engineering',
    usedInProjects: [
      { name: 'AI Robot Command Center', url: 'https://ai-robot-command-center.vercel.app' },
      { name: 'VTU Study Companion', url: 'https://vtu-study-app-tau.vercel.app' }
    ],
    connections: ['tamim', 'astar', 'genai', 'conflict-detect'],
    tag: 'DOMAIN 02'
  },

  // DOMAIN 3: 3D & SPATIAL
  {
    id: 'domain-3d',
    label: '3D & SPATIAL',
    type: 'domain',
    category: 'graphics',
    importance: 2.5,
    position: [0.3, -2.3, 0.8],
    description: 'Interactive WebGL scenes, procedural geometry, hardware-accelerated shaders, camera rigs, and Web Audio API spatial synthesis.',
    role: 'WebGL Rendering & Spatial Interfaces',
    usedInProjects: [
      { name: 'AApesh', github: 'https://github.com/deadsec7869/AApesh' },
      { name: 'Tamim Portfolio', github: 'https://github.com/deadsec7869/portfolio' }
    ],
    connections: ['tamim', 'threejs', 'r3f', 'webaudio'],
    tag: 'DOMAIN 03'
  },

  // DOMAIN 4: LANGUAGES
  {
    id: 'domain-lang',
    label: 'LANGUAGES',
    type: 'domain',
    category: 'language',
    importance: 2.5,
    position: [-2.4, -1.5, -0.7],
    description: 'Strict typing standards, modern ECMAScript idioms, functional data pipelines, and algorithmic scripting.',
    role: 'Core Language Competency',
    usedInProjects: [
      { name: 'AI Robot Command Center' },
      { name: 'AApesh' },
      { name: 'VTU Study Companion' }
    ],
    connections: ['tamim', 'typescript', 'javascript', 'python'],
    tag: 'DOMAIN 04'
  },

  // DOMAIN 5: TOOLCHAINS & INFRA
  {
    id: 'domain-tools',
    label: 'TOOLCHAINS & INFRA',
    type: 'domain',
    category: 'tools',
    importance: 2.5,
    position: [2.5, -1.6, 0.5],
    description: 'High-speed build bundlers, continuous integration, version control workflows, and serverless edge deployment.',
    role: 'Build Pipelines & Delivery',
    usedInProjects: [
      { name: 'AI Robot Command Center' },
      { name: 'VTU Study Companion' },
      { name: 'AApesh' }
    ],
    connections: ['tamim', 'vite', 'git-github', 'vercel-edge'],
    tag: 'DOMAIN 05'
  },

  // ===================== TECHNOLOGY NODES =====================

  // Web Systems techs
  {
    id: 'react',
    label: 'React 19',
    type: 'tech',
    category: 'frontend',
    importance: 2,
    position: [-3.8, 2.3, 0.7],
    description: 'Building modern modular component trees, concurrent hooks, UI state architecture, and hardware-accelerated interactive panels.',
    role: 'Primary UI Framework',
    usedInProjects: [
      { name: 'AI Robot Command Center', url: 'https://ai-robot-command-center.vercel.app' },
      { name: 'AApesh', github: 'https://github.com/deadsec7869/AApesh' },
      { name: 'Tamim Portfolio' }
    ],
    connections: ['domain-web', 'typescript', 'nextjs', 'r3f']
  },
  {
    id: 'nextjs',
    label: 'Next.js 16',
    type: 'tech',
    category: 'frontend',
    importance: 1.8,
    position: [-3.9, 0.3, 0.1],
    description: 'Full-stack React framework utilizing App Router architecture, server-side data fetching, and edge runtime optimizations.',
    role: 'Production Web Framework',
    usedInProjects: [
      { name: 'VTU Study Companion', url: 'https://vtu-study-app-tau.vercel.app' }
    ],
    connections: ['domain-web', 'react', 'vercel-edge']
  },
  {
    id: 'tailwind',
    label: 'Tailwind CSS',
    type: 'tech',
    category: 'frontend',
    importance: 1.6,
    position: [-1.8, 2.6, 0.9],
    description: 'Utility-first styling system used with custom CSS design tokens, editorial typography scales, and fluid responsive layouts.',
    role: 'Design System & Utility Layer',
    usedInProjects: [
      { name: 'AI Robot Command Center' },
      { name: 'VTU Study Companion' },
      { name: 'Tamim Portfolio' }
    ],
    connections: ['domain-web', 'react']
  },

  // AI & Heuristics techs
  {
    id: 'astar',
    label: 'A* Pathfinding',
    type: 'tech',
    category: 'ai',
    importance: 2,
    position: [3.8, 2.4, -0.4],
    description: 'Deterministic heuristic grid search for real-time robotic navigation, shortest trajectory computation, and dynamic obstacle rerouting.',
    role: 'Autonomous Navigation Algorithm',
    usedInProjects: [
      { name: 'AI Robot Command Center', url: 'https://ai-robot-command-center.vercel.app' }
    ],
    connections: ['domain-ai', 'conflict-detect', 'typescript']
  },
  {
    id: 'genai',
    label: 'Google GenAI SDK',
    type: 'tech',
    category: 'ai',
    importance: 1.8,
    position: [3.9, 0.4, -0.9],
    description: 'Direct integration of Google GenAI SDK (@google/genai) for prompt synthesis, curriculum reasoning, and dynamic knowledge generation.',
    role: 'Generative AI Integration',
    usedInProjects: [
      { name: 'VTU Study Companion', url: 'https://vtu-study-app-tau.vercel.app' }
    ],
    connections: ['domain-ai', 'nextjs']
  },
  {
    id: 'conflict-detect',
    label: 'Conflict Matrices',
    type: 'tech',
    category: 'ai',
    importance: 1.6,
    position: [2.0, 2.7, -0.8],
    description: 'Space-time trajectory prediction and dynamic AGV collision avoidance logic across dynamic 2D warehouse sectors.',
    role: 'Autonomous Fleet Telemetry',
    usedInProjects: [
      { name: 'AI Robot Command Center' }
    ],
    connections: ['domain-ai', 'astar']
  },

  // 3D & Spatial techs
  {
    id: 'threejs',
    label: 'Three.js',
    type: 'tech',
    category: 'graphics',
    importance: 2,
    position: [0.6, -3.7, 1.2],
    description: 'WebGL graphics engine used to build 3D viewports, custom particle fields, procedural geometries, and physical materials.',
    role: '3D WebGL Rendering Core',
    usedInProjects: [
      { name: 'AApesh', github: 'https://github.com/deadsec7869/AApesh' },
      { name: 'Tamim Portfolio' }
    ],
    connections: ['domain-3d', 'r3f', 'webaudio']
  },
  {
    id: 'r3f',
    label: 'React Three Fiber',
    type: 'tech',
    category: 'graphics',
    importance: 1.9,
    position: [-1.0, -3.5, 0.7],
    description: 'Declarative React renderer for Three.js, coordinating canvas lifecycles, spring physics, and interactive 3D pointer events.',
    role: 'Declarative 3D Architecture',
    usedInProjects: [
      { name: 'Tamim Portfolio' }
    ],
    connections: ['domain-3d', 'threejs', 'react']
  },
  {
    id: 'webaudio',
    label: 'Web Audio API / DSP',
    type: 'tech',
    category: 'graphics',
    importance: 1.7,
    position: [1.9, -3.3, 0.9],
    description: 'AudioContext DSP graph with 10-band biquad equalizer filters, real-time FFT frequency spectrum analysis, and stereo PCM decoding.',
    role: 'Real-time Audio Processing',
    usedInProjects: [
      { name: 'AApesh', github: 'https://github.com/deadsec7869/AApesh' }
    ],
    connections: ['domain-3d', 'threejs']
  },

  // Languages techs
  {
    id: 'typescript',
    label: 'TypeScript',
    type: 'tech',
    category: 'language',
    importance: 2.2,
    position: [-3.7, -2.4, -1.2],
    description: 'Primary language across all production software for strict type safety, data modeling, algorithm correctness, and component props.',
    role: 'Primary Language Standard',
    usedInProjects: [
      { name: 'AI Robot Command Center' },
      { name: 'AApesh' },
      { name: 'VTU Study Companion' },
      { name: 'Tamim Portfolio' }
    ],
    connections: ['domain-lang', 'react', 'nextjs', 'astar', 'javascript']
  },
  {
    id: 'javascript',
    label: 'JavaScript (ESNext)',
    type: 'tech',
    category: 'language',
    importance: 1.7,
    position: [-3.4, -0.6, -0.5],
    description: 'Modern ECMAScript asynchronous patterns, Web APIs, DOM events, and Canvas/WebGL graphics pipelines.',
    role: 'Core Web Runtime',
    usedInProjects: [
      { name: 'AI Robot Command Center' },
      { name: 'AApesh' }
    ],
    connections: ['domain-lang', 'typescript']
  },
  {
    id: 'python',
    label: 'Python',
    type: 'tech',
    category: 'language',
    importance: 1.7,
    position: [-1.4, -2.7, -1.1],
    description: 'Algorithmic scripting, data processing logic, backend prototypes, and computational problem solving.',
    role: 'Computational Scripting',
    usedInProjects: [
      { name: 'Open Source Algorithms' }
    ],
    connections: ['domain-lang']
  },

  // Toolchains techs
  {
    id: 'vite',
    label: 'Vite',
    type: 'tech',
    category: 'tools',
    importance: 1.8,
    position: [3.8, -2.6, 0.4],
    description: 'Next-generation frontend tooling providing lightning-fast ESM hot module replacement and optimized Rollup production builds.',
    role: 'Primary Development Bundler',
    usedInProjects: [
      { name: 'AI Robot Command Center' },
      { name: 'Tamim Portfolio' }
    ],
    connections: ['domain-tools', 'react', 'typescript']
  },
  {
    id: 'git-github',
    label: 'Git & GitHub',
    type: 'tech',
    category: 'tools',
    importance: 1.9,
    position: [3.6, -0.7, 0.6],
    description: 'Distributed version control, public open-source repository management, branching workflows, and commit telemetry.',
    role: 'Version Control & Hosting',
    usedInProjects: [
      { name: 'All Repositories', github: 'https://github.com/deadsec7869' }
    ],
    connections: ['domain-tools', 'vercel-edge']
  },
  {
    id: 'vercel-edge',
    label: 'Vercel Edge',
    type: 'tech',
    category: 'tools',
    importance: 1.7,
    position: [1.8, -2.8, 0.3],
    description: 'Serverless edge computing and global CDN deployment for sub-50ms worldwide asset delivery and automated CI/CD builds.',
    role: 'Edge Deployment Platform',
    usedInProjects: [
      { name: 'AI Robot Command Center' },
      { name: 'VTU Study Companion' }
    ],
    connections: ['domain-tools', 'nextjs', 'git-github']
  }
];

// Build unique deduplicated edges list from connections
export function getCapabilityEdges(): CapabilityEdge[] {
  const edges: CapabilityEdge[] = [];
  const edgeSet = new Set<string>();

  for (const node of CAPABILITY_NODES) {
    for (const targetId of node.connections) {
      const pairKey = [node.id, targetId].sort().join('--');
      if (!edgeSet.has(pairKey)) {
        edgeSet.add(pairKey);
        const targetNode = CAPABILITY_NODES.find((n) => n.id === targetId);
        if (targetNode) {
          const isPrimary =
            node.type === 'central' ||
            targetNode.type === 'central' ||
            (node.type === 'domain' && targetNode.type === 'tech') ||
            (node.type === 'tech' && targetNode.type === 'domain');
          edges.push({
            source: node.id,
            target: targetId,
            weight: isPrimary ? 'primary' : 'secondary',
          });
        }
      }
    }
  }

  return edges;
}

export const CAPABILITY_EDGES = getCapabilityEdges();
