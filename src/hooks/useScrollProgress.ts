import { useState, useEffect } from 'react';

export interface ScrollProgressInfo {
  progress: number; // 0.0 to 1.0
  scrollY: number;
  currentSection: 'hero' | 'about' | 'work' | 'experiments' | 'stack' | 'opensource' | 'contact';
}

export function useScrollProgress(): ScrollProgressInfo {
  const [scrollInfo, setScrollInfo] = useState<ScrollProgressInfo>({
    progress: 0,
    scrollY: 0,
    currentSection: 'hero',
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const calculateScroll = () => {
      const scrollY = window.scrollY;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? Math.min(Math.max(scrollY / totalHeight, 0), 1) : 0;

      let currentSection: ScrollProgressInfo['currentSection'] = 'hero';
      if (progress > 0.85) currentSection = 'contact';
      else if (progress > 0.7) currentSection = 'opensource';
      else if (progress > 0.55) currentSection = 'stack';
      else if (progress > 0.4) currentSection = 'experiments';
      else if (progress > 0.22) currentSection = 'work';
      else if (progress > 0.08) currentSection = 'about';

      setScrollInfo({ progress, scrollY, currentSection });
    };

    calculateScroll();
    window.addEventListener('scroll', calculateScroll, { passive: true });
    return () => window.removeEventListener('scroll', calculateScroll);
  }, []);

  return scrollInfo;
}
