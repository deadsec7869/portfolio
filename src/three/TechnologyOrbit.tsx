import { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import { technologies } from '../data/technologies';
import type { Technology } from '../data/technologies';
import { useReducedMotion } from '../hooks/useReducedMotion';

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
          color={tech.color}
          emissive={tech.color}
          emissiveIntensity={active ? 0.7 : 0.3}
          roughness={0.2}
          metalness={0.6}
        />
      </mesh>

      {/* Halo Ring on hover */}
      {active && (
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.28, 0.36, 32]} />
          <meshBasicMaterial
            color={tech.color}
            side={THREE.DoubleSide}
            transparent
            opacity={0.6}
          />
        </mesh>
      )}

      {/* Text Label in Dark Typography */}
      <Text
        position={[0, 0.42, 0]}
        fontSize={0.24}
        color={active ? '#008899' : '#111111'}
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.015}
        outlineColor="#FFFFFF"
      >
        {tech.name}
      </Text>
    </group>
  );
}

function OrbitRingVisual({ radius, color }: { radius: number; color: string }) {
  const lineGeometry = useMemo(() => {
    const points = [];
    const segments = 90;
    for (let i = 0; i <= segments; i++) {
      const theta = (i / segments) * Math.PI * 2;
      points.push(new THREE.Vector3(Math.cos(theta) * radius, 0, Math.sin(theta) * radius));
    }
    return new THREE.BufferGeometry().setFromPoints(points);
  }, [radius]);

  return (
    <primitive object={new THREE.Line(lineGeometry, new THREE.LineBasicMaterial({
      color,
      transparent: true,
      opacity: 0.28,
      linewidth: 1
    }))} />
  );
}

function CentralCore() {
  const coreRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 0.3;
      const time = state.clock.getElapsedTime();
      const s = 1 + Math.sin(time * 1.5) * 0.04;
      coreRef.current.scale.set(s, s, s);
    }
  });

  return (
    <group ref={coreRef}>
      {/* Central Titanium Frosted Core */}
      <mesh>
        <sphereGeometry args={[0.7, 32, 32]} />
        <meshStandardMaterial
          color="#EAEFF4"
          roughness={0.15}
          metalness={0.85}
          emissive="#FFFFFF"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Wireframe Holographic Core */}
      <mesh>
        <octahedronGeometry args={[0.95, 1]} />
        <meshBasicMaterial
          color="#008899"
          wireframe
          transparent
          opacity={0.4}
        />
      </mesh>

      {/* Central Text */}
      <Text
        position={[0, 0, 0.75]}
        fontSize={0.32}
        color="#111111"
        fontWeight="bold"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.02}
        outlineColor="#FFFFFF"
      >
        TAMIM
      </Text>
    </group>
  );
}

interface TechnologyOrbitProps {
  activeTech: Technology | null;
  onSelectTech: (tech: Technology | null) => void;
}

export function TechnologyOrbit({ activeTech, onSelectTech }: TechnologyOrbitProps) {
  const prefersReducedMotion = useReducedMotion();

  const rings = [
    { ring: 1, radius: 2.3, color: '#008899' },
    { ring: 2, radius: 3.8, color: '#94A3B8' },
    { ring: 3, radius: 5.2, color: '#CBD5E1' }
  ];

  return (
    <div className="w-full h-full relative cursor-grab active:cursor-grabbing">
      <Canvas
        camera={{ position: [0, 4.5, 7.5], fov: 48 }}
        dpr={[1, 1.6]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={1.2} />
        <directionalLight position={[10, 12, 6]} intensity={1.5} color="#FFFFFF" />
        <pointLight position={[0, 0, 0]} intensity={1.5} color="#008899" distance={8} />

        {/* Orbit Ground Grid Lines */}
        {rings.map((r) => (
          <OrbitRingVisual key={r.ring} radius={r.radius} color={r.color} />
        ))}

        {/* Central TAMIM Node */}
        <CentralCore />

        {/* Orbiting Tech Nodes */}
        {technologies.map((tech) => {
          const ringConfig = rings.find((r) => r.ring === tech.orbitRing) || rings[0];
          return (
            <OrbitNode
              key={tech.id}
              tech={tech}
              radius={ringConfig.radius}
              speed={prefersReducedMotion ? 0 : tech.speedMultiplier}
              angleOffset={tech.angleOffset}
              isSelected={activeTech?.id === tech.id}
              onHover={onSelectTech}
              onClick={onSelectTech}
            />
          );
        })}
      </Canvas>
    </div>
  );
}
