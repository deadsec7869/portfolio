import { ExperienceCanvas } from '../Canvas/ExperienceCanvas';
import { StudioLights } from '../lighting/StudioLights';
import { CameraController } from '../controllers/CameraController';
import { RobotModel } from '../objects/RobotModel';
import { STUDIO_COLORS } from '../materials/materials';

interface RobotSceneProps {
  mousePosition?: { normalizedX: number; normalizedY: number };
  accentColor?: string;
}

export function RobotScene({
  mousePosition,
  accentColor = STUDIO_COLORS.grey,
}: RobotSceneProps) {
  return (
    <div className="w-full h-full relative">
      <ExperienceCanvas
        camera={{ position: [0, 2.5, 3.8], fov: 46 }}
        className="w-full h-full"
        pointerEvents="auto"
      >
        <fog attach="fog" args={[STUDIO_COLORS.offWhite, 5, 16]} />

        <StudioLights
          ambientIntensity={1.2}
          directionalIntensity={1.6}
          accentColor={accentColor}
        />

        <CameraController
          mousePosition={mousePosition}
          intensity={0.25}
          basePosition={[0, 2.5, 3.8]}
        />

        <RobotModel accentColor={accentColor} />
      </ExperienceCanvas>
    </div>
  );
}
