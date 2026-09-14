import { useState, Suspense, lazy } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CAPABILITY_NODES,
} from '../../data/graphData';
import type { CapabilityNode, CapabilityCategory } from '../../data/graphData';
import { Cpu, RotateCcw, Pause, Play, ArrowUpRight, Globe } from 'lucide-react';
import { GithubIcon } from '../UI/Icons';
import { Badge } from '../UI/Badge';
import { spatialAudio } from '../../lib/audio';
import { SectionLabel } from '../UI/SectionLabel';

const ExperienceCanvas = lazy(() =>
  import('../../three/ExperienceCanvas').then((m) => ({ default: m.ExperienceCanvas }))
);

export function TechStackSection() {
  const [selectedNode, setSelectedNode] = useState<CapabilityNode>(
    CAPABILITY_NODES.find((n) => n.id === 'tamim') || CAPABILITY_NODES[0]
  );
  const [activeCategory, setActiveCategory] = useState<CapabilityCategory | 'ALL'>('ALL');
  const [isPaused, setIsPaused] = useState(false);

  const categories: { label: string; value: CapabilityCategory | 'ALL' }[] = [
    { label: 'ALL CAPABILITIES', value: 'ALL' },
    { label: 'WEB SYSTEMS', value: 'frontend' },
    { label: 'AI & HEURISTICS', value: 'ai' },
    { label: '3D & SPATIAL', value: 'graphics' },
    { label: 'LANGUAGES', value: 'language' },
    { label: 'TOOLCHAINS', value: 'tools' },
  ];

  const filteredNodes =
    activeCategory === 'ALL'
      ? CAPABILITY_NODES
      : CAPABILITY_NODES.filter((n) => n.category === activeCategory || n.type === 'central');

  const handleSelectNode = (node: CapabilityNode) => {
    spatialAudio.playHover();
    setSelectedNode(node);
  };

  const handleReset = () => {
    spatialAudio.playClick();
    const central = CAPABILITY_NODES.find((n) => n.id === 'tamim') || CAPABILITY_NODES[0];
    setSelectedNode(central);
    setActiveCategory('ALL');
  };

  return (
    <section
      id="stack"
      className="relative w-full py-28 md:py-36 bg-transparent border-t border-[#3F3F3C]/15 overflow-hidden"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        {/* Header Chapter */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <SectionLabel
              number="05"
              label="CAPABILITIES"
              tag="TECHNICAL SPECTRUM / INTERACTIVE KNOWLEDGE GRAPH"
              className="mb-3"
            />
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-display font-black text-[#3F3F3C] tracking-tight uppercase leading-[0.9]">
              CAPABILITIES &amp; <br />
              <span className="text-[#74736E]">SYSTEM GRAPH</span>
            </h2>
          </div>

          {/* System Telemetry Status Indicator */}
          <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-white/40 backdrop-blur-md border border-[#3F3F3C]/15 text-xs font-mono-tech self-start md:self-end">
            <span className="flex items-center gap-1.5 text-[#3F3F3C] font-bold">
              <span className="w-2 h-2 rounded-full bg-[#19C9E8] animate-pulse" />
              SYSTEM GRAPH
            </span>
            <span className="text-[#A5A39C]">&middot;</span>
            <span className="text-[#74736E]">ONLINE // 18 ACTIVE NODES</span>
          </div>
        </div>

        {/* Editorial Subtitle */}
        <div className="mb-10 max-w-3xl">
          <p className="text-sm sm:text-base text-[#74736E] font-sans-clean font-light leading-relaxed">
            An interactive 3D knowledge graph modeling engineering competencies, domain specializations,
            algorithmic workflows, and production systems across verified repositories.
          </p>
        </div>

        {/* Domain Category Filter Tabs */}
        <div className="flex flex-wrap gap-1.5 p-1.5 rounded-2xl bg-white/40 backdrop-blur-md border border-[#3F3F3C]/15 mb-6 w-fit">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => {
                spatialAudio.playHover();
                setActiveCategory(cat.value);
                if (cat.value !== 'ALL') {
                  const firstOfCat = CAPABILITY_NODES.find((n) => n.category === cat.value);
                  if (firstOfCat) setSelectedNode(firstOfCat);
                }
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-mono-tech tracking-wider uppercase transition-all cursor-pointer ${
                activeCategory === cat.value
                  ? 'bg-[#3F3F3C] text-[#F4F1E8] font-bold shadow-xs'
                  : 'text-[#74736E] hover:text-[#3F3F3C] hover:bg-white/60'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Main 3D Constellation Stage + Real-time Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          {/* 3D WebGL Canvas Stage */}
          <div className="lg:col-span-8 h-[520px] sm:h-[600px] rounded-3xl bg-[#ECE8DD]/40 backdrop-blur-md border border-[#3F3F3C]/15 shadow-xs relative overflow-hidden flex flex-col justify-between">
            {/* Top Toolbar overlay */}
            <div className="p-4 sm:p-6 z-10 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
              <div className="flex items-center gap-2 text-[11px] font-mono-tech text-[#74736E] bg-white/70 px-3 py-1.5 rounded-xl border border-[#3F3F3C]/15 shadow-xs">
                <span className="text-[#3F3F3C] font-bold">NODE INSPECT:</span>
                <span className="font-semibold text-[#19C9E8]">{selectedNode.label}</span>
              </div>

              <div className="flex items-center gap-2 pointer-events-auto">
                <button
                  onClick={() => setIsPaused(!isPaused)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/60 hover:bg-white border border-[#3F3F3C]/18 text-[11px] font-mono-tech text-[#74736E] hover:text-[#3F3F3C] transition-all cursor-pointer shadow-xs"
                  title="Toggle Orbit Drift"
                >
                  {isPaused ? <Play className="w-3.5 h-3.5 text-[#19C9E8]" /> : <Pause className="w-3.5 h-3.5 text-[#74736E]" />}
                  <span>{isPaused ? 'RESUME' : 'PAUSE'}</span>
                </button>

                <button
                  onClick={handleReset}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/60 hover:bg-white border border-[#3F3F3C]/18 text-[11px] font-mono-tech text-[#74736E] hover:text-[#3F3F3C] transition-all cursor-pointer shadow-xs"
                  title="Reset to Central Root"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>RESET ROOT</span>
                </button>
              </div>
            </div>

            {/* Canvas Engine */}
            <div className="absolute inset-0">
              <Suspense
                fallback={
                  <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-xs font-mono-tech text-[#74736E]">
                    <span className="animate-pulse">INITIALIZING 3D SYSTEM GRAPH...</span>
                  </div>
                }
              >
                <ExperienceCanvas
                  selectedNode={selectedNode}
                  onSelectNode={handleSelectNode}
                  isPaused={isPaused}
                />
              </Suspense>
            </div>

            {/* Bottom Interaction Guide Footer */}
            <div className="p-4 sm:p-6 z-10 flex flex-wrap items-center justify-between text-[10px] font-mono-tech text-[#A5A39C] pointer-events-none bg-gradient-to-t from-[#ECE8DD]/90 via-[#ECE8DD]/40 to-transparent">
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#19C9E8]" />
                DRAG TO ROTATE &middot; SCROLL TO EXPLORE &middot; SELECT A NODE TO INSPECT
              </span>
              <span className="hidden sm:inline">COORDINATES // [X, Y, Z] GRAPH SPACE</span>
            </div>
          </div>

          {/* Synchronized Real-time Node Inspector */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedNode.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
                className="p-6 md:p-8 rounded-3xl bg-[#ECE8DD]/80 border border-[#3F3F3C]/20 backdrop-blur-xl shadow-xs flex flex-col gap-5 corner-mark"
              >
                {/* Node Header */}
                <div className="flex items-center justify-between">
                  <Badge variant="status" dot>
                    {selectedNode.category.toUpperCase()}
                  </Badge>
                  <span className="text-[11px] font-mono-tech text-[#A5A39C] font-medium">
                    {selectedNode.tag || (selectedNode.type === 'domain' ? 'MAJOR DOMAIN' : 'TECHNOLOGY NODE')}
                  </span>
                </div>

                <div>
                  <h3 className="text-2xl sm:text-3xl font-display font-black text-[#3F3F3C] uppercase tracking-tight">
                    {selectedNode.label}
                  </h3>
                  {selectedNode.role && (
                    <p className="text-xs font-mono-tech text-[#74736E] mt-1 font-semibold">
                      {selectedNode.role}
                    </p>
                  )}
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm font-sans-clean text-[#74736E] leading-relaxed font-light">
                  {selectedNode.description}
                </p>

                {/* Verified Project Citations */}
                {selectedNode.usedInProjects.length > 0 && (
                  <div className="pt-4 border-t border-[#3F3F3C]/12">
                    <span className="text-[10px] font-mono-tech text-[#A5A39C] uppercase tracking-wider block mb-2.5 font-medium">
                      USED IN VERIFIED WORK
                    </span>
                    <div className="space-y-2">
                      {selectedNode.usedInProjects.map((proj) => (
                        <div
                          key={proj.name}
                          className="flex items-center justify-between p-2.5 rounded-xl bg-white/70 border border-[#3F3F3C]/15 text-xs font-mono-tech text-[#3F3F3C]"
                        >
                          <span className="font-semibold truncate">{proj.name}</span>
                          <div className="flex items-center gap-2 shrink-0">
                            {proj.url && (
                              <a
                                href={proj.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-1 rounded text-[#74736E] hover:text-[#3F3F3C] transition-colors"
                                title="Live Demo"
                              >
                                <Globe className="w-3.5 h-3.5" />
                              </a>
                            )}
                            {proj.github && (
                              <a
                                href={proj.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-1 rounded text-[#74736E] hover:text-[#3F3F3C] transition-colors"
                                title="GitHub Repository"
                              >
                                <GithubIcon className="w-3.5 h-3.5" />
                              </a>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Connected Capability Relational Links */}
                <div className="pt-4 border-t border-[#3F3F3C]/12">
                  <span className="text-[10px] font-mono-tech text-[#A5A39C] uppercase tracking-wider block mb-2 font-medium">
                    CONNECTED CAPABILITIES
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedNode.connections.map((connId) => {
                      const connNode = CAPABILITY_NODES.find((n) => n.id === connId);
                      if (!connNode) return null;
                      return (
                        <button
                          key={connId}
                          onClick={() => handleSelectNode(connNode)}
                          className="px-2.5 py-1 rounded-lg bg-white/50 hover:bg-[#3F3F3C] text-[#74736E] hover:text-[#F4F1E8] border border-[#3F3F3C]/15 text-[11px] font-mono-tech transition-all cursor-pointer flex items-center gap-1 group"
                        >
                          <span>{connNode.label}</span>
                          <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </button>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Quick Access Node Index */}
            <div className="p-5 rounded-3xl bg-[#ECE8DD]/60 border border-[#3F3F3C]/15 shadow-xs">
              <span className="text-[10px] font-mono-tech text-[#A5A39C] uppercase tracking-wider block mb-3 font-medium">
                QUICK NODE SELECTOR ({filteredNodes.length})
              </span>
              <div className="flex flex-wrap gap-1.5">
                {filteredNodes.map((node) => {
                  const isSelected = selectedNode.id === node.id;
                  return (
                    <button
                      key={node.id}
                      onClick={() => handleSelectNode(node)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-mono-tech transition-all flex items-center gap-1.5 cursor-pointer ${
                        isSelected
                          ? 'bg-[#3F3F3C] text-[#F4F1E8] shadow-xs font-bold'
                          : 'bg-white/50 text-[#74736E] hover:text-[#3F3F3C] border border-[#3F3F3C]/15'
                      }`}
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: isSelected ? '#19C9E8' : '#74736E' }}
                      />
                      <span>{node.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Accessible Semantic DOM Representation / Fallback Spectrum */}
        <div className="p-8 rounded-3xl bg-white/40 border border-[#3F3F3C]/15 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#3F3F3C]/12">
            <div>
              <span className="text-[10px] font-mono-tech text-[#74736E] uppercase tracking-[0.22em] font-semibold block mb-1">
                SYSTEM SPECTRUM // ACCESSIBLE INDEX
              </span>
              <h4 className="text-xl font-display font-bold text-[#3F3F3C] uppercase tracking-tight">
                COMPREHENSIVE CAPABILITIES BREAKDOWN
              </h4>
            </div>
            <Cpu className="w-5 h-5 text-[#A5A39C]" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CAPABILITY_NODES.filter((n) => n.type === 'domain').map((domain) => {
              const childTechs = CAPABILITY_NODES.filter(
                (n) => n.type === 'tech' && n.connections.includes(domain.id)
              );

              return (
                <div
                  key={domain.id}
                  className="p-5 rounded-2xl bg-[#ECE8DD]/60 border border-[#3F3F3C]/15 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-mono-tech text-[#A5A39C] font-bold">
                        {domain.tag}
                      </span>
                      <span className="text-[10px] font-mono-tech text-[#3F3F3C] bg-white/60 px-2 py-0.5 rounded border border-[#3F3F3C]/15 font-semibold">
                        {domain.category.toUpperCase()}
                      </span>
                    </div>

                    <h5 className="text-base font-display font-bold text-[#3F3F3C] uppercase mb-2">
                      {domain.label}
                    </h5>

                    <p className="text-xs font-sans-clean text-[#74736E] leading-relaxed mb-4">
                      {domain.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#3F3F3C]/12 flex flex-wrap gap-1">
                    {childTechs.map((tech) => (
                      <span
                        key={tech.id}
                        onClick={() => handleSelectNode(tech)}
                        className="px-2 py-0.5 rounded bg-white/50 border border-[#3F3F3C]/15 text-[10px] font-mono-tech text-[#74736E] hover:border-[#3F3F3C] hover:text-[#3F3F3C] transition-colors cursor-pointer"
                      >
                        {tech.label}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
