# Tamim portfolio — complete source

Every requested file is included in full below, followed by the supporting files. Copy each block to its labeled path. Copy public/og-image.png from the supplied workspace alongside these files.

```sh
npm install react@19.2.8 react-dom@19.2.8 three@0.186.0 @react-three/fiber@9.7.0 @react-three/drei@10.7.8 framer-motion@13.2.0 lucide-react@1.43.0 tailwindcss@4.3.3 @tailwindcss/vite@4.3.3
npm install -D typescript@6.0.2 vite@8.2.2 @vitejs/plugin-react@6.1.0 @types/react@19.2.18 @types/react-dom@19.2.4 @types/three@0.185.4 @types/node@24.13.3
npm run dev
```

## index.html

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="theme-color" content="#09090b" />
    <title>Muhammed Tamim Baig — Robotics, AI & Full-Stack Engineering</title>
    <meta
      name="description"
      content="Muhammed Tamim Baig (Tamim), Robotics & AI Engineering Student and Full-Stack & 3D Systems Builder in Karnataka, India. Explore AI, web, and robotics projects."
    />
    <meta name="author" content="Muhammed Tamim Baig" />
    <meta name="robots" content="index, follow" />
    <meta property="og:type" content="website" />
    <meta property="og:locale" content="en_IN" />
    <meta property="og:site_name" content="Tamim — Engineering & Building" />
    <meta
      property="og:title"
      content="Muhammed Tamim Baig — Engineering the intelligent. Building the real."
    />
    <meta
      property="og:description"
      content="Robotics & AI Engineering Student · Full-Stack & 3D Systems Builder. Explore VIBEGUARD, AAPESH, JANSETU AI, StudyAI, and the AI-Powered Plastic Sorter."
    />
    <meta property="og:image" content="/og-image.png" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:type" content="image/png" />
    <meta
      property="og:image:alt"
      content="Tamim — Robotics, Intelligence, and the Web. Engineering the intelligent. Building the real."
    />
    <meta name="twitter:card" content="summary_large_image" />
    <meta
      name="twitter:title"
      content="Muhammed Tamim Baig — Robotics, AI & Full-Stack Engineering"
    />
    <meta
      name="twitter:description"
      content="Robotics & AI Engineering Student · Full-Stack & 3D Systems Builder in Karnataka, India."
    />
    <meta name="twitter:image" content="/og-image.png" />
    <meta
      name="twitter:image:alt"
      content="Tamim — Engineering the intelligent. Building the real."
    />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;550;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
      rel="stylesheet"
    />
  </head>
  <body>
    <div id="root"></div>
    <noscript
      >This portfolio requires JavaScript for interactive projects. Muhammed
      Tamim Baig — Robotics & AI Engineering Student · Full-Stack & 3D Systems
      Builder. Contact: tamimbaig33@gmail.com. GitHub:
      https://github.com/deadsec7869.</noscript
    >
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

## src/data/portfolio.ts

```ts
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
```

## src/components/Scene3D.tsx

