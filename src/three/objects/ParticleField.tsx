import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useReducedMotion } from '../../hooks/useReducedMotion';

import { STUDIO_COLORS } from '../materials/materials';

interface ParticleFieldProps {
  count?: number;
  color?: string;
  size?: number;
  speed?: number;
  radius?: number;
}

// Deterministic pseudo-random number generator
function pseudoRandom(seed: number): number {
  const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
  return x - Math.floor(x);
}

export function ParticleField({
  count = 450,
  color = STUDIO_COLORS.accent,
  size = 0.024,
  speed = 0.025,
  radius = 16,
}: ParticleFieldProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const prefersReducedMotion = useReducedMotion();

  // Generate spherical / ellipsoid particle distribution deterministically
  const [positions, scales] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sc = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const r1 = pseudoRandom(i * 3 + 1);
      const r2 = pseudoRandom(i * 3 + 2);
      const r3 = pseudoRandom(i * 3 + 3);

      const theta = r1 * Math.PI * 2;
      const phi = Math.acos(r2 * 2 - 1);
      const r = Math.pow(r3, 0.65) * radius;

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.75;
      pos[i * 3 + 2] = r * Math.cos(phi);

      sc[i] = pseudoRandom(i + 42) * 0.8 + 0.2;
    }

    return [pos, sc];
  }, [count, radius]);

  useFrame((state, delta) => {
    if (!pointsRef.current || prefersReducedMotion) return;
    
    // Slow rotational drift
    pointsRef.current.rotation.y += delta * speed * 0.4;
    pointsRef.current.rotation.x += delta * speed * 0.15;

    // Harmonic breathing oscillation
    const time = state.clock.getElapsedTime();
    const s = 1 + Math.sin(time * 0.4) * 0.02;
    pointsRef.current.scale.set(s, s, s);
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-scale" args={[scales, 1]} />
      </bufferGeometry>
      <pointsMaterial
        size={size}
        color={color}
        transparent
        opacity={0.5}
        blending={THREE.NormalBlending}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}
