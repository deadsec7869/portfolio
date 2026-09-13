import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface FloatingGeometryProps {
  mousePosition?: { normalizedX: number; normalizedY: number };
  accentColor?: string;
  scrollProgress?: number;
}

export function FloatingGeometry({
  mousePosition,
  accentColor = '#008899',
  scrollProgress = 0,
}: FloatingGeometryProps) {
  const masterGroupRef = useRef<THREE.Group>(null);
  const coreSphereRef = useRef<THREE.Mesh>(null);
  const innerMatrixRef = useRef<THREE.Mesh>(null);
  const outerGeodesicRef = useRef<THREE.Mesh>(null);
  const equatorialRingRef = useRef<THREE.Group>(null);
  const gimbalRing1Ref = useRef<THREE.Group>(null);
  const gimbalRing2Ref = useRef<THREE.Group>(null);
  const satellitesGroupRef = useRef<THREE.Group>(null);
  const satelliteMeshRefs = useRef<THREE.Mesh[]>([]);

  const prefersReducedMotion = useReducedMotion();

  // Spring physics & inertia state via refs
  const targetRotation = useRef({ x: 0, y: 0 });
  const currentRotation = useRef({ x: 0, y: 0 });
  const velocity = useRef({ x: 0, y: 0 });

  // Micro-component satellite coordinate distribution
  const satelliteData = useMemo(() => [
    { pos: [1.9, 0.4, 0.8] as [number, number, number], size: 0.04, speed: 0.12 },
    { pos: [-1.7, -0.6, 0.9] as [number, number, number], size: 0.035, speed: 0.09 },
    { pos: [0.6, 2.0, -0.7] as [number, number, number], size: 0.045, speed: 0.15 },
    { pos: [-0.9, -1.8, -1.0] as [number, number, number], size: 0.03, speed: 0.08 },
    { pos: [1.3, -1.3, 1.5] as [number, number, number], size: 0.038, speed: 0.11 },
    { pos: [-1.5, 1.4, -1.2] as [number, number, number], size: 0.042, speed: 0.13 },
  ], []);

  // Degree tick marks for equatorial calibration ring
  const tickCoordinates = useMemo(() => {
    const ticks: [number, number, number][] = [];
    const radius = 2.45;
    const count = 36;
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      ticks.push([Math.cos(angle) * radius, 0, Math.sin(angle) * radius]);
    }
    return ticks;
  }, []);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    // 1. Subtle pointer parallax target (restrained to 2-4% angular displacement)
    if (mousePosition && !prefersReducedMotion) {
      targetRotation.current.x = mousePosition.normalizedY * 0.14;
      targetRotation.current.y = mousePosition.normalizedX * 0.18;
    }

    // 2. Spring damping physics with mass & inertia
    if (masterGroupRef.current) {
      const springStiffness = prefersReducedMotion ? 0.04 : 0.08;
      const dampingFactor = 0.88;

      const forceX = (targetRotation.current.x - currentRotation.current.x) * springStiffness;
      const forceY = (targetRotation.current.y - currentRotation.current.y) * springStiffness;

      velocity.current.x = velocity.current.x * dampingFactor + forceX;
      velocity.current.y = velocity.current.y * dampingFactor + forceY;

      currentRotation.current.x += velocity.current.x;
      currentRotation.current.y += velocity.current.y;

      // Apply master orientation + subtle idle orbital drift
      masterGroupRef.current.rotation.x = currentRotation.current.x + (prefersReducedMotion ? 0 : Math.sin(time * 0.25) * 0.03);
      masterGroupRef.current.rotation.y = currentRotation.current.y + (prefersReducedMotion ? 0 : time * 0.03);

      // Subtle vertical breathing with inertia
      const idleY = prefersReducedMotion ? 0 : Math.sin(time * 0.5) * 0.06;
      // Scroll progression influence: shifts gently on scroll
      const scrollShiftY = -scrollProgress * 2.5;
      const scrollScale = Math.max(1 - scrollProgress * 0.35, 0.6);

      masterGroupRef.current.position.y = idleY + scrollShiftY;
      masterGroupRef.current.scale.set(scrollScale, scrollScale, scrollScale);
    }

    // 3. Multi-layer relative rotations
    if (!prefersReducedMotion) {
      // Central Frosted Core
      if (coreSphereRef.current) {
        coreSphereRef.current.rotation.x += delta * 0.08;
        coreSphereRef.current.rotation.y += delta * 0.12;
      }

      // Inner Quantum Wireframe
      if (innerMatrixRef.current) {
        innerMatrixRef.current.rotation.x -= delta * 0.1;
        innerMatrixRef.current.rotation.z += delta * 0.07;
      }

      // Outer Geodesic Shell
      if (outerGeodesicRef.current) {
        outerGeodesicRef.current.rotation.y -= delta * 0.05;
        outerGeodesicRef.current.rotation.x += delta * 0.04;
      }

      // Equatorial Calibration Ring
      if (equatorialRingRef.current) {
        equatorialRingRef.current.rotation.z += delta * 0.06;
      }

      // Gimbal Rings (Offset Gyroscopic Rotation)
      if (gimbalRing1Ref.current) {
        gimbalRing1Ref.current.rotation.z += delta * 0.09;
      }
      if (gimbalRing2Ref.current) {
        gimbalRing2Ref.current.rotation.x -= delta * 0.07;
        gimbalRing2Ref.current.rotation.y += delta * 0.05;
      }

      // Micro-component satellites orbital cluster
      if (satellitesGroupRef.current) {
        satellitesGroupRef.current.rotation.y += delta * 0.06;
      }

      // Individual satellite nodes self-rotation
      satelliteMeshRefs.current.forEach((mesh, idx) => {
        if (!mesh) return;
        const speed = satelliteData[idx]?.speed || 0.1;
        mesh.rotation.y += delta * speed * 4;
        mesh.rotation.x += delta * speed * 2;
      });
    }
  });

  return (
    <group ref={masterGroupRef} position={[0, 0, 0]}>
      {/* 1. LAYER 1: Central Frosted Titanium Geodesic Sphere Core */}
      <mesh ref={coreSphereRef} castShadow receiveShadow>
        <icosahedronGeometry args={[1.18, 4]} />
        <meshStandardMaterial
          color="#EAEFF4"
          roughness={0.16}
          metalness={0.88}
          emissive="#FFFFFF"
          emissiveIntensity={0.12}
        />
      </mesh>

      {/* 2. LAYER 2: Inner Cyan Quantum Wireframe Matrix */}
      <mesh ref={innerMatrixRef}>
        <icosahedronGeometry args={[0.75, 1]} />
        <meshBasicMaterial
          color={accentColor}
          wireframe
          transparent
          opacity={0.4}
        />
      </mesh>

      {/* 3. LAYER 3: Translucent Physical Geodesic Lattice */}
      <mesh ref={outerGeodesicRef}>
        <icosahedronGeometry args={[1.85, 1]} />
        <meshStandardMaterial
          color="#334155"
          wireframe
          transparent
          opacity={0.24}
          roughness={0.2}
          metalness={0.7}
        />
      </mesh>

      {/* 4. LAYER 4: Equatorial Calibration Index Ring */}
      <group ref={equatorialRingRef} rotation={[Math.PI / 2, 0, 0]}>
        {/* Main Solid Track */}
        <mesh>
          <torusGeometry args={[2.45, 0.012, 16, 120]} />
          <meshStandardMaterial
            color="#334155"
            metalness={0.82}
            roughness={0.2}
          />
        </mesh>
        {/* Degree Calibration Ticks */}
        {tickCoordinates.map((pos, i) => (
          <mesh key={i} position={pos}>
            <boxGeometry args={[0.015, 0.015, i % 6 === 0 ? 0.08 : 0.03]} />
            <meshBasicMaterial color={i % 6 === 0 ? accentColor : '#64748B'} />
          </mesh>
        ))}
      </group>

      {/* 5. LAYER 5: Primary Precision Titanium Gimbal Ring */}
      <group ref={gimbalRing1Ref} rotation={[Math.PI / 3.4, Math.PI / 6, 0]}>
        <mesh>
          <torusGeometry args={[2.65, 0.014, 16, 120]} />
          <meshStandardMaterial
            color="#EAEFF4"
            metalness={0.9}
            roughness={0.18}
          />
        </mesh>
        {/* Precision Index Bead */}
        <mesh position={[2.65, 0, 0]}>
          <sphereGeometry args={[0.045, 16, 16]} />
          <meshBasicMaterial color={accentColor} />
        </mesh>
      </group>

      {/* 6. LAYER 6: Secondary Orbital Cyan Accent Ring */}
      <group ref={gimbalRing2Ref} rotation={[-Math.PI / 3.8, -Math.PI / 5, 0]}>
        <mesh>
          <torusGeometry args={[2.95, 0.008, 16, 120]} />
          <meshBasicMaterial
            color={accentColor}
            transparent
            opacity={0.35}
          />
        </mesh>
        <mesh position={[-2.95, 0, 0]}>
          <sphereGeometry args={[0.038, 16, 16]} />
          <meshStandardMaterial
            color="#1E293B"
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
      </group>

      {/* 7. LAYER 7: Micro-Component Satellites & Telemetry Nodes */}
      <group ref={satellitesGroupRef}>
        {satelliteData.map((sat, idx) => (
          <group key={idx} position={sat.pos}>
            <mesh
              ref={(el) => {
                if (el) satelliteMeshRefs.current[idx] = el;
              }}
            >
              <octahedronGeometry args={[sat.size, 0]} />
              <meshStandardMaterial
                color={idx % 2 === 0 ? accentColor : '#475569'}
                metalness={0.85}
                roughness={0.2}
                emissive={idx % 2 === 0 ? accentColor : '#000000'}
                emissiveIntensity={idx % 2 === 0 ? 0.4 : 0}
              />
            </mesh>
          </group>
        ))}
      </group>
    </group>
  );
}
