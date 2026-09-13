import { useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Globe } from '../../three/objects/Globe';

function isFinePointerDevice(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(pointer: fine) and (hover: hover)').matches;
}

export function GlobeCursor() {
  const [enabled] = useState(isFinePointerDevice);
  const [cursorState, setCursorState] = useState<'default' | 'hover' | 'project'>('default');
  const [isClicking, setIsClicking] = useState(false);

  const dotRef = useRef<HTMLDivElement>(null);
  const cursorContainerRef = useRef<HTMLDivElement>(null);
  const targetPos = useRef({ x: -100, y: -100 });
  const currentPos = useRef({ x: -100, y: -100 });
  const velXRef = useRef(0);
  const velYRef = useRef(0);

  useEffect(() => {
    if (!enabled) return;

    const onMouseMove = (e: MouseEvent) => {
      targetPos.current.x = e.clientX;
      targetPos.current.y = e.clientY;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cursorAction = target.closest('[data-cursor]')?.getAttribute('data-cursor');
      if (cursorAction === 'VIEW' || cursorAction === 'PROJECT') {
        setCursorState('project');
      } else if (
        cursorAction ||
        target.closest('button, a, input, select, textarea, [role="button"]')
      ) {
        setCursorState('hover');
      } else {
        setCursorState('default');
      }
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);

    // Physics spring lag tracking loop
    let lastTime = performance.now();
    let prevX = currentPos.current.x;
    let prevY = currentPos.current.y;
    let animId: number;

    const tick = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;

      // Smooth spring lag interpolation
      const factor = 1 - Math.exp(-14 * dt);
      currentPos.current.x += (targetPos.current.x - currentPos.current.x) * factor;
      currentPos.current.y += (targetPos.current.y - currentPos.current.y) * factor;

      velXRef.current = (currentPos.current.x - prevX) / (dt || 0.016);
      velYRef.current = (currentPos.current.y - prevY) / (dt || 0.016);
      prevX = currentPos.current.x;
      prevY = currentPos.current.y;

      if (cursorContainerRef.current) {
        const size = cursorState === 'project' ? 44 : cursorState === 'hover' ? 40 : 34;
        cursorContainerRef.current.style.transform = `translate3d(${currentPos.current.x - size / 2}px, ${currentPos.current.y - size / 2}px, 0)`;
      }

      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      cancelAnimationFrame(animId);
    };
  }, [enabled, cursorState]);

  if (!enabled) return null;

  const globeSize = cursorState === 'project' ? 44 : cursorState === 'hover' ? 40 : 34;

  return (
    <>
      {/* Precision Tiny Pointer Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-[#111111] rounded-full pointer-events-none z-[99999] -translate-x-1/2 -translate-y-1/2 opacity-70"
        style={{ transform: 'translate3d(-100px, -100px, 0)' }}
      />

      {/* Floating 3D Globe Cursor Container */}
      <div
        ref={cursorContainerRef}
        className={`fixed top-0 left-0 pointer-events-none z-[99998] rounded-full transition-transform duration-150 ${
          isClicking ? 'scale-90' : 'scale-100'
        }`}
        style={{
          width: `${globeSize}px`,
          height: `${globeSize}px`,
          transform: 'translate3d(-100px, -100px, 0)',
        }}
      >
        <Canvas
          camera={{ position: [0, 0, 2.8], fov: 45 }}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: 'low-power',
            depth: true,
            stencil: false,
          }}
          dpr={[1, 1.5]}
          style={{ width: '100%', height: '100%', pointerEvents: 'none' }}
        >
          <ambientLight intensity={1.4} color="#FFFFFF" />
          <directionalLight position={[3, 4, 3]} intensity={2.0} color="#FFFFFF" />
          <directionalLight position={[-3, -2, 1]} intensity={0.8} color="#94A3B8" />

          <Globe
            cursorState={cursorState}
            velXRef={velXRef}
            velYRef={velYRef}
          />
        </Canvas>
      </div>
    </>
  );
}
