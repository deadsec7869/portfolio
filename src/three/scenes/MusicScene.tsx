import { ExperienceCanvas } from '../Canvas/ExperienceCanvas';
import { StudioLights } from '../lighting/StudioLights';
import { CameraController } from '../controllers/CameraController';
import { MusicDisc } from '../objects/MusicDisc';
import { ParticleField } from '../objects/ParticleField';

interface MusicSceneProps {
  mousePosition?: { normalizedX: number; normalizedY: number };
  accentColor?: string;
}

export function MusicScene({
  mousePosition,
  accentColor = '#008899',
}: MusicSceneProps) {
  return (
    <div className="w-full h-full relative">
      <ExperienceCanvas
        camera={{ position: [0, 1.9, 3.4], fov: 46 }}
        className="w-full h-full"
        pointerEvents="auto"
      >
        <fog attach="fog" args={['#FAFAF8', 5, 14]} />

        <StudioLights
          ambientIntensity={1.25}
          directionalIntensity={1.7}
          accentColor={accentColor}
        />

        <CameraController
          mousePosition={mousePosition}
          intensity={0.3}
          basePosition={[0, 1.9, 3.4]}
        />

        <MusicDisc accentColor={accentColor} mousePosition={mousePosition} />

        <ParticleField
          count={180}
          color={accentColor}
          size={0.02}
          speed={0.03}
          radius={8}
        />
      </ExperienceCanvas>
    </div>
  );
}
