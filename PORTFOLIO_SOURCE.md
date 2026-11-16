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
    <meta name="theme-color" content="#0c0c0b" />
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
      content="Muhammed Tamim Baig — I design it. I build it."
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
      content="Tamim — Robotics, Intelligence, and the Web. I design it. I build it."
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
    <meta name="twitter:image:alt" content="Tamim — I design it. I build it." />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Archivo:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap"
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
import { Component, useEffect, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Edges } from "@react-three/drei";
import { useReducedMotion } from "framer-motion";
import type { MotionValue } from "framer-motion";
import * as THREE from "three";
import { Monogram } from "./Monogram";

import glyphs from "../data/monogram.json";

function makeShape(glyph: (typeof glyphs)[number]) {
  const trace = (path: THREE.Path, vertices: number[][]) => {
    vertices.forEach(([x,y], i) => {
      const px = (x-120)/48, py = (172-y)/48;
      if (i === 0) path.moveTo(px,py);
      else path.lineTo(px,py);
    });
    path.closePath();
  };
  const shape = new THREE.Shape();
  trace(shape, glyph.outline);
  for (const counter of glyph.holes) {
    const hole = new THREE.Path();
    trace(hole, counter);
    shape.holes.push(hole);
  }
  return new THREE.ExtrudeGeometry(shape, {
    depth: 0.18,
    bevelEnabled: true,
    bevelThickness: 0.016,
    bevelSize: 0.012,
    bevelSegments: 1,
    steps: 1,
  });
}

function MarkScene({
  progress,
  still,
}: {
  progress: MotionValue<number>;
  still: boolean;
}) {
  const group = useRef<THREE.Group>(null);
  const tunnel = useRef<THREE.Group>(null);
  const solid = useRef<THREE.MeshStandardMaterial>(null);
  const rightSolid = useRef<THREE.MeshStandardMaterial>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const current = useRef(0);
  const { size } = useThree();
  const shapes = useMemo(
    () => glyphs.map(makeShape),
    [],
  );
  useEffect(
    () => () => shapes.forEach((geometry) => geometry.dispose()),
    [shapes],
  );
  useEffect(() => {
    const move = (event: PointerEvent) => {
      pointer.current = {
        x: event.clientX / window.innerWidth - 0.5,
        y: event.clientY / window.innerHeight - 0.5,
      };
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, []);
  useFrame(({ camera, clock }, delta) => {
    if (!group.current || !tunnel.current || !solid.current) return;
    const dt = Math.min(delta, 0.05);
    const target = still ? current.current : progress.get();
    current.current = THREE.MathUtils.damp(current.current, target, 5, dt);
    const p = current.current;
    if (!still) {
      group.current.rotation.y = THREE.MathUtils.damp(
        group.current.rotation.y,
        -0.38 + p * Math.PI * 1.5 + pointer.current.x * 0.12,
        3,
        dt,
      );
      group.current.rotation.z = THREE.MathUtils.damp(
        group.current.rotation.z,
        p * Math.PI * 0.38,
        3,
        dt,
      );
      group.current.rotation.x = THREE.MathUtils.damp(
        group.current.rotation.x,
        pointer.current.y * 0.06,
        3,
        dt,
      );
      tunnel.current.rotation.z = p * 0.8;
      tunnel.current.position.z = p * 15;
      camera.position.z = THREE.MathUtils.damp(
        camera.position.z,
        (size.width < 700 ? 16 : 14.5) - Math.sin(p * Math.PI) * 7,
        4,
        dt,
      );
      camera.position.x = THREE.MathUtils.damp(
        camera.position.x,
        Math.sin(p * Math.PI) * 1.3,
        4,
        dt,
      );
      camera.lookAt(0, 0, 0);
      solid.current.opacity = 1 - Math.sin(p * Math.PI) * 0.95;
      if (rightSolid.current)
        rightSolid.current.opacity = solid.current.opacity;
      group.current.position.y = Math.sin(clock.elapsedTime * 0.35) * 0.025;
    }
  });
  return (
    <>
      <ambientLight intensity={1.5} />
      <directionalLight position={[-4, 6, 8]} intensity={3.5} color="#fffdf6" />
      <directionalLight position={[4, -1, -4]} intensity={2} color="#b9b9b9" />
      <pointLight position={[1, 0, -4]} intensity={18} color="#eceae4" />
      <group
        ref={group}
        rotation={[0, -0.38, 0]}
        scale={size.width < 700 ? [0.9, 0.82, 1] : [1.2, 1.13, 1]}
      >
        <mesh geometry={shapes[0]}>
          <meshStandardMaterial
            ref={solid}
            color="#eceae4"
            roughness={0.65}
            metalness={0.08}
            transparent
          />
          <Edges color="#f5f3ed" threshold={20} />
        </mesh>
        <mesh geometry={shapes[1]}>
          <meshStandardMaterial
            ref={rightSolid}
            color="#eceae4"
            roughness={0.65}
            metalness={0.08}
            transparent
          />
          <Edges color="#f5f3ed" threshold={20} />
        </mesh>
      </group>
      <group ref={tunnel}>
        {Array.from({ length: 9 }, (_, i) => (
          <group
            key={i}
            position={[0, 0, -6 - i * 5]}
            rotation={[0, 0, -0.1 + i * 0.085]}
            scale={1.15 + i * 0.2}
          >
            {shapes.map((geometry, j) => (
              <mesh geometry={geometry} key={j}>
                <meshBasicMaterial transparent opacity={0} depthWrite={false} />
                <Edges
                  color="#b5b3ae"
                  transparent
                  opacity={0.24 - i * 0.018}
                  threshold={20}
                />
              </mesh>
            ))}
          </group>
        ))}
      </group>
      <fog attach="fog" args={["#0c0c0b", 20, 70]} />
    </>
  );
}
function Fallback() {
  return (
    <div className="scene-fallback">
      <Monogram />
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
export default function Scene3D({
  progress,
  paused = false,
}: {
  progress: MotionValue<number>;
  paused?: boolean;
}) {
  const reduced = useReducedMotion();
  const container = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const [tabVisible, setTabVisible] = useState(true);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) =>
      setVisible(entry.isIntersecting),
    );
    if (container.current) observer.observe(container.current);
    const update = () => setTabVisible(!document.hidden);
    document.addEventListener("visibilitychange", update);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", update);
    };
  }, []);
  const still = paused || !!reduced || !visible || !tabVisible;
  return (
    <div
      className="scene-canvas"
      ref={container}
      role="img"
      aria-label="Sculptural TB monogram for Tamim Baig, turning from a solid form into a wireframe tunnel as you scroll"
    >
      <SceneBoundary>
        <Canvas
          dpr={[1, 2]}
          camera={{ position: [0, 0, 14.5], fov: 38 }}
          frameloop={still ? "demand" : "always"}
          gl={{
            alpha: true,
            antialias: true,
            powerPreference: "high-performance",
          }}
          fallback={<Fallback />}
        >
          <MarkScene progress={progress} still={still} />
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
import { lazy, Suspense, useEffect, useRef, useState } from "react";
import {
  motion,
  MotionConfig,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowUpRight, ArrowUp, Plus, X, Pause, Play } from "lucide-react";
import { profile, projects, skills } from "./data/portfolio";
import type { Project } from "./data/portfolio";
import { ProjectModal } from "./components/ProjectModal";
import { ProjectPreview } from "./components/ProjectPreview";
import { Monogram } from "./components/Monogram";

const Scene3D = lazy(() => import("./components/Scene3D"));
const chapters = [
  {
    label: "01 · the idea",
    text: "Every system starts with a little curiosity.",
  },
  {
    label: "02 · the connection",
    text: "Code, intelligence, and the physical world.",
  },
  {
    label: "03 · the process",
    text: "From the first prototype to the final interaction.",
  },
  {
    label: "04 · the build",
    text: "I connect the pieces. Then I make them work.",
  },
];

function LocalTime() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const update = () =>
      setTime(
        new Intl.DateTimeFormat("en-GB", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }).format(new Date()),
      );
    update();
    const timer = window.setInterval(update, 30000);
    return () => window.clearInterval(timer);
  }, []);
  return (
    <span className="local-time">
      India · {time || "IST"} <span>GMT+5:30</span>
    </span>
  );
}

