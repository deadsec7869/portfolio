import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProjectCard } from './ProjectCard';
import { ProjectCaseStudy } from './ProjectCaseStudy';
import { projects, projectCategories } from '../../data/projects';
import type { ProjectCategory, Project } from '../../data/projects';
import { spatialAudio } from '../../lib/audio';
import { SectionLabel } from '../UI/SectionLabel';

export function ProjectsSection() {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('ALL');
  const [activeCaseStudy, setActiveCaseStudy] = useState<Project | null>(null);

  const filteredProjects = useMemo(() => {
    if (selectedCategory === 'ALL') return projects;
    return projects.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <section id="work" className="relative w-full py-28 md:py-40 bg-transparent border-t border-[#5E5E5A]/20">
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        {/* Header Chapter & Filter Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <SectionLabel
              number="02"
              label="SELECTED WORK"
              tag="FEATURED SYSTEMS & ARCHITECTURES"
              className="mb-3"
            />
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-display font-black text-[#3F3F3C] tracking-tight uppercase leading-[0.9]">
              SELECTED WORK
            </h2>
          </div>

          {/* Minimal Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-full bg-[#ECE8DD]/80 backdrop-blur-md border border-[#5E5E5A]/20 shadow-xs self-start md:self-end">
            {projectCategories.map((category) => {
              const isActive = selectedCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => {
                    spatialAudio.playHover();
                    setSelectedCategory(category);
                  }}
                  className={`relative px-4 py-1.5 rounded-full text-xs font-mono-tech tracking-wider uppercase transition-colors cursor-pointer ${
                    isActive ? 'text-[#F4F1E8] font-semibold' : 'text-[#5E5E5A] hover:text-[#3F3F3C]'
                  }`}
                  data-cursor="FILTER"
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeFilterPill"
                      className="absolute inset-0 bg-[#3F3F3C] rounded-full shadow-xs"
                      transition={{ type: 'spring', stiffness: 450, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{category}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Cinematic Project Sequence */}
        <motion.div layout className="flex flex-col">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                onSelectProject={(p) => setActiveCaseStudy(p)}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProjects.length === 0 && (
          <div className="py-24 text-center rounded-2xl bg-[#ECE8DD]/50 border border-[#5E5E5A]/20">
            <p className="text-sm font-mono-tech text-[#8A8983] uppercase tracking-wider">
              NO PROJECTS IN &ldquo;{selectedCategory}&rdquo; CATEGORY.
            </p>
          </div>
        )}
      </div>

      {/* Full-Screen Case Study Overlay */}
      <ProjectCaseStudy
        project={activeCaseStudy}
        onClose={() => setActiveCaseStudy(null)}
        onSelectProject={(p) => setActiveCaseStudy(p)}
      />
    </section>
  );
}