```tsx
import { Component, useEffect, useLayoutEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { useReducedMotion } from "framer-motion";
import * as THREE from "three";

function TelemetryNodes() {
  const mesh = useRef<THREE.InstancedMesh>(null);
  useLayoutEffect(() => {
    if (!mesh.current) return;
    const dummy = new THREE.Object3D();
    const color = new THREE.Color();
    for (let i = 0; i < 180; i++) {
      const phi = Math.acos(1 - (2 * (i + 0.5)) / 180);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      const radius = i % 4 === 0 ? 2.65 : 2.25;
      dummy.position.set(
        radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.cos(phi),
        radius * Math.sin(phi) * Math.sin(theta),
      );
      dummy.scale.setScalar(i % 9 === 0 ? 0.032 : 0.012);
      dummy.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.matrix);
      mesh.current.setColorAt(
        i,
        color.set(i % 5 === 0 ? "#34d399" : "#22d3ee"),
      );
    }
    mesh.current.instanceMatrix.needsUpdate = true;
    if (mesh.current.instanceColor)
      mesh.current.instanceColor.needsUpdate = true;
  }, []);
  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, 180]}>
      <sphereGeometry args={[1, 6, 6]} />
      <meshBasicMaterial toneMapped={false} />
    </instancedMesh>
  );
}

function TickRing() {
  const ticks = useRef<THREE.InstancedMesh>(null);
  useLayoutEffect(() => {
    if (!ticks.current) return;
    const object = new THREE.Object3D();
    for (let i = 0; i < 96; i++) {
      const angle = (i / 96) * Math.PI * 2;
      object.position.set(Math.cos(angle) * 1.85, Math.sin(angle) * 1.85, 0);
      object.rotation.z = angle;
      object.scale.set(i % 8 === 0 ? 0.13 : 0.055, 0.017, 0.025);
      object.updateMatrix();
      ticks.current.setMatrixAt(i, object.matrix);
    }
    ticks.current.instanceMatrix.needsUpdate = true;
  }, []);
  return (
    <instancedMesh ref={ticks} args={[undefined, undefined, 96]}>
      <boxGeometry />
      <meshStandardMaterial
        color="#86dce7"
        emissive="#0891b2"
        emissiveIntensity={0.6}
        metalness={0.5}
        roughness={0.3}
      />
    </instancedMesh>
  );
}

function Core({ still }: { still: boolean }) {
  const root = useRef<THREE.Group>(null);
  const rotor = useRef<THREE.Group>(null);
  const progress = useRef(0);
  const pointer = useRef({ x: 0, y: 0 });
  useEffect(() => {
    const scroll = () => {
      progress.current =
        window.scrollY /
        Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
    };
    const move = (event: PointerEvent) => {
      pointer.current.x = event.clientX / window.innerWidth - 0.5;
      pointer.current.y = event.clientY / window.innerHeight - 0.5;
    };
    scroll();
    window.addEventListener("scroll", scroll, { passive: true });
    window.addEventListener("pointermove", move, { passive: true });
    return () => {
      window.removeEventListener("scroll", scroll);
      window.removeEventListener("pointermove", move);
    };
  }, []);
  useFrame(({ camera }, delta) => {
    if (still || !root.current || !rotor.current) return;
    const dt = Math.min(delta, 0.05);
    root.current.rotation.y = THREE.MathUtils.damp(
      root.current.rotation.y,
      pointer.current.x * 0.38 + progress.current * 1.4,
      3,
      dt,
    );
    root.current.rotation.x = THREE.MathUtils.damp(
      root.current.rotation.x,
      pointer.current.y * 0.18,
      3,
      dt,
    );
    rotor.current.rotation.z += dt * (0.09 + progress.current * 0.35);
    camera.position.x = THREE.MathUtils.damp(
      camera.position.x,
      progress.current * 1.7,
      3,
      dt,
    );
    camera.position.y = THREE.MathUtils.damp(
      camera.position.y,
      0.3 + progress.current * 1.4,
      3,
      dt,
    );
    camera.lookAt(0, 0, 0);
  });
  return (
    <group ref={root} rotation={[0, 0, -0.2]}>
      <Float
        speed={still ? 0 : 1.3}
        rotationIntensity={still ? 0 : 0.12}
        floatIntensity={still ? 0 : 0.2}
      >
        <group ref={rotor}>
          <group rotation={[0.8, 0.45, 0.1]}>
            <mesh>
              <torusGeometry args={[1.85, 0.065, 12, 128]} />
              <meshStandardMaterial
                color="#47707b"
                metalness={0.85}
                roughness={0.27}
              />
            </mesh>
            <mesh>
              <torusGeometry args={[1.72, 0.014, 8, 128]} />
              <meshBasicMaterial color="#22d3ee" toneMapped={false} />
            </mesh>
            <TickRing />
          </group>
          <group rotation={[-0.65, 1.05, 0.2]}>
            <mesh>
              <torusGeometry args={[1.53, 0.095, 12, 128]} />
              <meshStandardMaterial
                color="#527481"
                metalness={0.85}
                roughness={0.22}
              />
            </mesh>
            <mesh>
              <torusGeometry args={[1.55, 0.018, 8, 128]} />
              <meshBasicMaterial color="#67e8f9" />
            </mesh>
            <mesh rotation={[0, 0, 0.3]}>
              <torusGeometry args={[1.65, 0.014, 8, 100, 4.7]} />
              <meshBasicMaterial color="#34d399" />
            </mesh>
          </group>
          <group rotation={[1.2, -0.6, 0.7]}>
            <mesh>
              <torusGeometry args={[1.2, 0.045, 10, 100]} />
              <meshStandardMaterial
                color="#68a8ae"
                metalness={0.8}
                roughness={0.2}
              />
            </mesh>
            <mesh>
              <torusGeometry args={[1.27, 0.012, 8, 100]} />
              <meshBasicMaterial color="#22d3ee" />
            </mesh>
          </group>
          <mesh>
            <icosahedronGeometry args={[0.84, 1]} />
            <meshStandardMaterial
              color="#0b242d"
              metalness={0.65}
              roughness={0.25}
              flatShading
            />
          </mesh>
          <mesh>
            <icosahedronGeometry args={[0.847, 1]} />
            <meshBasicMaterial
              color="#38c9db"
              wireframe
              transparent
              opacity={0.6}
            />
          </mesh>
          <mesh>
            <octahedronGeometry args={[0.42]} />
            <meshBasicMaterial color="#a5f3fc" wireframe />
          </mesh>
          <TelemetryNodes />
        </group>
      </Float>
    </group>
  );
}

function Fallback() {
  return (
    <div className="core-fallback">
      <div />
      <span>KINEMATIC CORE / STATIC VIEW</span>
    </div>
  );
}

class SceneBoundary extends Component<
  { children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? <Fallback /> : this.props.children;
  }
}

export default function Scene3D({ paused = false }: { paused?: boolean }) {
  const reducedMotion = useReducedMotion();
  const [visible, setVisible] = useState(true);
  const [tabVisible, setTabVisible] = useState(true);
  const container = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin: "100px" },
    );
    if (container.current) observer.observe(container.current);
    const onVisibility = () => setTabVisible(!document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);
  const still = paused || !!reducedMotion || !visible || !tabVisible;
  return (
    <div
      ref={container}
      className="scene-canvas"
      role="img"
      aria-label="Procedural kinematic core: interlocking precision rings surrounding a neural lattice, with cyan and emerald telemetry nodes"
    >
      <SceneBoundary>
        <Canvas
          dpr={[1, 2]}
          camera={{ position: [0, 0.3, 7.4], fov: 42 }}
          frameloop={still ? "demand" : "always"}
          gl={{
            alpha: true,
            antialias: true,
            powerPreference: "high-performance",
          }}
          fallback={<Fallback />}
        >
          <ambientLight intensity={0.6} />
          <directionalLight
            position={[3, 4, 4]}
            intensity={3}
            color="#b5f3ff"
          />
          <pointLight position={[-3, -1, 2]} intensity={30} color="#22d3ee" />
          <pointLight position={[1, 3, -3]} intensity={35} color="#34d399" />
          <Core still={still} />
        </Canvas>
      </SceneBoundary>
    </div>
  );
}
```

## src/components/ProjectModal.tsx

```tsx
import { useEffect, useRef } from "react";
import { ArrowDown, ArrowUpRight, X, Workflow } from "lucide-react";
import { Github } from "./GitHubIcon";
import type { Project } from "../data/portfolio";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!project || !dialog) return;
    const opener =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    const originalOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      dialog.close();
      document.body.style.overflow = originalOverflow;
      opener?.focus({ preventScroll: true });
    };
  }, [project]);

  return (
    <dialog
      ref={dialogRef}
      className="project-dialog"
      aria-labelledby="project-dialog-title"
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          const box = event.currentTarget.getBoundingClientRect();
          if (
            event.clientX < box.left ||
            event.clientX > box.right ||
            event.clientY < box.top ||
            event.clientY > box.bottom
          )
            onClose();
        }
      }}
    >
      {project && (
        <div className="dialog-inner">
          <div className="dialog-top">
            <span className="eyebrow">
              SYSTEM BREAKDOWN / {project.category}
            </span>
            <button
              autoFocus
              className="icon-button"
              onClick={onClose}
              aria-label="Close project details"
            >
              <X size={22} />
            </button>
          </div>
          <h2 id="project-dialog-title">{project.name}</h2>
          <p className="dialog-description">{project.description}</p>
          <div className="tags dialog-tags">
            {project.stack.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
          <div className="architecture-title">
            <Workflow size={20} />
            <h3>Architecture overview</h3>
          </div>
          <p className="architecture-note">
            A high-level map based on the project’s described capabilities and
            stack.
          </p>
          <ol className="architecture-flow">
            {project.architecture.map((step, index) => (
              <li key={step.title}>
                <div className="architecture-step">
                  <span className="step-number">0{index + 1}</span>
                  <div>
                    <h4>{step.title}</h4>
                    <p>{step.detail}</p>
                  </div>
                </div>
                {index < project.architecture.length - 1 && (
                  <ArrowDown
                    className="flow-arrow"
                    size={17}
                    aria-hidden="true"
                  />
                )}
              </li>
            ))}
          </ol>
          <div className="dialog-footer">
            {project.github ? (
              <a
                className="button button-primary"
                href={project.github}
                target="_blank"
                rel="noreferrer"
              >
                <Github size={17} /> View source on GitHub{" "}
                <ArrowUpRight size={16} />
              </a>
            ) : (
              <span className="mono muted">SOURCE LINK NOT PROVIDED</span>
            )}
            <button className="text-link" onClick={onClose}>
              Back to projects
            </button>
          </div>
        </div>
      )}
    </dialog>
  );
}
```

## src/App.tsx

