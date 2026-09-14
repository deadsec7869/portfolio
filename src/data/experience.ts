export interface ExperienceItem {
  id: string;
  period: string;
  role: string;
  organization: string;
  type: string;
  location: string;
  description: string;
  highlights: string[];
  technologies: string[];
  metrics?: string;
}

export const experiences: ExperienceItem[] = [
  {
    id: 'exp-1',
    period: '2024 — PRESENT',
    role: 'Full-Stack Systems & AI Developer',
    organization: 'Independent Engineering & Open Source',
    type: 'SYSTEMS ARCHITECTURE',
    location: 'Remote',
    description: 'Designing and engineering high-throughput software architectures, conversational AI command centers, and real-time interactive computational interfaces.',
    highlights: [
      'Architected AI Robot Command Center integrating WebSockets, real-time telemetry streaming, and deterministic control loops.',
      'Constructed modular web platforms using React, TypeScript, and Three.js/R3F with strict mathematical coordinate systems and 60fps performance budgets.',
      'Authored automated data processing and API pipelines connecting local inference engines with distributed cloud storage.'
    ],
    technologies: ['TypeScript', 'React', 'Three.js / R3F', 'Node.js', 'Python', 'WebSockets', 'Tailwind CSS'],
    metrics: 'Sub-50ms Latency · 60fps WebGL'
  },
  {
    id: 'exp-2',
    period: '2023 — 2024',
    role: 'Student Software Engineer & System Developer',
    organization: 'Academic & Institutional Projects',
    type: 'ENGINEERING & TOOLING',
    location: 'Bengaluru / VTU',
    description: 'Engineered student utility ecosystems and academic infrastructure tools serving high-density student query traffic with structured syllabus indexing.',
    highlights: [
      'Engineered VTU Study Companion, providing structured curriculum search, modular study material pipelines, and algorithmic question bank analysis.',
      'Implemented responsive client-side caching reducing database roundtrips by 65% for high-frequency syllabus requests.',
      'Formulated clean component architecture patterns and automated continuous integration workflows across peer repositories.'
    ],
    technologies: ['TypeScript', 'React', 'Node.js', 'PostgreSQL', 'Express', 'Vite', 'Git'],
    metrics: '100% Client-Side Uptime'
  },
  {
    id: 'exp-3',
    period: '2022 — 2023',
    role: 'Computational Foundations & Open Source Explorer',
    organization: 'Open Source Community & Labs',
    type: 'FOUNDATIONAL SYSTEMS',
    location: 'Remote',
    description: 'Conducted rigorous exploration of algorithms, computer graphics, state machines, and Linux systems programming.',
    highlights: [
      'Authored algorithmic solutions in Python and C/C++, focusing on graph traversals, dynamic programming, and memory layout optimization.',
      'Contributed tooling, bug fixes, and documentation across open-source JavaScript and developer utility repositories on GitHub.',
      'Built interactive micro-simulations demonstrating physics solvers, vector mathematics, and canvas rendering pipelines.'
    ],
    technologies: ['Python', 'C / C++', 'JavaScript', 'Linux / Bash', 'Data Structures', 'WebGL'],
    metrics: '50+ Algorithmic Implementations'
  }
];
