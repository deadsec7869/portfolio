import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface MusicDiscProps {
  accentColor?: string;
  mousePosition?: { normalizedX: number; normalizedY: number };
}

export function MusicDisc({
  accentColor = '#008899',
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
        const freq =
          0.2 +
          Math.abs(Math.sin(time * 3.5 + i * 0.35)) * 0.9 +
          Math.abs(Math.cos(time * 2.0 + i * 0.6)) * 0.4;
        bar.scale.y = THREE.MathUtils.lerp(bar.scale.y, freq, delta * 12);
        bar.position.y = (bar.scale.y * 0.3) / 2;
      });

      // 3. Pulse concentric frequency aura
      if (ringAuraRef.current) {
        const pulse = 1 + Math.sin(time * 2) * 0.05;
        ringAuraRef.current.scale.set(pulse, pulse, pulse);
      }
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.1, 0]}>
      {/* Central Rotating Music Workstation Disc */}
      <group ref={discRef}>
        {/* Outer Vinyl / Frosted Disc Body */}
        <mesh position={[0, 0, 0]} castShadow>
          <cylinderGeometry args={[1.05, 1.05, 0.04, 48]} />
          <meshStandardMaterial
            color="#1E293B"
            metalness={0.9}
            roughness={0.15}
          />
        </mesh>

        {/* Vinyl Grooves Inlay */}
        <mesh position={[0, 0.022, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.45, 0.95, 48]} />
          <meshStandardMaterial
            color="#0F172A"
            roughness={0.5}
            metalness={0.7}
          />
        </mesh>

        {/* Center Label Core */}
        <mesh position={[0, 0.025, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.38, 32]} />
          <meshStandardMaterial
            color="#FAFAF8"
            roughness={0.3}
            metalness={0.2}
          />
        </mesh>

        {/* Spindle Hub */}
        <mesh position={[0, 0.05, 0]}>
          <cylinderGeometry args={[0.06, 0.06, 0.08, 24]} />
          <meshStandardMaterial
            color="#E2E8F0"
            metalness={0.95}
            roughness={0.1}
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
              emissive={accentColor}
              emissiveIntensity={0.55}
              roughness={0.2}
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
          opacity={0.4}
        />
      </mesh>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]}>
        <ringGeometry args={[2.1, 2.14, 64]} />
        <meshBasicMaterial
          color="#94A3B8"
          side={THREE.DoubleSide}
          transparent
          opacity={0.25}
        />
      </mesh>
    </group>
  );
}
