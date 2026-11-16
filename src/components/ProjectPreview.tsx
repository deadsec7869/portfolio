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
