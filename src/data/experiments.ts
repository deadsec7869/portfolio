export interface LabExperiment {
  id: string;
  code: string; // e.g. "EXPERIMENT_001"
  title: string;
  category: string;
  date: string;
  status: 'LIVE' | 'EXPERIMENTAL' | 'IN DEVELOPMENT' | 'ARCHIVED';
  description: string;
  interactiveType: 'pathfinder' | 'audio-synth' | 'neural-matrix' | 'particle-vortex';
  tags: string[];
  specs: { [key: string]: string };
  codeSnippet: string;
}

export const experiments: LabExperiment[] = [
  {
    id: 'exp-a-star-lab',
    code: 'EXPERIMENT_001',
    title: 'A* HEURISTIC PATH MATRIX',
    category: 'Spatial Algorithms',
    date: '2026.Q1',
    status: 'LIVE',
    description: 'Real-time 2D grid graph traversal evaluating Manhattan vs Euclidean heuristic costs across dynamic obstacles.',
    interactiveType: 'pathfinder',
    tags: ['A*', 'Graph Theory', 'Realtime Heuristics', 'Simulation'],
    specs: {
      'Complexity': 'O(b^d)',
      'Grid Resolution': '16x16 / 32x32',
      'Heuristic': 'Euclidean & Manhattan',
      'Update Rate': '< 2ms'
    },
    codeSnippet: `function findPath(start, goal, grid) {
  const openSet = new PriorityQueue();
  openSet.enqueue(start, 0);
  const cameFrom = new Map();
  const gScore = new Map([[start, 0]]);
  
  while (!openSet.isEmpty()) {
    const current = openSet.dequeue();
    if (current.equals(goal)) return reconstructPath(cameFrom, current);
    
    for (const neighbor of grid.getNeighbors(current)) {
      const tentativeG = gScore.get(current) + dist(current, neighbor);
      if (tentativeG < (gScore.get(neighbor) ?? Infinity)) {
        cameFrom.set(neighbor, current);
        gScore.set(neighbor, tentativeG);
        const fScore = tentativeG + heuristic(neighbor, goal);
        openSet.enqueue(neighbor, fScore);
      }
    }
  }
}`
  },
  {
    id: 'exp-fourier-synth',
    code: 'EXPERIMENT_002',
    title: 'FOURIER AUDIO HARMONIC SYNTH',
    category: 'Acoustics & Signals',
    date: '2026.Q1',
    status: 'EXPERIMENTAL',
    description: 'Additive sinusoidal synthesis computing instantaneous discrete harmonic series with real-time waveform visualization.',
    interactiveType: 'audio-synth',
    tags: ['DSP', 'Web Audio', 'Fourier Series', 'Oscillators'],
    specs: {
      'Sample Rate': '44.1 kHz',
      'Harmonics': '1 to 16 Harmonics',
      'Waveforms': 'Sine, Saw, Triangle, Square',
      'Buffer Latency': '5.3ms'
    },
    codeSnippet: `// Additive harmonic series generation
const sampleAudio = (freq, t, harmonics = 8) => {
  let amplitude = 0;
  for (let n = 1; n <= harmonics; n++) {
    const harmonicFreq = freq * n;
    const weight = 1 / n; // Harmonic attenuation
    amplitude += weight * Math.sin(2 * Math.PI * harmonicFreq * t);
  }
  return amplitude / Math.LN2;
};`
  },
  {
    id: 'exp-genai-curriculum',
    code: 'EXPERIMENT_003',
    title: 'GENAI CURRICULUM REASONER',
    category: 'Generative Intelligence',
    date: '2026.Q1',
    status: 'IN DEVELOPMENT',
    description: 'Streaming generative AI prompt schema testing for engineering syllabus explanation and concept breakdown.',
    interactiveType: 'neural-matrix',
    tags: ['GenAI', 'Google GenAI SDK', 'Prompt Engineering', 'Next.js 16'],
    specs: {
      'SDK': '@google/genai',
      'Architecture': 'Server-Side Streaming',
      'Format': 'Structured Markdown',
      'Latency Target': '< 800ms'
    },
    codeSnippet: `// GenAI engineering syllabus prompt pipeline
async function generateConceptSummary(subjectCode, topic) {
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: \`Explain \${topic} for VTU \${subjectCode} syllabus with key definitions and circuit equations.\`
  });
  return response.text;
}`
  },
  {
    id: 'exp-particle-vortex',
    code: 'EXPERIMENT_004',
    title: 'GRAVITATIONAL FIELD VORTEX',
    category: 'Physics & Compute',
    date: '2025.Q4',
    status: 'ARCHIVED',
    description: 'N-body gravitational attractor point simulation with Euler integration, dampening mechanics and kinetic trails.',
    interactiveType: 'particle-vortex',
    tags: ['Physics', 'Vector Math', 'Attractors', 'Kinematics'],
    specs: {
      'Particle Count': '1,200 Particles',
      'Attractor G': '6.674e-11',
      'Integrator': 'Velocity Verlet',
      'Frame Target': '60 FPS'
    },
    codeSnippet: `function updateParticles(particles, attractors, dt) {
  for (const p of particles) {
    let ax = 0, ay = 0;
    for (const a of attractors) {
      const dx = a.x - p.x;
      const dy = a.y - p.y;
      const distSq = dx * dx + dy * dy + 100;
      const force = (G * a.mass) / distSq;
      const dist = Math.sqrt(distSq);
      ax += force * (dx / dist);
      ay += force * (dy / dist);
    }
    p.vx = (p.vx + ax * dt) * 0.98;
    p.vy = (p.vy + ay * dt) * 0.98;
    p.x += p.vx * dt;
    p.y += p.vy * dt;
  }
}`
  }
];
