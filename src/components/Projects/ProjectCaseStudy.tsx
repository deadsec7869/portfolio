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
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 25 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-0 z-[9999] bg-[#FAFAF8] text-[#111111] overflow-y-auto"
      >
        {/* Top Studio Navigation Bar */}
        <div className="sticky top-0 z-30 bg-[#FAFAF8]/90 backdrop-blur-2xl border-b border-black/[0.08] px-6 md:px-12 py-4 flex items-center justify-between">
          <button
            onClick={handleClose}
            onMouseEnter={() => spatialAudio.playHover()}
            className="flex items-center gap-2.5 text-xs font-mono-tech text-slate-700 hover:text-[#008899] transition-colors cursor-pointer group uppercase tracking-widest"
            data-cursor="BACK"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>← ALL WORK</span>
          </button>

          <div className="flex items-center gap-3">
            {/* View Switcher Pill */}
            <div className="flex items-center p-1 rounded-full bg-black/5 border border-black/10 text-[10px] font-mono-tech">
              <button
                onClick={() => {
                  spatialAudio.playHover();
                  setViewMode('3d');
                }}
                className={`px-2.5 py-1 rounded-full flex items-center gap-1 transition-all cursor-pointer ${
                  viewMode === '3d'
                    ? 'bg-[#111111] text-white font-bold shadow-xs'
                    : 'text-slate-600 hover:text-black'
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
                    ? 'bg-[#111111] text-white font-bold shadow-xs'
                    : 'text-slate-600 hover:text-black'
                }`}
              >
                <Terminal className="w-3 h-3" />
                <span>2D LAB</span>
              </button>
            </div>

            <span className="text-xs font-mono-tech font-bold text-[#008899] bg-[#008899]/10 px-2.5 py-0.5 rounded border border-[#008899]/20">
              PROJECT {project.projectNumber || '01'}
            </span>
            <Badge variant="cyan" dot={project.featured}>
              {project.category}
            </Badge>
          </div>
        </div>

        {/* Main Case Study Content Container */}
        <div className="max-w-6xl mx-auto px-6 md:px-12 py-12 md:py-20 space-y-16 case-study-enter">
          {/* Section 6: Project Detail Hero */}
          <div>
            <span className="text-xs font-mono-tech text-[#008899] uppercase tracking-[0.25em] block mb-3">
              PROJECT {project.projectNumber || '01'} &middot; {project.category} &middot; {project.year}
            </span>
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-display font-black text-[#111111] tracking-tight leading-[0.88] uppercase mb-4">
              {project.title}
            </h1>
            <p className="text-lg sm:text-2xl text-slate-600 font-sans-clean font-light leading-relaxed max-w-3xl">
              {project.tagline}
            </p>
          </div>

          {/* Large Project Visual occupying substantial viewport */}
          <div className="w-full h-[400px] sm:h-[480px] rounded-3xl overflow-hidden border border-black/[0.08] shadow-xl shadow-black/[0.02] bg-white relative">
            {viewMode === '3d' ? (
              <Suspense fallback={<SceneFallback />}>
                <ProjectScene
                  projectId={project.id}
                  type={project.category}
                  accentColor={project.accentColor}
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
                    <span className="font-display font-bold text-[#111111] text-xl uppercase">
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
                  className="p-5 rounded-xl bg-white border border-black/[0.08] shadow-xs"
                >
                  <span className="text-[11px] font-mono-tech text-slate-500 uppercase tracking-wider block mb-1">
                    {m.label}
                  </span>
                  <span className="text-xl sm:text-2xl font-display font-bold text-[#111111]">
                    {m.value}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Section: OVERVIEW & TECHNOLOGIES */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pt-8 border-t border-black/[0.08]">
            <div className="md:col-span-8 space-y-4">
              <h3 className="text-xs font-mono-tech uppercase tracking-[0.2em] text-[#008899] flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5" />
                OVERVIEW
              </h3>
              <p className="text-base sm:text-lg text-slate-700 font-sans-clean leading-relaxed font-light">
                {project.longDescription || project.shortDescription}
              </p>
            </div>

            <div className="md:col-span-4 space-y-4">
              <h3 className="text-xs font-mono-tech uppercase tracking-[0.2em] text-[#008899]">
                TECHNOLOGY STACK
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1.5 rounded-lg bg-white border border-black/[0.08] text-xs font-mono-tech text-slate-800 shadow-xs"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Section: FEATURES & ARCHITECTURE */}
          {(project.features || project.architecture) && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pt-8 border-t border-black/[0.08]">
              {project.features && project.features.length > 0 && (
                <div className="md:col-span-6 space-y-4">
                  <h3 className="text-xs font-mono-tech uppercase tracking-[0.2em] text-[#008899]">
                    CORE FEATURES
                  </h3>
                  <div className="space-y-3">
                    {project.features.map((feat, i) => (
                      <div
                        key={i}
                        className="p-4 rounded-xl bg-white border border-black/[0.06] flex items-start gap-3 shadow-xs"
                      >
                        <CheckCircle2 className="w-4 h-4 text-[#008899] shrink-0 mt-0.5" />
                        <span className="text-xs sm:text-sm text-slate-700 font-sans-clean leading-relaxed">
                          {feat}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {project.architecture && (
                <div className="md:col-span-6 space-y-4">
                  <h3 className="text-xs font-mono-tech uppercase tracking-[0.2em] text-[#008899]">
                    SYSTEM ARCHITECTURE
                  </h3>
                  <div className="p-6 rounded-2xl bg-white border border-black/[0.08] font-mono-tech text-xs space-y-3 shadow-xs">
                    {Object.entries(project.architecture).map(([key, value]) => (
                      <div key={key} className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-black/[0.06] pb-2 last:border-b-0 gap-1">
                        <span className="text-slate-500 uppercase tracking-wider">{key}:</span>
                        <span className="text-[#111111] font-sans-clean font-medium">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Section: CHALLENGES & RESULT */}
          {(project.challenges || project.result) && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pt-8 border-t border-black/[0.08]">
              {project.challenges && project.challenges.length > 0 && (
                <div className="md:col-span-6 space-y-4">
                  <h3 className="text-xs font-mono-tech uppercase tracking-[0.2em] text-amber-700 flex items-center gap-2">
                    <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />
                    ENGINEERING CHALLENGES
                  </h3>
                  <div className="space-y-3">
                    {project.challenges.map((c, i) => (
                      <div key={i} className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 text-xs sm:text-sm text-slate-800 leading-relaxed font-sans-clean">
                        {c}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {project.result && (
                <div className="md:col-span-6 space-y-4">
                  <h3 className="text-xs font-mono-tech uppercase tracking-[0.2em] text-emerald-800">
                    OUTCOME &amp; RESULT
                  </h3>
                  <p className="text-sm sm:text-base text-slate-800 font-sans-clean leading-relaxed bg-emerald-50/70 border border-emerald-200 p-5 rounded-xl">
                    {project.result}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Direct Action Links */}
          <div className="pt-8 border-t border-black/[0.08] flex flex-wrap items-center justify-between gap-4">
            <span className="text-xs font-mono-tech text-slate-500 uppercase tracking-widest">
              DEPLOYMENT &amp; SOURCE //
            </span>

            <div className="flex flex-wrap gap-4">
              {hasGithub && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => spatialAudio.playHover()}
                  className="px-6 py-3 rounded-full bg-white border border-black/15 hover:border-black text-xs font-mono-tech text-[#111111] uppercase tracking-wider flex items-center gap-2 transition-colors cursor-pointer shadow-xs"
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
                  className="px-7 py-3 rounded-full bg-[#111111] text-white font-mono-tech text-xs uppercase tracking-wider font-bold hover:bg-[#008899] transition-all flex items-center gap-2 cursor-pointer shadow-md shadow-black/10"
                  data-cursor="DEMO"
                >
                  <span>LIVE DEMO</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* Continuous Project Navigation */}
          <div className="pt-16 border-t border-black/[0.08] flex flex-col sm:flex-row items-center justify-between gap-6">
            <button
              onClick={() => handleProjectSwitch(prevProject)}
              onMouseEnter={() => spatialAudio.playHover()}
              className="flex items-center gap-3 text-left group cursor-pointer"
            >
              <div className="w-10 h-10 rounded-full bg-white border border-black/[0.08] flex items-center justify-center text-slate-500 group-hover:text-[#111111] group-hover:border-black/30 transition-colors shadow-xs">
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
              </div>
              <div>
                <span className="text-[10px] font-mono-tech text-slate-500 uppercase tracking-widest block">
                  PREVIOUS PROJECT
                </span>
                <span className="text-sm font-display font-bold text-[#111111] group-hover:text-[#008899] transition-colors">
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
                <span className="text-[10px] font-mono-tech text-slate-500 uppercase tracking-widest block">
                  NEXT PROJECT
                </span>
                <span className="text-sm font-display font-bold text-[#111111] group-hover:text-[#008899] transition-colors">
                  {nextProject.title}
                </span>
              </div>
              <div className="w-10 h-10 rounded-full bg-white border border-black/[0.08] flex items-center justify-center text-slate-500 group-hover:text-[#111111] group-hover:border-black/30 transition-colors shadow-xs">
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
