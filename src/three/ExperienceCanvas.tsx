import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import type { CapabilityNode as CapabilityNodeType } from '../data/graphData';
import { CapabilityGraph } from './CapabilityGraph';
import { GraphCamera } from './GraphCamera';
import { STUDIO_COLORS } from './materials/materials';

interface ExperienceCanvasProps {
  selectedNode: CapabilityNodeType | null;
  onSelectNode: (node: CapabilityNodeType) => void;
  isPaused?: boolean;
}

export function ExperienceCanvas({
  selectedNode,
  onSelectNode,
  isPaused = false,
}: ExperienceCanvasProps) {
  return (
    <div className="w-full h-full relative cursor-grab active:cursor-grabbing select-none">
      <Canvas
        camera={{ position: [0, 1.2, 7.8], fov: 50 }}
        dpr={[1, 1.8]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
      >
        {/* Editorial Atmospheric Fog matching Canvas Background */}
        <fog attach="fog" args={[STUDIO_COLORS.bgMain, 9, 22]} />

        {/* Studio Lighting Rig */}
        <ambientLight intensity={1.4} color="#FFFFFF" />
        <directionalLight position={[10, 14, 8]} intensity={1.8} color="#FFFFFF" />
        <directionalLight position={[-8, -6, -6]} intensity={0.6} color="#E7E5DD" />
        <pointLight position={[0, 0, 0]} intensity={0.8} color={STUDIO_COLORS.accent} distance={10} />

        {/* Camera Controller */}
        <GraphCamera autoRotate={false} />

        {/* Interactive Capability Graph Scene */}
        <Suspense fallback={null}>
          <CapabilityGraph
            selectedNode={selectedNode}
            onSelectNode={onSelectNode}
            isPaused={isPaused}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