function Navigation() {
  const [open, setOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open || !dialog.current) return;
    const element = dialog.current;
    const overflow = document.body.style.overflow;
    element.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      element.close();
      document.body.style.overflow = overflow;
      trigger.current?.focus({ preventScroll: true });
    };
  }, [open]);
  const links = [
    ["Work", "#work"],
    ["About", "#about"],
    ["Stack", "#stack"],
    ["Contact", "#contact"],
  ];
  return (
    <>
      <header className="site-nav">
        <a className="logo" href="#top" aria-label="Tamim home">
          <Monogram />
        </a>
        <nav aria-label="Main navigation">
          {links.map(([name, href]) => (
            <a key={name} href={href}>
              <span>{name}</span>
              <span aria-hidden="true">{name}</span>
            </a>
          ))}
        </nav>
        <a className="pill nav-cta" href="#contact">
          Get in touch <ArrowUpRight size={14} />
        </a>
        <button
          ref={trigger}
          className="pill menu-button"
          onClick={() => setOpen(true)}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          <span>—</span> Menu
        </button>
      </header>
      <dialog
        id="mobile-menu"
        ref={dialog}
        className="menu-dialog"
        onCancel={(e) => {
          e.preventDefault();
          setOpen(false);
        }}
      >
        <div className="menu-top">
          <a href="#top" onClick={() => setOpen(false)} aria-label="Tamim home">
            <Monogram />
          </a>
          <button autoFocus className="pill" onClick={() => setOpen(false)}>
            Close <X size={16} />
          </button>
        </div>
        <p className="menu-caption">
          Muhammed Tamim Baig
          <br />
          Engineer. Builder. Always curious.
        </p>
        <nav aria-label="Mobile navigation">
          {[["Home", "#top"], ...links].map(([name, href], i) => (
            <a key={name} href={href} onClick={() => setOpen(false)}>
              {name}
              <sup>0{i + 1}</sup>
            </a>
          ))}
        </nav>
        <div className="menu-bottom">
          <a href={profile.github} target="_blank" rel="noreferrer">
            GitHub ↗
          </a>
          <LocalTime />
        </div>
      </dialog>
    </>
  );
}

function Hero() {
  const section = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const { scrollYProgress } = useScroll({
    target: section,
    offset: ["start start", "end end"],
  });
  const [angle, setAngle] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (value) =>
    setAngle(Math.round(value * 180)),
  );
  const introOpacity = Math.max(0, Math.min(1, (28 - angle) / 18));
  const narrativeOpacity = Math.max(
    0,
    Math.min(1, (angle - 22) / 16, (180 - angle) / 18),
  );
  const chapter = Math.min(
    3,
    Math.max(0, Math.floor((angle / 180 - 0.14) * 4.8)),
  );
  return (
    <section
      id="top"
      ref={section}
      className="hero-scroll"
      aria-label="Tamim, engineering ideas into reality"
    >
      <div className="hero-stage">
        <Suspense
          fallback={
            <div className="scene-fallback">
              <Monogram />
            </div>
          }
        >
          <Scene3D progress={scrollYProgress} paused={paused} />
        </Suspense>
        <div className="hero-vignette" />
        <motion.div
          className="hero-intro"
          inert={!reduced && angle > 28}
          style={{ opacity: reduced ? 1 : introOpacity }}
        >
          <div className="hero-eyebrow">
            <span>Tamim / Robotics & AI</span>
            <LocalTime />
          </div>
          <h1>
            <span className="hero-line-one">I design it.</span>
            <span className="hero-line-two">I build it.</span>
            <span className="sr-only">
              Muhammed Tamim Baig — {profile.role}
            </span>
          </h1>
          <div className="hero-summary">
            <p>
              Code, intelligence, and the physical world. I bring them together
              to build systems that work beyond the screen.
            </p>
            <span>Robotics & AI student · VIAT / VTU · 2024–2028</span>
          </div>
          <a className="pill pill-filled hero-cta" href="#contact">
            Get in touch <ArrowUpRight size={17} />
          </a>
        </motion.div>
        {!reduced && (
          <motion.div
            className="hero-narrative"
            style={{ opacity: narrativeOpacity }}
            aria-hidden={angle < 24}
          >
            <p>{chapters[chapter].label}</p>
            <motion.h2
              key={chapter}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {chapters[chapter].text}
            </motion.h2>
          </motion.div>
        )}
        <div className="hero-dial" aria-hidden="true">
          <span>{String(reduced ? 0 : angle).padStart(3, "0")}°</span>
          <p>
            {angle < 25
              ? "Scroll to go through the idea"
              : angle < 100
                ? "i · imagination"
                : "b · build"}
          </p>
        </div>
        <button
          className="motion-toggle"
          onClick={() => setPaused(!paused)}
          aria-label={paused ? "Resume 3D motion" : "Pause 3D motion"}
          aria-pressed={paused}
        >
          {paused ? <Play size={12} /> : <Pause size={12} />}
        </button>
      </div>
    </section>
  );
}

function SelectedWork({ onSelect }: { onSelect: (project: Project) => void }) {
  const [hovered, setHovered] = useState<string | null>(null);
  const active = projects.find((p) => p.id === hovered);
  return (
    <section className="work-section light-section" id="work">
      <div className="section-heading wrap">
        <h2>Imagined, then built.</h2>
        <p>
          Five projects across AI, the web, and robotics. Different problems.
          The same curiosity.
          <br />
          <span className="subtle">Point at a name to explore it.</span>
        </p>
      </div>
      <div className="project-list wrap" onMouseLeave={() => setHovered(null)}>
        {projects.map((project, index) => (
          <article
            className={
              "project-row " + (hovered === project.id ? "is-active" : "")
            }
            key={project.id}
          >
            <button
              className="project-row-button"
              onMouseEnter={() => setHovered(project.id)}
              onFocus={() => setHovered(project.id)}
              onBlur={() => setHovered(null)}
              onClick={() => onSelect(project)}
              aria-label={"Explore " + project.name + " architecture"}
            >
              <span className="row-number">0{index + 1}</span>
              <h3>
                {project.name === "AI-Powered Plastic Sorter" ? (
                  <>
                    Plastic
                    <br className="sorter-break" /> Sorter
                  </>
                ) : (
                  project.name
                )}
              </h3>
              <span className="row-details">
                <span>{project.category}</span>
                <span>{project.description}</span>
                <span className="row-action">
                  Explore the architecture <ArrowUpRight size={13} />
                </span>
              </span>
            </button>
          </article>
        ))}
        <div className={"hover-preview " + (active ? "shown" : "")}>
          {active && <ProjectPreview project={active} />}
        </div>
      </div>
      <div className="work-bottom wrap">
        <span>Built from curiosity. Open to possibility.</span>
        <a
          className="pill pill-dark"
          href={profile.github}
          target="_blank"
          rel="noreferrer"
        >
          Explore GitHub <ArrowUpRight size={16} />
        </a>
      </div>
    </section>
  );
}

function Construction() {
  const section = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: section,
    offset: ["start end", "end start"],
  });
  const rotate = useTransform(scrollYProgress, [0, 1], [-23.6, 23.6]);
  return (
    <section id="about" ref={section} className="construction-section">
      <div className="construction-top wrap">
        <span>02 · The person, behind the systems</span>
        <span>Muhammed Tamim Baig</span>
      </div>
      <div className="construction-grid wrap">
        <div className="construction-note">
          <span className="tiny-label">01 / CURIOSITY</span>
          <h3>
            One idea.
            <br />
            Every dimension.
          </h3>
          <p>
            I’m Tamim, a Robotics & AI engineering student exploring how
            software, intelligence, and physical systems come together.
          </p>
        </div>
        <motion.div
          className="construction-drawing"
          style={{ rotate }}
          aria-hidden="true"
        >
          <div className="drawing-grid" />
          <div className="drawing-circle" />
          <Monogram wire />
          <div className="drawing-axis axis-x" />
          <div className="drawing-axis axis-y" />
          <span className="drawing-angle">23.6°</span>
          <span className="drawing-point">P / 01</span>
          <i className="pivot" />
        </motion.div>
        <div className="construction-note note-right">
          <span className="tiny-label">02 / PRACTICE</span>
          <h3>
            Imagined,
            <br />
            then engineered.
          </h3>
          <p>
            From LLM agents and immersive web experiences to computer vision and
            custom hardware. I like connecting the whole system.
          </p>
        </div>
      </div>
      <div className="construction-bottom wrap">
        <span>Curiosity → Prototype → System</span>
        <span>
          Idea <i /> Form | 02
        </span>
      </div>
    </section>
  );
}

