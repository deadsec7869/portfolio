import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bot, Terminal, Cpu, Activity, Disc3, BookOpen } from 'lucide-react';
import { getGitHubProfile } from '../../lib/github';
import type { GitHubUser } from '../../types/github';
import { spatialAudio } from '../../lib/audio';
import { SectionLabel } from '../UI/SectionLabel';

export function AboutSection() {
  const [activeTab, setActiveTab] = useState<'ai' | 'software' | 'creative'>('ai');
  const [githubUser, setGithubUser] = useState<GitHubUser | null>(null);

  useEffect(() => {
    getGitHubProfile().then((user) => setGithubUser(user));
  }, []);

  const disciplines = [
    {
      id: 'ai' as const,
      title: 'AI & HEURISTICS',
      tag: 'A* & GENAI SDK',
      icon: Bot,
      description: 'Implementing autonomous A* pathfinding, space-time conflict resolution, and academic generative workflows using Google GenAI SDK.'
    },
    {
      id: 'software' as const,
      title: 'WEB APPLICATIONS',
      tag: 'NEXT.JS 16 & TYPESCRIPT',
      icon: Terminal,
      description: 'Building modern TypeScript applications with Next.js 16 App Router, React 19, Tailwind CSS, and edge deployment pipelines.'
    },
    {
      id: 'creative' as const,
      title: '3D & AUDIO SYSTEMS',
      tag: 'THREE.JS & WEB AUDIO',
      icon: Cpu,
      description: 'Creating interactive 3D WebGL spatial environments with Three.js, real-time Web Audio API signal processing, and GSAP/Motion kinematics.'
    }
  ];

  return (
    <section id="about" className="relative w-full py-28 md:py-36 bg-transparent border-t border-[#5E5E5A]/20">
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Label System */}
        <SectionLabel
          number="01"
          label="ABOUT"
          tag="ENGINEERING BIOGRAPHY × COMPUTATIONAL FOUNDATION"
          className="mb-10"
        />

        {/* Large Editorial Statement */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8 }}
          className="mb-14 md:mb-20"
        >
          <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-black text-[#3F3F3C] tracking-tight leading-[0.9] uppercase max-w-5xl">
            I BUILD SOFTWARE, <br />
            <span className="text-[#8A8983]">
              AI SYSTEMS,
            </span> <br />
            AND INTERACTIVE DIGITAL EXPERIENCES.
          </h2>
        </motion.div>

        {/* Narrative & Focus Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left: Factual Bio Paragraph */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-7 space-y-6 text-base sm:text-lg text-[#5E5E5A] font-sans-clean font-light leading-relaxed"
          >
            <p className="text-[#3F3F3C] font-normal text-lg sm:text-xl leading-snug">
              &ldquo;I&apos;m an engineering student and developer building software applications, autonomous AI simulations, interactive 3D web environments, and tools.&rdquo;
            </p>
            <p className="text-[#5E5E5A] text-sm sm:text-base leading-relaxed">
              Every project is constructed with strict TypeScript standards, modular component architectures, and algorithmic rigor—focusing on software that feels tactile, responsive, and purposeful.
            </p>

            {/* WHAT I BUILD Interactive Tabs */}
            <div className="pt-6">
              <span className="text-[11px] font-mono-tech uppercase tracking-[0.2em] text-[#5E5E5A] block mb-3 font-semibold">
                CORE DISCIPLINES //
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {disciplines.map((item) => {
                  const isSelected = activeTab === item.id;
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        spatialAudio.playHover();
                        setActiveTab(item.id);
                      }}
                      data-cursor="INSPECT"
                      className={`p-4 rounded-xl text-left transition-all border cursor-pointer ${
                        isSelected
                          ? 'bg-[#ECE8DD] border-[#5E5E5A] shadow-xs'
                          : 'bg-[#ECE8DD]/40 border-[#5E5E5A]/20 hover:bg-[#ECE8DD]/70 hover:border-[#5E5E5A]/40'
                      }`}
                    >
                      <Icon className={`w-4 h-4 mb-2.5 ${isSelected ? 'text-[#3F3F3C]' : 'text-[#8A8983]'}`} />
                      <h4 className="text-xs font-display font-bold text-[#3F3F3C] mb-1">
                        {item.title}
                      </h4>
                      <p className="text-[11px] font-sans-clean text-[#5E5E5A] leading-relaxed">
                        {item.description}
                      </p>
                    </button>
                  );
                })}
              </div>

              {/* Live Status Indicator */}
              <div className="mt-4 p-3.5 rounded-xl bg-[#ECE8DD]/80 backdrop-blur-md border border-[#5E5E5A]/20 flex items-center justify-between font-mono-tech text-xs shadow-xs">
                {activeTab === 'ai' && (
                  <div className="flex items-center gap-2 text-[#3F3F3C] w-full justify-between">
                    <span className="flex items-center gap-2">
                      <Activity className="w-4 h-4 text-[#5E5E5A] animate-pulse" />
                      HEURISTIC VECTOR: A* PATHFINDING &middot; CONFLICT DETECTION
                    </span>
                    <span className="text-[#8A8983] text-[10px]">AI ROBOTICS</span>
                  </div>
                )}
                {activeTab === 'software' && (
                  <div className="flex items-center gap-2 text-[#3F3F3C] w-full justify-between">
                    <span className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-[#5E5E5A]" />
                      ACADEMIC PORTAL: NEXT.JS 16 &middot; GOOGLE GENAI
                    </span>
                    <span className="text-[#8A8983] text-[10px]">VTU PLATFORM</span>
                  </div>
                )}
                {activeTab === 'creative' && (
                  <div className="flex items-center gap-2 text-[#3F3F3C] w-full justify-between">
                    <span className="flex items-center gap-2">
                      <Disc3 className="w-4 h-4 text-[#5E5E5A] animate-spin-slow" />
                      SPATIAL 3D: THREE.JS &middot; WEB AUDIO API &middot; GSAP
                    </span>
                    <span className="text-[#8A8983] text-[10px]">AAPESH WORKSTATION</span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Right: Authentic GitHub Stat Overview */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            <div className="p-6 rounded-2xl bg-[#ECE8DD]/60 border border-[#5E5E5A]/20 flex flex-col gap-1 shadow-xs">
              <span className="text-[10px] font-mono-tech text-[#8A8983] uppercase tracking-widest">
                VERIFIED GITHUB REPOSITORIES
              </span>
              <span className="text-4xl sm:text-5xl font-display font-black text-[#3F3F3C]">
                {githubUser ? githubUser.public_repos : '3'}
              </span>
              <span className="text-xs font-mono-tech text-[#5E5E5A] mt-1 font-semibold">
                @deadsec7869 &middot; Open Source
              </span>
            </div>

            <div className="p-6 rounded-2xl bg-[#ECE8DD]/60 border border-[#5E5E5A]/20 flex flex-col gap-1 shadow-xs">
              <span className="text-[10px] font-mono-tech text-[#8A8983] uppercase tracking-widest">
                PRIMARY STACK
              </span>
              <span className="text-2xl sm:text-3xl font-display font-bold text-[#3F3F3C]">
                REACT 19 &middot; NEXT.JS 16
              </span>
              <span className="text-xs font-mono-tech text-[#5E5E5A] mt-1">
                TypeScript &middot; Three.js &middot; Vite &middot; Tailwind CSS
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
