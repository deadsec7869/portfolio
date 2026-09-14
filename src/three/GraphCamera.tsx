import { useRef, useEffect } from 'react';
import { OrbitControls } from '@react-three/drei';
import type { OrbitControls as OrbitControlsType } from 'three-stdlib';

interface GraphCameraProps {
  autoRotate?: boolean;
  autoRotateSpeed?: number;
}

export function GraphCamera({
  autoRotate = false,
  autoRotateSpeed = 0.4,
}: GraphCameraProps) {
  const controlsRef = useRef<OrbitControlsType>(null);

  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.target.set(0, 0, 0);
    }
  }, []);

  return (
    <OrbitControls
      ref={controlsRef}
      enablePan={false}
      enableZoom={true}
      minDistance={4.5}
      maxDistance={12.5}
      minPolarAngle={Math.PI * 0.22}
      maxPolarAngle={Math.PI * 0.78}
      enableDamping={true}
      dampingFactor={0.06}
      rotateSpeed={0.7}
      zoomSpeed={0.8}
      autoRotate={autoRotate}
      autoRotateSpeed={autoRotateSpeed}
      makeDefault
    />
  );
}
