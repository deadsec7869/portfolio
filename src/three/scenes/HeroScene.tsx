import { ExperienceCanvas } from '../Canvas/ExperienceCanvas';
import { StudioLights } from '../lighting/StudioLights';
import { CameraController } from '../controllers/CameraController';
import { FloatingGeometry } from '../objects/FloatingGeometry';
import { ParticleField } from '../objects/ParticleField';
import { useQualityLevel } from '../../hooks/useQualityLevel';
import { useScrollProgress } from '../../hooks/useScrollProgress';
import { STUDIO_COLORS } from '../materials/materials';

interface HeroSceneProps {
  mousePosition?: { normalizedX: number; normalizedY: number };
}

export function HeroScene({ mousePosition }: HeroSceneProps) {
  const { particleMultiplier, quality } = useQualityLevel();
  const { progress } = useScrollProgress();

  const starCount = Math.round(90 * particleMultiplier);
  const cyanDustCount = Math.round(15 * particleMultiplier);

  return (
    <ExperienceCanvas
      camera={{ position: [0, 0, 7.4], fov: 42 }}
      className="w-full h-full"
      pointerEvents="none"
    >
      {/* Light Translucent Studio Atmospheric Fog */}
      <fog attach="fog" args={['#F4F1E8', 12, 30]} />

      {/* Soft Computational Studio Lighting */}
      <StudioLights
        ambientIntensity={0.85}
        directionalIntensity={1.3}
        accentColor={STUDIO_COLORS.cyan}
      />

      {/* Soft directional studio fill lights */}
      <pointLight position={[4, 3, 3]} intensity={0.6} color="#FFFFFF" distance={10} />
      <pointLight position={[-4, -3, 2]} intensity={0.4} color="#E7E4DC" distance={9} />

      {/* Smooth Damped Camera Controller with Scroll Depth */}
      <CameraController
        mousePosition={mousePosition}
        intensity={0.1}
        basePosition={[0, 0, 7.4]}
        scrollProgress={progress}
      />

      {/* Multi-Layered Central Computational Sculpture */}
      <FloatingGeometry
        mousePosition={mousePosition}
        scrollProgress={progress}
      />

      {/* Subtle Ambient Dust Motes */}
      <ParticleField
        count={starCount}
        color="#A5A39C"
        size={quality === 'LOW' ? 0.012 : 0.008}
        speed={0.0015}
        radius={16}
      />

      {/* Sparse Subtle Cyan Motes */}
      <ParticleField
        count={cyanDustCount}
        color="#19C9E8"
        size={quality === 'LOW' ? 0.014 : 0.009}
        speed={0.003}
        radius={10}
      />
    </ExperienceCanvas>
  );
}