function MiniSite({ blueprint = false }: { blueprint?: boolean }) {
  return (
    <div
      className={"mini-site " + (blueprint ? "mini-blueprint" : "")}
      aria-hidden="true"
    >
      <div className="mini-nav">
        <Monogram />
        <span>Work　 About　 Stack　 Contact</span>
        <span>Get in touch ↗</span>
      </div>
      <div className="mini-role">
        <span>Tamim / Robotics & AI</span>
        <span>India · GMT+5:30</span>
      </div>
      <div className="mini-first">I design it.</div>
      <Monogram className="mini-monogram" wire={blueprint} />
      <div className="mini-second">I build it.</div>
      <div className="mini-summary">
        Code, intelligence, and
        <br />
        the physical world.
      </div>
      <span className="mini-degree">023°</span>
      {blueprint && (
        <>
          <span className="measure-label">Display · form / function</span>
          <div className="measure-line" />
        </>
      )}
    </div>
  );
}

function Blueprint() {
  const [split, setSplit] = useState(50);
  return (
    <section className="blueprint-section" id="stack">
      <div className="section-heading wrap">
        <h2>
          One idea.
          <br />
          Both sides of the screen.
        </h2>
        <p>
          From the first sketch to a working system. Move the line to explore
          the blueprint and the finished experience.
        </p>
      </div>
      <div className="comparison wrap">
        <div className="comparison-frame">
          <MiniSite />
          <div
            className="blueprint-layer"
            style={{
              clipPath:
                "polygon(0 0," +
                Math.min(split + 12, 100) +
                "% 0," +
                Math.max(split - 12, 0) +
                "% 100%,0 100%)",
            }}
          >
            <MiniSite blueprint />
          </div>
          <div className="comparison-divider" style={{ left: split + "%" }}>
            <span>
              <ArrowUpRight size={18} />
            </span>
          </div>
          <input
            className="comparison-input"
            type="range"
            min="12"
            max="88"
            value={split}
            onChange={(e) => setSplit(Number(e.target.value))}
            aria-label="Blueprint and finished design comparison"
            aria-valuetext={split + " percent blueprint"}
          />
        </div>
        <div className="comparison-caption">
          <span>
            i · imagination <span>Blueprint / the system</span>
          </span>
          <span>
            <span>Live / the experience</span> b · build
          </span>
        </div>
      </div>
      <div className="capabilities wrap">
        <div className="capability-column">
          <div className="capability-heading">
            <h3>Intelligence</h3>
            <span>Before the build · 03</span>
          </div>
          {[...skills[0].items, ...skills[2].items].map((skill, i) => (
            <div className="capability-item" key={skill}>
              <span>i.{i + 1}</span>
              <span>{skill}</span>
              <Plus size={15} />
            </div>
          ))}
        </div>
        <div className="capability-column">
          <div className="capability-heading">
            <span>04 · Beyond the screen</span>
            <h3>Production</h3>
          </div>
          {[...skills[1].items, ...skills[3].items].map((skill, i) => (
            <div className="capability-item" key={skill}>
              <span>b.{i + 1}</span>
              <span>{skill}</span>
              <Plus size={15} />
            </div>
          ))}
        </div>
      </div>
      <div className="stack-foot wrap">
        <span>Software. Intelligence. Hardware.</span>
        <a
          href={profile.github}
          target="_blank"
          rel="noreferrer"
          className="pill"
        >
          See what I’m building <ArrowUpRight size={15} />
        </a>
      </div>
    </section>
  );
}

function Education() {
  return (
    <section className="education-section light-section">
      <div className="education-top wrap">
        <span>05 / Always a student</span>
        <span>2024 — 2028</span>
      </div>
      <div className="education-main wrap">
        <span className="quote-symbol">“</span>
        <h2>
          Curiosity is my
          <br />
          operating system.
        </h2>
        <div className="education-credit">
          <span className="avatar-mark">T</span>
          <div>
            <span>{profile.name}</span>
            <p>{profile.role}</p>
          </div>
        </div>
      </div>
      <div className="education-facts wrap">
        <div>
          <span className="fact-label">The degree</span>
          <h3>{profile.education}</h3>
        </div>
        <div>
          <span className="fact-label">The place</span>
          <h3>{profile.institution}</h3>
          <p>{profile.campus}</p>
        </div>
        <div>
          <span className="fact-label">The journey</span>
          <span className="education-year">
            2024<span>—28</span>
          </span>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <footer id="contact" className="contact-section">
      <div className="contact-top wrap">
        <span>
          <i className="availability-dot" /> Let’s make something meaningful.
        </span>
        <LocalTime />
      </div>
      <div className="wrap">
        <h2>
          Something
          <br />
          worth building?
        </h2>
        <a className="email-link" href={"mailto:" + profile.email}>
          <span>{profile.email}</span>
          <ArrowUpRight />
        </a>
      </div>
      <div className="footer-grid wrap">
        <div className="footer-signature">
          <Monogram />
          <span>tamim baig</span>
        </div>
        <div>
          <h3>Explore</h3>
          <a href="#top">Home</a>
          <a href="#work">Work</a>
          <a href="#about">About</a>
          <a href="#stack">Stack</a>
        </div>
        <div>
          <h3>Connect</h3>
          <a href={profile.github} target="_blank" rel="noreferrer">
            GitHub ↗
          </a>
          <a href={"mailto:" + profile.email}>Email ↗</a>
        </div>
        <div>
          <h3>Contact</h3>
          <a href={"mailto:" + profile.email}>{profile.email}</a>
          <p>{profile.location}</p>
          <span>GMT+5:30</span>
        </div>
      </div>
      <div className="footer-bottom wrap">
        <span>
          © {new Date().getFullYear()} {profile.name} · From idea to reality.
        </span>
        <a href="#top">
          Back to top <ArrowUp size={14} />
        </a>
      </div>
    </footer>
  );
}

export function App() {
  const [selected, setSelected] = useState<Project | null>(null);
  return (
    <MotionConfig reducedMotion="user">
      <a className="skip-link" href="#work">
        Skip to projects
      </a>
      <Navigation />
      <main>
        <Hero />
        <SelectedWork onSelect={setSelected} />
        <Construction />
        <Blueprint />
        <Education />
      </main>
      <Contact />
      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </MotionConfig>
  );
}
export default App;
```

## src/components/ProjectPreview.tsx

```tsx
import type { Project } from "../data/portfolio";
import {
  ArrowUpRight,
  Play,
  ShieldCheck,
  ScanLine,
  Wind,
  BookOpen,
} from "lucide-react";

export function ProjectPreview({ project }: { project: Project }) {
  return (
    <div
      className={"project-preview preview-" + project.visual}
      aria-hidden="true"
    >
      <div className="preview-top">
        <span>{project.name}</span>
        <span>↗</span>
      </div>
      {project.visual === "security" && (
        <>
          <div className="preview-title">
            <ShieldCheck size={28} />
            <span>
              Security.
              <br />
              Built into the loop.
            </span>
          </div>
          <div className="security-flow">
            <span>PLAN</span>
            <i />
            <span>EXECUTE</span>
            <i />
            <span>VERIFY</span>
          </div>
          <div className="preview-console">
            <p>
              <b>›</b> Initialize testing workflow
            </p>
            <p>
              <b>›</b> Browser execution · Playwright
            </p>
            <p>
              <b>›</b> Safe patching & verification
            </p>
          </div>
        </>
      )}
      {project.visual === "music" && (
        <>
          <div className="record">
            <div />
            <span>A</span>
          </div>
          <div className="music-caption">
            <span>
              A different
              <br />
              kind of listening.
            </span>
            <Play size={22} fill="currentColor" />
          </div>
          <div className="waveform">
            {Array.from({ length: 32 }, (_, i) => (
              <i key={i} style={{ height: 10 + ((i * 19) % 45) }} />
            ))}
          </div>
        </>
      )}
      {project.visual === "city" && (
        <>
          <div className="preview-title">
            <Wind size={30} />
            <span>
              Better air.
              <br />
              Resilient cities.
            </span>
          </div>
          <div className="city-chart">
            {[35, 52, 40, 65, 48, 73, 60, 82, 62, 91, 80, 100].map((n, i) => (
              <i key={i} style={{ height: n + "%" }} />
            ))}
          </div>
          <span className="preview-foot">
            CLEAN AIR / CLIMATE / CIVIC WORKFLOWS
          </span>
        </>
      )}
      {project.visual === "study" && (
        <>
          <div className="preview-title">
            <BookOpen size={30} />
            <span>
              A little curiosity.
              <br />A lot of possibility.
            </span>
          </div>
          <div className="study-question">
            What will you learn today?
            <ArrowUpRight size={18} />
          </div>
          <div className="study-chips">
            <span>Explore</span>
            <span>Understand</span>
            <span>Build</span>
          </div>
        </>
      )}
      {project.visual === "robot" && (
        <>
          <div className="preview-title">
            <ScanLine size={30} />
            <span>
              See it.
              <br />
              Sort it.
            </span>
          </div>
          <div className="sorter-diagram">
            <span>VISION</span>
            <i />
            <span>CONTROL</span>
            <i />
            <span>SORT</span>
          </div>
          <span className="preview-foot">
            RASPBERRY PI × ARDUINO / PALS INNOVA
          </span>
        </>
      )}
    </div>
  );
}
```

## src/components/Monogram.tsx

```tsx
import glyphs from "../data/monogram.json";

