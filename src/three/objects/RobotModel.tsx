import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { STUDIO_COLORS } from '../materials/materials';

interface RobotModelProps {
  accentColor?: string;
}

export function RobotModel({ accentColor = STUDIO_COLORS.grey }: RobotModelProps) {
  const robotGroupRef = useRef<THREE.Group>(null);
  const lidarTurretRef = useRef<THREE.Mesh>(null);
  const radarRingRef = useRef<THREE.Mesh>(null);
  const pulsePointRef = useRef<THREE.Mesh>(null);

  const prefersReducedMotion = useReducedMotion();

  // Waypoints in 3D grid coordinate space
  const waypoints = useMemo(() => [
    new THREE.Vector3(-1.8, 0.05, -1.2),
    new THREE.Vector3(-0.8, 0.05, -1.2),
    new THREE.Vector3(-0.8, 0.05, 0.4),
    new THREE.Vector3(0.6, 0.05, 0.4),
    new THREE.Vector3(0.6, 0.05, -0.6),
    new THREE.Vector3(1.8, 0.05, 1.2),
  ], []);

  // Generate 3D trajectory curve line
  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3(waypoints, false, 'catmullrom', 0.2);
  }, [waypoints]);

  const lineGeometry = useMemo(() => {
    const points = curve.getPoints(70);
    return new THREE.BufferGeometry().setFromPoints(points);
  }, [curve]);

  // Obstacle box definitions in the 3D grid
  const obstacles = useMemo(() => [
    { pos: [-0.8, 0.2, -0.4] as [number, number, number], size: [0.6, 0.4, 0.6] as [number, number, number] },
    { pos: [0.6, 0.25, -1.4] as [number, number, number], size: [0.7, 0.5, 0.5] as [number, number, number] },
    { pos: [-0.2, 0.2, 1.1] as [number, number, number], size: [0.5, 0.4, 0.8] as [number, number, number] },
  ], []);

  useFrame((state, delta) => {
    if (prefersReducedMotion) return;

    const time = state.clock.getElapsedTime();

    // 1. Move robot along trajectory
    if (robotGroupRef.current) {
      const loopTime = 10;
      const t = (time % loopTime) / loopTime;
      const pos = curve.getPointAt(t);
      const tangent = curve.getTangentAt(t);

      robotGroupRef.current.position.copy(pos);
      
      const lookTarget = pos.clone().add(tangent);
      robotGroupRef.current.lookAt(lookTarget);
    }

    // 2. Spin LiDAR turret continuously
    if (lidarTurretRef.current) {
      lidarTurretRef.current.rotation.y += delta * 6.5;
    }

    // 3. Expand and fade radar scan wave
    if (radarRingRef.current) {
      const radarScale = 1 + (time * 1.6 % 2.5);
      radarRingRef.current.scale.set(radarScale, radarScale, radarScale);
      const material = radarRingRef.current.material as THREE.MeshBasicMaterial;
      if (material) {
        material.opacity = Math.max(0, 0.6 - (radarScale / 3.5) * 0.6);
      }
    }

    // 4. Pulse current target point
    if (pulsePointRef.current) {
      const scale = 1 + Math.sin(time * 5) * 0.25;
      pulsePointRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <group position={[0, -0.6, 0]}>
      {/* 3D Coordinate Grid Plane Floor */}
      <gridHelper
        args={[6, 24, STUDIO_COLORS.grey, STUDIO_COLORS.border]}
        position={[0, 0, 0]}
      />

      {/* Trajectory Guide Polyline */}
      <primitive object={new THREE.Line(
        lineGeometry,
        new THREE.LineBasicMaterial({
          color: accentColor,
          linewidth: 2,
          transparent: true,
          opacity: 0.75,
        })
      )} />

      {/* Waypoint Markers */}
      {waypoints.map((wp, idx) => (
        <group key={idx} position={wp}>
          <mesh position={[0, 0.05, 0]}>
            <cylinderGeometry args={[0.08, 0.08, 0.02, 16]} />
            <meshStandardMaterial
              color={idx === waypoints.length - 1 ? accentColor : STUDIO_COLORS.greyDark}
              metalness={0.7}
              roughness={0.3}
            />
          </mesh>
          {idx === waypoints.length - 1 && (
            <mesh ref={pulsePointRef} position={[0, 0.12, 0]}>
              <sphereGeometry args={[0.05, 12, 12]} />
              <meshBasicMaterial color={accentColor} />
            </mesh>
          )}
        </group>
      ))}

      {/* Obstacles in the Spatial Grid */}
      {obstacles.map((obs, idx) => (
        <mesh key={idx} position={obs.pos}>
          <boxGeometry args={obs.size} />
          <meshStandardMaterial
            color={STUDIO_COLORS.offWhiteElevated}
            roughness={0.3}
            metalness={0.2}
          />
        </mesh>
      ))}

      {/* 3D AGV Autonomous Rover Unit */}
      <group ref={robotGroupRef} position={[-1.8, 0.05, -1.2]}>
        {/* Main Rover Chassis */}
        <mesh position={[0, 0.12, 0]} castShadow>
          <boxGeometry args={[0.36, 0.14, 0.48]} />
          <meshStandardMaterial
            color={STUDIO_COLORS.greyDark}
            roughness={0.25}
            metalness={0.7}
          />
        </mesh>

        {/* Chassis Upper Deck */}
        <mesh position={[0, 0.22, -0.04]}>
          <boxGeometry args={[0.28, 0.06, 0.32]} />
          <meshStandardMaterial
            color={STUDIO_COLORS.grey}
            roughness={0.3}
            metalness={0.65}
          />
        </mesh>

        {/* Rotating LiDAR Turret */}
        <group position={[0, 0.28, -0.04]}>
          <mesh ref={lidarTurretRef}>
            <cylinderGeometry args={[0.06, 0.06, 0.08, 16]} />
            <meshStandardMaterial
              color={STUDIO_COLORS.greyDark}
              metalness={0.8}
              roughness={0.2}
            />
          </mesh>
          {/* LiDAR Laser Emitter Point */}
          <mesh position={[0, 0, 0.06]}>
            <sphereGeometry args={[0.02, 8, 8]} />
            <meshBasicMaterial color={accentColor} />
          </mesh>
        </group>

        {/* Rover Headlight Beams */}
        <mesh position={[0.1, 0.12, 0.24]} rotation={[Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.03, 12]} />
          <meshBasicMaterial color={STUDIO_COLORS.offWhite} />
        </mesh>
        <mesh position={[-0.1, 0.12, 0.24]} rotation={[Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.03, 12]} />
          <meshBasicMaterial color={STUDIO_COLORS.offWhite} />
        </mesh>

        {/* Status Indicator LED */}
        <mesh position={[0, 0.26, 0.14]}>
          <boxGeometry args={[0.12, 0.02, 0.02]} />
          <meshBasicMaterial color={accentColor} />
        </mesh>

        {/* 4 Rover Wheels */}
        {[-0.2, 0.2].map((x) =>
          [-0.16, 0.16].map((z) => (
            <mesh
              key={`${x}-${z}`}
              position={[x, 0.06, z]}
              rotation={[0, 0, Math.PI / 2]}
            >
              <cylinderGeometry args={[0.06, 0.06, 0.05, 16]} />
              <meshStandardMaterial color={STUDIO_COLORS.greyDark} roughness={0.6} />
            </mesh>
          ))
        )}

        {/* Rover Dynamic Radar Wave Scan */}
        <mesh
          ref={radarRingRef}
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, 0.02, 0]}
        >
          <ringGeometry args={[0.3, 0.35, 32]} />
          <meshBasicMaterial
            color={accentColor}
            side={THREE.DoubleSide}
            transparent
            opacity={0.4}
          />
        </mesh>
      </group>
    </group>
  );
}
