import { ThemeCord } from "./components/ThemeCord";
import { useEffect, useRef, useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X, Plus, Pause, Play, Check } from "lucide-react";
import { profile, projects, skills } from "./data/portfolio";
import type { Project } from "./data/portfolio";
import { Monogram } from "./components/Monogram";
import { ProjectModal } from "./components/ProjectModal";
import { ProjectPreview } from "./components/ProjectPreview";

const rooms = [
  {
    name: "Web Development",
    plaque: "WEB\nDEVELOPER",
    color: "#26394d",
    tagline: "FROM THE FIRST IDEA TO THE FINAL INTERACTION",
    points: [
      "React & Next.js interfaces",
      "Full-stack applications with FastAPI",
      "Supabase & SQLite backends",
      "Thoughtful motion and interaction",
    ],
    ids: ["aapesh", "studyai"],
  },
  {
    name: "AI & Automation",
    plaque: "AI SYSTEMS\nBUILDER",
    color: "#57404d",
    tagline: "INTELLIGENCE WITH A PURPOSE",
    points: [
      "AI agents & automated workflows",
      "Security testing and verification",
      "Gemini-powered experiences",
      "Civic technology & telemetry",
    ],
    ids: ["vibeguard", "jansetu", "studyai"],
  },
  {
    name: "Robotics",
    plaque: "ROBOTICS\nENGINEER",
    color: "#747e65",
    tagline: "BUILDING BEYOND THE SCREEN",
    points: [
      "Computer vision & classification",
      "Raspberry Pi & Arduino",
      "Embedded sensors and control",
      "CAD & custom 3D-printed hardware",
    ],
    ids: ["plastic-sorter"],
  },
  {
    name: "Interactive 3D",
    plaque: "INTERACTIVE\n3D BUILDER",
    color: "#a45b31",
    tagline: "MAKING THE WEB FEEL ALIVE",
    points: [
      "Three.js & React Three Fiber",
      "Audio-reactive visual experiences",
      "Immersive browser interfaces",
      "Motion, form, and interaction",
    ],
    ids: ["aapesh"],
  },
];
const roles = [
  "Full-Stack Developer",
  "AI Systems Builder",
  "Robotics Student",
  "Creative Developer",
];