export function Monogram({
  className = "",
  wire = false,
}: {
  className?: string;
  wire?: boolean;
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 240 320"
      fill={wire ? "none" : "currentColor"}
      stroke={wire ? "currentColor" : "none"}
      strokeWidth="1"
      aria-hidden="true"
    >
      {glyphs.map(({letter, outline, holes}) => (
        <path key={letter} fillRule="evenodd" d={[outline,...holes].map(points =>
          "M" + points.map(pair => pair.join(" ")).join(" ") + "Z"
        ).join(" ")} />
      ))}
    </svg>
  );
}
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
@import "tailwindcss" source(none);
@source "./App.tsx";
@source "./components/ProjectModal.tsx";
@source "./components/ProjectPreview.tsx";

:root {
  font-family: "Archivo", "Helvetica Neue", Arial, sans-serif;
  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  color: #eceae4;
  background: #0c0c0b;
  --ink: #0c0c0b;
  --bone: #eceae4;
  --muted: #8c8a84;
  --accent: #ff4f2b;
  --line: #eceae424;
  --pad: 40px;
}
* {
  box-sizing: border-box;
}
body {
  margin: 0;
}
html {
  scroll-behavior: smooth;
  scroll-padding-top: 80px;
}
button,
a,
input {
  -webkit-tap-highlight-color: transparent;
}
button,
input {
  font: inherit;
}
button {
  cursor: pointer;
  color: inherit;
  background: none;
  border: 0;
}
a {
  color: inherit;
  text-decoration: none;
}
h1,
h2,
h3,
h4,
p {
  margin: 0;
}
a,
button {
  touch-action: manipulation;
}
svg {
  flex-shrink: 0;
}
::selection {
  background: #ff4f2b;
  color: #0c0c0b;
}
button:focus-visible,
a:focus-visible,
input:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 6px;
}
.wrap {
  width: min(100%, 1680px);
  padding-inline: var(--pad);
  margin-inline: auto;
}
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
}
.skip-link {
  position: fixed;
  z-index: 100;
  top: -60px;
  left: 20px;
  background: var(--bone);
  color: var(--ink);
  padding: 12px;
}
.skip-link:focus {
  top: 10px;
}
.site-nav {
  position: fixed;
  inset: 0 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 80px;
  padding: 0 var(--pad);
  z-index: 40;
  mix-blend-mode: difference;
  color: #eceae4;
  pointer-events: none;
}
.site-nav > * {
  pointer-events: auto;
}
.logo {
  display: block;
  width: 25px;
  height: 36px;
}
.logo svg {
  width: 100%;
  height: 100%;
}
.site-nav nav {
  display: flex;
  gap: 40px;
  margin-left: 100px;
}
.site-nav nav a {
  font-size: 14px;
  position: relative;
  height: 20px;
  overflow: hidden;
  display: block;
}
.site-nav nav a span {
  display: block;
  transition: transform 0.35s;
}
.site-nav nav a:hover span {
  transform: translateY(-100%);
}
.pill {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 18px;
  font-size: 14px;
  border: 1px solid currentColor;
  border-radius: 100px;
  padding: 13px 18px;
  line-height: 1.2;
  transition:
    background 0.2s,
    color 0.2s;
}
.pill:hover {
  background: var(--bone);
  color: var(--ink);
}
.pill-filled {
  background: var(--bone);
  color: var(--ink);
  border-color: var(--bone);
  padding: 18px 25px;
}
.pill-filled:hover {
  background: var(--accent);
  border-color: var(--accent);
}
.pill-dark {
  color: var(--ink);
}
.pill-dark:hover {
  background: var(--ink);
  color: var(--bone);
}
.menu-button {
  display: none;
}
.menu-dialog {
  inset: 0;
  width: 100%;
  max-width: 100%;
  height: 100dvh;
  max-height: 100dvh;
  margin: 0;
  border: 0;
  padding: 20px;
  background: var(--ink);
  color: var(--bone);
}
.menu-dialog::backdrop {
  background: var(--ink);
}
.menu-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.menu-top svg {
  width: 24px;
  height: 35px;
}
.menu-top .pill svg {
  width: 16px;
  height: 16px;
}
.menu-caption {
  color: var(--muted);
  font-size: 14px;
  line-height: 1.7;
  margin-top: 42px;
}
.menu-dialog nav {
  display: flex;
  flex-direction: column;
  margin-top: 30px;
}
.menu-dialog nav a {
  font-size: clamp(38px, 8vh, 70px);
  font-weight: 300;
  letter-spacing: -0.05em;
  border-bottom: 1px solid var(--line);
  padding: 7px 0;
}
.menu-dialog nav sup {
  font-size: 12px;
  color: var(--muted);
  letter-spacing: 0;
  vertical-align: top;
  display: inline-block;
  margin: 9px 0 0 15px;
}
.menu-bottom {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  flex-wrap: wrap;
  font-size: 13px;
  margin-top: 32px;
}
.hero-scroll {
  height: 520svh;
  position: relative;
}
.hero-stage {
  position: sticky;
  top: 0;
  height: 100svh;
  min-height: 640px;
  isolation: isolate;
  overflow: hidden;
  background: #0c0c0b;
}
.scene-canvas {
  position: absolute;
  inset: 0;
  z-index: -2;
}
.hero-vignette {
  position: absolute;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  background:
    radial-gradient(ellipse at 51% 43%, transparent 20%, #0c0c0b50 75%),
    url("data:image/svg+xml,%3Csvg viewBox='0 0 160 160' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Cpath fill='%23fff' opacity='.07' filter='url(%23n)' d='M0 0h160v160H0z'/%3E%3C/svg%3E");
}
.hero-intro {
  height: 100%;
  pointer-events: none;
}
.hero-intro a {
  pointer-events: auto;
}
.hero-eyebrow {
  position: absolute;
  inset: 105px var(--pad) auto;
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  line-height: 20px;
}
.local-time {
  white-space: nowrap;
}
.hero-line-one,
.hero-line-two {
  position: absolute;
  font-size: clamp(48px, 5.5vw, 88px);
  font-weight: 300;
  line-height: 1;
  letter-spacing: -0.06em;
}
.hero-line-one {
  top: 28%;
  left: var(--pad);
}
.hero-line-two {
  top: 56%;
  right: var(--pad);
}
.hero-summary {
  position: absolute;
  left: var(--pad);
  bottom: 38px;
  width: 35%;
  max-width: 410px;
}
.hero-summary p {
  font-size: 20px;
  line-height: 1.4;
  letter-spacing: -0.025em;
}
.hero-summary > span {
  display: block;
  font-size: 12px;
  color: #9d9b95;
  margin-top: 15px;
  line-height: 1.5;
}
.hero-cta {
  position: absolute;
  right: var(--pad);
  bottom: 32px;
}
.hero-dial {
  position: absolute;
  bottom: 27px;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  pointer-events: none;
}
.hero-dial > span {
  font-size: 56px;
  color: var(--accent);
  font-weight: 300;
  letter-spacing: -0.075em;
  font-variant-numeric: tabular-nums;
}
.hero-dial p {
  font-size: 12px;
  margin-top: 5px;
}
.hero-narrative {
  position: absolute;
  left: var(--pad);
  top: 36%;
  max-width: 520px;
  pointer-events: none;
}
.hero-narrative > p {
  font-size: 14px;
  margin-bottom: 22px;
}
.hero-narrative h2 {
  font-size: clamp(40px, 4.6vw, 68px);
  font-weight: 300;
  line-height: 1.02;
  letter-spacing: -0.055em;
}
.motion-toggle {
  position: absolute;
  bottom: 28px;
  left: calc(50% + 130px);
  color: var(--muted);
  padding: 10px;
}
.scene-fallback {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.scene-fallback svg {
  height: 61%;
  width: auto;
  transform: rotate(-7deg);
  color: var(--bone);
}
.light-section {
  background: var(--bone);
  color: var(--ink);
}
.work-section {
  position: relative;
  padding-block: 140px 100px;
  z-index: 2;
}
.section-heading {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 65px;
  align-items: start;
}
.section-heading h2 {
  font-size: clamp(48px, 6.3vw, 96px);
  line-height: 0.94;
  font-weight: 300;
  letter-spacing: -0.055em;
  max-width: 950px;
}
.section-heading > p {
  font-size: 20px;
  line-height: 1.4;
  letter-spacing: -0.025em;
  max-width: 420px;
  padding-top: 5px;
}
.section-heading .subtle {
  display: inline-block;
  font-size: 14px;
  color: #77766f;
  margin-top: 16px;
}
.project-list {
  position: relative;
  margin-top: 80px;
}
.project-row {
  border-top: 1px solid #0c0c0b24;
}
.project-row:last-of-type {
  border-bottom: 1px solid #0c0c0b24;
}
.project-row-button {
  display: grid;
  grid-template-columns: 65px 1fr 300px;
  gap: 32px;
  align-items: center;
  min-height: 168px;
  padding: 22px 0;
  width: 100%;
  text-align: left;
}
.row-number {
  font-size: 14px;
  align-self: start;
  padding-top: 12px;
}
.project-row h3 {
  font-size: clamp(54px, 7.3vw, 112px);
  font-weight: 300;
  line-height: 1;
  letter-spacing: -0.065em;
  color: #b5b3ac;
  transition:
    color 0.3s,
    transform 0.4s;
}
.project-row.is-active h3 {
  color: var(--ink);
  transform: translateX(12px);
}
.row-details {
  display: flex;
  flex-direction: column;
  text-align: right;
  gap: 7px;
  font-size: 14px;
  line-height: 1.55;
}
.row-details > span:nth-child(2) {
  font-size: 14px;
  color: #5f5d57;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.row-action {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  align-items: center;
  margin-top: 3px;
}
.sorter-break {
  display: none;
}
.hover-preview {
  position: absolute;
  pointer-events: none;
  left: 48%;
  top: 15%;
  width: 36%;
  max-width: 490px;
  opacity: 0;
  transform: translateY(20px) rotate(-3deg);
  transition:
    opacity 0.3s,
    transform 0.4s;
  z-index: 3;
}
.hover-preview.shown {
  opacity: 1;
  transform: translateY(0) rotate(-3deg);
}
.work-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  margin-top: 48px;
  font-size: 14px;
}
.project-preview {
  aspect-ratio: 1.48;
  border-radius: 8px;
  background: #15191b;
  color: #eceae4;
  padding: 25px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 20px 50px #0002;
  font-family: "Archivo", sans-serif;
}
.preview-top {
  display: flex;
  justify-content: space-between;
  font-size: 9px;
  letter-spacing: 1px;
}
.preview-title {
  display: flex;
  gap: 20px;
  align-items: start;
  font-size: 27px;
  letter-spacing: -1px;
  line-height: 1.05;
  margin-top: 25px;
}
.preview-title > svg {
  color: #95bd99;
}
.security-flow {
  display: flex;
  align-items: center;
  gap: 9px;
  font-size: 7px;
  color: #acc4ad;
  margin-top: 24px;
}
.security-flow span {
  border: 1px solid #b0c8b044;
  padding: 8px;
}
.security-flow i {
  height: 1px;
  flex: 1;
  background: #b0c8b044;
}
.preview-console {
  font: 8px/1.9 monospace;
  color: #8d9e91;
  margin-top: 15px;
}
.preview-console b {
  color: #a6df96;
}
.preview-music {
  background: #371c1a;
  color: #f2c8b2;
}
.record {
  position: absolute;
  right: 25px;
  top: 42px;
  width: 155px;
  height: 155px;
  border-radius: 50%;
  background: repeating-radial-gradient(#1b1212 0 3px, #49302c 4px 5px);
  display: grid;
  place-items: center;
  box-shadow: 0 10px 40px #0005;
}
.record div {
  position: absolute;
  width: 45px;
  height: 45px;
  background: #c77151;
  border-radius: 50%;
}
.record span {
  position: relative;
  font-size: 20px;
}
.music-caption {
  display: flex;
  justify-content: space-between;
  align-items: end;
  font-size: 26px;
  line-height: 1.05;
  position: absolute;
  left: 25px;
  right: 25px;
  bottom: 65px;
}
.waveform {
  position: absolute;
  left: 25px;
  right: 25px;
  bottom: 20px;
  display: flex;
  align-items: center;
  gap: 5px;
  height: 30px;
  opacity: 0.5;
}
.waveform i {
  width: 3px;
  background: #dc9175;
  max-height: 30px;
}
.preview-city {
  background: #dddcc9;
  color: #273b2d;
}
.preview-city .preview-title > svg {
  color: #4f7657;
}
.city-chart {
  display: flex;
  gap: 10px;
  align-items: end;
  height: 75px;
  margin: 25px 0 15px;
}
.city-chart i {
  flex: 1;
  background: #59785b;
}
.preview-foot {
  font-size: 7px;
  letter-spacing: 0.8px;
  position: absolute;
  bottom: 18px;
}
.preview-study {
  background: #c4bcde;
  color: #292237;
}
.preview-study .preview-title > svg {
  color: #675282;
}
.study-question {
  border: 1px solid #3d255738;
  border-radius: 5px;
  padding: 13px;
  margin-top: 23px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 11px;
}
.study-chips {
  display: flex;
  gap: 9px;
  font-size: 9px;
  margin-top: 12px;
}
.study-chips span {
  padding: 5px 10px;
  border-radius: 30px;
  background: #fff4;
}
.preview-robot {
  background: #d8c8b2;
  color: #3d342a;
}
.preview-robot .preview-title > svg {
  color: #7c6549;
}
.sorter-diagram {
  display: flex;
  align-items: center;
  margin-top: 34px;
  font: 8px monospace;
  gap: 8px;
}
.sorter-diagram span {
  padding: 14px 8px;
  border: 1px solid #76614d;
}
.sorter-diagram i {
  height: 1px;
  background: #76614d;
  flex: 1;
}
.construction-section {
  padding-block: 40px 35px;
  min-height: 850px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
}
.construction-top,
.construction-bottom {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  font-size: 13px;
  color: #aaa79f;
}
.construction-grid {
  display: grid;
  grid-template-columns: 1fr 1.8fr 1fr;
  align-items: center;
  gap: 35px;
  padding-block: 80px;
}
.construction-note h3 {
  font-size: 34px;
  line-height: 1.05;
  font-weight: 300;
  letter-spacing: -0.04em;
  margin: 25px 0 18px;
}
.construction-note p {
  color: #8c8a84;
  font-size: 16px;
  line-height: 1.5;
  max-width: 275px;
}
.tiny-label {
  font:
    10px "JetBrains Mono",
    monospace;
  color: #8c8a84;
  letter-spacing: 1px;
}
.note-right {
  align-self: end;
  margin-bottom: 40px;
}
.construction-drawing {
  height: 430px;
  position: relative;
  display: grid;
  place-items: center;
  isolation: isolate;
}
.construction-drawing > svg {
  height: 90%;
  width: auto;
  stroke-width: 0.7;
  position: relative;
}
.drawing-grid {
  position: absolute;
  inset: -40px;
  background-image:
    linear-gradient(#eceae408 1px, transparent 1px),
    linear-gradient(90deg, #eceae408 1px, transparent 1px);
  background-size: 35px 35px;
  mask-image: radial-gradient(black, transparent 75%);
}
.drawing-circle {
  position: absolute;
  border: 1px solid #eceae41a;
  width: 350px;
  height: 350px;
  border-radius: 50%;
}
.drawing-axis {
  position: absolute;
  background: #eceae43b;
}
.axis-x {
  height: 1px;
  width: 130%;
  top: 50%;
  left: -15%;
}
.axis-y {
  width: 1px;
  height: 125%;
  left: 50%;
  top: -12.5%;
}
.drawing-angle {
  position: absolute;
  left: 57%;
  top: 49%;
  color: var(--accent);
  font: 12px monospace;
}
.drawing-point {
  position: absolute;
  left: 20%;
  top: 7%;
  font: 9px monospace;
  color: var(--muted);
}
.pivot {
  position: absolute;
  width: 9px;
  height: 9px;
  top: calc(50% - 4px);
  left: calc(50% - 4px);
  background: var(--accent);
}
.construction-bottom > span:last-child {
  display: flex;
  align-items: center;
  gap: 14px;
}
.construction-bottom i {
  display: block;
  width: 1px;
  height: 20px;
  background: var(--line);
  transform: rotate(24deg);
}
.blueprint-section {
  padding-top: 130px;
  border-top: 1px solid var(--line);
  overflow: hidden;
}
.blueprint-section .section-heading > p {
  color: #aaa79f;
}
.comparison {
  max-width: 1200px;
  margin-top: 100px;
}
.comparison-frame {
  position: relative;
  aspect-ratio: 1.75;
  border: 1px solid #eceae433;
  border-radius: 7px;
  overflow: hidden;
}
.mini-site {
  position: absolute;
  inset: 0;
  background: #111110;
  padding: 22px;
  color: var(--bone);
  overflow: hidden;
  font-weight: 300;
}
.mini-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 9px;
}
.mini-nav > svg {
  width: 15px;
  height: 20px;
}
.mini-nav > span:last-child {
  border: 1px solid #eceae460;
  border-radius: 30px;
  padding: 6px 10px;
}
.mini-role {
  position: absolute;
  top: 18%;
  left: 22px;
  right: 22px;
  display: flex;
  justify-content: space-between;
  font-size: 9px;
}
.mini-first,
.mini-second {
  position: absolute;
  font-size: clamp(20px, 4.4vw, 57px);
  letter-spacing: -0.05em;
}
.mini-first {
  top: 30%;
  left: 22px;
}
.mini-second {
  top: 58%;
  right: 22px;
}
.mini-monogram {
  position: absolute;
  left: 35%;
  top: 20%;
  width: 30%;
  height: 66%;
  transform: rotate(-8deg);
}
.mini-summary {
  position: absolute;
  bottom: 25px;
  left: 22px;
  font-size: 12px;
  line-height: 1.3;
}
.mini-degree {
  position: absolute;
  bottom: 20px;
  left: 47%;
  font-size: 32px;
  color: var(--accent);
}
.mini-blueprint {
  background-color: #121316;
  background-image:
    linear-gradient(#eceae408 1px, transparent 1px),
    linear-gradient(90deg, #eceae408 1px, transparent 1px);
  background-size: 20px 20px;
  color: #b7b4ad;
}
.mini-blueprint .mini-first,
.mini-blueprint .mini-second {
  color: transparent;
  -webkit-text-stroke: 0.5px #aaa;
}
.blueprint-layer {
  position: absolute;
  inset: 0;
  pointer-events: none;
}
.measure-label {
  position: absolute;
  top: 27%;
  left: 22px;
  background: var(--accent);
  font: 8px monospace;
  color: var(--ink);
  padding: 5px;
}
.measure-line {
  position: absolute;
  left: 22px;
  right: 22px;
  top: 49%;
  height: 1px;
  background: #ff4f2b77;
}
.comparison-divider {
  position: absolute;
  top: -30%;
  height: 160%;
  width: 1px;
  background: var(--accent);
  transform: rotate(23.6deg);
  transform-origin: center;
  pointer-events: none;
}
.comparison-divider span {
  position: absolute;
  top: 47%;
  left: -17px;
  width: 34px;
  height: 34px;
  display: grid;
  place-items: center;
  background: var(--accent);
  color: var(--ink);
  border-radius: 50%;
}
.comparison-input {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: ew-resize;
  margin: 0;
}
.comparison-frame:focus-within {
  outline: 2px solid var(--accent);
  outline-offset: 5px;
}
.comparison-caption {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  font-size: 14px;
  margin-top: 20px;
}
.comparison-caption > span > span {
  font-size: 11px;
  color: #8c8a84;
  margin: 0 12px;
}
.capabilities {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 100px;
  margin-top: 110px;
}
.capability-heading {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 20px;
  border-bottom: 1px solid var(--line);
  padding-bottom: 24px;
}
.capability-heading h3 {
  font-weight: 300;
  font-size: 40px;
  letter-spacing: -0.04em;
}
.capability-heading > span {
  font-size: 11px;
  color: var(--muted);
}
.capability-item {
  display: flex;
  align-items: center;
  gap: 20px;
  border-bottom: 1px solid var(--line);
  padding: 17px 0;
  font-size: 20px;
  font-weight: 300;
}
.capability-item > span:first-child {
  font: 10px monospace;
  color: #8c8a84;
  width: 25px;
}
.capability-item > svg {
  margin-left: auto;
  color: #6f6d66;
}
.stack-foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 25px;
  margin-block: 60px 100px;
  font-size: 14px;
  color: #aaa79f;
}
.education-section {
  padding-block: 60px 70px;
}
.education-top {
  display: flex;
  justify-content: space-between;
  font-size: 13px;
}
.education-main {
  padding-block: 90px;
}
.quote-symbol {
  font-size: 140px;
  line-height: 0.6;
  font-weight: 300;
  color: var(--accent);
  display: block;
}
.education-main h2 {
  font-size: clamp(48px, 7.7vw, 112px);
  font-weight: 300;
  letter-spacing: -0.055em;
  line-height: 0.98;
  margin-top: 15px;
}
.education-credit {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-top: 45px;
  font-size: 14px;
}
.avatar-mark {
  height: 44px;
  width: 44px;
  border: 1px solid #0c0c0b33;
  border-radius: 50%;
  display: grid;
  place-items: center;
}
.education-credit p {
  font-size: 12px;
  color: #5f5d57;
  margin-top: 6px;
}
.education-facts {
  display: grid;
  grid-template-columns: 1fr 1.25fr 0.85fr;
  gap: 45px;
}
.education-facts > div {
  border-top: 1px solid #0c0c0b26;
  padding-top: 22px;
}
.fact-label {
  font-size: 12px;
  color: #5f5d57;
}
.education-facts h3 {
  font-weight: 300;
  font-size: 25px;
  letter-spacing: -0.025em;
  line-height: 1.2;
  margin-top: 20px;
}
.education-facts p {
  font-size: 14px;
  color: #5f5d57;
  margin-top: 13px;
}
.education-year {
  font-weight: 300;
  display: block;
  font-size: 75px;
  letter-spacing: -0.065em;
  margin-top: 8px;
  white-space: nowrap;
}
.education-year > span {
  color: #aaa79f;
}
.contact-section {
  padding-top: 65px;
}
.contact-top {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  font-size: 13px;
}
.contact-top > span:first-child {
  display: flex;
  align-items: center;
  gap: 10px;
}
.availability-dot {
  width: 5px;
  height: 5px;
  display: inline-block;
  background: var(--accent);
  border-radius: 50%;
}
.contact-section h2 {
  font-size: clamp(64px, 10.5vw, 160px);
  font-weight: 300;
  line-height: 0.88;
  letter-spacing: -0.065em;
  margin-top: 95px;
}
.email-link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 30px;
  font-size: clamp(25px, 5.8vw, 88px);
  font-weight: 300;
  letter-spacing: -0.045em;
  margin-top: 60px;
  padding-bottom: 30px;
  border-bottom: 1px solid var(--line);
}
.email-link > svg {
  width: 55px;
  height: 55px;
  stroke-width: 1;
}
.email-link:hover {
  color: var(--accent);
}
.footer-grid {
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr 1.5fr;
  gap: 40px;
  margin-top: 65px;
  padding-bottom: 70px;
}
.footer-grid h3 {
  font-size: 12px;
  color: #8c8a84;
  font-weight: 400;
  margin-bottom: 22px;
}
.footer-grid > div > a {
  display: block;
  font-size: 14px;
  margin-bottom: 12px;
}
.footer-grid > div > a:hover {
  color: var(--accent);
}
.footer-grid p,
.footer-grid > div > span {
  font-size: 13px;
  line-height: 1.6;
  color: #aaa79f;
  max-width: 280px;
}
.footer-signature {
  display: flex;
  gap: 15px;
  align-items: flex-start;
}
.footer-signature svg {
  width: 35px;
  height: 48px;
}
.footer-signature > span {
  font-size: 23px !important;
  letter-spacing: -1px;
  color: var(--bone) !important;
}
.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  font-size: 12px;
  color: #8c8a84;
  border-top: 1px solid var(--line);
  padding-block: 25px;
}
.footer-bottom a {
  display: flex;
  align-items: center;
  gap: 12px;
}
.project-dialog {
  position: fixed;
  inset: 0;
  margin: auto;
  width: min(720px, calc(100% - 32px));
  max-height: 88dvh;
  padding: 0;
  border: 1px solid #eceae433;
  border-radius: 12px;
  background: #151514;
  color: var(--bone);
  overscroll-behavior: contain;
}
.project-dialog::backdrop {
  background: #000b;
  backdrop-filter: blur(10px);
}
.dialog-inner {
  padding: 35px;
}
.dialog-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 30px;
}
.eyebrow {
  font-size: 10px;
  color: #aaa79f;
  letter-spacing: 0.8px;
  text-transform: uppercase;
}
.icon-button {
  padding: 8px;
  border: 1px solid var(--line);
  border-radius: 50%;
}
.dialog-inner > h2 {
  font-size: 48px;
  font-weight: 300;
  letter-spacing: -0.045em;
  line-height: 1.05;
}
.dialog-description {
  font-size: 15px;
  line-height: 1.6;
  color: #b7b4ad;
  margin-top: 20px;
}
.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
}
.dialog-tags {
  margin-top: 22px;
}
.tags > span {
  padding: 6px 10px;
  border: 1px solid var(--line);
  border-radius: 30px;
  font-size: 11px;
}
.architecture-title {
  display: flex;
  align-items: center;
  gap: 12px;
  color: var(--accent);
  margin: 32px 0 10px;
}
.architecture-title h3 {
  font-weight: 400;
  font-size: 16px;
  color: var(--bone);
}
.architecture-note {
  font-size: 12px;
  line-height: 1.5;
  color: var(--muted);
}
.architecture-flow {
  list-style: none;
  margin: 25px 0;
  padding: 0;
}
.architecture-step {
  display: flex;
  gap: 20px;
  border: 1px solid var(--line);
  padding: 20px;
  border-radius: 4px;
}
.step-number {
  color: var(--accent);
  font-size: 12px;
}
.architecture-step h4 {
  font-size: 17px;
  font-weight: 400;
}
.architecture-step p {
  font-size: 13px;
  line-height: 1.6;
  color: #aaa79f;
  margin-top: 6px;
}
.flow-arrow {
  display: block;
  margin: 8px auto;
  color: #8c8a84;
}
.dialog-footer {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  border-top: 1px solid var(--line);
  padding-top: 25px;
}
.button {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 13px 18px;
  border-radius: 100px;
  font-size: 12px;
}
.button-primary {
  background: var(--bone);
  color: var(--ink);
}
.text-link {
  font-size: 12px;
  text-decoration: underline;
  text-underline-offset: 5px;
}
.muted {
  color: var(--muted);
}
.mono {
  font-size: 10px;
}
@media (min-width: 1500px) {
  :root {
    --pad: 48px;
  }
  .hero-summary {
    bottom: 50px;
  }
  .hero-cta {
    bottom: 48px;
  }
  .hero-dial {
    bottom: 40px;
  }
}
@media (max-width: 1050px) {
  :root {
    --pad: 32px;
  }
  .hero-summary p {
    font-size: 16px;
  }
  .hero-summary {
    width: 34%;
    bottom: 35px;
  }
  .hero-line-one,
  .hero-line-two {
    font-size: 58px;
  }
  .site-nav nav {
    margin-left: 50px;
    gap: 25px;
  }
  .section-heading {
    gap: 35px;
  }
  .section-heading > p {
    font-size: 17px;
  }
  .project-row-button {
    grid-template-columns: 35px 1fr 230px;
    gap: 20px;
  }
  .project-row h3 {
    font-size: 70px;
  }
  .row-details {
    font-size: 12px;
  }
  .row-details > span:nth-child(2) {
    font-size: 12px;
  }
  .construction-grid {
    grid-template-columns: 1fr 1.4fr 1fr;
    gap: 20px;
  }
  .construction-drawing {
    height: 350px;
  }
  .construction-note h3 {
    font-size: 28px;
  }
  .construction-note p {
    font-size: 14px;
  }
  .capabilities {
    gap: 55px;
  }
  .education-year {
    font-size: 55px;
  }
  .footer-grid {
    gap: 25px;
    grid-template-columns: 1fr 0.8fr 0.8fr 1.5fr;
  }
}
@media (max-width: 700px) {
  :root {
    --pad: 20px;
  }
  html {
    scroll-padding-top: 64px;
  }
  .site-nav {
    height: 64px;
    mix-blend-mode: difference;
  }
  .site-nav nav,
  .nav-cta {
    display: none;
  }
  .menu-button {
    display: inline-flex;
    padding: 11px 15px;
  }
  .logo {
    width: 23px;
    height: 32px;
  }
  .hero-scroll {
    height: 380svh;
  }
  .hero-stage {
    min-height: 650px;
    height: 100svh;
  }
  .hero-eyebrow {
    top: 80px;
    font-size: 11px;
    gap: 12px;
  }
  .hero-line-one,
  .hero-line-two {
    font-size: 44px;
  }
  .hero-line-one {
    top: 16%;
    left: 20px;
  }
  .hero-line-two {
    top: 72%;
    right: 20px;
  }
  .hero-summary {
    display: none;
  }
  .hero-cta {
    left: 20px;
    right: 20px;
    bottom: 28px;
    justify-content: space-between;
  }
  .hero-dial {
    bottom: 106px;
  }
  .hero-dial > span {
    font-size: 35px;
  }
  .hero-dial p {
    font-size: 10px;
    display: none;
  }
  .motion-toggle {
    left: auto;
    right: 18px;
    bottom: 100px;
  }
  .hero-narrative {
    top: 29%;
    left: 20px;
    right: 20px;
    max-width: 330px;
  }
  .hero-narrative h2 {
    font-size: 40px;
  }
  .hero-narrative > p {
    font-size: 12px;
  }
  .work-section {
    padding-block: 85px 60px;
  }
  .section-heading {
    grid-template-columns: 1fr;
    gap: 28px;
  }
  .section-heading h2 {
    font-size: 48px;
    line-height: 0.96;
  }
  .section-heading > p {
    font-size: 17px;
    line-height: 1.45;
    max-width: 390px;
  }
  .section-heading .subtle {
    font-size: 12px;
    margin-top: 12px;
  }
  .project-list {
    margin-top: 40px;
  }
  .project-row-button {
    grid-template-columns: 25px 1fr;
    gap: 13px;
    min-height: 0;
    padding: 24px 0;
  }
  .row-number {
    font-size: 11px;
    padding-top: 8px;
  }
  .project-row h3 {
    font-size: clamp(39px, 10.7vw, 68px);
    color: #68665f;
    letter-spacing: -0.055em;
  }
  .row-details {
    grid-column: 2;
    text-align: left;
    gap: 6px;
    margin-top: 3px;
    font-size: 12px;
  }
  .row-details > span:nth-child(2) {
    font-size: 12px;
    max-width: 330px;
  }
  .row-action {
    justify-content: flex-start;
    font-size: 11px;
    margin-top: 5px;
  }
  .sorter-break {
    display: none;
  }
  .project-row.is-active h3 {
    transform: none;
  }
  .hover-preview {
    display: none;
  }
  .work-bottom {
    margin-top: 35px;
    align-items: flex-start;
    flex-direction: column;
    font-size: 12px;
  }
  .construction-section {
    min-height: 0;
    padding-top: 30px;
    padding-bottom: 30px;
  }
  .construction-top,
  .construction-bottom {
    font-size: 10px;
    gap: 18px;
    line-height: 1.6;
  }
  .construction-top > span:last-child {
    text-align: right;
    max-width: 100px;
  }
  .construction-grid {
    grid-template-columns: 1fr;
    gap: 30px;
    padding-block: 60px;
  }
  .construction-note {
    max-width: 330px;
  }
  .construction-note h3 {
    font-size: 36px;
    margin-top: 15px;
  }
  .construction-note p {
    font-size: 16px;
    max-width: 330px;
  }
  .construction-drawing {
    height: 340px;
    margin-block: 25px;
    max-width: 320px;
    width: 100%;
    justify-self: center;
  }
  .drawing-circle {
    width: 300px;
    height: 300px;
  }
  .note-right {
    justify-self: end;
    margin: 0;
  }
  .tiny-label {
    font-size: 9px;
  }
  .blueprint-section {
    padding-top: 80px;
  }
  .comparison {
    margin-top: 45px;
  }
  .comparison-frame {
    aspect-ratio: 1.3;
  }
  .mini-site {
    padding: 10px;
  }
  .mini-nav {
    font-size: 4px;
    gap: 8px;
  }
  .mini-nav > svg {
    width: 8px;
    height: 12px;
  }
  .mini-nav > span:last-child {
    padding: 3px 4px;
    white-space: nowrap;
  }
  .mini-role {
    font-size: 5px;
    left: 10px;
    right: 10px;
    top: 19%;
  }
  .mini-first,
  .mini-second {
    font-size: 26px;
  }
  .mini-first {
    left: 10px;
  }
  .mini-second {
    right: 10px;
    top: 62%;
  }
  .mini-summary {
    font-size: 6px;
    bottom: 15px;
    left: 10px;
  }
  .mini-degree {
    font-size: 20px;
    bottom: 10px;
  }
  .measure-label {
    font-size: 4px;
    left: 10px;
    padding: 3px;
    top: 27%;
  }
  .measure-line {
    left: 10px;
    right: 10px;
  }
  .comparison-caption {
    font-size: 11px;
    gap: 15px;
    margin-top: 12px;
  }
  .comparison-caption > span > span {
    display: none;
  }
  .comparison-divider span {
    width: 24px;
    height: 24px;
    left: -12px;
  }
  .comparison-divider span svg {
    width: 13px;
    height: 13px;
  }
  .capabilities {
    margin-top: 60px;
    grid-template-columns: 1fr;
    gap: 55px;
  }
  .capability-heading h3 {
    font-size: 36px;
  }
  .capability-heading > span {
    font-size: 10px;
  }
  .capability-item {
    font-size: 20px;
    padding-block: 15px;
  }
  .stack-foot {
    margin-block: 45px 65px;
    flex-direction: column;
    align-items: flex-start;
    font-size: 12px;
  }
  .education-section {
    padding-block: 35px 50px;
  }
  .education-top {
    font-size: 11px;
  }
  .education-main {
    padding-block: 70px 50px;
  }
  .quote-symbol {
    font-size: 95px;
  }
  .education-main h2 {
    font-size: 49px;
  }
  .education-credit {
    margin-top: 30px;
    font-size: 12px;
    align-items: flex-start;
  }
  .education-credit p {
    font-size: 10px;
    line-height: 1.5;
    max-width: 250px;
  }
  .avatar-mark {
    flex-shrink: 0;
    width: 36px;
    height: 36px;
  }
  .education-facts {
    grid-template-columns: 1fr;
    gap: 30px;
  }
  .education-facts h3 {
    font-size: 27px;
    max-width: 370px;
    margin-top: 15px;
  }
  .education-year {
    font-size: 80px;
  }
  .contact-section {
    padding-top: 35px;
  }
  .contact-top {
    font-size: 10px;
    gap: 20px;
    align-items: flex-start;
  }
  .contact-top .local-time {
    font-size: 9px;
  }
  .contact-top > span:first-child {
    gap: 7px;
    max-width: 180px;
  }
  .contact-section h2 {
    font-size: 65px;
    margin-top: 70px;
    letter-spacing: -0.06em;
  }
  .email-link {
    font-size: clamp(20px, 5.6vw, 37px);
    gap: 12px;
    margin-top: 40px;
    padding-bottom: 20px;
  }
  .email-link > svg {
    width: 25px;
    height: 25px;
  }
  .footer-grid {
    grid-template-columns: 1fr 1fr;
    gap: 35px;
    margin-top: 45px;
    padding-bottom: 40px;
  }
  .footer-signature {
    grid-column: 1/-1;
    align-items: center;
  }
  .footer-signature svg {
    width: 25px;
    height: 36px;
  }
  .footer-grid > div:last-child {
    grid-column: 1/-1;
  }
  .footer-grid h3 {
    margin-bottom: 16px;
  }
  .footer-grid > div > a {
    font-size: 13px;
  }
  .footer-grid p {
    max-width: 100%;
    font-size: 12px;
  }
  .footer-bottom {
    align-items: flex-start;
    font-size: 10px;
    line-height: 1.6;
  }
  .footer-bottom > span {
    max-width: 240px;
  }
  .footer-bottom a {
    gap: 5px;
    white-space: nowrap;
  }
  .dialog-inner {
    padding: 23px;
  }
  .dialog-inner > h2 {
    font-size: 38px;
  }
  .dialog-top {
    gap: 10px;
  }
  .eyebrow {
    font-size: 8px;
  }
  .dialog-description {
    font-size: 13px;
  }
  .architecture-step {
    padding: 15px;
    gap: 14px;
  }
  .architecture-step p {
    font-size: 12px;
  }
}
@media (max-width: 370px) {
  .hero-eyebrow {
    font-size: 10px;
  }
  .hero-line-one,
  .hero-line-two {
    font-size: 40px;
  }
  .hero-eyebrow .local-time > span {
    display: none;
  }
  .contact-section h2 {
    font-size: 56px;
  }
  .contact-top {
    flex-direction: column;
    gap: 15px;
  }
  .row-details > span:nth-child(2) {
    font-size: 11px;
  }
  .project-row h3 {
    font-size: 37px;
  }
  .capability-heading h3 {
    font-size: 32px;
  }
  .section-heading h2 {
    font-size: 42px;
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
  .hero-scroll {
    height: 100svh;
    min-height: 650px;
  }
  .hero-stage {
    position: relative;
  }
  .hero-narrative {
    display: none;
  }
  .construction-drawing {
    transform: none !important;
  }
}

#work,
#about,
#stack,
#contact {
  scroll-margin-top: -80px;
}
@media (max-width: 700px) {
  #work,
  #about,
  #stack,
  #contact {
    scroll-margin-top: -64px;
  }
}

