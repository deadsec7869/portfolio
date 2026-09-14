import { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import { technologies } from '../data/technologies';
import type { Technology } from '../data/technologies';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { STUDIO_COLORS } from './materials/materials';

interface OrbitNodeProps {
  tech: Technology;
  radius: number;
  speed: number;
  angleOffset: number;
  isSelected: boolean;
  onHover: (tech: Technology | null) => void;
  onClick: (tech: Technology) => void;
}

function OrbitNode({
  tech,
  radius,
  speed,
  angleOffset,
  isSelected,
  onHover,
  onClick
}: OrbitNodeProps) {
  const meshRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    const currentAngle = angleOffset + time * speed * 0.25;
    const x = Math.cos(currentAngle) * radius;
    const z = Math.sin(currentAngle) * radius;
    const y = Math.sin(time * 0.8 + angleOffset) * 0.35;

    meshRef.current.position.set(x, y, z);
    meshRef.current.quaternion.copy(state.camera.quaternion);
  });

  const active = hovered || isSelected;

  return (
    <group
      ref={meshRef}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        onHover(tech);
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        setHovered(false);
        onHover(null);
      }}
      onClick={(e) => {
        e.stopPropagation();
        onClick(tech);
      }}
    >
      {/* Node Sphere Core */}
      <mesh scale={active ? 1.35 : 1}>
        <sphereGeometry args={[0.22, 16, 16]} />
        <meshStandardMaterial
          color={active ? STUDIO_COLORS.greyDark : STUDIO_COLORS.grey}
          roughness={0.25}
          metalness={0.6}
        />
      </mesh>

      {/* Halo Ring on hover */}
      {active && (
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.28, 0.36, 32]} />
          <meshBasicMaterial
            color={STUDIO_COLORS.grey}
            side={THREE.DoubleSide}
            transparent
            opacity={0.6}
          />
        </mesh>
      )}

      {/* Text Label */}
      <Text
        position={[0, 0.42, 0]}
        fontSize={0.24}
        color={active ? STUDIO_COLORS.greyDark : STUDIO_COLORS.grey}
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.015}
        outlineColor={STUDIO_COLORS.offWhite}
      >
        {tech.name}
      </Text>
    </group>
  );
}

interface OrbitRingProps {
  radius: number;
  color?: string;
}

function OrbitRing({ radius, color = STUDIO_COLORS.border }: OrbitRingProps) {
  const points = useMemo(() => {
    const pts = [];
    const segments = 64;
    for (let i = 0; i <= segments; i++) {
      const theta = (i / segments) * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.cos(theta) * radius, 0, Math.sin(theta) * radius));
    }
    return pts;
  }, [radius]);

  const lineGeometry = useMemo(() => {
    return new THREE.BufferGeometry().setFromPoints(points);
  }, [points]);

  return (
    <primitive object={new THREE.Line(lineGeometry, new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.35 }))} />
  );
}

interface TechnologyOrbitProps {
  selectedTech: Technology | null;
  onSelectTech: (tech: Technology) => void;
  onHoverTech: (tech: Technology | null) => void;
}

export function TechnologyOrbit({
  selectedTech,
  onSelectTech,
  onHoverTech
}: TechnologyOrbitProps) {
  const prefersReducedMotion = useReducedMotion();

  const orbitConfigs = [
    { ring: 1, radius: 2.3, color: STUDIO_COLORS.grey },
    { ring: 2, radius: 3.5, color: STUDIO_COLORS.greyDark },
    { ring: 3, radius: 4.6, color: STUDIO_COLORS.greyLight }
  ];

  return (
    <div className="w-full h-full relative">
      <Canvas
        camera={{ position: [0, 4, 7], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={1.3} color="#FFFFFF" />
        <directionalLight position={[5, 8, 5]} intensity={1.6} color="#FFFFFF" />
        <directionalLight position={[-5, -4, -3]} intensity={0.5} color={STUDIO_COLORS.offWhiteElevated} />

        {/* Orbit Path Lines */}
        {orbitConfigs.map((config) => (
          <OrbitRing
            key={config.ring}
            radius={config.radius}
            color={config.color}
          />
        ))}

        {/* Distributed Nodes */}
        {technologies.map((tech, idx) => {
          const ringIndex = (idx % 3) + 1;
          const config = orbitConfigs.find((c) => c.ring === ringIndex)!;
          const countInRing = Math.ceil(technologies.length / 3);
          const posInRing = Math.floor(idx / 3);
          const angleOffset = (posInRing / countInRing) * Math.PI * 2;
          const speed = prefersReducedMotion ? 0 : 0.6 / ringIndex;

          return (
            <OrbitNode
              key={tech.id}
              tech={tech}
              radius={config.radius}
              speed={speed}
              angleOffset={angleOffset}
              isSelected={selectedTech?.id === tech.id}
              onHover={onHoverTech}
              onClick={onSelectTech}
            />
          );
        })}
      </Canvas>
    </div>
  );
}
