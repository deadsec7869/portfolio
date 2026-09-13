import { useState, useEffect } from 'react';

export type QualityLevel = 'HIGH' | 'MEDIUM' | 'LOW';

export interface QualityConfig {
  quality: QualityLevel;
  maxDpr: number;
  particleMultiplier: number;
  enableComplexShadows: boolean;
  enablePostProcessing: boolean;
}

export function useQualityLevel(): QualityConfig {
  const [qualityConfig, setQualityConfig] = useState<QualityConfig>(() => {
    if (typeof window === 'undefined') {
      return {
        quality: 'HIGH',
        maxDpr: 1.5,
        particleMultiplier: 1.0,
        enableComplexShadows: false,
        enablePostProcessing: false,
      };
    }

    const isMobile = window.innerWidth < 768 || window.matchMedia('(pointer: coarse)').matches;
    const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
    const cores = navigator.hardwareConcurrency || 4;

    if (isMobile || cores <= 2) {
      return {
        quality: 'LOW',
        maxDpr: 1.0,
        particleMultiplier: 0.35,
        enableComplexShadows: false,
        enablePostProcessing: false,
      };
    } else if (isTablet || cores <= 4) {
      return {
        quality: 'MEDIUM',
        maxDpr: 1.3,
        particleMultiplier: 0.65,
        enableComplexShadows: false,
        enablePostProcessing: false,
      };
    }

    return {
      quality: 'HIGH',
      maxDpr: 1.5,
      particleMultiplier: 1.0,
      enableComplexShadows: false,
      enablePostProcessing: false,
    };
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const updateQuality = () => {
      const isMobile = window.innerWidth < 768 || window.matchMedia('(pointer: coarse)').matches;
      const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
      const cores = navigator.hardwareConcurrency || 4;

      if (isMobile || cores <= 2) {
        setQualityConfig({
          quality: 'LOW',
          maxDpr: 1.0,
          particleMultiplier: 0.35,
          enableComplexShadows: false,
          enablePostProcessing: false,
        });
      } else if (isTablet || cores <= 4) {
        setQualityConfig({
          quality: 'MEDIUM',
          maxDpr: 1.3,
          particleMultiplier: 0.65,
          enableComplexShadows: false,
          enablePostProcessing: false,
        });
      } else {
        setQualityConfig({
          quality: 'HIGH',
          maxDpr: 1.5,
          particleMultiplier: 1.0,
          enableComplexShadows: false,
          enablePostProcessing: false,
        });
      }
    };

    window.addEventListener('resize', updateQuality, { passive: true });
    return () => window.removeEventListener('resize', updateQuality);
  }, []);

  return qualityConfig;
}
