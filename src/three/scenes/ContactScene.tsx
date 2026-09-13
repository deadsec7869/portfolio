import { ExperienceCanvas } from '../Canvas/ExperienceCanvas';
import { StudioLights } from '../lighting/StudioLights';
import { CameraController } from '../controllers/CameraController';
import { ContactSculpture } from '../objects/ContactSculpture';
import { ParticleField } from '../objects/ParticleField';

interface ContactSceneProps {
  mousePosition?: { normalizedX: number; normalizedY: number };
  accentColor?: string;
}

export function ContactScene({
  mousePosition,
  accentColor = '#008899',
}: ContactSceneProps) {
  return (
    <div className="w-full h-full relative pointer-events-none select-none">
      <ExperienceCanvas
        camera={{ position: [0, 0, 4.5], fov: 42 }}
        className="w-full h-full"
        pointerEvents="none"
      >
        <fog attach="fog" args={['#FAFAF8', 4, 15]} />

        <StudioLights
          ambientIntensity={1.2}
          directionalIntensity={1.5}
          accentColor={accentColor}
        />

        <CameraController
          mousePosition={mousePosition}
          intensity={0.3}
          basePosition={[0, 0, 4.5]}
        />

        <ContactSculpture mousePosition={mousePosition} accentColor={accentColor} />

        <ParticleField
          count={120}
          color={accentColor}
          size={0.018}
          speed={0.015}
          radius={10}
        />
      </ExperienceCanvas>
    </div>
  );
}
