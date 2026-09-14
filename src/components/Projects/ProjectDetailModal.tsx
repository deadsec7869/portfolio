import { useEffect, useState, Suspense, lazy } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, CheckCircle2, ShieldAlert, Sparkles, Box, Terminal } from 'lucide-react';
import type { Project } from '../../data/projects';
import { Badge } from '../UI/Badge';
import { MagneticButton } from '../UI/MagneticButton';
import { GithubIcon } from '../UI/Icons';
import { MusicPlayerVisual } from './MusicPlayerVisual';
import { RobotCommandVisual } from './RobotCommandVisual';
import { VtuStudyVisual } from './VtuStudyVisual';
import { SceneFallback } from '../../three/scenes/SceneFallback';
import { spatialAudio } from '../../lib/audio';
import { STUDIO_COLORS } from '../../three/materials/materials';

const ProjectScene = lazy(() =>
  import('../../three/scenes/ProjectScene').then((m) => ({ default: m.ProjectScene }))
);

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectDetailModal({ project, onClose }: ProjectDetailModalProps) {
  const [viewMode, setViewMode] = useState<'3d' | '2d'>('3d');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  const hasGithub = Boolean(project.github && project.github !== '#' && !project.github.includes('placeholder'));
  const hasDemo = Boolean(project.demo && project.demo.trim().length > 0 && project.demo !== '#' && !project.demo.includes('example.com'));

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#3F3F3C]/40 backdrop-blur-md"
        />

        {/* Modal Window Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 20 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-5xl bg-[#F4F1E8] border border-[#5E5E5A]/30 rounded-2xl md:rounded-3xl shadow-xl overflow-hidden z-10 max-h-[90vh] flex flex-col text-[#3F3F3C]"
        >
          {/* Top Bar Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#5E5E5A]/20 bg-[#ECE8DD] sticky top-0 z-20">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono-tech font-bold text-[#3F3F3C] bg-[#F4F1E8] px-2.5 py-0.5 rounded border border-[#5E5E5A]/30">
                PROJECT {project.projectNumber || '01'}
              </span>
              <Badge variant="status" dot={project.featured}>
                {project.category}
              </Badge>
              <span className="text-xs font-mono-tech text-[#8A8983] hidden sm:inline">
                YEAR // {project.year}
              </span>
            </div>

            <div className="flex items-center gap-3">
              {/* View Mode Switcher Pill */}
              <div className="flex items-center p-1 rounded-full bg-[#F4F1E8] border border-[#5E5E5A]/20 text-[10px] font-mono-tech">
                <button
                  onClick={() => {
                    spatialAudio.playHover();
                    setViewMode('3d');
                  }}
                  className={`px-2.5 py-1 rounded-full flex items-center gap-1 transition-all cursor-pointer ${
                    viewMode === '3d'
                      ? 'bg-[#3F3F3C] text-[#F4F1E8] font-bold shadow-xs'
                      : 'text-[#5E5E5A] hover:text-[#3F3F3C]'
                  }`}
                >
                  <Box className="w-3 h-3" />
                  <span>3D SCENE</span>
                </button>
                <button
                  onClick={() => {
                    spatialAudio.playHover();
                    setViewMode('2d');
                  }}
                  className={`px-2.5 py-1 rounded-full flex items-center gap-1 transition-all cursor-pointer ${
                    viewMode === '2d'
                      ? 'bg-[#3F3F3C] text-[#F4F1E8] font-bold shadow-xs'
                      : 'text-[#5E5E5A] hover:text-[#3F3F3C]'
                  }`}
                >
                  <Terminal className="w-3 h-3" />
                  <span>2D LAB</span>
                </button>
              </div>

              <button
                onClick={onClose}
                className="p-2 rounded-lg bg-[#F4F1E8] border border-[#5E5E5A]/20 text-[#5E5E5A] hover:text-[#3F3F3C] transition-all focus:outline-none cursor-pointer"
                aria-label="Close Project Detail View"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Modal Content Scroll Area */}
          <div className="overflow-y-auto p-6 md:p-10 space-y-10">
            {/* Title & Tagline */}
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-[#3F3F3C] tracking-tight uppercase mb-2">
                {project.title}
              </h2>
              <p className="text-base sm:text-lg text-[#5E5E5A] font-sans-clean font-medium">
                {project.tagline}
              </p>
            </div>

            {/* Dedicated Project Visual */}
            <div className="w-full h-[360px] sm:h-[420px] rounded-2xl overflow-hidden border border-[#5E5E5A]/20 bg-[#ECE8DD]/50 relative">
              {viewMode === '3d' ? (
                <Suspense fallback={<SceneFallback />}>
                  <ProjectScene
                    projectId={project.id}
                    type={project.category}
                    accentColor={STUDIO_COLORS.grey}
                  />
                </Suspense>
              ) : (
                <div className="w-full h-full overflow-y-auto">
                  {project.id === 'ai-robot-command-center' ? (
                    <RobotCommandVisual />
                  ) : project.id === 'aapesh' ? (
                    <MusicPlayerVisual />
                  ) : project.id === 'vtu-study-app' ? (
                    <VtuStudyVisual />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center p-6 text-center">
                      <span className="font-display font-bold text-[#3F3F3C] text-xl uppercase">
                        {project.title}
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Metrics Dashboard */}
            {project.metrics && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {project.metrics.map((m) => (
                  <div
                    key={m.label}
                    className="p-4 rounded-xl bg-[#ECE8DD] border border-[#5E5E5A]/20 shadow-xs"
                  >
                    <span className="text-[11px] font-mono-tech text-[#8A8983] uppercase tracking-wider block mb-1">
                      {m.label}
                    </span>
                    <span className="text-xl md:text-2xl font-display font-bold text-[#3F3F3C]">
                      {m.value}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Section: OVERVIEW */}
            <div className="space-y-3">
              <h3 className="text-xs font-mono-tech uppercase tracking-[0.2em] text-[#5E5E5A] flex items-center gap-2 font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-[#5E5E5A]" />
                OVERVIEW
              </h3>
              <p className="text-base sm:text-lg text-[#5E5E5A] leading-relaxed font-sans-clean">
                {project.longDescription || project.shortDescription}
              </p>
            </div>

            {/* Section: TECHNOLOGIES */}
            <div className="space-y-3">
              <h3 className="text-xs font-mono-tech uppercase tracking-[0.2em] text-[#5E5E5A] font-semibold">
                TECHNOLOGIES
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1.5 rounded-lg bg-[#ECE8DD] border border-[#5E5E5A]/20 text-xs font-mono-tech text-[#3F3F3C] font-medium"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Section: FEATURES */}
            {project.features && project.features.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-xs font-mono-tech uppercase tracking-[0.2em] text-[#5E5E5A] font-semibold">
                  FEATURES
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {project.features.map((feat, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-xl bg-[#ECE8DD]/60 border border-[#5E5E5A]/15 flex items-start gap-3 shadow-xs"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#5E5E5A] shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-[#5E5E5A] font-sans-clean leading-relaxed">
                        {feat}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Section: ARCHITECTURE */}
            {project.architecture && (
              <div className="space-y-3">
                <h3 className="text-xs font-mono-tech uppercase tracking-[0.2em] text-[#5E5E5A] font-semibold">
                  ARCHITECTURE
                </h3>
                <div className="p-6 rounded-2xl bg-[#ECE8DD]/70 border border-[#5E5E5A]/20 font-mono-tech text-xs space-y-3 shadow-xs">
                  {Object.entries(project.architecture).map(([key, value]) => (
                    <div key={key} className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#5E5E5A]/15 pb-2 last:border-b-0 gap-1">
                      <span className="text-[#8A8983] uppercase tracking-wider">{key}:</span>
                      <span className="text-[#3F3F3C] font-sans-clean font-medium">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Section: CHALLENGES */}
            {project.challenges && project.challenges.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-xs font-mono-tech uppercase tracking-[0.2em] text-[#5E5E5A] flex items-center gap-2 font-semibold">
                  <ShieldAlert className="w-3.5 h-3.5 text-[#5E5E5A]" />
                  CHALLENGES
                </h3>
                <div className="space-y-3">
                  {project.challenges.map((c, i) => (
                    <div key={i} className="p-4 rounded-xl bg-[#ECE8DD]/60 border border-[#5E5E5A]/20 text-xs sm:text-sm text-[#5E5E5A] leading-relaxed font-sans-clean">
                      {c}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Section: RESULT */}
            {project.result && (
              <div className="space-y-3">
                <h3 className="text-xs font-mono-tech uppercase tracking-[0.2em] text-[#3F3F3C] font-semibold">
                  RESULT
                </h3>
                <p className="text-sm sm:text-base text-[#5E5E5A] font-sans-clean leading-relaxed bg-[#ECE8DD] border border-[#5E5E5A]/20 p-4 rounded-xl">
                  {project.result}
                </p>
              </div>
            )}

            {/* Section: LINKS */}
            <div className="pt-6 border-t border-[#5E5E5A]/20 flex flex-wrap gap-4 justify-between items-center">
              <span className="text-xs font-mono-tech text-[#8A8983]">
                PROJECT LINKS //
              </span>

              <div className="flex flex-wrap gap-3">
                {hasGithub ? (
                  <MagneticButton
                    variant="outline"
                    size="md"
                    asAnchor
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <GithubIcon className="w-4 h-4" />
                    <span>VIEW SOURCE</span>
                  </MagneticButton>
                ) : (
                  <span className="px-4 py-2.5 rounded-lg bg-[#ECE8DD] border border-[#5E5E5A]/20 text-xs font-mono-tech text-[#8A8983]">
                    SOURCE CODE AVAILABLE ON REQUEST
                  </span>
                )}

                {hasDemo && (
                  <MagneticButton
                    variant="primary"
                    size="md"
                    asAnchor
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>LIVE DEMO</span>
                    <ExternalLink className="w-4 h-4 text-[#F4F1E8]" />
                  </MagneticButton>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
