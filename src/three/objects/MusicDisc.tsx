import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { STUDIO_COLORS } from '../materials/materials';

interface MusicDiscProps {
  accentColor?: string;
  mousePosition?: { normalizedX: number; normalizedY: number };
}

export function MusicDisc({
  accentColor = STUDIO_COLORS.grey,
  mousePosition,
}: MusicDiscProps) {
  const groupRef = useRef<THREE.Group>(null);
  const discRef = useRef<THREE.Group>(null);
  const ringAuraRef = useRef<THREE.Mesh>(null);
  const barsRef = useRef<THREE.Mesh[]>([]);

  const prefersReducedMotion = useReducedMotion();

  const numBars = 32;

  // Generate radial bar coordinates around the disc
  const barPositions = useMemo(() => {
    const arr = [];
    const radius = 1.35;
    for (let i = 0; i < numBars; i++) {
      const angle = (i / numBars) * Math.PI * 2;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      arr.push({ x, z, angle });
    }
    return arr;
  }, [numBars]);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    if (groupRef.current) {
      if (mousePosition && !prefersReducedMotion) {
        const targetRotX = 0.55 + mousePosition.normalizedY * 0.2;
        const targetRotY = mousePosition.normalizedX * 0.25;
        groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, delta * 3);
        groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, delta * 3);
      } else {
        groupRef.current.rotation.x = 0.55;
        groupRef.current.rotation.y = prefersReducedMotion ? 0 : Math.sin(time * 0.3) * 0.05;
      }
    }

    if (!prefersReducedMotion) {
      // 1. Rotate central disc
      if (discRef.current) {
        discRef.current.rotation.y += delta * 0.5;
      }

      // 2. Animate 32 radial waveform bars
      barsRef.current.forEach((bar, i) => {
        if (!bar) return;
        const wave = Math.sin(time * 4 + i * 0.4) * 0.5 + 0.5;
        const targetScaleY = 0.3 + wave * 1.8;
        bar.scale.y = THREE.MathUtils.lerp(bar.scale.y, targetScaleY, 0.2);
        bar.position.y = (bar.scale.y * 0.3) / 2;
      });

      // 3. Pulse outer ring
      if (ringAuraRef.current) {
        const pulse = 1 + Math.sin(time * 2.5) * 0.04;
        ringAuraRef.current.scale.set(pulse, pulse, pulse);
      }
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.2, 0]}>
      {/* Central Rotating Vinyl / Holographic Disc */}
      <group ref={discRef}>
        {/* Outer Vinyl Rim */}
        <mesh receiveShadow castShadow>
          <cylinderGeometry args={[1.05, 1.05, 0.025, 48]} />
          <meshStandardMaterial
            color={STUDIO_COLORS.greyDark}
            roughness={0.25}
            metalness={0.7}
          />
        </mesh>

        {/* Vinyl Microgroove Concentric Rings */}
        {[0.95, 0.85, 0.75, 0.65].map((r, i) => (
          <mesh key={i} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.014, 0]}>
            <ringGeometry args={[r - 0.01, r, 48]} />
            <meshBasicMaterial
              color={STUDIO_COLORS.greyLight}
              side={THREE.DoubleSide}
              transparent
              opacity={0.35}
            />
          </mesh>
        ))}

        {/* Center Label Area */}
        <mesh position={[0, 0.016, 0]}>
          <cylinderGeometry args={[0.38, 0.38, 0.02, 32]} />
          <meshStandardMaterial
            color={STUDIO_COLORS.offWhite}
            roughness={0.3}
            metalness={0.15}
          />
        </mesh>

        {/* Center Spindle Accent Ring */}
        <mesh position={[0, 0.028, 0]}>
          <cylinderGeometry args={[0.12, 0.12, 0.02, 24]} />
          <meshStandardMaterial color={accentColor} roughness={0.2} metalness={0.6} />
        </mesh>

        {/* Spindle Hub */}
        <mesh position={[0, 0.05, 0]}>
          <cylinderGeometry args={[0.06, 0.06, 0.08, 24]} />
          <meshStandardMaterial
            color={STUDIO_COLORS.greyDark}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
      </group>

      {/* 32-Band Radial 3D Spectrum Waveform Bars */}
      <group position={[0, 0, 0]}>
        {barPositions.map((pos, idx) => (
          <mesh
            key={idx}
            ref={(el) => {
              if (el) barsRef.current[idx] = el;
            }}
            position={[pos.x, 0.15, pos.z]}
            rotation={[0, -pos.angle, 0]}
          >
            <boxGeometry args={[0.07, 0.3, 0.07]} />
            <meshStandardMaterial
              color={accentColor}
              roughness={0.25}
              metalness={0.5}
            />
          </mesh>
        ))}
      </group>

      {/* Outer Concentric Frequency Aura Rings */}
      <mesh
        ref={ringAuraRef}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.01, 0]}
      >
        <ringGeometry args={[1.7, 1.76, 64]} />
        <meshBasicMaterial
          color={accentColor}
          side={THREE.DoubleSide}
          transparent
          opacity={0.3}
        />
      </mesh>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]}>
        <ringGeometry args={[2.1, 2.14, 64]} />
        <meshBasicMaterial
          color={STUDIO_COLORS.greyLight}
          side={THREE.DoubleSide}
          transparent
          opacity={0.2}
        />
      </mesh>
    </group>
  );
}
