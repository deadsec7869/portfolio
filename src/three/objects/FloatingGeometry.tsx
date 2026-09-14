import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { STUDIO_COLORS } from '../materials/materials';

interface FloatingGeometryProps {
  mousePosition?: { normalizedX: number; normalizedY: number };
  accentColor?: string;
  scrollProgress?: number;
}

export function FloatingGeometry({
  mousePosition,
  scrollProgress = 0,
}: FloatingGeometryProps) {
  const masterGroupRef = useRef<THREE.Group>(null);
  const coreSphereRef = useRef<THREE.Mesh>(null);
  const wireCageRef = useRef<THREE.Group>(null);
  const primaryGreyRingRef = useRef<THREE.Group>(null);
  const secondaryLightRingRef = useRef<THREE.Group>(null);
  const cyanRingRef = useRef<THREE.Group>(null);
  const orangeRingRef = useRef<THREE.Group>(null);
  const satellitesGroupRef = useRef<THREE.Group>(null);

  const prefersReducedMotion = useReducedMotion();

  // Spring physics & inertia state via refs
  const targetRotation = useRef({ x: 0, y: 0 });
  const currentRotation = useRef({ x: 0, y: 0 });
  const velocity = useRef({ x: 0, y: 0 });

  // Calculate clean 12 vertices of the icosahedron cage (radius 1.35)
  const icosahedronVertices = useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(1.35, 0);
    const pos = geo.attributes.position;
    const vertices: [number, number, number][] = [];
    const seen = new Set<string>();
    for (let i = 0; i < pos.count; i++) {
      const x = Number(pos.getX(i).toFixed(4));
      const y = Number(pos.getY(i).toFixed(4));
      const z = Number(pos.getZ(i).toFixed(4));
      const key = `${x},${y},${z}`;
      if (!seen.has(key)) {
        seen.add(key);
        vertices.push([x, y, z]);
      }
    }
    geo.dispose();
    return vertices;
  }, []);

  // Multi-colored strategic satellite spheres matching the reference
  const satelliteData = useMemo(() => [
    { pos: [1.75, 0.72, 0.4] as [number, number, number], size: 0.075, color: STUDIO_COLORS.nodeLight, metalness: 0.2, roughness: 0.3 },
    { pos: [1.45, -0.65, 0.85] as [number, number, number], size: 0.08, color: STUDIO_COLORS.orange, metalness: 0.3, roughness: 0.25 },
    { pos: [-1.48, 0.52, 0.65] as [number, number, number], size: 0.065, color: STUDIO_COLORS.cyan, metalness: 0.3, roughness: 0.2 },
    { pos: [-1.32, -0.32, 0.75] as [number, number, number], size: 0.055, color: STUDIO_COLORS.nodeDark, metalness: 0.4, roughness: 0.4 },
    { pos: [0.68, -1.25, 0.75] as [number, number, number], size: 0.045, color: STUDIO_COLORS.cyan, metalness: 0.3, roughness: 0.2 },
    { pos: [-0.95, 0.85, -0.6] as [number, number, number], size: 0.05, color: STUDIO_COLORS.nodeLight, metalness: 0.2, roughness: 0.3 },
    { pos: [1.82, -0.48, -0.35] as [number, number, number], size: 0.04, color: STUDIO_COLORS.orange, metalness: 0.3, roughness: 0.25 },
  ], []);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    // 1. Subtle pointer parallax target
    if (mousePosition && !prefersReducedMotion) {
      targetRotation.current.x = mousePosition.normalizedY * 0.12;
      targetRotation.current.y = mousePosition.normalizedX * 0.14;
    }

    // 2. Spring damping physics with gentle inertia
    if (masterGroupRef.current) {
      const springStiffness = prefersReducedMotion ? 0.03 : 0.06;
      const dampingFactor = 0.88;

      const forceX = (targetRotation.current.x - currentRotation.current.x) * springStiffness;
      const forceY = (targetRotation.current.y - currentRotation.current.y) * springStiffness;

      velocity.current.x = velocity.current.x * dampingFactor + forceX;
      velocity.current.y = velocity.current.y * dampingFactor + forceY;

      currentRotation.current.x += velocity.current.x;
      currentRotation.current.y += velocity.current.y;

      // Slow, architectural orbital drift
      masterGroupRef.current.rotation.x = currentRotation.current.x + (prefersReducedMotion ? 0 : Math.sin(time * 0.15) * 0.015);
      masterGroupRef.current.rotation.y = currentRotation.current.y + (prefersReducedMotion ? 0 : time * 0.014);

      // Gentle vertical breathing and scroll scale
      const idleY = prefersReducedMotion ? 0 : Math.sin(time * 0.35) * 0.025;
      const scrollShiftY = -scrollProgress * 2.0;
      const scrollScale = Math.max(1 - scrollProgress * 0.3, 0.65);

      masterGroupRef.current.position.set(0, -0.02 + idleY + scrollShiftY, 0);
      masterGroupRef.current.scale.set(scrollScale, scrollScale, scrollScale);
    }

    // 3. Multi-layer relative rotations
    if (!prefersReducedMotion) {
      if (coreSphereRef.current) {
        coreSphereRef.current.rotation.x += delta * 0.02;
        coreSphereRef.current.rotation.y += delta * 0.025;
      }

      if (wireCageRef.current) {
        wireCageRef.current.rotation.y -= delta * 0.018;
        wireCageRef.current.rotation.x += delta * 0.01;
      }

      if (primaryGreyRingRef.current) {
        primaryGreyRingRef.current.rotation.z -= delta * 0.02;
      }

      if (secondaryLightRingRef.current) {
        secondaryLightRingRef.current.rotation.z += delta * 0.015;
      }

      if (cyanRingRef.current) {
        cyanRingRef.current.rotation.z += delta * 0.03;
        cyanRingRef.current.rotation.y += delta * 0.01;
      }

      if (orangeRingRef.current) {
        orangeRingRef.current.rotation.y += delta * 0.025;
      }

      if (satellitesGroupRef.current) {
        satellitesGroupRef.current.rotation.y += delta * 0.016;
      }
    }
  });

  return (
    <group ref={masterGroupRef} position={[0, -0.02, 0]}>
      {/* 1. LAYER 1: Central Sculptural Off-White Physical Sphere */}
      <mesh ref={coreSphereRef} castShadow receiveShadow>
        <sphereGeometry args={[0.92, 48, 48]} />
        <meshStandardMaterial
          color={STUDIO_COLORS.sphere}
          roughness={0.35}
          metalness={0.12}
        />
      </mesh>

      {/* 2. LAYER 2: Fine Structural Wireframe Cage with Stationed Node Beads */}
      <group ref={wireCageRef}>
        <mesh>
          <icosahedronGeometry args={[1.35, 1]} />
          <meshBasicMaterial
            color={STUDIO_COLORS.wireframe}
            wireframe
            transparent
            opacity={0.4}
          />
        </mesh>
        {/* Node beads stationed at vertices */}
        {icosahedronVertices.map((pos, idx) => (
          <mesh key={idx} position={pos}>
            <sphereGeometry args={[0.035, 16, 16]} />
            <meshStandardMaterial
              color={idx % 4 === 0 ? STUDIO_COLORS.cyan : idx % 3 === 0 ? STUDIO_COLORS.orange : idx % 2 === 0 ? STUDIO_COLORS.nodeDark : STUDIO_COLORS.nodeLight}
              metalness={0.3}
              roughness={0.25}
            />
          </mesh>
        ))}
      </group>

      {/* 3. LAYER 3: Primary Thick Grey Orbital Ring */}
      <group ref={primaryGreyRingRef} rotation={[Math.PI / 3.4, Math.PI / 4.2, 0]}>
        <mesh castShadow receiveShadow>
          <torusGeometry args={[1.88, 0.034, 24, 120]} />
          <meshStandardMaterial
            color={STUDIO_COLORS.ringPrimary}
            metalness={0.5}
            roughness={0.28}
          />
        </mesh>
      </group>

      {/* 4. LAYER 4: Secondary Light Grey Orbital Ring */}
      <group ref={secondaryLightRingRef} rotation={[-Math.PI / 3.6, -Math.PI / 4.8, 0]}>
        <mesh>
          <torusGeometry args={[1.72, 0.02, 20, 120]} />
          <meshStandardMaterial
            color={STUDIO_COLORS.ringSecondary}
            metalness={0.35}
            roughness={0.35}
          />
        </mesh>
      </group>

      {/* 5. LAYER 5: Sweeping Electric Cyan Orbital Ring */}
      <group ref={cyanRingRef} rotation={[Math.PI / 2.2, -Math.PI / 5.0, 0]}>
        <mesh>
          <torusGeometry args={[2.22, 0.016, 16, 120]} />
          <meshStandardMaterial
            color={STUDIO_COLORS.cyan}
            metalness={0.3}
            roughness={0.2}
          />
        </mesh>
        {/* Cyan orbital marker bead */}
        <mesh position={[2.22, 0, 0]}>
          <sphereGeometry args={[0.045, 16, 16]} />
          <meshStandardMaterial
            color={STUDIO_COLORS.cyan}
            metalness={0.3}
            roughness={0.2}
          />
        </mesh>
      </group>

      {/* 6. LAYER 6: Vibrant Ember Orange Orbital Ring */}
      <group ref={orangeRingRef} rotation={[-Math.PI / 3.8, Math.PI / 4.0, 0]}>
        <mesh>
          <torusGeometry args={[1.54, 0.016, 16, 100]} />
          <meshStandardMaterial
            color={STUDIO_COLORS.orange}
            metalness={0.3}
            roughness={0.25}
          />
        </mesh>
      </group>

      {/* 7. LAYER 7: Orbiting Multi-Colored Satellites */}
      <group ref={satellitesGroupRef}>
        {satelliteData.map((sat, idx) => (
          <mesh key={idx} position={sat.pos} castShadow>
            <sphereGeometry args={[sat.size, 24, 24]} />
            <meshStandardMaterial
              color={sat.color}
              metalness={sat.metalness}
              roughness={sat.roughness}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
}