```tsx
import { lazy, Suspense, useState } from "react";
import { motion, MotionConfig, useReducedMotion } from "framer-motion";
import {
  ArrowDown,
  ArrowUpRight,
  ArrowRight,
  Mail,
  MapPin,
  Cpu,
  Code2,
  Workflow,
  Box,
  ShieldCheck,
  AudioLines,
  Building2,
  GraduationCap,
  Bot,
  Pause,
  Play,
} from "lucide-react";
import { Github } from "./components/GitHubIcon";
import { profile, projects, skills } from "./data/portfolio";
import type { Project } from "./data/portfolio";
import { ProjectModal } from "./components/ProjectModal";

const Scene3D = lazy(() => import("./components/Scene3D"));
const filters = ["All projects", "AI systems", "Web & 3D", "Robotics"] as const;
const projectIcons = {
  security: ShieldCheck,
  music: AudioLines,
  city: Building2,
  study: GraduationCap,
  robot: Bot,
};

function ProjectVisual({ project }: { project: Project }) {
  const Icon = projectIcons[project.visual];
  return (
    <div
      className={"project-visual visual-" + project.visual}
      aria-hidden="true"
    >
      <div className="visual-grid" />
      <span className="visual-label">
        {project.visual === "music"
          ? "AUDIO / SPATIAL ENGINE"
          : project.visual === "security"
            ? "SECURITY / AGENT NETWORK"
            : "SYSTEM / ARCHITECTURE"}
      </span>
      <div className="visual-orbit orbit-one" />
      <div className="visual-orbit orbit-two" />
      <div className="visual-emblem">
        <Icon size={38} strokeWidth={1.2} />
      </div>
      <div className="visual-bars">
        {Array.from({ length: 28 }, (_, i) => (
          <i key={i} style={{ height: 12 + ((i * 17 + 23) % 57) + "%" }} />
        ))}
      </div>
      <span className="visual-caption">
        {project.visual === "music"
          ? "SOUND, IN ANOTHER DIMENSION."
          : project.visual === "security"
            ? "PLAN → EXECUTE → PATCH → VERIFY"
            : project.stack.slice(0, 3).join(" / ")}
      </span>
      <span className="visual-corner">↗</span>
    </div>
  );
}

export function App() {
  const [filter, setFilter] =
    useState<(typeof filters)[number]>("All projects");
  const [selected, setSelected] = useState<Project | null>(null);
  const [paused, setPaused] = useState(false);
  const reducedMotion = useReducedMotion();
  const visibleProjects = projects.filter(
    (project) => filter === "All projects" || project.category === filter,
  );

  return (
    <MotionConfig reducedMotion="user">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header">
        <a href="#home" className="wordmark" aria-label="Tamim home">
          <span className="brand-mark">
            t<span>.</span>
          </span>
          <span>
            TAMIM<span className="wordmark-slash"> / </span>
            <span className="wordmark-sub">ENGINEER & BUILDER</span>
          </span>
        </a>
        <nav aria-label="Main navigation">
          <a href="#work">Work</a>
          <a href="#about">About</a>
          <a href="#stack">Stack</a>
          <a href="#contact" className="nav-contact">
            Let’s talk <ArrowUpRight size={14} />
          </a>
        </nav>
      </header>
      <main id="main">
        <section id="home" className="hero section-shell">
          <div className="hero-topline">
            <span className="eyebrow">
              <i className="status-dot" /> ROBOTICS · INTELLIGENCE · THE WEB
            </span>
            <span className="hero-coordinate">
              KARNATAKA <span>·</span> INDIA
            </span>
          </div>
          <div className="hero-layout">
            <motion.div
              className="hero-copy"
              initial={reducedMotion ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <p className="intro-line">Hello, I’m Tamim.</p>
              <h1>
                Engineering
                <br />
                the <span>intelligent.</span>
                <br />
                Building the real<span className="cyan">.</span>
              </h1>
              <p className="hero-description">
                I connect code, intelligence, and the physical world.
                <br className="desktop-break" /> From autonomous systems to
                immersive web experiences.
              </p>
              <p className="hero-role">{profile.role}</p>
              <div className="hero-actions">
                <a className="button button-primary" href="#work">
                  Explore my work <ArrowDown size={16} />
                </a>
                <a
                  className="button button-secondary"
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Github size={17} /> GitHub <ArrowUpRight size={14} />
                </a>
              </div>
              <div className="hero-location">
                <MapPin size={13} />
                <span>{profile.location}</span>
              </div>
            </motion.div>
            <div className="core-stage">
              <div className="core-cross cross-tl">+</div>
              <div className="core-cross cross-br">+</div>
              <div className="core-top">
                <span>
                  <i className="status-dot" /> KINEMATIC CORE
                </span>
                <span>FIG. 001</span>
              </div>
              <Suspense
                fallback={
                  <div
                    className="core-fallback"
                    aria-label="Loading interactive kinematic core"
                  >
                    <div />
                    <span>INITIALIZING GEOMETRY</span>
                  </div>
                }
              >
                <Scene3D paused={paused} />
              </Suspense>
              <div className="core-annotation annotation-left">
                <span>01 / NEURAL LATTICE</span>
                <i />
              </div>
              <div className="core-annotation annotation-right">
                <i />
                <span>02 / ORBITAL ARRAY</span>
              </div>
              <div className="core-bottom">
                <span>
                  PROCEDURAL SYSTEM
                  <br />
                  <b>CODE MEETS PHYSICAL.</b>
                </span>
                <button
                  onClick={() => setPaused(!paused)}
                  aria-label={
                    paused ? "Resume 3D animation" : "Pause 3D animation"
                  }
                  aria-pressed={paused}
                >
                  {paused ? <Play size={13} /> : <Pause size={13} />}
                  <span>{paused ? "RESUME" : "PAUSE"}</span>
                </button>
              </div>
            </div>
          </div>
          <div className="hero-footer">
            <span className="mono">
              SCROLL TO EXPLORE <ArrowDown size={13} />
            </span>
            <div>
              <span>SOFTWARE</span>
              <i />
              <span>INTELLIGENCE</span>
              <i />
              <span>HARDWARE</span>
            </div>
            <span className="mono hero-index">
              PORTFOLIO / {new Date().getFullYear()}
            </span>
          </div>
        </section>

        <section id="work" className="section-shell work-section">
          <div className="section-heading">
            <div>
              <p className="eyebrow section-index">01 / SELECTED WORK</p>
              <h2>Ideas, engineered.</h2>
            </div>
            <p>
              A collection of systems at the intersection
              <br />
              of intelligence, interaction, and impact.
            </p>
          </div>
          <div className="project-toolbar">
            <div className="filters" aria-label="Filter projects">
              {filters.map((item) => (
                <button
                  key={item}
                  aria-pressed={filter === item}
                  className={filter === item ? "active" : ""}
                  onClick={() => setFilter(item)}
                >
                  {item}
                  {item === "All projects" && <span>05</span>}
                </button>
              ))}
            </div>
            <span className="mono project-count" aria-live="polite">
              {String(visibleProjects.length).padStart(2, "0")} PROJECTS
            </span>
          </div>
          <div className="project-grid">
            {visibleProjects.map((project) => (
              <motion.article
                layout={!reducedMotion}
                key={project.id}
                className="project-card"
              >
                <button
                  className="visual-button"
                  onClick={() => setSelected(project)}
                  aria-label={"Explore " + project.name + " architecture"}
                >
                  <ProjectVisual project={project} />
                </button>
                <div className="project-content">
                  <div className="project-meta">
                    <span>{project.category}</span>
                    <span>0{projects.indexOf(project) + 1}</span>
                  </div>
                  <h3>{project.name}</h3>
                  <p>{project.description}</p>
                  <div className="tags">
                    {project.stack.slice(0, 4).map((tech) => (
                      <span key={tech}>{tech}</span>
                    ))}
                    {project.stack.length > 4 && (
                      <span>+{project.stack.length - 4}</span>
                    )}
                  </div>
                  <div className="project-links">
                    <button onClick={() => setSelected(project)}>
                      Explore architecture <ArrowRight size={15} />
                    </button>
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={project.name + " on GitHub"}
                      >
                        <Github size={17} />
                        <ArrowUpRight size={13} />
                      </a>
                    )}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section id="about" className="section-shell about-section">
          <div>
            <p className="eyebrow section-index">
              02 / THE PERSON BEHIND THE SYSTEMS
            </p>
            <h2>
              Curiosity is
              <br />
              my operating system<span className="cyan">.</span>
            </h2>
            <p className="about-copy">
              I’m {profile.name}, a Robotics & AI engineering student building
              across the digital and physical worlds. My work spans full-stack
              applications, intelligent automation, immersive 3D experiences,
              and hands-on robotics.
            </p>
            <p className="about-copy">
              I’m interested in the entire system: how it thinks, how it feels
              to use, and how it works in the real world.
            </p>
            <a
              className="text-link"
              href={profile.github}
              target="_blank"
              rel="noreferrer"
            >
              Follow what I’m building <ArrowUpRight size={16} />
            </a>
          </div>
          <div className="education-panel">
            <div className="panel-title">
              <GraduationCap size={20} />
              <span className="mono">CURRENTLY LEARNING & BUILDING</span>
              <i className="status-dot" />
            </div>
            <span className="education-years">{profile.years}</span>
            <h3>{profile.education}</h3>
            <p>{profile.institution}</p>
            <p className="muted">{profile.campus}</p>
            <div className="education-bottom">
              <MapPin size={15} />
              <span>Karnataka, India</span>
              <span className="cyan">UNDERGRADUATE</span>
            </div>
          </div>
        </section>

        <section id="stack" className="section-shell stack-section">
          <div className="section-heading">
            <div>
              <p className="eyebrow section-index">03 / TOOLKIT</p>
              <h2>The building blocks.</h2>
            </div>
            <p>
              From a line of code to a physical prototype.
              <br />
              The tools I use to connect the dots.
            </p>
          </div>
          <div className="skills-grid">
            {skills.map((group, index) => {
              const Icon = [Code2, Box, Workflow, Cpu][index];
              return (
                <div className="skill-group" key={group.label}>
                  <div className="skill-heading">
                    <Icon size={22} strokeWidth={1.4} />
                    <span className="mono">{group.code}</span>
                  </div>
                  <h3>{group.label}</h3>
                  <div className="skill-items">
                    {group.items.map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section id="contact" className="section-shell contact-section">
          <p className="eyebrow section-index">
            <i className="status-dot" /> 04 / MAKE A CONNECTION
          </p>
          <div className="contact-layout">
            <div>
              <h2>
                Have something
                <br />
                in mind<span className="cyan">?</span>
              </h2>
              <p>
                Let’s talk ideas, interesting problems, and what we could build.
              </p>
              <a href={"mailto:" + profile.email} className="contact-email">
                {profile.email}
                <ArrowUpRight size={26} />
              </a>
            </div>
            <a
              className="contact-orb"
              href={"mailto:" + profile.email}
              aria-label="Send Tamim an email"
            >
              <ArrowUpRight size={64} strokeWidth={1} />
            </a>
          </div>
          <div className="contact-links">
            <a href={profile.github} target="_blank" rel="noreferrer">
              <Github size={16} /> GitHub <ArrowUpRight size={14} />
            </a>
            <a href={"mailto:" + profile.email}>
              <Mail size={16} /> Email <ArrowUpRight size={14} />
            </a>
            <span>
              <MapPin size={14} /> {profile.location}
            </span>
          </div>
        </section>
      </main>
      <footer className="site-footer">
        <a href="#home" className="footer-name">
          TAMIM<span className="cyan">.</span>
        </a>
        <span>
          © {new Date().getFullYear()} {profile.name}
        </span>
        <a href="#home">BACK TO TOP ↑</a>
      </footer>
      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </MotionConfig>
  );
}

export default App;
```

