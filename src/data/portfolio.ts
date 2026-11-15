export interface Project {
  id: string;
  name: string;
  category: "AI systems" | "Web & 3D" | "Robotics";
  description: string;
  stack: string[];
  github?: string;
  visual: "security" | "music" | "city" | "study" | "robot";
  architecture: { title: string; detail: string }[];
}

export const profile = {
  name: "Muhammed Tamim Baig",
  shortName: "Tamim",
  role: "Robotics & AI Engineering Student · Full-Stack & 3D Systems Builder",
  education: "B.Tech in Robotics and Artificial Intelligence",
  institution: "Visvesvaraya Institute of Advanced Technology (VIAT) / VTU",
  campus: "Muddenahalli, Karnataka",
  years: "2024–2028",
  location: "Bengaluru / Chikkaballapur, Karnataka, India",
  email: "tamimbaig33@gmail.com",
  github: "https://github.com/deadsec7869",
};

export const projects: Project[] = [
  {
    id: "vibeguard",
    name: "VIBEGUARD",
    category: "AI systems",
    visual: "security",
    github: "https://github.com/deadsec7869/VIBEGUARD",
    description:
      "AI-assisted security testing & remediation platform with automated attack planning, Playwright browser execution, safe patching, and verification.",
    stack: ["Python", "Playwright", "FastAPI", "AI Agents"],
    architecture: [
      {
        title: "Plan",
        detail:
          "AI agents coordinate automated attack planning for security testing.",
      },
      {
        title: "Execute",
        detail: "Playwright executes browser-based testing workflows.",
      },
      {
        title: "Remediate",
        detail: "Safe patching addresses findings in the remediation workflow.",
      },
      {
        title: "Verify",
        detail: "Verification checks the result of remediation.",
      },
    ],
  },
  {
    id: "aapesh",
    name: "AAPESH",
    category: "Web & 3D",
    visual: "music",
    github: "https://github.com/deadsec7869/AApesh",
    description:
      "Open-source full-stack cinematic web music workstation with Three.js / React Three Fiber 3D audio-reactive visuals and YouTube Music integration.",
    stack: [
      "React 19",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "Framer Motion",
      "Zustand",
      "Three.js",
      "FastAPI",
      "SQLite",
    ],
    architecture: [
      {
        title: "Interface",
        detail:
          "React 19, TypeScript, Tailwind CSS, and Framer Motion compose the music workstation.",
      },
      {
        title: "State",
        detail: "Zustand supplies application state management.",
      },
      {
        title: "Visualize",
        detail:
          "Three.js and React Three Fiber power audio-reactive 3D visuals.",
      },
      {
        title: "Services",
        detail:
          "FastAPI, SQLite, and YouTube Music integration support the full-stack experience.",
      },
    ],
  },
  {
    id: "jansetu",
    name: "JANSETU AI",
    category: "AI systems",
    visual: "city",
    description:
      "Civic-technology platform for urban clean air telemetry, climate resilience, and automated municipal workflows.",
    stack: ["Next.js", "TypeScript", "FastAPI"],
    architecture: [
      {
        title: "Interface",
        detail:
          "Next.js and TypeScript provide the civic-technology web interface.",
      },
      {
        title: "Services",
        detail: "FastAPI provides the backend service layer.",
      },
      {
        title: "Civic workflows",
        detail:
          "The platform brings together clean air telemetry, climate resilience, and automated municipal workflows.",
      },
    ],
  },
  {
    id: "studyai",
    name: "StudyAI",
    category: "AI systems",
    visual: "study",
    description:
      "AI-powered educational web platform built with Next.js, Supabase, and Gemini API.",
    stack: ["Next.js", "Supabase", "Gemini API"],
    architecture: [
      {
        title: "Learn",
        detail: "Next.js delivers the educational web experience.",
      },
      {
        title: "Data",
        detail: "Supabase supplies the application backend platform.",
      },
      {
        title: "Intelligence",
        detail: "Gemini API powers the AI capabilities.",
      },
    ],
  },
  {
    id: "plastic-sorter",
    name: "AI-Powered Plastic Sorter",
    category: "Robotics",
    visual: "robot",
    description:
      "Automated waste classification robotics project built with Raspberry Pi, Arduino, computer vision, C++, and custom 3D-printed hardware (PALS INNOVA competition).",
    stack: ["Raspberry Pi", "Arduino", "Computer Vision", "C++", "3D Printing"],
    architecture: [
      {
        title: "Perception",
        detail:
          "Computer vision supports automated waste classification on Raspberry Pi.",
      },
      {
        title: "Control",
        detail: "Arduino and C++ support the embedded robotics system.",
      },
      {
        title: "Hardware",
        detail:
          "Custom 3D-printed hardware forms the physical project built for the PALS INNOVA competition.",
      },
    ],
  },
];

export const skills = [
  {
    label: "Languages",
    code: "01",
    items: [
      "Python",
      "C++",
      "TypeScript",
      "JavaScript",
      "SQL",
      "8051 Assembly",
    ],
  },
  {
    label: "Web & 3D",
    code: "02",
    items: [
      "React 19",
      "Next.js",
      "Three.js",
      "React Three Fiber",
      "FastAPI",
      "Vite",
      "Tailwind CSS",
      "Framer Motion",
      "Zustand",
      "Supabase",
      "SQLite",
    ],
  },
  {
    label: "AI & Automation",
    code: "03",
    items: ["LLM Agents", "Gemini API", "Playwright Browser Automation"],
  },
  {
    label: "Robotics & Hardware",
    code: "04",
    items: [
      "Arduino",
      "Raspberry Pi",
      "Embedded Sensors",
      "CAD / 3D Printing",
      "Proteus 8",
      "LabVIEW",
    ],
  },
];
