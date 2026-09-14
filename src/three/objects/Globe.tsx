import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { STUDIO_COLORS } from '../materials/materials';

// Procedural high-resolution canvas texture for technical two-tone Earth & coordinates
function createGlobeTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.CanvasTexture(canvas);

  // Ocean background: Structural charcoal grey
  ctx.fillStyle = '#3F3F3C';
  ctx.fillRect(0, 0, 1024, 512);

  // Latitude & Longitude thin technical coordinate lines
  ctx.strokeStyle = 'rgba(244, 241, 232, 0.15)';
  ctx.lineWidth = 1;

  // Latitudes
  for (let lat = 0; lat <= 512; lat += 32) {
    ctx.beginPath();
    ctx.moveTo(0, lat);
    ctx.lineTo(1024, lat);
    ctx.stroke();
  }

  // Longitudes
  for (let lon = 0; lon <= 1024; lon += 64) {
    ctx.beginPath();
    ctx.moveTo(lon, 0);
    ctx.lineTo(lon, 512);
    ctx.stroke();
  }

  // Continental land shapes (Off-white / grey tones)
  ctx.fillStyle = '#5E5E5A';

  // North America
  ctx.beginPath();
  ctx.ellipse(220, 160, 90, 65, -0.2, 0, Math.PI * 2);
  ctx.fill();

  // South America
  ctx.beginPath();
  ctx.ellipse(310, 340, 55, 95, 0.3, 0, Math.PI * 2);
  ctx.fill();

  // Europe
  ctx.beginPath();
  ctx.ellipse(530, 140, 55, 45, 0.1, 0, Math.PI * 2);
  ctx.fill();

  // Africa
  ctx.beginPath();
  ctx.ellipse(540, 270, 75, 95, 0.1, 0, Math.PI * 2);
  ctx.fill();

  // Asia
  ctx.beginPath();
  ctx.ellipse(730, 170, 140, 90, -0.1, 0, Math.PI * 2);
  ctx.fill();

  // Australia
  ctx.beginPath();
  ctx.ellipse(840, 360, 55, 45, 0, 0, Math.PI * 2);
  ctx.fill();

  // Telemetry city nodes (off-white points)
  ctx.fillStyle = '#F4F1E8';
  const cities = [
    [220, 150], [250, 170], [180, 140], // NA
    [320, 330], [290, 280],             // SA
    [520, 130], [540, 145], [510, 160], // EU
    [550, 280], [530, 210],             // Africa
    [700, 180], [760, 160], [800, 190], // Asia
    [840, 360], [820, 340],             // Australia
  ];

  cities.forEach(([cx, cy]) => {
    ctx.beginPath();
    ctx.arc(cx, cy, 2.2, 0, Math.PI * 2);
    ctx.fill();
  });

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  return texture;
}

export interface GlobeProps {
  cursorState?: 'default' | 'hover' | 'project';
  velXRef?: React.MutableRefObject<number>;
  velYRef?: React.MutableRefObject<number>;
  scale?: number;
}

export function Globe({
  cursorState = 'default',
  velXRef,
  velYRef,
  scale = 1,
}: GlobeProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const atmosphereRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  const globeTexture = useMemo(() => createGlobeTexture(), []);

  // Spin rates and rotational states
  const rotX = useRef(0.2);
  const rotY = useRef(0);

  useFrame((_, delta) => {
    const isHover = cursorState === 'hover' || cursorState === 'project';

    // Base constant spin
    const baseSpeed = isHover ? 0.9 : 0.45;
    rotY.current += delta * baseSpeed;

    // Inertial velocity reaction from pointer movement
    if (velXRef && velYRef) {
      const vx = THREE.MathUtils.clamp(velXRef.current * 0.0003, -0.15, 0.15);
      const vy = THREE.MathUtils.clamp(velYRef.current * 0.0003, -0.15, 0.15);
      rotY.current += vx;
      rotX.current = THREE.MathUtils.clamp(rotX.current - vy, -0.6, 0.6);
    }

    if (meshRef.current) {
      meshRef.current.rotation.y = rotY.current;
      meshRef.current.rotation.x = rotX.current;
    }

    if (atmosphereRef.current) {
      atmosphereRef.current.rotation.y = rotY.current * 0.8;
      atmosphereRef.current.rotation.z += delta * 0.2;
    }

    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.6;
    }

    if (groupRef.current) {
      const targetScale = cursorState === 'project' ? 1.25 : isHover ? 1.15 : 1.0;
      groupRef.current.scale.lerp(
        new THREE.Vector3(targetScale * scale, targetScale * scale, targetScale * scale),
        0.15
      );
    }
  });

  const isHover = cursorState === 'hover' || cursorState === 'project';

  return (
    <group ref={groupRef}>
      {/* Central Solid Globe Sphere */}
      <mesh ref={meshRef} castShadow receiveShadow>
        <sphereGeometry args={[0.78, 32, 32]} />
        <meshStandardMaterial
          map={globeTexture}
          roughness={0.3}
          metalness={0.4}
          emissive={isHover ? STUDIO_COLORS.grey : '#000000'}
          emissiveIntensity={isHover ? 0.2 : 0}
        />
      </mesh>

      {/* Atmospheric Translucent Wireframe Geodesic Lattice */}
      <mesh ref={atmosphereRef}>
        <sphereGeometry args={[0.88, 16, 16]} />
        <meshBasicMaterial
          color={STUDIO_COLORS.grey}
          wireframe
          transparent
          opacity={isHover ? 0.35 : 0.18}
        />
      </mesh>

      {/* Equatorial Orbital Ring on Hover */}
      {isHover && (
        <mesh ref={ringRef} rotation={[Math.PI / 3, 0, 0]}>
          <ringGeometry args={[1.05, 1.14, 36]} />
          <meshBasicMaterial
            color={STUDIO_COLORS.greyLight}
            side={THREE.DoubleSide}
            transparent
            opacity={0.65}
          />
        </mesh>
      )}
    </group>
  );
}