function Clock() {
  const [date, setDate] = useState(new Date());
  useEffect(() => {
    const t = window.setInterval(() => setDate(new Date()), 30000);
    return () => clearInterval(t);
  }, []);
  return (
    <span className="clock">
      Local time{" "}
      <b>
        {date
          .toLocaleTimeString("en-US", {
            timeZone: "Asia/Kolkata",
            hour: "numeric",
            minute: "2-digit",
          })
          .toLowerCase()}
      </b>
      <span className="clock-date">
        {" "}
        · &nbsp;
        {date.toLocaleDateString("en-GB", {
          timeZone: "Asia/Kolkata",
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
      </span>
    </span>
  );
}
function Modal({
  title,
  children,
  onClose,
  className = "",
}: {
  title: string;
  children: ReactNode;
  onClose: () => void;
  className?: string;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const d = ref.current!;
    const opener = document.activeElement as HTMLElement;
    const previous = document.body.style.overflow;
    d.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      d.close();
      document.body.style.overflow = previous;
      opener?.focus({ preventScroll: true });
    };
  }, []);
  return (
    <dialog
      ref={ref}
      className={"modal " + className}
      aria-label={title}
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          const r = e.currentTarget.getBoundingClientRect();
          if (
            e.clientX < r.left ||
            e.clientX > r.right ||
            e.clientY < r.top ||
            e.clientY > r.bottom
          )
            onClose();
        }
      }}
    >
      <div className="modal-bar">
        <span>{title}</span>
        <button autoFocus className="pill" onClick={onClose}>
          <X size={16} /> Close
        </button>
      </div>
      {children}
    </dialog>
  );
}
function ContactForm({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState(["", "", "", ""]);
  const [sent, setSent] = useState(false);
  const questions = [
    {
      title: "What do you have in mind?",
      options: [
        "A website or web app",
        "An AI project or automation",
        "Robotics or embedded systems",
        "An interactive 3D experience",
        "An internship or collaboration",
      ],
    },
    {
      title: "What stage is the idea at?",
      options: [
        "Just an idea",
        "Ready to start building",
        "An existing project",
        "I’d like to discuss it",
      ],
    },
    {
      title: "When would you like to start?",
      options: ["Within a month", "In 1 to 3 months", "I’m flexible"],
    },
    {
      title: "Who is this for?",
      options: [
        "A business or startup",
        "A student team",
        "A personal project",
        "An organization",
      ],
    },
  ];
  return (
    <Modal
      title="Let’s build something"
      onClose={onClose}
      className="contact-modal"
    >
      {sent ? (
        <div className="contact-success">
          <Check size={40} />
          <h2>Your draft is ready.</h2>
          <p>
            Your email app was requested with your message filled in. Send it
            there to get in touch.
          </p>
          <a className="pill primary" href={"mailto:" + profile.email}>
            Email {profile.shortName}
          </a>
          <p className="muted">You can also write to {profile.email}.</p>
        </div>
      ) : (
        <>
          <p className="eyebrow">A GOOD IDEA STARTS WITH A CONVERSATION</p>
          <h2>
            Tell me what
            <br />
            you’re thinking.
          </h2>
          <div
            className="form-progress"
            aria-label={"Step " + (step + 1) + " of 5"}
          >
            {Array.from({ length: 5 }, (_, i) => (
              <i key={i} className={i <= step ? "done" : ""} />
            ))}
          </div>
          <span className="step-label">{step + 1} of 5</span>
          {step < 4 ? (
            <div key={step} className="question">
              <h3>{questions[step].title}</h3>
              <div className="choices">
                {questions[step].options.map((answer) => (
                  <button
                    key={answer}
                    className={answers[step] === answer ? "chosen" : ""}
                    onClick={() => {
                      setAnswers((a) =>
                        a.map((v, i) => (i === step ? answer : v)),
                      );
                      setStep(step + 1);
                    }}
                  >
                    {answer}
                    <Plus size={16} />
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const data = new FormData(e.currentTarget);
                const message =
                  "Hi Tamim,\n\n" +
                  answers.join("\n") +
                  "\n\n" +
                  data.get("message") +
                  "\n\nFrom: " +
                  data.get("name") +
                  "\nEmail: " +
                  data.get("email");
                window.location.href =
                  "mailto:" +
                  profile.email +
                  "?subject=" +
                  encodeURIComponent(
                    "Let’s build something — " + data.get("name"),
                  ) +
                  "&body=" +
                  encodeURIComponent(message);
                setSent(true);
              }}
            >
              <h3>How can I reach you?</h3>
              <div className="form-grid">
                <label>
                  Your name
                  <input
                    name="name"
                    autoComplete="name"
                    required
                    maxLength={100}
                  />
                </label>
                <label>
                  Your email
                  <input
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    maxLength={150}
                  />
                </label>
              </div>
              <label>
                Tell me about your idea
                <textarea name="message" rows={4} required maxLength={3000} />
              </label>
              <button type="submit" className="pill primary">
                Write the email
              </button>
              <p className="muted small">
                Opens your email app. Nothing is sent automatically.
              </p>
            </form>
          )}
          {step > 0 && (
            <button
              className="text-button back"
              onClick={() => setStep(step - 1)}
            >
              Back
            </button>
          )}
        </>
      )}
    </Modal>
  );
}
function AbilityCard({ onClose }: { onClose: () => void }) {
  const [flipped, setFlipped] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const reduced = useReducedMotion();
  return (
    <Modal
      title="Tamim’s ability card"
      onClose={onClose}
      className="ability-modal"
    >
      <button
        className={"ability-card " + (flipped ? "flipped" : "")}
        onClick={() => setFlipped(!flipped)}
        aria-label={
          flipped
            ? "Show front of ability card"
            : "Flip ability card to view skills"
        }
        onPointerMove={(e) => {
          if (reduced || e.pointerType === "touch") return;
          const r = e.currentTarget.getBoundingClientRect();
          setTilt({
            x: ((e.clientY - r.top) / r.height) * -16 + 8,
            y: ((e.clientX - r.left) / r.width) * 16 - 8,
          });
        }}
        onPointerLeave={() => setTilt({ x: 0, y: 0 })}
        style={{
          transform:
            "perspective(900px) rotateX(" +
            tilt.x +
            "deg) rotateY(" +
            tilt.y +
            "deg)",
        }}
      >
        <div className="card-front" aria-hidden={flipped}>
          <span className="card-kicker">
            ENGINEER / BUILDER / ALWAYS CURIOUS
          </span>
          <Monogram />
          <h2>Tamim Baig</h2>
          <span>Robotics · Intelligence · The Web</span>
          <span className="card-bottom">
            VIAT / VTU <b>2024 — 2028</b>
          </span>
        </div>
        <div className="card-back" aria-hidden={!flipped}>
          <h2>
            A curious mind.
            <br />A builder’s hands.
          </h2>
          {skills.map((s) => (
            <div key={s.label}>
              <b>{s.label}</b>
              <p>{s.items.slice(0, 4).join(" · ")}</p>
            </div>
          ))}
        </div>
      </button>
      <p className="card-hint">Move across the card · tap to flip</p>
    </Modal>
  );
}
export function App() {
  const reduced = useReducedMotion();
  const [dark, setDark] = useState(() => {
    try {
      return localStorage.getItem("tamim-theme") === "dark";
    } catch {
      return false;
    }
  });
  const [menu, setMenu] = useState(false);
  const [card, setCard] = useState(false);
  const [contact, setContact] = useState(false);
  const [room, setRoom] = useState<number | null>(null);
  const [activeRoom, setActiveRoom] = useState(0);
  const [selected, setSelected] = useState<Project | null>(null);
  const [role, setRole] = useState(0);
  const [paused, setPaused] = useState(false);
  const doors = useRef<HTMLDivElement>(null);
  useEffect(() => {
    document.documentElement.dataset.theme = dark ? "dark" : "light";
    try {
      localStorage.setItem("tamim-theme", dark ? "dark" : "light");
    } catch {
      /* Storage is optional. */
    }
  }, [dark]);
  useEffect(() => {
    if (paused || reduced) return;
    const t = window.setInterval(
      () => setRole((r) => (r + 1) % roles.length),
      3400,
    );
    return () => clearInterval(t);
  }, [paused, reduced]);
  const openRoom = (i: number) => {
    setMenu(false);
    setRoom(i);
  };
  const go = (id: string) => {
    setMenu(false);
    requestAnimationFrame(() =>
      document
        .getElementById(id)
        ?.scrollIntoView({ behavior: reduced ? "instant" : "smooth" }),
    );
  };
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="header">
        <nav aria-label="Main navigation">
          <button onClick={() => go("home")}>Home</button>
          {rooms.map((r, i) => (
            <button key={r.name} onClick={() => openRoom(i)}>
              {r.name}
            </button>
          ))}
          <button onClick={() => go("about")}>My story</button>
          <button onClick={() => setContact(true)}>Contact</button>
        </nav>
        <button
          className="menu-toggle pill"
          onClick={() => setMenu(true)}
          aria-label="Open menu"
          aria-expanded={menu}
        >
          <Menu size={18} />
          <span>Menu</span>
        </button>
        <Clock />
      </header>
      <ThemeCord dark={dark} toggle={() => setDark((previous) => !previous)} />
      <main id="main">
        <section className="hero" id="home">
          <div className="hero-inner">
            <div className="hero-copy">
              <p className="eyebrow">
                <i /> Robotics & AI Engineering Student
              </p>
              <h1>
                Hi, I’m {profile.shortName}.<br />
                <span>I am a</span>
              </h1>
              <div className="notebook" aria-label={"I am a " + roles[role]}>
                <div className="notebook-rings" aria-hidden="true">
                  {Array.from({ length: 12 }, (_, i) => (
                    <i key={i} />
                  ))}
                </div>
                <AnimatePresence mode="wait">
                  <motion.div
                    className="notebook-page"
                    key={role}
                    initial={reduced ? false : { rotateX: -75, opacity: 0 }}
                    animate={{ rotateX: 0, opacity: 1 }}
                    exit={reduced ? {} : { rotateX: 75, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <span>{roles[role]}</span>
                    <small>0{role + 1} / 04</small>
                  </motion.div>
                </AnimatePresence>
              </div>
              <div className="hero-actions">
                <button
                  className="pill primary"
                  onClick={() => setContact(true)}
                >
                  Let’s talk{" "}
                  <span className="button-circle">
                    <Plus size={18} />
                  </span>
                </button>
                <button className="pill" onClick={() => go("work")}>
                  See my work
                </button>
                <button
                  className="motion-control"
                  onClick={() => setPaused(!paused)}
                  aria-label={
                    paused ? "Resume role animation" : "Pause role animation"
                  }
                  aria-pressed={paused}
                >
                  {paused ? <Play size={14} /> : <Pause size={14} />}
                </button>
              </div>
            </div>
            <div className={"hero-art " + (paused ? "is-paused" : "")}>
              <div className="orbital-ring" />
              <div className="monogram-sculpture">
                <Monogram />
                <Monogram className="monogram-shadow" />
              </div>
              <div className="hero-signature">
                <span>MUHAMMED TAMIM BAIG</span>
                <span>Code. Intelligence. The physical world.</span>
              </div>
              <button
                className="pill ability-trigger"
                onClick={() => setCard(true)}
              >
                My ability card
              </button>
            </div>
          </div>
          <div className="hero-foot">
            <span>ROBOTICS & AI</span>
            <span>BASED IN KARNATAKA, INDIA</span>
            <button onClick={() => go("work")}>
              SCROLL TO EXPLORE <span>↓</span>
            </button>
          </div>
        </section>
        <section className="work-room" id="work" aria-labelledby="work-title">
          <div className="room-intro wrap">
            <div>
              <p className="eyebrow">My work, one door per skill</p>
              <h2 id="work-title">
                Magic happens
                <br />
                behind the doors
              </h2>
              <p className="swipe-hint">Pick a door. Explore what’s inside.</p>
            </div>
            <div className="room-description" aria-live="polite">
              <h3>{rooms[activeRoom].name}</h3>
              <span className="eyebrow">{rooms[activeRoom].tagline}</span>
              <ul>
                {rooms[activeRoom].points.map((p) => (
                  <li key={p}>
                    <Check size={14} />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div
            className="door-wall"
            ref={doors}
            onScroll={(e) => {
              const el = e.currentTarget;
              if (el.scrollWidth > el.clientWidth + 10) {
                const center = el.scrollLeft + el.clientWidth / 2;
                const children = Array.from(el.children) as HTMLElement[];
                let closest = 0;
                children.forEach((c, i) => {
                  if (
                    Math.abs(
                      c.offsetLeft - el.offsetLeft + c.clientWidth / 2 - center,
                    ) <
                    Math.abs(
                      children[closest].offsetLeft -
                        el.offsetLeft +
                        children[closest].clientWidth / 2 -
                        center,
                    )
                  )
                    closest = i;
                });
                setActiveRoom(closest);
              }
            }}
          >
            {rooms.map((r, i) => (
              <div
                className="door-frame"
                key={r.name}
                style={{ "--door-color": r.color } as CSSProperties}
              >
                <div className="door-darkness">
                  <span>Come on in.</span>
                </div>
                <button
                  className="door"
                  aria-label={"Open the " + r.name + " door"}
                  onMouseEnter={() => setActiveRoom(i)}
                  onFocus={() => setActiveRoom(i)}
                  onClick={() => openRoom(i)}
                >
                  <span className="door-panel" />
                  <span className="door-plaque">{r.plaque}</span>
                  <span className="door-handle" />
                  <span className="keyhole" />
                </button>
              </div>
            ))}
          </div>
          <div className="room-floor" />
          <div className="door-dots" aria-label="Choose a door">
            {rooms.map((r, i) => (
              <button
                key={r.name}
                aria-label={"Show " + r.name + " door"}
                aria-pressed={activeRoom === i}
                onClick={() => {
                  setActiveRoom(i);
                  const el = doors.current;
                  const child = el?.children[i] as HTMLElement;
                  if (el && child)
                    el.scrollTo({
                      left:
                        child.offsetLeft -
                        el.offsetLeft -
                        (el.clientWidth - child.clientWidth) / 2,
                      behavior: reduced ? "instant" : "smooth",
                    });
                }}
              />
            ))}
          </div>
        </section>
        <section className="story" id="about">
          <div className="story-grid wrap">
            <div className="story-title">
              <p className="eyebrow">
                <i /> My story
              </p>
              <h2>
                Let’s go
                <br />
                back in time.
              </h2>
              <div className="year-display">
                2024<span>— 2028</span>
              </div>
              <p>
                Learning. Experimenting.
                <br />
                Connecting the pieces.
              </p>
            </div>
            <div className="timeline">
              <article>
                <span className="timeline-dot" />
                <p className="eyebrow">2024 — 2028</p>
                <h3>Robotics & AI Engineering</h3>
                <p className="institution">{profile.institution}</p>
                <p>
                  {profile.education}. Based at {profile.campus}, exploring the
                  intersection of software, intelligence, and hardware.
                </p>
              </article>
              <article>
                <span className="timeline-dot" />
                <p className="eyebrow">BUILDING THROUGH CURIOSITY</p>
                <h3>From ideas to working systems</h3>
                <p>
                  AI security tools. A cinematic music workstation. Civic
                  technology. An educational platform. A robot that sorts
                  plastic.
                </p>
                <p>
                  Different problems, the same curiosity. I bring code,
                  intelligence, and the physical world together.
                </p>
                <button className="pill" onClick={() => go("work")}>
                  Explore my projects
                </button>
              </article>
              <article>
                <span className="timeline-dot" />
                <p className="eyebrow">THE TOOLS I WORK WITH</p>
                <h3>A little bit of everything.</h3>
                <div className="skill-accordions">
                  {skills.map((s) => (
                    <details key={s.label}>
                      <summary>
                        {s.label}
                        <Plus size={16} />
                      </summary>
                      <p>{s.items.join(" · ")}</p>
                    </details>
                  ))}
                </div>
              </article>
            </div>
          </div>
        </section>
      </main>
      <footer id="contact">
        <div className="wrap">
          <p className="eyebrow">LET’S MAKE SOMETHING MEANINGFUL</p>
          <h2>
            Got an idea?
            <br />
            Let’s build it.
          </h2>
          <p className="footer-summary">
            Websites, AI systems, interactive experiences, and things that move
            in the real world. I’m always curious about what comes next.
          </p>
          <div className="footer-actions">
            <button className="pill primary" onClick={() => setContact(true)}>
              Let’s talk{" "}
              <span className="button-circle">
                <Plus size={18} />
              </span>
            </button>
            <button className="pill" onClick={() => go("work")}>
              See my work
            </button>
          </div>
          <div className="footer-grid">
            <div className="footer-brand">
              <Monogram />
              <span>{profile.name}</span>
            </div>
            <div>
              <h3>WORK</h3>
              {rooms.map((r, i) => (
                <button key={r.name} onClick={() => openRoom(i)}>
                  {r.name}
                </button>
              ))}
            </div>
            <div>
              <h3>NAVIGATE</h3>
              <button onClick={() => go("home")}>Home</button>
              <button onClick={() => go("about")}>My story</button>
              <button onClick={() => setCard(true)}>My ability card</button>
            </div>
            <div>
              <h3>CONNECT</h3>
              <a href={profile.github} target="_blank" rel="noreferrer">
                GitHub
              </a>
              <a href={"mailto:" + profile.email}>{profile.email}</a>
              <span>Karnataka, India</span>
            </div>
          </div>
          <div className="footer-bottom">
            <span>
              © {new Date().getFullYear()} {profile.name}
            </span>
            <button onClick={() => go("home")}>Back to top ↑</button>
          </div>
        </div>
      </footer>
      {menu && (
        <Modal
          title="Tamim"
          onClose={() => setMenu(false)}
          className="menu-modal"
        >
          <nav aria-label="Mobile navigation">
            <button onClick={() => go("home")}>Home</button>
            {rooms.map((r, i) => (
              <button key={r.name} onClick={() => openRoom(i)}>
                {r.name}
              </button>
            ))}
            <button onClick={() => go("about")}>My story</button>
            <button
              onClick={() => {
                setMenu(false);
                setContact(true);
              }}
            >
              Contact
            </button>
          </nav>
          <Clock />
        </Modal>
      )}
      {room !== null && (
        <Modal
          title={rooms[room].name}
          onClose={() => setRoom(null)}
          className="room-modal"
        >
          <p className="eyebrow">WELCOME INSIDE</p>
          <h2>{rooms[room].name}</h2>
          <p>{rooms[room].tagline.toLowerCase()}.</p>
          <div className="project-grid">
            {projects
              .filter((p) => rooms[room].ids.includes(p.id))
              .map((p) => (
                <button
                  className="project-card"
                  key={p.id}
                  onClick={() => setSelected(p)}
                >
                  <ProjectPreview project={p} />
                  <div>
                    <h3>{p.name}</h3>
                    <p>{p.description}</p>
                    <span className="project-link">
                      Explore project <Plus size={16} />
                    </span>
                  </div>
                </button>
              ))}
          </div>
        </Modal>
      )}
      {card && <AbilityCard onClose={() => setCard(false)} />}
      {contact && <ContactForm onClose={() => setContact(false)} />}
      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </>
  );
}
export default App;
