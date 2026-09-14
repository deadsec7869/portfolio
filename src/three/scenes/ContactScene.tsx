import { ExperienceCanvas } from '../Canvas/ExperienceCanvas';
import { StudioLights } from '../lighting/StudioLights';
import { CameraController } from '../controllers/CameraController';
import { ContactSculpture } from '../objects/ContactSculpture';
import { ParticleField } from '../objects/ParticleField';
import { STUDIO_COLORS } from '../materials/materials';

interface ContactSceneProps {
  mousePosition?: { normalizedX: number; normalizedY: number };
  accentColor?: string;
}

export function ContactScene({
  mousePosition,
  accentColor = STUDIO_COLORS.grey,
}: ContactSceneProps) {
  return (
    <div className="w-full h-full relative pointer-events-none select-none">
      <ExperienceCanvas
        camera={{ position: [0, 0, 4.5], fov: 42 }}
        className="w-full h-full"
        pointerEvents="none"
      >
        <fog attach="fog" args={[STUDIO_COLORS.offWhite, 4, 15]} />

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
          count={100}
          color={accentColor}
          size={0.014}
          speed={0.012}
          radius={10}
        />
      </ExperienceCanvas>
    </div>
  );
}
