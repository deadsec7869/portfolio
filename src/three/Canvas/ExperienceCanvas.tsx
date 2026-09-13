import React, { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { SceneFallback } from '../scenes/SceneFallback';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { useQualityLevel } from '../../hooks/useQualityLevel';

interface ExperienceCanvasProps {
  children: React.ReactNode;
  camera?: {
    position?: [number, number, number];
    fov?: number;
    near?: number;
    far?: number;
  };
  className?: string;
  style?: React.CSSProperties;
  frameloop?: 'always' | 'demand' | 'never';
  fallback?: React.ReactNode;
  shadows?: boolean;
  onCreated?: () => void;
  pointerEvents?: 'none' | 'auto';
}

function checkWebGLSupport(): boolean {
  if (typeof window === 'undefined') return true;
  try {
    const canvas = document.createElement('canvas');
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch {
    return false;
  }
}

export function ExperienceCanvas({
  children,
  camera = { position: [0, 0, 5.8], fov: 45 },
  className = 'w-full h-full',
  style,
  frameloop = 'always',
  fallback = <SceneFallback />,
  shadows = false,
  pointerEvents = 'none',
}: ExperienceCanvasProps) {
  const prefersReducedMotion = useReducedMotion();
  const { maxDpr, quality } = useQualityLevel();
  const [hasWebGL] = useState(checkWebGLSupport);

  if (!hasWebGL) {
    return <>{fallback}</>;
  }

  return (
    <div
      className={`relative w-full h-full ${
        pointerEvents === 'none' ? 'pointer-events-none' : 'pointer-events-auto'
      } select-none`}
      style={style}
    >
      <Suspense fallback={fallback}>
        <Canvas
          camera={camera}
          dpr={[1, maxDpr]}
          frameloop={prefersReducedMotion ? 'demand' : frameloop}
          shadows={shadows}
          gl={{
            antialias: quality !== 'LOW',
            alpha: true,
            powerPreference: quality === 'LOW' ? 'low-power' : 'high-performance',
            stencil: false,
            depth: true,
          }}
          className={className}
        >
          {children}
        </Canvas>
      </Suspense>
    </div>
  );
}
