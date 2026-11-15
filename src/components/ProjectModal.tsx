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
