import { ExperienceCanvas } from '../Canvas/ExperienceCanvas';
import { StudioLights } from '../lighting/StudioLights';
import { CameraController } from '../controllers/CameraController';
import { FloatingGeometry } from '../objects/FloatingGeometry';
import { ParticleField } from '../objects/ParticleField';
import { useQualityLevel } from '../../hooks/useQualityLevel';
import { useScrollProgress } from '../../hooks/useScrollProgress';

interface HeroSceneProps {
  mousePosition?: { normalizedX: number; normalizedY: number };
}

export function HeroScene({ mousePosition }: HeroSceneProps) {
  const { particleMultiplier, quality } = useQualityLevel();
  const { progress } = useScrollProgress();

  const particleCountCyan = Math.round(500 * particleMultiplier);
  const particleCountSlate = Math.round(300 * particleMultiplier);

  return (
    <ExperienceCanvas
      camera={{ position: [0, 0, 5.8], fov: 44 }}
      className="w-full h-full"
      pointerEvents="none"
    >
      {/* Light Studio Architectural Fog */}
      <fog attach="fog" args={['#FAFAF8', 6, 22]} />

      {/* Art-Directed Studio Gallery Lighting */}
      <StudioLights
        ambientIntensity={1.15}
        directionalIntensity={1.75}
        accentColor="#00A0B0"
      />

      {/* Smooth Damped Camera Controller with Scroll Depth */}
      <CameraController
        mousePosition={mousePosition}
        intensity={0.24}
        basePosition={[0, 0, 5.8]}
        scrollProgress={progress}
      />

      {/* Multi-Layered Central Precision Spherical Sculpture */}
      <FloatingGeometry
        mousePosition={mousePosition}
        accentColor="#008899"
        scrollProgress={progress}
      />

      {/* Fine Dust Particle Layer 1 (Cyan Accents) */}
      <ParticleField
        count={particleCountCyan}
        color="#008899"
        size={quality === 'LOW' ? 0.028 : 0.022}
        speed={0.018}
        radius={14}
      />

      {/* Fine Dust Particle Layer 2 (Slate Atmospheric Drift) */}
      <ParticleField
        count={particleCountSlate}
        color="#94A3B8"
        size={quality === 'LOW' ? 0.022 : 0.016}
        speed={0.012}
        radius={16}
      />
    </ExperienceCanvas>
  );
}