@media (min-width: 701px) {
  .hover-preview {
    position: fixed;
    left: 52%;
    top: 24%;
    width: 37vw;
  }
}

@media (min-width:701px) and (max-width:900px){
  .project-row-button{grid-template-columns:30px minmax(0,1fr) minmax(160px,28%);gap:16px}
  .project-row h3{font-size:clamp(44px,6.3vw,56px)}
}
@media(max-width:370px){.education-facts{grid-template-columns:minmax(0,1fr)}.education-year{font-size:clamp(48px,18vw,65px)}}
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

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="-20 15 280 280"><title>TB — Tamim Baig</title><rect x="-20" y="15" width="280" height="280" rx="36" fill="#0c0c0b"/><path fill="#eceae4" fill-rule="evenodd" d="M6 106 166 71 166 107 106 120 106 258 67 267 67 129 6 142Z"/><path fill="#eceae4" fill-rule="evenodd" d="M119 134 201 116 233 141 233 175 216 194 236 206 236 247 205 285 119 304Z M154 159 154 192 187 184 198 171 198 160 187 151Z M154 224 154 264 190 256 201 242 201 225 189 216Z"/></svg>
```

## src/data/monogram.json

```json
[{"letter":"T","outline":[[6,106],[166,71],[166,107],[106,120],[106,258],[67,267],[67,129],[6,142]],"holes":[]},{"letter":"B","outline":[[119,134],[201,116],[233,141],[233,175],[216,194],[236,206],[236,247],[205,285],[119,304]],"holes":[[[154,159],[154,192],[187,184],[198,171],[198,160],[187,151]],[[154,224],[154,264],[190,256],[201,242],[201,225],[189,216]]]}]
```
