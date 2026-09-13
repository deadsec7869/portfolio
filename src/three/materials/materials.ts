import * as THREE from 'three';

/**
 * Editorial Light Studio Color Palette
 */
export const STUDIO_COLORS = {
  bgMain: '#FAFAF8',
  charcoal: '#111111',
  slateDark: '#1E293B',
  slateMuted: '#475569',
  slateLight: '#94A3B8',
  titanium: '#EAEFF4',
  titaniumCore: '#F1F5F9',
  cyanAccent: '#008899',
  cyanGlow: '#00A0B0',
  emeraldAccent: '#10B981',
  amberAccent: '#F59E0B',
  purpleAccent: '#8B5CF6',
  white: '#FFFFFF',
};

/**
 * Frosted Titanium Physical Material - High-end light studio metal
 */
export function createTitaniumMaterial(options: Partial<THREE.MeshStandardMaterialParameters> = {}): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({
    color: options.color ?? STUDIO_COLORS.titanium,
    roughness: options.roughness ?? 0.18,
    metalness: options.metalness ?? 0.88,
    emissive: options.emissive ?? '#FFFFFF',
    emissiveIntensity: options.emissiveIntensity ?? 0.12,
    ...options,
  });
}

/**
 * Translucent Physical Glass / Acrylic Material
 */
export function createGlassMaterial(options: Partial<THREE.MeshPhysicalMaterialParameters> = {}): THREE.MeshPhysicalMaterial {
  return new THREE.MeshPhysicalMaterial({
    color: options.color ?? '#FFFFFF',
    transparent: true,
    opacity: options.opacity ?? 0.7,
    roughness: options.roughness ?? 0.12,
    metalness: options.metalness ?? 0.1,
    transmission: options.transmission ?? 0.75,
    ior: options.ior ?? 1.45,
    reflectivity: options.reflectivity ?? 0.6,
    clearcoat: options.clearcoat ?? 1.0,
    clearcoatRoughness: options.clearcoatRoughness ?? 0.1,
    ...options,
  });
}

/**
 * Brushed Slate Physical Material - Precision structural elements
 */
export function createBrushedSlateMaterial(options: Partial<THREE.MeshStandardMaterialParameters> = {}): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({
    color: options.color ?? STUDIO_COLORS.slateDark,
    roughness: options.roughness ?? 0.25,
    metalness: options.metalness ?? 0.78,
    ...options,
  });
}

/**
 * Precision Geometric Wireframe Material
 */
export function createWireframeMaterial(color: string = STUDIO_COLORS.slateMuted, opacity = 0.35): THREE.MeshBasicMaterial {
  return new THREE.MeshBasicMaterial({
    color,
    wireframe: true,
    transparent: true,
    opacity,
  });
}
