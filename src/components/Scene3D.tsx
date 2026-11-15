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
