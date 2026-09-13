import { memo } from 'react';

interface StudioLightsProps {
  ambientIntensity?: number;
  directionalIntensity?: number;
  accentColor?: string;
  enablePointLight?: boolean;
}

export const StudioLights = memo(function StudioLights({
  ambientIntensity = 1.15,
  directionalIntensity = 1.75,
  accentColor = '#00A0B0',
  enablePointLight = true,
}: StudioLightsProps) {
  return (
    <>
      {/* Soft Ambient Fill for Light Studio Gallery */}
      <ambientLight intensity={ambientIntensity} color="#FFFFFF" />

      {/* Main Overhead Key Light from Top-Front-Right */}
      <directionalLight
        position={[8, 12, 8]}
        intensity={directionalIntensity}
        color="#FFFFFF"
        castShadow={false}
      />

      {/* Cool Tinted Fill Light from Lower-Left */}
      <directionalLight
        position={[-8, -6, -4]}
        intensity={directionalIntensity * 0.6}
        color={accentColor}
      />

      {/* Warm Specular Rim Light from Behind */}
      <directionalLight
        position={[4, -8, -6]}
        intensity={directionalIntensity * 0.4}
        color="#F8FAFC"
      />

      {/* Subtle Focal Point Fill for Foreground Depth */}
      {enablePointLight && (
        <pointLight
          position={[0, -2, 4]}
          intensity={0.5}
          color="#E2E8F0"
          distance={12}
        />
      )}
    </>
  );
});