## src/components/GitHubIcon.tsx

```tsx
export function Github({ size = 20 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M9 19c-4.3 1.3-4.3-2-6-2.5M15 22v-3.9c0-1 .1-1.4-.5-2 3.1-.4 6.3-1.5 6.3-7A5.4 5.4 0 0 0 19.3 5c.2-.9.2-2.2-.2-3-1.2-.1-2.8.7-3.6 1.3a12.3 12.3 0 0 0-7 0C7.7 2.7 6.1 1.9 4.9 2c-.4.8-.4 2.1-.2 3a5.4 5.4 0 0 0-1.5 4.1c0 5.5 3.2 6.6 6.3 7-.6.6-.5 1.3-.5 2V22" />
    </svg>
  );
}
```

## src/index.css

```css
@import "tailwindcss";

:root {
  font-family: Inter, Arial, sans-serif;
  color: #f4f4f5;
  background: #09090b;
  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  --cyan: #22d3ee;
  --emerald: #34d399;
  --muted: #a1a1aa;
  --border: #27272a;
}
* {
  box-sizing: border-box;
}
html {
  scroll-behavior: smooth;
  scroll-padding-top: 95px;
}
body {
  margin: 0;
}
button,
a {
  -webkit-tap-highlight-color: transparent;
}
button {
  font: inherit;
  color: inherit;
  cursor: pointer;
}
a {
  color: inherit;
  text-decoration: none;
}
button {
  border: 0;
  background: none;
}
button:focus-visible,
a:focus-visible {
  outline: 2px solid var(--cyan);
  outline-offset: 5px;
}
::selection {
  background: #155e75;
  color: white;
}
h1,
h2,
h3,
h4,
p {
  margin: 0;
}
svg {
  flex-shrink: 0;
}
button,
a {
  touch-action: manipulation;
}
.mono,
.eyebrow,
.hero-coordinate,
.core-top,
.core-bottom,
.core-annotation,
.hero-footer,
.project-meta,
.tags,
.visual-label,
.visual-caption,
.skill-items,
.education-years,
.site-footer {
  font-family: "JetBrains Mono", monospace;
}
.cyan {
  color: var(--cyan);
}
.muted {
  color: var(--muted);
}
.skip-link {
  position: fixed;
  top: -80px;
  left: 20px;
  z-index: 100;
  background: var(--cyan);
  color: #09090b;
  padding: 12px;
}
.skip-link:focus {
  top: 12px;
}
.section-shell {
  max-width: 1440px;
  margin: auto;
  padding-left: 6%;
  padding-right: 6%;
}
.site-header {
  height: 86px;
  padding: 0 6%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--border);
  background: #09090bf2;
  position: sticky;
  top: 0;
  z-index: 30;
  backdrop-filter: blur(16px);
}
.wordmark {
  display: flex;
  align-items: center;
  gap: 13px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 1.3px;
}
.brand-mark {
  font-size: 37px;
  line-height: 1;
  letter-spacing: -4px;
  font-weight: 700;
}
.brand-mark span {
  color: var(--cyan);
}
.wordmark-slash {
  color: #52525b;
  padding: 0 7px;
}
.wordmark-sub {
  font-size: 9px;
  color: var(--muted);
  letter-spacing: 1.2px;
}
nav {
  display: flex;
  align-items: center;
  gap: 32px;
  font-size: 12px;
  color: #a1a1aa;
}
nav a:hover {
  color: white;
}
.nav-contact {
  display: flex;
  align-items: center;
  gap: 18px;
  border: 1px solid #3f3f46;
  border-radius: 5px;
  padding: 11px 15px;
  color: #e4e4e7;
}
.eyebrow {
  font-size: 10px;
  letter-spacing: 1.6px;
  color: #a1a1aa;
  display: flex;
  align-items: center;
  gap: 10px;
}
.status-dot {
  display: inline-block;
  width: 6px;
  height: 6px;
  background: var(--emerald);
  border-radius: 50%;
  box-shadow: 0 0 10px #34d39950;
  flex-shrink: 0;
}
.hero {
  position: relative;
  background: radial-gradient(ellipse at 77% 43%, #0a262b52, transparent 46%);
}
.hero-topline {
  display: flex;
  justify-content: space-between;
  padding-top: 32px;
}
.hero-coordinate {
  font-size: 9px;
  color: #71717a;
  letter-spacing: 0.9px;
}
.hero-coordinate span {
  padding: 0 10px;
  color: var(--cyan);
}
.hero-layout {
  display: grid;
  grid-template-columns: 1.08fr 1fr;
  align-items: center;
  min-height: 610px;
  gap: 12px;
}
.hero-copy {
  padding: 38px 0 40px;
  position: relative;
  z-index: 2;
}
.intro-line {
  font-size: 15px;
  color: #d4d4d8;
  margin-bottom: 22px;
}
h1 {
  font-size: clamp(40px, 4.5vw, 67px);
  font-weight: 550;
  line-height: 1.12;
  letter-spacing: -3.4px;
}
h1 > span:not(.cyan) {
  color: var(--cyan);
}
.hero-description {
  font-size: 13px;
  line-height: 1.9;
  color: #a1a1aa;
  margin-top: 25px;
}
.hero-role {
  font-size: 10px;
  line-height: 1.8;
  color: #8b8b95;
  max-width: 440px;
  margin-top: 12px;
}
.hero-actions {
  display: flex;
  gap: 11px;
  margin-top: 29px;
}
.button {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: 18px;
  padding: 14px 19px;
  border-radius: 5px;
  font-size: 11px;
  font-weight: 600;
  transition:
    background 0.2s,
    transform 0.2s;
}
.button:hover {
  transform: translateY(-2px);
}
.button-primary {
  background: var(--cyan);
  color: #08232b;
  border: 1px solid var(--cyan);
}
.button-primary:hover {
  background: #67e8f9;
}
.button-secondary {
  background: #18181b80;
  border: 1px solid #3f3f46;
  color: #d4d4d8;
}
.hero-location {
  display: flex;
  gap: 8px;
  color: #81818b;
  font-size: 9px;
  margin-top: 23px;
  line-height: 1.6;
}
.core-stage {
  height: 500px;
  position: relative;
  min-width: 0;
}
.scene-canvas {
  position: absolute;
  inset: 0;
}
.core-top,
.core-bottom {
  position: absolute;
  left: 20px;
  right: 12px;
  display: flex;
  justify-content: space-between;
  z-index: 2;
  font-size: 8px;
  letter-spacing: 1px;
  pointer-events: none;
  color: #71717a;
}
.core-top {
  top: 12px;
}
.core-top > span:first-child {
  display: flex;
  align-items: center;
  gap: 9px;
  color: #b0b5bd;
}
.core-top .status-dot {
  width: 4px;
  height: 4px;
}
.core-bottom {
  bottom: 10px;
  align-items: end;
  line-height: 1.8;
}
.core-bottom b {
  font-weight: 400;
  color: #a1a1aa;
}
.core-bottom button {
  pointer-events: auto;
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 8px;
  border: 1px solid var(--border);
  border-radius: 3px;
}
.core-cross {
  position: absolute;
  color: #3f3f46;
  font-family: monospace;
  font-size: 19px;
}
.cross-tl {
  left: 0;
  top: 0;
}
.cross-br {
  bottom: 0;
  right: -4px;
}
.core-annotation {
  position: absolute;
  z-index: 2;
  color: #829298;
  font-size: 7px;
  letter-spacing: 1px;
  display: flex;
  align-items: center;
  gap: 8px;
  pointer-events: none;
}
.annotation-left {
  left: 0;
  top: 65%;
}
.annotation-right {
  right: 0;
  top: 28%;
}
.core-annotation i {
  display: block;
  width: 30px;
  height: 1px;
  background: #387079;
}
.hero-footer {
  border-top: 1px solid var(--border);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 0;
  font-size: 8px;
  letter-spacing: 1.3px;
  color: #71717a;
}
.hero-footer > span {
  display: flex;
  align-items: center;
  gap: 14px;
}
.hero-footer > div {
  display: flex;
  align-items: center;
  gap: 20px;
}
.hero-footer i {
  height: 3px;
  width: 3px;
  border-radius: 50%;
  background: var(--cyan);
}
.work-section {
  padding-top: 82px;
  padding-bottom: 85px;
  border-top: 1px solid var(--border);
}
.section-heading {
  display: flex;
  justify-content: space-between;
  align-items: end;
  gap: 20px;
}
.section-index {
  color: var(--cyan);
  font-size: 9px;
  margin-bottom: 18px;
}
h2 {
  font-weight: 500;
  font-size: clamp(32px, 3.3vw, 46px);
  letter-spacing: -1.8px;
  line-height: 1.18;
}
.section-heading > p {
  font-size: 12px;
  line-height: 1.8;
  color: #8c8c96;
}
.project-toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 32px 0 22px;
  gap: 14px;
}
.filters {
  display: flex;
  gap: 7px;
  flex-wrap: wrap;
}
.filters button {
  font-size: 10px;
  padding: 9px 13px;
  border: 1px solid transparent;
  border-radius: 4px;
  color: #92929b;
}
.filters button.active {
  background: #18181b;
  border-color: #3f3f46;
  color: #f4f4f5;
}
.filters button:hover {
  color: #22d3ee;
}
.filters button span {
  font-family: "JetBrains Mono", monospace;
  font-size: 8px;
  margin-left: 10px;
  color: #8f8f99;
}
.project-count {
  font-size: 8px;
  color: #71717a;
  letter-spacing: 1px;
  white-space: nowrap;
}
.project-grid {
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  gap: 22px;
}
.project-card {
  grid-column: span 2;
  border: 1px solid var(--border);
  border-radius: 8px;
  overflow: hidden;
  background: #18181b70;
  display: flex;
  flex-direction: column;
  min-width: 0;
  transition: border-color 0.2s;
}
.project-card:nth-child(-n + 2) {
  grid-column: span 3;
}
.project-card:hover {
  border-color: #3f7179;
}
.visual-button {
  width: 100%;
  padding: 0;
  display: block;
  text-align: left;
}
.project-visual {
  height: 185px;
  position: relative;
  overflow: hidden;
  background:
    radial-gradient(ellipse at center, #12343580, transparent 75%), #0d1214;
  color: #54d1bd;
}
.project-card:nth-child(-n + 2) .project-visual {
  height: 230px;
}
.visual-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(#8ba5ba08 1px, transparent 1px),
    linear-gradient(90deg, #8ba5ba08 1px, transparent 1px);
  background-size: 25px 25px;
  mask-image: linear-gradient(transparent, black);
}
.visual-label {
  position: absolute;
  top: 18px;
  left: 20px;
  font-size: 7px;
  letter-spacing: 1px;
  color: #8b9ba2;
}
.visual-caption {
  position: absolute;
  bottom: 18px;
  left: 20px;
  right: 30px;
  font-size: 7px;
  letter-spacing: 1px;
  color: #82979b;
}
.visual-emblem {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 78px;
  height: 78px;
  display: grid;
  place-items: center;
  background: #0c1c20;
  border: 1px solid #2f686e;
  border-radius: 17px;
  box-shadow: 0 0 40px #22d3ee0c;
  z-index: 2;
}
.visual-orbit {
  position: absolute;
  width: 170px;
  height: 170px;
  border: 1px solid #29849240;
  border-radius: 50%;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.orbit-two {
  width: 260px;
  height: 260px;
  border-style: dashed;
  border-color: #39a3a320;
}
.visual-corner {
  position: absolute;
  right: 17px;
  bottom: 12px;
  color: #607d84;
}
.visual-bars {
  position: absolute;
  inset: 30px 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
  opacity: 0.3;
}
.visual-bars i {
  width: 3px;
  background: currentColor;
}
.visual-security .visual-bars {
  opacity: 0.1;
}
.visual-music {
  background:
    radial-gradient(ellipse at center, #213754a0, transparent 75%), #0e1018;
  color: #73b8ed;
}
.visual-music .visual-emblem {
  border-radius: 50%;
  background: repeating-radial-gradient(#121a27 0 4px, #253548 5px 6px);
  border-color: #47738d;
}
.visual-music .visual-orbit {
  border-color: #6273a72c;
  width: 210px;
  height: 210px;
}
.visual-music .orbit-two {
  width: 140px;
  height: 140px;
}
.visual-music .visual-bars {
  opacity: 0.55;
  gap: 9px;
}
.visual-city {
  color: #6dd1b2;
}
.visual-study {
  background: radial-gradient(ellipse, #2b28466b, transparent), #101016;
  color: #aba0e6;
}
.visual-robot {
  color: #e4b27c;
  background: radial-gradient(ellipse, #3c2d216b, transparent), #15120f;
}
.project-content {
  padding: 23px;
  display: flex;
  flex-direction: column;
  flex: 1;
}
.project-meta {
  display: flex;
  justify-content: space-between;
  font-size: 8px;
  letter-spacing: 1px;
  color: #85858e;
  text-transform: uppercase;
  margin-bottom: 12px;
}
.project-meta > span:first-child {
  color: #7ca6aa;
}
.project-content h3 {
  font-size: 21px;
  font-weight: 550;
  letter-spacing: -0.6px;
}
.project-content > p {
  font-size: 11px;
  line-height: 1.85;
  color: #a1a1aa;
  margin: 12px 0 18px;
}
.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}
.tags span {
  font-size: 8px;
  border: 1px solid #303035;
  background: #18181b80;
  color: #b1b1b9;
  padding: 5px 7px;
  border-radius: 3px;
}
.project-links {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 19px;
  margin-top: auto;
}
.project-links button {
  font-size: 10px;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 0;
  color: #d4d4d8;
}
.project-links a {
  display: flex;
  gap: 8px;
  color: #8d8d99;
  padding: 8px;
}
.project-links button:hover,
.project-links a:hover {
  color: var(--cyan);
}
.about-section {
  padding-top: 80px;
  padding-bottom: 80px;
  border-top: 1px solid var(--border);
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  gap: 85px;
  align-items: center;
}
.about-copy {
  font-size: 12px;
  line-height: 1.9;
  color: #a1a1aa;
  margin-top: 20px;
  max-width: 520px;
}
.text-link {
  display: inline-flex;
  align-items: center;
  gap: 13px;
  font-size: 11px;
  color: var(--cyan);
  margin-top: 24px;
}
.education-panel {
  background: #18181b80;
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 28px;
}
.panel-title {
  display: flex;
  align-items: center;
  gap: 12px;
  color: var(--cyan);
  padding-bottom: 22px;
  border-bottom: 1px solid var(--border);
}
.panel-title .mono {
  font-size: 8px;
  color: #a1a1aa;
  letter-spacing: 0.8px;
}
.panel-title .status-dot {
  margin-left: auto;
}
.education-years {
  display: block;
  margin-top: 25px;
  font-size: 11px;
  color: var(--cyan);
}
.education-panel h3 {
  font-size: 23px;
  line-height: 1.4;
  font-weight: 500;
  margin: 12px 0 15px;
  letter-spacing: -0.5px;
}
.education-panel p {
  font-size: 12px;
  line-height: 1.8;
  color: #b5b5bd;
}
.education-panel p.muted {
  color: #80808a;
  margin-top: 5px;
}
.education-bottom {
  display: flex;
  gap: 8px;
  align-items: center;
  font-size: 9px;
  color: #8d8d99;
  border-top: 1px solid var(--border);
  padding-top: 20px;
  margin-top: 28px;
}
.education-bottom > span:last-child {
  margin-left: auto;
  font-family: "JetBrains Mono", monospace;
  font-size: 7px;
}
.stack-section {
  border-top: 1px solid var(--border);
  padding-top: 80px;
  padding-bottom: 90px;
}
.skills-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  margin-top: 35px;
  border: 1px solid var(--border);
  border-radius: 7px;
  overflow: hidden;
  background: #18181b50;
}
.skill-group {
  padding: 25px;
  border-right: 1px solid var(--border);
}
.skill-group:last-child {
  border: 0;
}
.skill-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: var(--cyan);
}
.skill-heading span {
  color: #71717a;
  font-size: 9px;
}
.skill-group h3 {
  font-size: 14px;
  font-weight: 500;
  margin: 22px 0 19px;
}
.skill-items {
  display: flex;
  gap: 10px 12px;
  flex-wrap: wrap;
  font-size: 9px;
  line-height: 1.8;
  color: #a1a1aa;
}
.skill-items span::before {
  content: "·";
  margin-right: 6px;
  color: #3f7179;
}
.contact-section {
  padding-top: 70px;
  padding-bottom: 35px;
  border-top: 1px solid var(--border);
  background: radial-gradient(ellipse at 85% 80%, #0b33372b, transparent 50%);
}
.contact-layout {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.contact-layout h2 {
  font-size: clamp(44px, 5.5vw, 74px);
  letter-spacing: -3px;
}
.contact-layout p {
  font-size: 12px;
  color: #a1a1aa;
  margin-top: 20px;
}
.contact-email {
  display: inline-flex;
  align-items: center;
  gap: 24px;
  font-size: clamp(17px, 2.4vw, 28px);
  margin-top: 28px;
  border-bottom: 1px solid #3f7179;
  padding-bottom: 10px;
}
.contact-email:hover {
  color: var(--cyan);
}
.contact-orb {
  width: 130px;
  height: 130px;
  border: 1px solid #285058;
  border-radius: 50%;
  display: grid;
  place-items: center;
  color: var(--cyan);
  margin-right: 8%;
  transition: background 0.2s;
}
.contact-orb:hover {
  background: #0c3039;
}
.contact-links {
  display: flex;
  gap: 28px;
  align-items: center;
  margin-top: 60px;
  font-size: 10px;
  color: #b1b1b9;
}
.contact-links a,
.contact-links > span {
  display: flex;
  align-items: center;
  gap: 9px;
}
.contact-links > span {
  margin-left: auto;
  color: #85858e;
  font-size: 9px;
}
.site-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid var(--border);
  margin: 0 6%;
  padding: 25px 0;
  color: #71717a;
  font-size: 8px;
  letter-spacing: 0.3px;
}
.footer-name {
  font-family: Inter, Arial, sans-serif;
  font-weight: 600;
  color: #d4d4d8;
  letter-spacing: 1px;
  font-size: 14px;
}
.project-dialog {
  position: fixed;
  inset: 0;
  margin: auto;
  width: min(680px, calc(100% - 32px));
  max-height: 85dvh;
  padding: 0;
  border: 1px solid #3f3f46;
  border-radius: 12px;
  background: #101013;
  color: #f4f4f5;
  box-shadow: 0 25px 100px #0008;
  overscroll-behavior: contain;
}
.project-dialog::backdrop {
  background: #000b;
  backdrop-filter: blur(8px);
}
.dialog-inner {
  padding: 32px;
}
.dialog-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 15px;
  margin-bottom: 20px;
}
.dialog-top .eyebrow {
  font-size: 8px;
}
.icon-button {
  padding: 8px;
  border: 1px solid var(--border);
  border-radius: 5px;
}
.dialog-description {
  color: #a1a1aa;
  font-size: 13px;
  line-height: 1.8;
  margin-top: 18px;
}
.dialog-tags {
  margin-top: 20px;
}
.architecture-title {
  display: flex;
  align-items: center;
  gap: 12px;
  color: var(--cyan);
  margin: 30px 0 10px;
}
.architecture-title h3 {
  font-size: 14px;
  font-weight: 500;
  color: #e4e4e7;
}
.architecture-note {
  font-size: 10px;
  line-height: 1.7;
  color: #92929c;
}
.architecture-flow {
  list-style: none;
  padding: 0;
  margin: 22px 0;
}
.architecture-step {
  display: flex;
  gap: 17px;
  background: #18181bb3;
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 17px;
}
.step-number {
  font-family: "JetBrains Mono", monospace;
  font-size: 10px;
  color: var(--cyan);
  padding-top: 3px;
}
.architecture-step h4 {
  font-size: 13px;
  font-weight: 500;
}
.architecture-step p {
  font-size: 11px;
  color: #a1a1aa;
  line-height: 1.8;
  margin-top: 5px;
}
.flow-arrow {
  color: #39727b;
  margin: 7px auto;
  display: block;
}
.dialog-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  border-top: 1px solid var(--border);
  padding-top: 20px;
}
.dialog-footer .text-link {
  margin: 0;
}
.dialog-footer > .mono {
  font-size: 9px;
}
.core-fallback {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 25px;
  color: #67e8f9;
  font-family: "JetBrains Mono", monospace;
  font-size: 8px;
}
.core-fallback > div {
  width: 190px;
  height: 190px;
  border: 1px solid #22d3ee;
  border-radius: 50%;
  box-shadow:
    0 0 0 24px #22d3ee10,
    0 0 0 49px #22d3ee08;
  transform: rotate(-30deg) scaleY(0.7);
}
@media (min-width: 1550px) {
  .site-header {
    padding-left: max(6%, calc((100% - 1268px) / 2));
    padding-right: max(6%, calc((100% - 1268px) / 2));
  }
  .hero-layout {
    min-height: 680px;
  }
  .core-stage {
    height: 560px;
  }
}
@media (max-width: 1050px) {
  .wordmark-sub,
  .wordmark-slash {
    display: none;
  }
  .hero-layout {
    min-height: 570px;
  }
  h1 {
    font-size: 48px;
    letter-spacing: -2.6px;
  }
  .core-stage {
    height: 430px;
  }
  .hero-coordinate {
    display: none;
  }
  .about-section {
    gap: 35px;
  }
  .skill-group {
    padding: 20px;
  }
  .skills-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .skill-group:nth-child(2) {
    border-right: 0;
  }
  .skill-group:nth-child(-n + 2) {
    border-bottom: 1px solid var(--border);
  }
  .project-card {
    grid-column: span 3;
  }
  .project-card:last-child {
    grid-column: span 6;
  }
  .project-card:last-child .project-visual {
    height: 210px;
  }
  .project-card:last-child .project-content > p {
    max-width: 650px;
  }
}
@media (max-width: 700px) {
  html {
    scroll-padding-top: 80px;
  }
  .site-header {
    height: 70px;
    padding: 0 5%;
  }
  .wordmark {
    gap: 8px;
    font-size: 10px;
  }
  .brand-mark {
    font-size: 30px;
  }
  nav {
    gap: 16px;
    font-size: 10px;
  }
  .nav-contact {
    padding: 8px;
    gap: 6px;
  }
  .section-shell {
    padding-left: 6%;
    padding-right: 6%;
  }
  .hero-topline {
    padding-top: 25px;
  }
  .eyebrow {
    font-size: 8px;
    letter-spacing: 1px;
  }
  .hero-layout {
    grid-template-columns: 1fr;
    gap: 0;
  }
  .hero-copy {
    padding: 36px 0 10px;
  }
  h1 {
    font-size: clamp(40px, 8.6vw, 58px);
    letter-spacing: -2.5px;
  }
  .intro-line {
    font-size: 13px;
    margin-bottom: 18px;
  }
  .hero-description {
    font-size: 12px;
    margin-top: 20px;
  }
  .hero-role {
    font-size: 9px;
  }
  .hero-actions {
    margin-top: 22px;
  }
  .hero-location {
    font-size: 8px;
  }
  .core-stage {
    height: 380px;
    margin-top: 15px;
  }
  .core-top,
  .core-bottom {
    font-size: 7px;
  }
  .hero-footer {
    padding: 19px 0;
  }
  .hero-footer > div {
    gap: 10px;
    font-size: 6px;
  }
  .hero-index {
    display: none !important;
  }
  .hero-footer > span {
    font-size: 7px;
    gap: 7px;
  }
  .work-section,
  .about-section,
  .stack-section {
    padding-top: 55px;
    padding-bottom: 55px;
  }
  .section-heading {
    display: block;
  }
  .section-heading > p {
    margin-top: 16px;
    font-size: 11px;
  }
  .section-heading > p br {
    display: none;
  }
  .project-toolbar {
    align-items: start;
    margin-top: 25px;
  }
  .project-count {
    display: none;
  }
  .filters {
    gap: 1px;
  }
  .filters button {
    padding: 8px 10px;
    font-size: 9px;
  }
  .project-grid {
    grid-template-columns: 1fr;
    gap: 18px;
  }
  .project-card,
  .project-card:nth-child(-n + 2),
  .project-card:last-child {
    grid-column: auto;
  }
  .project-card .project-visual,
  .project-card:nth-child(-n + 2) .project-visual {
    height: 210px;
  }
  .project-content {
    padding: 21px;
  }
  .project-content > p {
    font-size: 12px;
  }
  .about-section {
    grid-template-columns: 1fr;
    gap: 30px;
  }
  .about-section h2 {
    font-size: 34px;
  }
  .education-panel {
    padding: 23px;
  }
  .skills-grid {
    grid-template-columns: 1fr 1fr;
  }
  .skill-group {
    padding: 20px 16px;
  }
  .skill-group h3 {
    font-size: 12px;
    line-height: 1.5;
  }
  .skill-items {
    font-size: 8px;
  }
  .contact-section {
    padding-top: 50px;
  }
  .contact-layout h2 {
    font-size: 50px;
  }
  .contact-layout p {
    line-height: 1.8;
    max-width: 300px;
  }
  .contact-orb {
    display: none;
  }
  .contact-email {
    font-size: 20px;
    gap: 12px;
  }
  .contact-links {
    flex-wrap: wrap;
    gap: 22px;
    margin-top: 40px;
  }
  .contact-links > span {
    margin-left: 0;
    width: 100%;
    line-height: 1.7;
  }
  .site-footer {
    gap: 15px;
    flex-wrap: wrap;
    font-size: 7px;
  }
  .site-footer > span {
    order: 3;
    width: 100%;
  }
  .dialog-inner {
    padding: 22px;
  }
  .dialog-footer {
    flex-wrap: wrap;
  }
  .dialog-footer .button {
    font-size: 10px;
  }
  .dialog-top .eyebrow {
    font-size: 7px;
  }
  h2 {
    font-size: 35px;
  }
}
@media (max-width: 370px) {
  nav {
    gap: 11px;
  }
  .wordmark > span:last-child {
    display: none;
  }
  .hero-actions {
    gap: 8px;
  }
  .button {
    padding: 12px;
    gap: 12px;
  }
  .hero-footer > div {
    gap: 7px;
  }
  .skills-grid {
    grid-template-columns: 1fr;
  }
  .skill-group {
    border-right: 0;
    border-bottom: 1px solid var(--border);
  }
  .hero-description br {
    display: none;
  }
}
@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
  *,
  *::before,
  *::after {
    animation: none !important;
    transition: none !important;
  }
}
```

