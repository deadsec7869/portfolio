import { RobotScene } from './RobotScene';
import { MusicScene } from './MusicScene';
import { ExperienceCanvas } from '../Canvas/ExperienceCanvas';
import { StudioLights } from '../lighting/StudioLights';
import { CameraController } from '../controllers/CameraController';
import { FloatingGeometry } from '../objects/FloatingGeometry';
import { STUDIO_COLORS } from '../materials/materials';

interface ProjectSceneProps {
  type?: 'robot' | 'music' | 'neural' | 'telemetry' | 'web' | 'default' | string;
  projectId?: string;
  accentColor?: string;
  mousePosition?: { normalizedX: number; normalizedY: number };
}

export function ProjectScene({
  type,
  projectId,
  accentColor = STUDIO_COLORS.grey,
  mousePosition,
}: ProjectSceneProps) {
  const isRobot =
    type === 'robot' ||
    type === 'AI' ||
    projectId === 'ai-robot-command-center';

  const isMusic =
    type === 'music' ||
    type === '3D' ||
    projectId === 'aapesh';

  if (isRobot) {
    return <RobotScene mousePosition={mousePosition} accentColor={accentColor} />;
  }

  if (isMusic) {
    return <MusicScene mousePosition={mousePosition} accentColor={accentColor} />;
  }

  return (
    <div className="w-full h-full relative">
      <ExperienceCanvas
        camera={{ position: [0, 0, 4.8], fov: 45 }}
        className="w-full h-full"
        pointerEvents="auto"
      >
        <fog attach="fog" args={[STUDIO_COLORS.offWhite, 4, 15]} />

        <StudioLights
          ambientIntensity={1.2}
          directionalIntensity={1.6}
          accentColor={accentColor}
        />

        <CameraController
          mousePosition={mousePosition}
          intensity={0.3}
          basePosition={[0, 0, 4.8]}
        />

        <FloatingGeometry
          mousePosition={mousePosition}
          accentColor={accentColor}
        />
      </ExperienceCanvas>
    </div>
  );
}
