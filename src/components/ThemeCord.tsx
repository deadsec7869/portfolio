import { useRef } from "react";
import type { PointerEvent } from "react";
import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion";

type Grip = {
  pointer: number;
  x: number;
  y: number;
  angle: number;
  extension: number;
  length: number;
};

export function ThemeCord({
  dark,
  toggle,
}: {
  dark: boolean;
  toggle: () => void;
}) {
  const grip = useRef<Grip | null>(null);
  const reduced = useReducedMotion();
  const angle = useMotionValue(0);
  const extension = useMotionValue(0);
  const bottom = useTransform(extension, (distance) => -distance);

  function settle(kick: boolean) {
    if (reduced) {
      angle.jump(0);
      extension.jump(0);
      return;
    }
    // A straight tug gives the hanging weight a small inward swing.
    const straight = Math.abs(angle.get()) < 2;
    animate(angle, 0, {
      type: "spring",
      stiffness: 82,
      damping: 5.8,
      mass: 1,
      velocity: straight && kick ? 58 : 0,
    });
    animate(extension, 0, {
      type: "spring",
      stiffness: 240,
      damping: 16,
      velocity: kick && extension.get() < 4 ? 220 : 0,
    });
  }

  function grab(event: PointerEvent<HTMLButtonElement>) {
    if (!event.isPrimary || event.button !== 0 || grip.current) return;
    angle.stop();
    extension.stop();
    grip.current = {
      pointer: event.pointerId,
      x: event.clientX,
      y: event.clientY,
      angle: angle.get(),
      extension: extension.get(),
      length: event.currentTarget.offsetHeight,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function drag(event: PointerEvent<HTMLButtonElement>) {
    const start = grip.current;
    if (!start || start.pointer !== event.pointerId || reduced) return;
    const tilt =
      (Math.atan2(start.x - event.clientX, start.length) * 180) / Math.PI;
    angle.set(Math.max(-10, Math.min(22, start.angle + tilt)));
    extension.set(
      Math.max(0, Math.min(64, start.extension + event.clientY - start.y)),
    );
  }

  function release(event: PointerEvent<HTMLButtonElement>, activate: boolean) {
    if (grip.current?.pointer !== event.pointerId) return;
    grip.current = null;
    settle(activate);
    if (activate) toggle();
  }

  return (
    <button
      className="theme-cord"
      type="button"
      role="switch"
      aria-checked={dark}
      aria-label="Dark mode — pull the cord"
      onPointerDown={grab}
      onPointerMove={drag}
      onPointerUp={(event) => release(event, true)}
      onPointerCancel={(event) => release(event, false)}
      onLostPointerCapture={(event) => release(event, false)}
      onClick={(event) => {
        // Pointer releases are handled above. Keyboard and assistive clicks also work.
        if (event.detail === 0) {
          settle(true);
          toggle();
        }
      }}
    >
      <motion.span
        className="cord-rig"
        aria-hidden="true"
        style={{ rotate: angle, bottom }}
      >
        <span className="cord-string" />
        <span className="cord-handle" />
      </motion.span>
      <span className="cord-tooltip" aria-hidden="true">
        {dark ? "Lights on" : "Lights off"}
      </span>
    </button>
  );
}
