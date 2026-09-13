import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface CameraControllerProps {
  mousePosition?: { normalizedX: number; normalizedY: number };
  intensity?: number;
  basePosition?: [number, number, number];
  enableLookAt?: boolean;
  scrollProgress?: number;
}

export function CameraController({
  mousePosition,
  intensity = 0.22, // 2-4% subtle parallax
  basePosition = [0, 0, 5.8],
  enableLookAt = true,
  scrollProgress = 0,
}: CameraControllerProps) {
  const prefersReducedMotion = useReducedMotion();
  const targetPos = useRef(new THREE.Vector3(...basePosition));
  const currentLookAt = useRef(new THREE.Vector3(0, 0, 0));
  const targetLookAt = useRef(new THREE.Vector3(0, 0, 0));

  useFrame((state, delta) => {
    if (prefersReducedMotion) {
      state.camera.position.set(...basePosition);
      state.camera.lookAt(0, 0, 0);
      return;
    }

    const [bx, by, bz] = basePosition;

    // 1. Compute target position with subtle pointer parallax + scroll depth drift
    if (mousePosition) {
      targetPos.current.x = bx + mousePosition.normalizedX * intensity;
      targetPos.current.y = by + mousePosition.normalizedY * intensity - scrollProgress * 1.2;
      targetPos.current.z = bz + scrollProgress * 0.8;
    } else {
      const time = state.clock.getElapsedTime();
      targetPos.current.x = bx + Math.sin(time * 0.25) * 0.05;
      targetPos.current.y = by + Math.cos(time * 0.35) * 0.04 - scrollProgress * 1.2;
      targetPos.current.z = bz;
    }

    // 2. Exponential smooth damping interpolation
    const dampingSpeed = Math.min(delta * 2.8, 0.12);
    state.camera.position.lerp(targetPos.current, dampingSpeed);

    // 3. Smooth lookAt target tracking
    if (enableLookAt) {
      if (mousePosition) {
        targetLookAt.current.x = mousePosition.normalizedX * 0.08;
        targetLookAt.current.y = mousePosition.normalizedY * 0.08 - scrollProgress * 0.4;
      }
      currentLookAt.current.lerp(targetLookAt.current, dampingSpeed);
      state.camera.lookAt(currentLookAt.current);
    }
  });

  return null;
}
