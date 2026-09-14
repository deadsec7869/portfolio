import { useEffect, useState, Suspense, lazy } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, ExternalLink, CheckCircle2, ShieldAlert, Sparkles, Box, Terminal } from 'lucide-react';
import { projects } from '../../data/projects';
import type { Project } from '../../data/projects';
import { Badge } from '../UI/Badge';
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

interface ProjectCaseStudyProps {
  project: Project | null;
  onClose: () => void;
  onSelectProject: (project: Project) => void;
}

export function ProjectCaseStudy({ project, onClose, onSelectProject }: ProjectCaseStudyProps) {
  const [viewMode, setViewMode] = useState<'3d' | '2d'>('3d');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        spatialAudio.playClick();
        onClose();
      }
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

  const currentIndex = projects.findIndex((p) => p.id === project.id);
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : projects[projects.length - 1];
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : projects[0];

  const hasGithub = Boolean(project.github && project.github !== '#' && !project.github.includes('placeholder'));
  const hasDemo = Boolean(project.demo && project.demo.trim().length > 0 && project.demo !== '#' && !project.demo.includes('example.com'));

  const handleClose = () => {
    spatialAudio.playClick();
    onClose();
  };

  const handleProjectSwitch = (p: Project) => {
    spatialAudio.playClick();
    onSelectProject(p);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-0 z-[9999] bg-[#F4F1E8] text-[#3F3F3C] overflow-y-auto"
      >
        {/* Top Studio Navigation Bar */}
        <div className="sticky top-0 z-30 bg-[#F4F1E8]/90 backdrop-blur-2xl border-b border-[#5E5E5A]/20 px-6 md:px-12 py-4 flex items-center justify-between">
          <button
            onClick={handleClose}
            onMouseEnter={() => spatialAudio.playHover()}
            className="flex items-center gap-2.5 text-xs font-mono-tech text-[#5E5E5A] hover:text-[#3F3F3C] transition-colors cursor-pointer group uppercase tracking-widest"
            data-cursor="BACK"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>← ALL WORK</span>
          </button>

          <div className="flex items-center gap-3">
            {/* View Switcher Pill */}
            <div className="flex items-center p-1 rounded-full bg-[#ECE8DD] border border-[#5E5E5A]/20 text-[10px] font-mono-tech">
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

            <span className="text-xs font-mono-tech font-bold text-[#3F3F3C] bg-[#ECE8DD] px-2.5 py-0.5 rounded border border-[#5E5E5A]/30">
              PROJECT {project.projectNumber || '01'}
            </span>
            <Badge variant="status" dot={project.featured}>
              {project.category}
            </Badge>
          </div>
        </div>

        {/* Main Case Study Content Container */}
        <div className="max-w-6xl mx-auto px-6 md:px-12 py-12 md:py-20 space-y-16 case-study-enter">
          {/* Section: Project Detail Hero */}
          <div>
            <span className="text-xs font-mono-tech text-[#5E5E5A] uppercase tracking-[0.25em] block mb-3 font-semibold">
              PROJECT {project.projectNumber || '01'} &middot; {project.category} &middot; {project.year}
            </span>
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-display font-black text-[#3F3F3C] tracking-tight leading-[0.88] uppercase mb-4">
              {project.title}
            </h1>
            <p className="text-lg sm:text-2xl text-[#5E5E5A] font-sans-clean font-light leading-relaxed max-w-3xl">
              {project.tagline}
            </p>
          </div>

          {/* Large Project Visual occupying substantial viewport */}
          <div className="w-full h-[400px] sm:h-[480px] rounded-3xl overflow-hidden border border-[#5E5E5A]/20 shadow-sm bg-[#ECE8DD]/40 relative">
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

          {/* Metrics Row */}
          {project.metrics && project.metrics.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {project.metrics.map((m) => (
                <div
                  key={m.label}
                  className="p-5 rounded-xl bg-[#ECE8DD]/70 border border-[#5E5E5A]/20 shadow-xs"
                >
                  <span className="text-[11px] font-mono-tech text-[#8A8983] uppercase tracking-wider block mb-1">
                    {m.label}
                  </span>
                  <span className="text-xl sm:text-2xl font-display font-bold text-[#3F3F3C]">
                    {m.value}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Section: OVERVIEW & TECHNOLOGIES */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pt-8 border-t border-[#5E5E5A]/20">
            <div className="md:col-span-8 space-y-4">
              <h3 className="text-xs font-mono-tech uppercase tracking-[0.2em] text-[#5E5E5A] flex items-center gap-2 font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-[#5E5E5A]" />
                OVERVIEW
              </h3>
              <p className="text-base sm:text-lg text-[#5E5E5A] font-sans-clean leading-relaxed font-light">
                {project.longDescription || project.shortDescription}
              </p>
            </div>

            <div className="md:col-span-4 space-y-4">
              <h3 className="text-xs font-mono-tech uppercase tracking-[0.2em] text-[#5E5E5A] font-semibold">
                TECHNOLOGY STACK
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1.5 rounded-lg bg-[#ECE8DD] border border-[#5E5E5A]/25 text-xs font-mono-tech text-[#3F3F3C] shadow-xs"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Section: FEATURES & ARCHITECTURE */}
          {(project.features || project.architecture) && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pt-8 border-t border-[#5E5E5A]/20">
              {project.features && project.features.length > 0 && (
                <div className="md:col-span-6 space-y-4">
                  <h3 className="text-xs font-mono-tech uppercase tracking-[0.2em] text-[#5E5E5A] font-semibold">
                    CORE FEATURES
                  </h3>
                  <div className="space-y-3">
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

              {project.architecture && (
                <div className="md:col-span-6 space-y-4">
                  <h3 className="text-xs font-mono-tech uppercase tracking-[0.2em] text-[#5E5E5A] font-semibold">
                    SYSTEM ARCHITECTURE
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
            </div>
          )}

          {/* Section: CHALLENGES & RESULT */}
          {(project.challenges || project.result) && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pt-8 border-t border-[#5E5E5A]/20">
              {project.challenges && project.challenges.length > 0 && (
                <div className="md:col-span-6 space-y-4">
                  <h3 className="text-xs font-mono-tech uppercase tracking-[0.2em] text-[#5E5E5A] flex items-center gap-2 font-semibold">
                    <ShieldAlert className="w-3.5 h-3.5 text-[#5E5E5A]" />
                    ENGINEERING CHALLENGES
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

              {project.result && (
                <div className="md:col-span-6 space-y-4">
                  <h3 className="text-xs font-mono-tech uppercase tracking-[0.2em] text-[#3F3F3C] font-semibold">
                    OUTCOME &amp; RESULT
                  </h3>
                  <p className="text-sm sm:text-base text-[#5E5E5A] font-sans-clean leading-relaxed bg-[#ECE8DD]/70 border border-[#5E5E5A]/20 p-5 rounded-xl">
                    {project.result}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Direct Action Links */}
          <div className="pt-8 border-t border-[#5E5E5A]/20 flex flex-wrap items-center justify-between gap-4">
            <span className="text-xs font-mono-tech text-[#8A8983] uppercase tracking-widest">
              DEPLOYMENT &amp; SOURCE //
            </span>

            <div className="flex flex-wrap gap-4">
              {hasGithub && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => spatialAudio.playHover()}
                  className="px-6 py-3 rounded-full bg-[#ECE8DD] border border-[#5E5E5A]/25 hover:border-[#5E5E5A] text-xs font-mono-tech text-[#3F3F3C] uppercase tracking-wider flex items-center gap-2 transition-colors cursor-pointer shadow-xs"
                  data-cursor="CODE"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>VIEW SOURCE →</span>
                </a>
              )}

              {hasDemo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => spatialAudio.playHover()}
                  className="px-7 py-3 rounded-full bg-[#3F3F3C] text-[#F4F1E8] font-mono-tech text-xs uppercase tracking-wider font-bold hover:bg-[#5E5E5A] transition-all flex items-center gap-2 cursor-pointer shadow-sm"
                  data-cursor="DEMO"
                >
                  <span>LIVE DEMO</span>
                  <ExternalLink className="w-4 h-4 text-[#F4F1E8]" />
                </a>
              )}
            </div>
          </div>

          {/* Continuous Project Navigation */}
          <div className="pt-16 border-t border-[#5E5E5A]/20 flex flex-col sm:flex-row items-center justify-between gap-6">
            <button
              onClick={() => handleProjectSwitch(prevProject)}
              onMouseEnter={() => spatialAudio.playHover()}
              className="flex items-center gap-3 text-left group cursor-pointer"
            >
              <div className="w-10 h-10 rounded-full bg-[#ECE8DD] border border-[#5E5E5A]/20 flex items-center justify-center text-[#8A8983] group-hover:text-[#3F3F3C] group-hover:border-[#5E5E5A]/40 transition-colors shadow-xs">
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
              </div>
              <div>
                <span className="text-[10px] font-mono-tech text-[#8A8983] uppercase tracking-widest block">
                  PREVIOUS PROJECT
                </span>
                <span className="text-sm font-display font-bold text-[#3F3F3C] group-hover:text-[#5E5E5A] transition-colors">
                  {prevProject.title}
                </span>
              </div>
            </button>

            <button
              onClick={() => handleProjectSwitch(nextProject)}
              onMouseEnter={() => spatialAudio.playHover()}
              className="flex items-center gap-3 text-right group cursor-pointer"
            >
              <div>
                <span className="text-[10px] font-mono-tech text-[#8A8983] uppercase tracking-widest block">
                  NEXT PROJECT
                </span>
                <span className="text-sm font-display font-bold text-[#3F3F3C] group-hover:text-[#5E5E5A] transition-colors">
                  {nextProject.title}
                </span>
              </div>
              <div className="w-10 h-10 rounded-full bg-[#ECE8DD] border border-[#5E5E5A]/20 flex items-center justify-center text-[#8A8983] group-hover:text-[#3F3F3C] group-hover:border-[#5E5E5A]/40 transition-colors shadow-xs">
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
