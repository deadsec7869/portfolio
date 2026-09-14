import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { STUDIO_COLORS } from '../materials/materials';

interface ContactSculptureProps {
  mousePosition?: { normalizedX: number; normalizedY: number };
  accentColor?: string;
}

export function ContactSculpture({
  mousePosition,
  accentColor = STUDIO_COLORS.grey,
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
      {/* Central Warm Frosted Off-White Octahedron Core */}
      <mesh ref={coreRef}>
        <octahedronGeometry args={[0.7, 0]} />
        <meshStandardMaterial
          color={STUDIO_COLORS.offWhite}
          roughness={0.25}
          metalness={0.25}
          emissive="#FFFFFF"
          emissiveIntensity={0.06}
        />
      </mesh>

      {/* Primary Structural Orbital Ring */}
      <mesh ref={ring1Ref} rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[1.35, 0.009, 16, 80]} />
        <meshBasicMaterial
          color={accentColor}
          transparent
          opacity={0.65}
        />
      </mesh>

      {/* Secondary Structural Gyro Ring */}
      <mesh ref={ring2Ref} rotation={[-Math.PI / 3, Math.PI / 6, 0]}>
        <torusGeometry args={[1.65, 0.006, 16, 80]} />
        <meshBasicMaterial
          color={STUDIO_COLORS.greyLight}
          transparent
          opacity={0.35}
        />
      </mesh>
    </group>
  );
}
