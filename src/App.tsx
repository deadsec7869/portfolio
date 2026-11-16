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
