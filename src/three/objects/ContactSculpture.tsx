import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface ContactSculptureProps {
  mousePosition?: { normalizedX: number; normalizedY: number };
  accentColor?: string;
}

export function ContactSculpture({
  mousePosition,
  accentColor = '#008899',
}: ContactSculptureProps) {
  const groupRef = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const coreRef = useRef<THREE.Mesh>(null);

  const prefersReducedMotion = useReducedMotion();

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    if (groupRef.current) {
      if (mousePosition && !prefersReducedMotion) {
        groupRef.current.rotation.x = THREE.MathUtils.lerp(
          groupRef.current.rotation.x,
          mousePosition.normalizedY * 0.2,
          delta * 2
        );
        groupRef.current.rotation.y = THREE.MathUtils.lerp(
          groupRef.current.rotation.y,
          mousePosition.normalizedX * 0.25,
          delta * 2
        );
      }
    }

    if (!prefersReducedMotion) {
      if (ring1Ref.current) {
        ring1Ref.current.rotation.z += delta * 0.12;
      }
      if (ring2Ref.current) {
        ring2Ref.current.rotation.x += delta * 0.15;
      }
      if (coreRef.current) {
        coreRef.current.rotation.y += delta * 0.25;
        const s = 1 + Math.sin(time * 1.2) * 0.04;
        coreRef.current.scale.set(s, s, s);
      }
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Central Frosted Titanium Compass Node */}
      <mesh ref={coreRef}>
        <octahedronGeometry args={[0.7, 0]} />
        <meshStandardMaterial
          color="#EAEFF4"
          roughness={0.2}
          metalness={0.8}
          emissive="#FFFFFF"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Primary Gyroscope Ring */}
      <mesh ref={ring1Ref} rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[1.3, 0.012, 16, 80]} />
        <meshStandardMaterial
          color="#334155"
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Secondary Cyan Coordinate Ring */}
      <mesh ref={ring2Ref} rotation={[-Math.PI / 3, Math.PI / 4, 0]}>
        <torusGeometry args={[1.65, 0.008, 16, 80]} />
        <meshBasicMaterial
          color={accentColor}
          transparent
          opacity={0.45}
        />
      </mesh>
    </group>
  );
}
