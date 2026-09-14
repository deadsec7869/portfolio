import { memo } from 'react';
import { STUDIO_COLORS } from '../materials/materials';

interface StudioLightsProps {
  ambientIntensity?: number;
  directionalIntensity?: number;
  accentColor?: string;
  enablePointLight?: boolean;
}

export const StudioLights = memo(function StudioLights({
  ambientIntensity = 1.2,
  directionalIntensity = 1.7,
  accentColor = STUDIO_COLORS.grey,
  enablePointLight = true,
}: StudioLightsProps) {
  return (
    <>
      {/* Soft Ambient Fill for Off-White Neutral Studio Gallery */}
      <ambientLight intensity={ambientIntensity} color="#FFFFFF" />

      {/* Main Overhead Key Light from Top-Front-Right */}
      <directionalLight
        position={[8, 12, 8]}
        intensity={directionalIntensity}
        color="#FFFFFF"
        castShadow={false}
      />

      {/* Structural Accent Fill Light from Lower-Left */}
      <directionalLight
        position={[-8, -6, -4]}
        intensity={directionalIntensity * 0.4}
        color={accentColor}
      />

      {/* Specular Rim Light from Behind */}
      <directionalLight
        position={[4, -8, -6]}
        intensity={directionalIntensity * 0.45}
        color={STUDIO_COLORS.offWhiteElevated}
      />

      {/* Focal Point Fill for Foreground Depth */}
      {enablePointLight && (
        <pointLight
          position={[0, -2, 4]}
          intensity={0.4}
          color={STUDIO_COLORS.offWhiteElevated}
          distance={12}
        />
      )}
    </>
  );
});