## src/main.tsx

```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

## vite.config.ts

```ts
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = { ...loadEnv(mode, process.cwd(), ""), ...process.env };
  const host =
    env.VITE_SITE_URL ||
    (env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${env.VERCEL_PROJECT_PRODUCTION_URL}`
      : env.VERCEL_URL
        ? `https://${env.VERCEL_URL}`
        : "");
  const origin = host ? new URL(host).origin : "";
  return {
    plugins: [
      tailwindcss(),
      react(),
      {
        name: "portfolio-social-metadata",
        transformIndexHtml(html) {
          if (!origin) return html;
          const safeOrigin = origin
            .replaceAll("&", "&amp;")
            .replaceAll('"', "&quot;");
          return html
            .replaceAll(
              'content="/og-image.png"',
              `content="${safeOrigin}/og-image.png"`,
            )
            .replace(
              "</head>",
              `<link rel="canonical" href="${safeOrigin}/" /><meta property="og:url" content="${safeOrigin}/" /></head>`,
            );
        },
      },
    ],
  };
});
```

## package.json

```json
{
  "name": "portfolio",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "lint": "oxlint",
    "preview": "vite preview"
  },
  "dependencies": {
    "@react-three/drei": "^10.7.8",
    "@react-three/fiber": "^9.7.0",
    "@tailwindcss/vite": "^4.3.3",
    "@types/gsap": "^1.20.2",
    "@types/three": "^0.185.4",
    "clsx": "^2.1.1",
    "framer-motion": "^13.2.0",
    "gsap": "^3.15.0",
    "lenis": "^1.3.26",
    "lucide-react": "^1.43.0",
    "react": "^19.2.8",
    "react-dom": "^19.2.8",
    "tailwind-merge": "^3.6.0",
    "tailwindcss": "^4.3.3",
    "three": "^0.186.0"
  },
  "devDependencies": {
    "@types/node": "^24.13.3",
    "@types/react": "^19.2.18",
    "@types/react-dom": "^19.2.4",
    "@vitejs/plugin-react": "^6.1.0",
    "oxlint": "^1.79.0",
    "typescript": "~6.0.2",
    "vite": "^8.2.2"
  }
}
```

## tsconfig.json

```json
{
  "files": [],
  "references": [
    { "path": "./tsconfig.app.json" },
    { "path": "./tsconfig.node.json" }
  ]
}
```

## tsconfig.app.json

```json
{
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.app.tsbuildinfo",
    "target": "es2023",
    "lib": ["ES2023", "DOM"],
    "module": "esnext",
    "types": ["vite/client"],
    "allowArbitraryExtensions": true,
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "verbatimModuleSyntax": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",

    /* Linting */
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "erasableSyntaxOnly": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"]
}
```

## tsconfig.node.json

```json
{
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.node.tsbuildinfo",
    "target": "es2023",
    "lib": ["ES2023"],
    "types": ["node"],
    "skipLibCheck": true,

    /* Bundler mode */
    "module": "nodenext",
    "allowImportingTsExtensions": true,
    "verbatimModuleSyntax": true,
    "moduleDetection": "force",
    "noEmit": true,

    /* Linting */
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "erasableSyntaxOnly": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["vite.config.ts"]
}
```

## public/favicon.svg

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <rect width="100" height="100" rx="20" fill="#060709"/>
  <rect x="2" y="2" width="96" height="96" rx="18" fill="none" stroke="#1F2937" stroke-width="2"/>
  <path d="M 25 30 L 75 30 M 50 30 L 50 75 M 35 75 L 65 75" stroke="#00F0FF" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>
  <circle cx="50" cy="50" r="3" fill="#FFFFFF"/>
</svg>
```

