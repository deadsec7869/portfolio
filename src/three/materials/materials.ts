import * as THREE from 'three';

/**
 * Light Translucent Studio 3D Color Palette
 */
export const STUDIO_COLORS = {
  bgMain: '#F4F1E8',
  sphere: '#E7E4DC',
  offWhite: '#E7E4DC',
  offWhiteElevated: '#ECE8DD',
  wireframe: '#8C8A84',
  ringPrimary: '#696863',
  ringSecondary: '#B5B2AA',
  grey: '#74736E',
  greyDark: '#3F3F3C',
  greyLight: '#A5A39C',
  greyMuted: '#A5A39C',
  nodeDark: '#5E5D58',
  nodeLight: '#F8F6F0',
  cyan: '#19C9E8',
  orange: '#F27A22',
  greyText: '#74736E',
  coreDark: '#3F3F3C',
  border: 'rgba(63, 63, 60, 0.18)',
  borderStrong: 'rgba(63, 63, 60, 0.35)',
  accent: '#19C9E8',
  accentSecondary: '#F27A22',
  threeDark: '#3F3F3C',
  threeLight: '#F4F1E8',
  threeMedium: '#74736E',
  white: '#FFFFFF',
};

/**
 * Sculptural Off-White Physical Material for Central Sphere
 */
export function createSculpturalMaterial(options: Partial<THREE.MeshStandardMaterialParameters> = {}): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({
    color: options.color ?? STUDIO_COLORS.sphere,
    roughness: options.roughness ?? 0.35,
    metalness: options.metalness ?? 0.15,
    ...options,
  });
}

/**
 * Legacy alias for titanium material
 */
export function createTitaniumMaterial(options: Partial<THREE.MeshStandardMaterialParameters> = {}): THREE.MeshStandardMaterial {
  return createSculpturalMaterial(options);
}

/**
 * Translucent Physical Glass Material
 */
export function createGlassMaterial(options: Partial<THREE.MeshPhysicalMaterialParameters> = {}): THREE.MeshPhysicalMaterial {
  return new THREE.MeshPhysicalMaterial({
    color: options.color ?? STUDIO_COLORS.sphere,
    transparent: true,
    opacity: options.opacity ?? 0.45,
    roughness: options.roughness ?? 0.15,
    metalness: options.metalness ?? 0.05,
    transmission: options.transmission ?? 0.88,
    ior: options.ior ?? 1.45,
    reflectivity: options.reflectivity ?? 0.5,
    clearcoat: options.clearcoat ?? 1.0,
    clearcoatRoughness: options.clearcoatRoughness ?? 0.1,
    ...options,
  });
}

/**
 * Charcoal / Structural Ring Material
 */
export function createRingMaterial(options: Partial<THREE.MeshStandardMaterialParameters> = {}): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({
    color: options.color ?? STUDIO_COLORS.ringPrimary,
    roughness: options.roughness ?? 0.28,
    metalness: options.metalness ?? 0.5,
    ...options,
  });
}

/**
 * Legacy alias for charcoal material
 */
export function createCharcoalMaterial(options: Partial<THREE.MeshStandardMaterialParameters> = {}): THREE.MeshStandardMaterial {
  return createRingMaterial(options);
}

/**
 * Precision Technical Wireframe Material
 */
export function createWireframeMaterial(color: string = STUDIO_COLORS.wireframe, opacity = 0.4): THREE.MeshBasicMaterial {
  return new THREE.MeshBasicMaterial({
    color,
    wireframe: true,
    transparent: true,
    opacity,
  });
}
