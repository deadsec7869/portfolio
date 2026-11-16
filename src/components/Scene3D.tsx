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
