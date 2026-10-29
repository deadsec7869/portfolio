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
        className="fixed inset-0 z-[9999] bg-[#171721] text-[#ededf3] overflow-y-auto"
      >
        {/* Top Studio Navigation Bar */}
        <div className="sticky top-0 z-30 bg-[#171721]/90 backdrop-blur-2xl border-b border-[#70707d]/20 px-6 md:px-12 py-4 flex items-center justify-between">
          <button
            onClick={handleClose}
            onMouseEnter={() => spatialAudio.playHover()}
            className="flex items-center gap-2.5 text-xs font-mono-tech text-[#c3c3cc] hover:text-[#ededf3] transition-colors cursor-pointer group uppercase tracking-widest font-[480]"
            data-cursor="BACK"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>← ALL WORK</span>
          </button>

          <div className="flex items-center gap-3">
            {/* View Switcher Pill */}
            <div className="flex items-center p-1 rounded-full bg-[#272735] border border-[#70707d]/20 text-[10px] font-mono-tech">
              <button
                onClick={() => {
                  spatialAudio.playHover();
                  setViewMode('3d');
                }}
                className={`px-3 py-1 rounded-full flex items-center gap-1 transition-all cursor-pointer ${
                  viewMode === '3d'
                    ? 'bg-[#171721] text-[#ededf3] font-[480]'
                    : 'text-[#c3c3cc] hover:text-[#ededf3]'
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
                className={`px-3 py-1 rounded-full flex items-center gap-1 transition-all cursor-pointer ${
                  viewMode === '2d'
                    ? 'bg-[#171721] text-[#ededf3] font-[480]'
                    : 'text-[#c3c3cc] hover:text-[#ededf3]'
                }`}
              >
                <Terminal className="w-3 h-3" />
                <span>2D LAB</span>
              </button>
            </div>

            <span className="text-xs font-mono-tech font-[480] text-[#ededf3] bg-[#272735] px-3 py-1 rounded-full border border-[#70707d]/20">
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
            <span className="text-xs font-mono-tech text-[#c3c3cc] uppercase tracking-[0.25em] block mb-3 font-[480]">
              PROJECT {project.projectNumber || '01'} &middot; {project.category} &middot; {project.year}
            </span>
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-display font-[480] text-[#ededf3] tracking-[0.01em] leading-[0.92] uppercase mb-4">
              {project.title}
            </h1>
            <p className="text-lg sm:text-2xl text-[#c3c3cc] font-sans-clean font-[400] leading-relaxed max-w-3xl">
              {project.tagline}
            </p>
          </div>

          {/* Large Project Visual occupying substantial viewport */}
          <div className="w-full h-[400px] sm:h-[480px] rounded-[12px] overflow-hidden border border-[#70707d]/20 shadow-none bg-[#1e1e2a] relative">
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
                    <span className="font-display font-[480] text-[#ededf3] text-xl uppercase">
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
                  className="p-6 rounded-[12px] bg-[#1e1e2a] border-0 shadow-none text-[#ededf3]"
                >
                  <span className="text-[11px] font-mono-tech text-[#c3c3cc] uppercase tracking-wider block mb-1 font-[480]">
                    {m.label}
                  </span>
                  <span className="text-xl sm:text-2xl font-display font-[480] text-[#ededf3]">
                    {m.value}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Section: OVERVIEW & TECHNOLOGIES */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pt-8 border-t border-[#70707d]/20">
            <div className="md:col-span-8 space-y-4">
              <h3 className="text-xs font-mono-tech uppercase tracking-[0.2em] text-[#ededf3] flex items-center gap-2 font-[480]">
                <Sparkles className="w-3.5 h-3.5 text-[#5266eb]" />
                OVERVIEW
              </h3>
              <p className="text-base sm:text-lg text-[#c3c3cc] font-sans-clean leading-relaxed font-[400]">
                {project.longDescription || project.shortDescription}
              </p>
            </div>

            <div className="md:col-span-4 space-y-4">
              <h3 className="text-xs font-mono-tech uppercase tracking-[0.2em] text-[#ededf3] font-[480]">
                TECHNOLOGY STACK
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((t) => (
                  <span
                    key={t}
                    className="px-3.5 py-1.5 rounded-[32px] bg-[#272735] border border-[#70707d]/20 text-xs font-mono-tech text-[#ededf3] shadow-none"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Section: FEATURES & ARCHITECTURE */}
          {(project.features || project.architecture) && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pt-8 border-t border-[#70707d]/20">
              {project.features && project.features.length > 0 && (
                <div className="md:col-span-6 space-y-4">
                  <h3 className="text-xs font-mono-tech uppercase tracking-[0.2em] text-[#ededf3] font-[480]">
                    CORE FEATURES
                  </h3>
                  <div className="space-y-3">
                    {project.features.map((feat, i) => (
                      <div
                        key={i}
                        className="p-4 rounded-[12px] bg-[#1e1e2a] border-0 flex items-start gap-3 shadow-none"
                      >
                        <CheckCircle2 className="w-4 h-4 text-[#5266eb] shrink-0 mt-0.5" />
                        <span className="text-xs sm:text-sm text-[#c3c3cc] font-sans-clean leading-relaxed">
                          {feat}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {project.architecture && (
                <div className="md:col-span-6 space-y-4">
                  <h3 className="text-xs font-mono-tech uppercase tracking-[0.2em] text-[#ededf3] font-[480]">
                    SYSTEM ARCHITECTURE
                  </h3>
                  <div className="p-6 rounded-[12px] bg-[#1e1e2a] border-0 font-mono-tech text-xs space-y-3 shadow-none">
                    {Object.entries(project.architecture).map(([key, value]) => (
                      <div key={key} className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#70707d]/15 pb-2 last:border-b-0 gap-1">
                        <span className="text-[#c3c3cc] uppercase tracking-wider">{key}:</span>
                        <span className="text-[#ededf3] font-sans-clean font-medium">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Section: CHALLENGES & RESULT */}
          {(project.challenges || project.result) && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pt-8 border-t border-[#70707d]/20">
              {project.challenges && project.challenges.length > 0 && (
                <div className="md:col-span-6 space-y-4">
                  <h3 className="text-xs font-mono-tech uppercase tracking-[0.2em] text-[#ededf3] flex items-center gap-2 font-[480]">
                    <ShieldAlert className="w-3.5 h-3.5 text-[#5266eb]" />
                    ENGINEERING CHALLENGES
                  </h3>
                  <div className="space-y-3">
                    {project.challenges.map((c, i) => (
                      <div key={i} className="p-4 rounded-[12px] bg-[#1e1e2a] border-0 text-xs sm:text-sm text-[#c3c3cc] leading-relaxed font-sans-clean shadow-none">
                        {c}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {project.result && (
                <div className="md:col-span-6 space-y-4">
                  <h3 className="text-xs font-mono-tech uppercase tracking-[0.2em] text-[#ededf3] font-[480]">
                    OUTCOME &amp; RESULT
                  </h3>
                  <p className="text-sm sm:text-base text-[#c3c3cc] font-sans-clean leading-relaxed bg-[#1e1e2a] border-0 p-5 rounded-[12px] shadow-none">
                    {project.result}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Direct Action Links */}
          <div className="pt-8 border-t border-[#70707d]/20 flex flex-wrap items-center justify-between gap-4">
            <span className="text-xs font-mono-tech text-[#c3c3cc] uppercase tracking-widest font-[480]">
              DEPLOYMENT &amp; SOURCE //
            </span>

            <div className="flex flex-wrap gap-4">
              {hasGithub && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => spatialAudio.playHover()}
                  className="px-6 py-3 rounded-[32px] bg-[#272735] border border-[#70707d]/25 hover:border-[#ededf3]/50 text-xs font-mono-tech text-[#ededf3] uppercase tracking-wider flex items-center gap-2 transition-colors cursor-pointer shadow-none"
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
                  className="px-8 py-3.5 rounded-[32px] bg-[#5266eb] hover:bg-[#4355db] text-[#ffffff] font-mono-tech text-xs uppercase tracking-wider font-[400] transition-all flex items-center gap-2 cursor-pointer shadow-none border-0"
                  data-cursor="DEMO"
                >
                  <span>LIVE DEMO</span>
                  <ExternalLink className="w-4 h-4 text-[#ffffff]" />
                </a>
              )}
            </div>
          </div>

          {/* Continuous Project Navigation */}
          <div className="pt-16 border-t border-[#70707d]/20 flex flex-col sm:flex-row items-center justify-between gap-6">
            <button
              onClick={() => handleProjectSwitch(prevProject)}
              onMouseEnter={() => spatialAudio.playHover()}
              className="flex items-center gap-3 text-left group cursor-pointer"
            >
              <div className="w-10 h-10 rounded-full bg-[#272735] border border-[#70707d]/20 flex items-center justify-center text-[#ededf3] group-hover:bg-[#5266eb] group-hover:text-white transition-colors shadow-none">
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
              </div>
              <div>
                <span className="text-[10px] font-mono-tech text-[#c3c3cc] uppercase tracking-widest block">
                  PREVIOUS PROJECT
                </span>
                <span className="text-sm font-display font-[480] text-[#ededf3] group-hover:text-white transition-colors">
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
                <span className="text-[10px] font-mono-tech text-[#c3c3cc] uppercase tracking-widest block">
                  NEXT PROJECT
                </span>
                <span className="text-sm font-display font-[480] text-[#ededf3] group-hover:text-white transition-colors">
                  {nextProject.title}
                </span>
              </div>
              <div className="w-10 h-10 rounded-full bg-[#272735] border border-[#70707d]/20 flex items-center justify-center text-[#ededf3] group-hover:bg-[#5266eb] group-hover:text-white transition-colors shadow-none">
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
