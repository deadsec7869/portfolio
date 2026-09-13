import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Procedural high-resolution canvas texture for Earth landmasses & precision grid
function createGlobeTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  if (!ctx) return new THREE.CanvasTexture(canvas);

  // Ocean background (Deep slate navy / charcoal)
  ctx.fillStyle = '#0F172A';
  ctx.fillRect(0, 0, 1024, 512);

  // Latitude & Longitude precision grid lines
  ctx.strokeStyle = 'rgba(100, 116, 139, 0.4)';
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

  // Continental land shapes (Restrained, subtle slate landmasses)
  ctx.fillStyle = '#334155';

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

  // Telemetry city nodes (glowing cyan points)
  ctx.fillStyle = '#38BDF8';
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
    ctx.arc(cx, cy, 2.5, 0, Math.PI * 2);
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
  scale = 1.0,
}: GlobeProps) {
  const globeGroupRef = useRef<THREE.Group>(null);
  const sphereRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const atmosphereRef = useRef<THREE.Mesh>(null);

  const earthTexture = useMemo(() => createGlobeTexture(), []);

  const rotVel = useRef(0.008);
  const targetScale = useRef(scale);
  const currentScale = useRef(scale);

  useFrame((_, delta) => {
    if (!globeGroupRef.current) return;

    // Velocity-driven rotation boost
    const vx = velXRef ? velXRef.current : 0;
    const vy = velYRef ? velYRef.current : 0;
    const speed = Math.sqrt(vx * vx + vy * vy);

    const targetRotSpeed = 0.008 + Math.min(speed * 0.00015, 0.04);
    rotVel.current = THREE.MathUtils.lerp(rotVel.current, targetRotSpeed, delta * 8);

    if (sphereRef.current) {
      sphereRef.current.rotation.y += rotVel.current;
    }

    // Dynamic scale based on cursor state
    if (cursorState === 'project') {
      targetScale.current = scale * 1.32;
    } else if (cursorState === 'hover') {
      targetScale.current = scale * 1.18;
    } else {
      targetScale.current = scale;
    }

    currentScale.current = THREE.MathUtils.lerp(currentScale.current, targetScale.current, delta * 12);
    globeGroupRef.current.scale.set(currentScale.current, currentScale.current, currentScale.current);

    // Dynamic 3D tilt based on pointer velocity
    const targetTiltX = THREE.MathUtils.clamp(-vy * 0.0008, -0.35, 0.35);
    const targetTiltZ = THREE.MathUtils.clamp(-vx * 0.0008, -0.35, 0.35);
    globeGroupRef.current.rotation.x = THREE.MathUtils.lerp(globeGroupRef.current.rotation.x, targetTiltX + 0.3, delta * 10);
    globeGroupRef.current.rotation.z = THREE.MathUtils.lerp(globeGroupRef.current.rotation.z, targetTiltZ, delta * 10);

    // Planetary ring animation
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.5;
      const targetRingOpacity = cursorState === 'project' ? 0.75 : cursorState === 'hover' ? 0.35 : 0.0;
      (ringRef.current.material as THREE.MeshBasicMaterial).opacity = THREE.MathUtils.lerp(
        (ringRef.current.material as THREE.MeshBasicMaterial).opacity,
        targetRingOpacity,
        delta * 10
      );
    }
  });

  return (
    <group ref={globeGroupRef}>
      {/* 3D Earth Globe Sphere */}
      <mesh ref={sphereRef}>
        <sphereGeometry args={[1.0, 32, 32]} />
        <meshStandardMaterial
          map={earthTexture}
          roughness={0.65}
          metalness={0.15}
          color="#F8FAFC"
        />
      </mesh>

      {/* Atmospheric Rim Shell (Fresnel Rim Glow) */}
      <mesh ref={atmosphereRef}>
        <sphereGeometry args={[1.04, 32, 32]} />
        <meshBasicMaterial
          color="#38BDF8"
          transparent
          opacity={0.18}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Orbital Planetary Ring (Expands on Project Hover) */}
      <mesh ref={ringRef} rotation={[Math.PI / 2.3, 0, 0]}>
        <ringGeometry args={[1.35, 1.48, 48]} />
        <meshBasicMaterial
          color="#008899"
          transparent
          opacity={0}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}
