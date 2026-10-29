import * as THREE from 'three';

/**
 * Mercury Alpine Banking 3D Color Palette (Dark Blue-Hour Observatory)
 */
export const STUDIO_COLORS = {
  bgMain: '#171721',
  sphere: '#1e1e2a',
  offWhite: '#272735',
  offWhiteElevated: '#1e1e2a',
  wireframe: '#70707d',
  ringPrimary: '#70707d',
  ringSecondary: '#272735',
  grey: '#c3c3cc',
  greyDark: '#ededf3',
  greyLight: '#70707d',
  greyMuted: '#70707d',
  nodeDark: '#1e1e2a',
  nodeLight: '#ededf3',
  cyan: '#5266eb',
  orange: '#5266eb',
  greyText: '#c3c3cc',
  coreDark: '#171721',
  border: 'rgba(112, 112, 125, 0.22)',
  borderStrong: 'rgba(226, 227, 237, 0.3)',
  accent: '#5266eb',
  accentSecondary: '#5266eb',
  threeDark: '#171721',
  threeLight: '#1e1e2a',
  threeMedium: '#70707d',
  white: '#ededf3',
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
