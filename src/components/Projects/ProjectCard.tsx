import React, { useRef, useState, Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowRight, ExternalLink, Box, Terminal } from 'lucide-react';
import type { Project } from '../../data/projects';
import { MusicPlayerVisual } from './MusicPlayerVisual';
import { RobotCommandVisual } from './RobotCommandVisual';
import { VtuStudyVisual } from './VtuStudyVisual';
import { SceneFallback } from '../../three/scenes/SceneFallback';
import { spatialAudio } from '../../lib/audio';
import { STUDIO_COLORS } from '../../three/materials/materials';

const ProjectScene = lazy(() =>
  import('../../three/scenes/ProjectScene').then((m) => ({ default: m.ProjectScene }))
);

interface ProjectCardProps {
  project: Project;
  onSelectProject: (project: Project) => void;
  index: number;
}

export function ProjectCard({ project, onSelectProject, index }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [viewMode, setViewMode] = useState<'3d' | '2d'>('3d');

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rX = ((y - centerY) / centerY) * -1.8;
    const rY = ((x - centerX) / centerX) * 1.8;

    setRotateX(rX);
    setRotateY(rY);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    spatialAudio.playHover();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  const handleCardClick = () => {
    spatialAudio.playClick();
    onSelectProject(project);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      className="w-full py-10 md:py-16 border-t border-[#5E5E5A]/20 first:border-t-0"
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleCardClick}
        style={{
          transform: `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${isHovered ? 1.005 : 1})`,
          transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s ease',
        }}
        className="group relative rounded-3xl bg-[#ECE8DD]/40 hover:bg-[#ECE8DD]/80 backdrop-blur-md border border-[#5E5E5A]/20 hover:border-[#5E5E5A]/40 p-6 sm:p-10 md:p-12 shadow-xs hover:shadow-xl hover:shadow-black/[0.03] cursor-pointer overflow-hidden flex flex-col justify-between"
        data-cursor="VIEW"
      >
        {/* Step 1: Project Number & Metadata Strip */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 z-10">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono-tech font-bold text-[#3F3F3C] bg-[#ECE8DD] px-3 py-1 rounded-full border border-[#5E5E5A]/30">
              PROJECT {project.projectNumber || `0${index + 1}`}
            </span>
            <span className="w-1 h-3 bg-[#5E5E5A]/20" />
            <span className="text-xs font-mono-tech text-[#8A8983] uppercase tracking-widest">
              {project.category} // {project.year}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* View Mode Switcher Pill (3D Spatial vs 2D Interactive) */}
            <div
              className="flex items-center p-1 rounded-full bg-[#ECE8DD] border border-[#5E5E5A]/20 text-[10px] font-mono-tech z-20"
              onClick={(e) => e.stopPropagation()}
            >
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
                title="3D Three.js Spatial View"
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
                title="Interactive 2D Lab"
              >
                <Terminal className="w-3 h-3" />
                <span>2D LAB</span>
              </button>
            </div>

            <div className="w-10 h-10 rounded-full bg-[#ECE8DD] border border-[#5E5E5A]/20 flex items-center justify-center text-[#8A8983] group-hover:text-[#3F3F3C] group-hover:border-[#5E5E5A]/40 group-hover:scale-105 transition-all shadow-xs">
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </div>
        </div>

        {/* Step 2 & 3: Giant Editorial Title & Tagline */}
        <div className="mb-8 z-10">
          <h3 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-black text-[#3F3F3C] tracking-tight uppercase leading-[0.88] group-hover:text-[#5E5E5A] transition-colors">
            {project.title}
          </h3>
          <p className="text-sm sm:text-lg font-sans-clean text-[#5E5E5A] font-light mt-3 max-w-2xl leading-relaxed">
            {project.shortDescription || project.longDescription}
          </p>
        </div>

        {/* Step 4: Visual Showcase (3D Scene or 2D Interactive Lab) */}
        <div
          className="my-6 rounded-2xl overflow-hidden relative shadow-xs h-[320px] sm:h-[380px] bg-[#ECE8DD]/60 border border-[#5E5E5A]/20"
          style={{
            transform: `translate(${rotateY * 3}px, ${rotateX * 3}px)`,
            transition: 'transform 0.2s ease-out',
          }}
          onClick={(e) => e.stopPropagation()}
        >
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

        {/* Step 5 & 6: Horizontal Technology Metadata Row & CTA */}
        <div className="pt-6 border-t border-[#5E5E5A]/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4 z-10">
          {/* Horizontal Technical Metadata Row */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-mono-tech text-[#8A8983] uppercase tracking-widest mr-1">
              TECH //
            </span>
            {project.technologies.slice(0, 5).map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 rounded-md bg-[#ECE8DD] border border-[#5E5E5A]/20 hover:border-[#5E5E5A]/40 text-[11px] font-mono-tech text-[#5E5E5A] transition-colors uppercase shadow-xs"
                title={`${tech} in ${project.title}`}
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 5 && (
              <span className="px-2 py-1 rounded-md bg-[#ECE8DD]/60 text-[10px] font-mono-tech text-[#8A8983]">
                +{project.technologies.length - 5}
              </span>
            )}
          </div>

          {/* Primary Action Button */}
          <div className="flex items-center gap-4">
            {project.demo && project.demo.trim().length > 0 && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-xs font-mono-tech text-[#5E5E5A] hover:text-[#3F3F3C] transition-colors flex items-center gap-1"
                data-cursor="OPEN"
              >
                <span>DEMO</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}

            <div className="flex items-center gap-2 text-xs font-mono-tech text-[#3F3F3C] group-hover:text-[#5E5E5A] uppercase tracking-wider font-bold transition-colors">
              <span>VIEW CASE STUDY</span>
              <ArrowRight className="w-4 h-4 text-[#3F3F3C] group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
