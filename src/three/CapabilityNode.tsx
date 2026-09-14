import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import type { CapabilityNode as CapabilityNodeType } from '../data/graphData';
import { STUDIO_COLORS } from './materials/materials';

interface CapabilityNodeProps {
  node: CapabilityNodeType;
  isSelected: boolean;
  isHovered: boolean;
  isDimmed: boolean;
  onHover: (id: string | null) => void;
  onSelect: (node: CapabilityNodeType) => void;
}

export function CapabilityNode({
  node,
  isSelected,
  isHovered,
  isDimmed,
  onHover,
  onSelect,
}: CapabilityNodeProps) {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const haloRef = useRef<THREE.Mesh>(null);
  const wireRef = useRef<THREE.Mesh>(null);

  const [localHovered, setLocalHovered] = useState(false);
  const active = isSelected || isHovered || localHovered;

  // Base radii based on hierarchy tier
  const baseRadius =
    node.type === 'central' ? 0.6 : node.type === 'domain' ? 0.38 : 0.22;

  // Subtle breathing animation and camera billboard orientation for labels
  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Slow micro-drift based on position hash
    const time = state.clock.getElapsedTime();
    const driftX = Math.sin(time * 0.6 + node.position[0]) * 0.04;
    const driftY = Math.cos(time * 0.7 + node.position[1]) * 0.04;
    const driftZ = Math.sin(time * 0.5 + node.position[2]) * 0.04;

    groupRef.current.position.set(
      node.position[0] + driftX,
      node.position[1] + driftY,
      node.position[2] + driftZ
    );

    // Target scale spring
    const targetScale = active ? 1.28 : isDimmed ? 0.88 : 1.0;
    if (meshRef.current) {
      meshRef.current.scale.lerp(
        new THREE.Vector3(targetScale, targetScale, targetScale),
        0.15
      );
    }

    // Rotate outer wireframe ring if present
    if (wireRef.current) {
      wireRef.current.rotation.y += delta * 0.4;
      wireRef.current.rotation.x += delta * 0.2;
    }

    // Rotate active halo ring
    if (haloRef.current) {
      haloRef.current.rotation.z += delta * 0.8;
    }
  });

  return (
    <group
      ref={groupRef}
      onPointerOver={(e) => {
        e.stopPropagation();
        setLocalHovered(true);
        onHover(node.id);
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        setLocalHovered(false);
        onHover(null);
      }}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(node);
      }}
    >
      {/* CENTRAL ROOT NODE */}
      {node.type === 'central' && (
        <>
          {/* Inner Charcoal Metallic Sphere */}
          <mesh ref={meshRef}>
            <sphereGeometry args={[baseRadius, 32, 32]} />
            <meshStandardMaterial
              color={active ? STUDIO_COLORS.accent : STUDIO_COLORS.threeDark}
              roughness={0.25}
              metalness={0.78}
              emissive={active ? STUDIO_COLORS.accent : '#000000'}
              emissiveIntensity={active ? 0.4 : 0.05}
            />
          </mesh>

          {/* Outer Titanium Structural Core Ring */}
          <mesh rotation={[Math.PI / 3, Math.PI / 4, 0]}>
            <ringGeometry args={[baseRadius * 1.35, baseRadius * 1.48, 48]} />
            <meshBasicMaterial
              color={active ? STUDIO_COLORS.accent : STUDIO_COLORS.threeLight}
              side={THREE.DoubleSide}
              transparent
              opacity={0.65}
            />
          </mesh>

          {/* Holographic Wireframe Octahedron Shell */}
          <mesh ref={wireRef}>
            <octahedronGeometry args={[baseRadius * 1.6, 0]} />
            <meshBasicMaterial
              color={STUDIO_COLORS.accent}
              wireframe
              transparent
              opacity={0.35}
            />
          </mesh>
        </>
      )}

      {/* DOMAIN NODE */}
      {node.type === 'domain' && (
        <>
          <mesh ref={meshRef}>
            <sphereGeometry args={[baseRadius, 24, 24]} />
            <meshStandardMaterial
              color={active ? STUDIO_COLORS.accent : STUDIO_COLORS.threeLight}
              roughness={0.22}
              metalness={0.8}
              emissive={active ? STUDIO_COLORS.accent : '#FFFFFF'}
              emissiveIntensity={active ? 0.5 : 0.12}
            />
          </mesh>

          {/* Domain Wireframe Latitude Ring */}
          <mesh ref={wireRef} rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[baseRadius * 1.3, baseRadius * 1.42, 36]} />
            <meshBasicMaterial
              color={active ? STUDIO_COLORS.accent : STUDIO_COLORS.greyDark}
              side={THREE.DoubleSide}
              transparent
              opacity={active ? 0.75 : 0.28}
            />
          </mesh>
        </>
      )}

      {/* TECHNOLOGY NODE */}
      {node.type === 'tech' && (
        <mesh ref={meshRef}>
          <sphereGeometry args={[baseRadius, 18, 18]} />
          <meshStandardMaterial
            color={
              active
                ? STUDIO_COLORS.accent
                : isDimmed
                ? STUDIO_COLORS.greyLight
                : STUDIO_COLORS.threeDark
            }
            roughness={0.3}
            metalness={0.65}
            emissive={active ? STUDIO_COLORS.accent : '#000000'}
            emissiveIntensity={active ? 0.6 : 0}
          />
        </mesh>
      )}

      {/* ACTIVE ORBITAL HALO ON SELECT / HOVER */}
      {active && (
        <mesh ref={haloRef} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[baseRadius * 1.45, baseRadius * 1.62, 32]} />
          <meshBasicMaterial
            color={STUDIO_COLORS.accent}
            side={THREE.DoubleSide}
            transparent
            opacity={0.8}
          />
        </mesh>
      )}

      {/* TECHNICAL TEXT LABEL */}
      <Text
        position={[0, baseRadius + 0.28, 0]}
        fontSize={node.type === 'central' ? 0.28 : node.type === 'domain' ? 0.21 : 0.16}
        color={active ? STUDIO_COLORS.accent : isDimmed ? '#85857D' : '#111111'}
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.018}
        outlineColor="#F4F3EE"
        font={undefined}
      >
        {node.label}
      </Text>

      {/* EXTRA METADATA TAG FOR CENTRAL OR DOMAIN */}
      {node.tag && (
        <Text
          position={[0, baseRadius + 0.48, 0]}
          fontSize={0.1}
          color={active ? STUDIO_COLORS.accent : '#85857D'}
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.012}
          outlineColor="#F4F3EE"
        >
          {node.tag}
        </Text>
      )}
    </group>
  );
}
