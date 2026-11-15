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
