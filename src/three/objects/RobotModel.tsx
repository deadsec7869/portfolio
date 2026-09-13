import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface RobotModelProps {
  accentColor?: string;
}

export function RobotModel({ accentColor = '#10B981' }: RobotModelProps) {
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
      const loopTime = 10; // 10 seconds per loop
      const t = (time % loopTime) / loopTime;
      const pos = curve.getPointAt(t);
      const tangent = curve.getTangentAt(t);

      robotGroupRef.current.position.copy(pos);
      
      // Orient robot along path tangent
      const lookTarget = pos.clone().add(tangent);
      robotGroupRef.current.lookAt(lookTarget);

      // Subtle chassis suspension bounce
      robotGroupRef.current.position.y += Math.sin(time * 8) * 0.015;
    }

    // 2. Rotate LiDAR Sensor Turret
    if (lidarTurretRef.current) {
      lidarTurretRef.current.rotation.y += delta * 6.0;
    }

    // 3. Expand Radar Wave Pulse
    if (radarRingRef.current) {
      const radarScale = (time % 2.5) / 2.5;
      radarRingRef.current.scale.set(1 + radarScale * 2.5, 1 + radarScale * 2.5, 1);
      (radarRingRef.current.material as THREE.MeshBasicMaterial).opacity = (1 - radarScale) * 0.6;
    }

    // 4. Moving Laser Pulse Point
    if (pulsePointRef.current) {
      const pulseT = ((time * 1.5) % 1);
      const p = curve.getPointAt(pulseT);
      pulsePointRef.current.position.copy(p);
    }
  });

  return (
    <group position={[0, -0.4, 0]}>
      {/* 3D Telemetry Grid Ground */}
      <gridHelper
        args={[6, 12, '#334155', '#E2E8F0']}
        position={[0, 0, 0]}
      />

      {/* Grid Floor Plate */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
        <planeGeometry args={[6, 6]} />
        <meshStandardMaterial
          color="#F8FAFC"
          roughness={0.8}
          metalness={0.1}
        />
      </mesh>

      {/* Trajectory Laser Path */}
      <primitive
        object={
          new THREE.Line(
            lineGeometry,
            new THREE.LineBasicMaterial({
              color: accentColor,
              linewidth: 2,
              transparent: true,
              opacity: 0.85,
            })
          )
        }
      />

      {/* Moving Laser Pulse Marker */}
      <mesh ref={pulsePointRef}>
        <sphereGeometry args={[0.04, 12, 12]} />
        <meshBasicMaterial color="#FFFFFF" />
      </mesh>

      {/* Waypoint Markers */}
      {waypoints.map((wp, idx) => (
        <group key={idx} position={[wp.x, wp.y, wp.z]}>
          <mesh position={[0, 0.1, 0]}>
            <cylinderGeometry args={[0.08, 0.08, 0.2, 16]} />
            <meshStandardMaterial
              color={idx === 0 ? '#10B981' : idx === waypoints.length - 1 ? '#F59E0B' : '#64748B'}
              emissive={idx === 0 ? '#10B981' : idx === waypoints.length - 1 ? '#F59E0B' : '#64748B'}
              emissiveIntensity={0.6}
            />
          </mesh>
          {/* Waypoint Ground Halo */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
            <ringGeometry args={[0.12, 0.16, 24]} />
            <meshBasicMaterial
              color={idx === 0 ? '#10B981' : idx === waypoints.length - 1 ? '#F59E0B' : '#94A3B8'}
              side={THREE.DoubleSide}
              transparent
              opacity={0.6}
            />
          </mesh>
        </group>
      ))}

      {/* Obstacle Storage Blocks */}
      {obstacles.map((obs, idx) => (
        <mesh key={idx} position={obs.pos}>
          <boxGeometry args={obs.size} />
          <meshStandardMaterial
            color="#E2E8F0"
            roughness={0.4}
            metalness={0.3}
          />
        </mesh>
      ))}

      {/* 3D AGV Autonomous Rover Unit */}
      <group ref={robotGroupRef} position={[-1.8, 0.05, -1.2]}>
        {/* Main Rover Chassis */}
        <mesh position={[0, 0.12, 0]} castShadow>
          <boxGeometry args={[0.36, 0.14, 0.48]} />
          <meshStandardMaterial
            color="#1E293B"
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>

        {/* Chassis Upper Deck */}
        <mesh position={[0, 0.22, -0.04]}>
          <boxGeometry args={[0.28, 0.06, 0.32]} />
          <meshStandardMaterial
            color="#0F172A"
            roughness={0.3}
            metalness={0.9}
          />
        </mesh>

        {/* Rotating LiDAR Turret */}
        <group position={[0, 0.28, -0.04]}>
          <mesh ref={lidarTurretRef}>
            <cylinderGeometry args={[0.06, 0.06, 0.08, 16]} />
            <meshStandardMaterial
              color="#334155"
              metalness={0.9}
              roughness={0.1}
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
          <meshBasicMaterial color="#38BDF8" />
        </mesh>
        <mesh position={[-0.1, 0.12, 0.24]} rotation={[Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.03, 12]} />
          <meshBasicMaterial color="#38BDF8" />
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
              <meshStandardMaterial color="#020617" roughness={0.7} />
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
            opacity={0.5}
          />
        </mesh>
      </group>
    </group>
  );
}
