export type ProjectCategory = 'ALL' | 'AI' | 'WEB' | '3D' | 'TOOLS';

export interface Project {
  id: string;
  projectNumber: string; // e.g. "01", "02", "03"
  title: string;
  tagline: string;
  shortDescription: string;
  longDescription: string;
  category: ProjectCategory;
  year: string;
  technologies: string[];
  image: string;
  github: string;
  demo: string;
  featured: boolean;
  accentColor: string;
  features: string[];
  architecture: {
    frontend?: string;
    backend?: string;
    algorithms?: string;
    rendering?: string;
    dataPipeline?: string;
  };
  challenges: string[];
  result: string;
  metrics?: {
    label: string;
    value: string;
  }[];
}

export const projects: Project[] = [
  {
    id: 'ai-robot-command-center',
    projectNumber: '01',
    title: 'AI ROBOT COMMAND CENTER',
    tagline: 'Autonomous Robotics Simulation & Intelligent Fleet Management',
    shortDescription: 'Autonomous robotics simulation platform featuring real-time AGV telemetry, space-time conflict detection, and dynamic A* pathfinding across 2D industrial environments.',
    longDescription: 'A software-based autonomous robotics simulation and fleet management system. Built with React 19, TypeScript, and Vite, the platform simulates real-time automated guided vehicles (AGVs) navigating dynamic industrial environments. Features heuristic A* pathfinding, space-time conflict detection, dynamic collision avoidance, and deterministic multi-factor fleet task allocation.',
    category: 'AI',
    year: '2026',
    technologies: [
      'React 19',
      'TypeScript',
      'Tailwind CSS',
      'Vite',
      'A* Pathfinding',
      'Collision Avoidance',
      'Fleet Telemetry'
    ],
    image: '/projects/robot-command.png',
    github: 'https://github.com/deadsec7869/AI-Robot-Command-Center',
    demo: 'https://ai-robot-command-center.vercel.app',
    featured: true,
    accentColor: '#5E5E5A',
    metrics: [
      { label: 'Primary Language', value: 'TypeScript' },
      { label: 'Algorithm', value: 'A* Pathfinding' },
      { label: 'UI Framework', value: 'React 19 + Vite' }
    ],
    features: [
      'Interactive 2D industrial warehouse grid with dynamic obstacle configuration',
      'Heuristic A* pathfinding with real-time route calculation and obstacle rerouting',
      'Space-time conflict detection and dynamic collision avoidance for AGV units',
      'Deterministic multi-factor task allocation and live rover telemetry inspection'
    ],
    architecture: {
      frontend: 'React 19 + TypeScript + Tailwind CSS 4.0 + Lucide Icons',
      algorithms: 'Heuristic A* Grid Search with Conflict Resolution Matrix',
      rendering: 'Hardware-accelerated CSS Grid with Micro-Transitions',
      dataPipeline: 'Reactive State Architecture for Real-Time AGV Coordinates'
    },
    challenges: [
      'Computing collision-free trajectories for simulated AGVs while allowing dynamic obstacle placement without UI thread frame drops.',
      'Structuring an authentic, high-contrast industrial aerospace cockpit interface responsive across varying viewport resolutions.'
    ],
    result: 'Delivered an interactive autonomous robotics cockpit simulating real-time pathfinding and fleet telemetry with zero UI stutter.'
  },
  {
    id: 'aapesh',
    projectNumber: '02',
    title: 'AAPESH',
    tagline: 'Desktop-First Spatial Music Workstation & 3D Environment',
    shortDescription: 'Desktop-first web music workstation with a deep liquid-glass aesthetic, persistent 3D WebGL spatial backdrop, synchronized karaoke lyrics, 10-band equalizer, and YouTube Music streaming.',
    longDescription: 'An open-source desktop web music streaming workstation combining a charcoal liquid-glass aesthetic with a persistent Three.js 3D spatial environment. Includes synchronized line-by-line karaoke lyrics, a 10-band pro graphic equalizer, dynamic album artwork color extraction, and high-fidelity YouTube Music streaming.',
    category: '3D',
    year: '2026',
    technologies: [
      'React',
      'TypeScript',
      'Three.js',
      'GSAP',
      'Motion',
      'Web Audio API',
      'YTMusic API'
    ],
    image: '/projects/music-player.png',
    github: 'https://github.com/deadsec7869/AApesh',
    demo: '', // No live demo URL hosted yet; renders VIEW SOURCE only
    featured: true,
    accentColor: '#5E5E5A',
    metrics: [
      { label: 'Primary Stack', value: 'React + Three.js' },
      { label: 'Animation Engine', value: 'GSAP + Motion' },
      { label: 'Audio Engine', value: 'Web Audio API' }
    ],
    features: [
      'Translucent spatial 3D backdrop with dynamic dual-radial aura glows mapped to song palettes',
      'Real-time synchronized line-by-line karaoke lyric stream with fluid spring transitions',
      'Pro 10-band graphic equalizer with interactive decibel sliders and preset curves',
      'YouTube Music API catalog search, queue management, and high-fidelity audio streaming'
    ],
    architecture: {
      frontend: 'React + TypeScript + GSAP 3.15 + Motion 13.2',
      rendering: 'Persistent Three.js WebGL Layer + Liquid Glass Backdrop Filters',
      dataPipeline: 'Web Audio API AudioContext with 10-band BiquadFilter frequency graph'
    },
    challenges: [
      'Synchronizing 60 FPS Three.js spatial background effects with real-time Web Audio API frequency processing and lyric animations.',
      'Managing single-source-of-truth track state across complex multi-panel desktop workstation views.'
    ],
    result: 'Engineered an audio workstation interface that elevates web music playback into a tactile, cinematic 3D experience.'
  },
  {
    id: 'vtu-study-app',
    projectNumber: '03',
    title: 'VTU STUDY COMPANION',
    tagline: 'AI-Assisted Academic Platform & Engineering Portal',
    shortDescription: 'An academic study companion for VTU engineering students built with Next.js 16 and Google GenAI SDK, providing generative academic guidance and syllabus resources.',
    longDescription: 'An AI-powered academic companion and curriculum portal built specifically for VTU engineering students. Powered by Next.js 16, React 19, TypeScript, Tailwind CSS, and the Google GenAI SDK (@google/genai), it provides intelligent study assistance, subject breakdown, and accessible academic reference materials.',
    category: 'WEB',
    year: '2026',
    technologies: [
      'Next.js 16',
      'React 19',
      'TypeScript',
      'Google GenAI SDK',
      'Tailwind CSS',
      'Vercel'
    ],
    image: '/projects/vtu-study.png',
    github: 'https://github.com/deadsec7869/vtu-study-app',
    demo: 'https://vtu-study-app-tau.vercel.app',
    featured: true,
    accentColor: '#5E5E5A',
    metrics: [
      { label: 'Framework', value: 'Next.js 16 App Router' },
      { label: 'AI SDK', value: 'Google GenAI SDK' },
      { label: 'Deployment', value: 'Vercel Edge' }
    ],
    features: [
      'GenAI-powered engineering question explanations and topic summaries using Google GenAI SDK',
      'Structured semester and branch syllabus navigator tailored for VTU curriculum',
      'Fast responsive Next.js 16 App Router architecture with Tailwind CSS styling',
      'Live deployment on Vercel with automated build workflows'
    ],
    architecture: {
      frontend: 'Next.js 16 + React 19 + TypeScript + Tailwind CSS 4.0',
      backend: 'Google GenAI SDK Integration (@google/genai)',
      dataPipeline: 'Edge-rendered static syllabus indexing and dynamic query synthesis'
    },
    challenges: [
      'Configuring real-time AI responses with minimal latency while preserving syllabus accuracy.',
      'Building a clean responsive curriculum tree supporting multiple engineering engineering branches.'
    ],
    result: 'Published an academic assistant platform deployed globally to assist VTU students with syllabus discovery and topic breakdown.'
  }
];

export const projectCategories: ProjectCategory[] = ['ALL', 'AI', 'WEB', '3D'];
