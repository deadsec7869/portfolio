import React, { useState, Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { socialData } from '../../data/social';
import { Mail, Copy, Check, Send, Sparkles, ArrowUpRight } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../UI/Icons';
import { SectionLabel } from '../UI/SectionLabel';
import { spatialAudio } from '../../lib/audio';
import { SceneFallback } from '../../three/scenes/SceneFallback';

const ContactScene = lazy(() =>
  import('../../three/scenes/ContactScene').then((m) => ({ default: m.ContactScene }))
);

export function ContactSection() {
  const [copied, setCopied] = useState(false);
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const hasEmail = Boolean(socialData.email && socialData.email.trim().length > 0);
  const hasLinkedIn = Boolean(socialData.linkedin && socialData.linkedin.trim().length > 0);

  const copyEmail = () => {
    if (!hasEmail) return;
    spatialAudio.playClick();
    navigator.clipboard.writeText(socialData.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email) return;
    spatialAudio.playClick();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormState({ name: '', email: '', message: '' });
    }, 4000);
  };

  return (
    <section id="contact" className="relative w-full py-28 md:py-44 bg-transparent border-t border-[#5E5E5A]/20 overflow-hidden">
      {/* 3D WebGL Ambient Atmosphere Layer for Contact */}
      <div className="absolute right-0 top-1/4 w-[420px] h-[420px] opacity-40 md:opacity-60 pointer-events-none hidden md:block">
        <Suspense fallback={<SceneFallback />}>
          <ContactScene />
        </Suspense>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        <SectionLabel number="06" label="CONTACT" tag="DIRECT DISPATCH" />

        {/* Cinematic Final Statement */}
        <div className="my-8 md:my-16">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-display font-black tracking-tight text-[#3F3F3C] uppercase leading-[0.88]"
          >
            LET&apos;S BUILD <br />
            <span className="text-[#8A8983]">
              SOMETHING
            </span> <br />
            INTERESTING.
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-16 items-start">
          {/* Left Column: Direct Studio Channels */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            {/* Primary GitHub Card */}
            <div className="p-8 rounded-3xl bg-[#ECE8DD]/60 border border-[#5E5E5A]/20 backdrop-blur-md shadow-xs relative">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono-tech text-[#5E5E5A] uppercase tracking-widest flex items-center gap-2 font-semibold">
                  <GithubIcon className="w-4 h-4 text-[#3F3F3C]" />
                  PRIMARY CODE &amp; REACH
                </span>
                {socialData.availableForProjects && (
                  <span className="text-[10px] font-mono-tech text-[#3F3F3C] bg-[#ECE8DD] px-2.5 py-0.5 rounded border border-[#5E5E5A]/25 font-semibold">
                    {socialData.availabilityStatus}
                  </span>
                )}
              </div>

              <div className="text-2xl sm:text-3xl font-mono-tech font-bold text-[#3F3F3C] mb-8 break-all">
                github.com/deadsec7869
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <a
                  href={socialData.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => spatialAudio.playHover()}
                  className="px-6 py-3.5 rounded-full bg-[#3F3F3C] hover:bg-[#5E5E5A] text-[#F4F1E8] font-mono-tech font-bold text-xs tracking-wider uppercase transition-all shadow-md cursor-pointer flex items-center gap-2"
                  data-cursor="GITHUB"
                >
                  <GithubIcon className="w-4 h-4 text-[#F4F1E8]" />
                  <span>VISIT GITHUB →</span>
                </a>

                {hasEmail && (
                  <button
                    onClick={copyEmail}
                    onMouseEnter={() => spatialAudio.playHover()}
                    className="px-5 py-3.5 rounded-full bg-[#ECE8DD] border border-[#5E5E5A]/25 hover:border-[#5E5E5A] text-xs font-mono-tech text-[#5E5E5A] hover:text-[#3F3F3C] transition-all cursor-pointer flex items-center gap-2 shadow-xs"
                    data-cursor="COPY"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 text-[#3F3F3C]" />
                        <span className="text-[#3F3F3C] font-semibold">COPIED</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 text-[#8A8983]" />
                        <span>COPY EMAIL</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>

            {/* Optional Channels */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a
                href={socialData.github}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => spatialAudio.playHover()}
                className="p-6 rounded-2xl bg-[#ECE8DD]/40 hover:bg-[#ECE8DD]/80 border border-[#5E5E5A]/20 hover:border-[#5E5E5A]/40 shadow-xs transition-all flex flex-col justify-between group cursor-pointer"
                data-cursor="GITHUB"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#F4F1E8] border border-[#5E5E5A]/20 flex items-center justify-center text-[#3F3F3C] group-hover:bg-[#3F3F3C] group-hover:text-[#F4F1E8] transition-colors">
                    <GithubIcon className="w-5 h-5" />
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-[#8A8983] group-hover:text-[#3F3F3C] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
                <div>
                  <span className="text-base font-display font-bold text-[#3F3F3C] group-hover:text-[#5E5E5A] transition-colors block">
                    OPEN SOURCE →
                  </span>
                  <span className="text-xs font-mono-tech text-[#8A8983]">
                    Explore Code &amp; Repos
                  </span>
                </div>
              </a>

              {hasLinkedIn ? (
                <a
                  href={socialData.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => spatialAudio.playHover()}
                  className="p-6 rounded-2xl bg-[#ECE8DD]/40 hover:bg-[#ECE8DD]/80 border border-[#5E5E5A]/20 hover:border-[#5E5E5A]/40 shadow-xs transition-all flex flex-col justify-between group cursor-pointer"
                  data-cursor="LINKEDIN"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-[#F4F1E8] border border-[#5E5E5A]/20 flex items-center justify-center text-[#3F3F3C] group-hover:bg-[#3F3F3C] group-hover:text-[#F4F1E8] transition-colors">
                      <LinkedinIcon className="w-5 h-5" />
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-[#8A8983] group-hover:text-[#3F3F3C] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                  <div>
                    <span className="text-base font-display font-bold text-[#3F3F3C] group-hover:text-[#5E5E5A] transition-colors block">
                      LINKEDIN →
                    </span>
                    <span className="text-xs font-mono-tech text-[#8A8983]">
                      Professional Network
                    </span>
                  </div>
                </a>
              ) : (
                <div className="p-6 rounded-2xl bg-[#ECE8DD]/30 border border-[#5E5E5A]/15 flex flex-col justify-between">
                  <div className="w-10 h-10 rounded-xl bg-[#F4F1E8] border border-[#5E5E5A]/20 flex items-center justify-center text-[#8A8983] mb-4">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-sm font-display font-bold text-[#5E5E5A] block">
                      DIRECT INQUIRIES
                    </span>
                    <span className="text-[11px] font-mono-tech text-[#8A8983]">
                      Use the transmission form
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Direct Transmission Terminal */}
          <div className="lg:col-span-6">
            <div className="p-8 rounded-3xl bg-[#ECE8DD]/60 border border-[#5E5E5A]/20 backdrop-blur-md shadow-xs relative">
              <div className="flex items-center justify-between pb-4 border-b border-[#5E5E5A]/15 mb-6 text-xs font-mono-tech text-[#8A8983]">
                <span className="flex items-center gap-2 text-[#3F3F3C] font-semibold">
                  <Sparkles className="w-4 h-4 text-[#5E5E5A]" />
                  TRANSMISSION PAYLOAD
                </span>
                <span>DIRECT DISPATCH</span>
              </div>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-16 text-center flex flex-col items-center gap-3"
                >
                  <div className="w-12 h-12 rounded-full bg-[#F4F1E8] border border-[#5E5E5A]/30 flex items-center justify-center text-[#3F3F3C]">
                    <Check className="w-6 h-6" />
                  </div>
                  <h4 className="text-xl font-display font-bold text-[#3F3F3C] uppercase">
                    MESSAGE TRANSMITTED
                  </h4>
                  <p className="text-xs font-mono-tech text-[#5E5E5A] max-w-sm">
                    Thank you for reaching out. Your message has been received.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-[11px] font-mono-tech text-[#5E5E5A] uppercase tracking-wider mb-2">
                      YOUR NAME / SENDER
                    </label>
                    <input
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      placeholder="e.g. Alex Vance"
                      className="w-full px-4 py-3.5 rounded-xl bg-[#F4F1E8] border border-[#5E5E5A]/25 text-[#3F3F3C] font-sans-clean placeholder:text-[#8A8983] focus:outline-none focus:border-[#5E5E5A] transition-colors text-sm shadow-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono-tech text-[#5E5E5A] uppercase tracking-wider mb-2">
                      YOUR EMAIL
                    </label>
                    <input
                      type="email"
                      required
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      placeholder="e.g. alex@company.io"
                      className="w-full px-4 py-3.5 rounded-xl bg-[#F4F1E8] border border-[#5E5E5A]/25 text-[#3F3F3C] font-sans-clean placeholder:text-[#8A8983] focus:outline-none focus:border-[#5E5E5A] transition-colors text-sm shadow-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono-tech text-[#5E5E5A] uppercase tracking-wider mb-2">
                      PROJECT / MESSAGE SCOPE
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      placeholder="Describe your project, question, or collaboration..."
                      className="w-full px-4 py-3.5 rounded-xl bg-[#F4F1E8] border border-[#5E5E5A]/25 text-[#3F3F3C] font-sans-clean placeholder:text-[#8A8983] focus:outline-none focus:border-[#5E5E5A] transition-colors text-sm resize-none shadow-xs"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      onMouseEnter={() => spatialAudio.playHover()}
                      className="w-full py-4 rounded-xl bg-[#3F3F3C] hover:bg-[#5E5E5A] text-[#F4F1E8] font-mono-tech font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                      data-cursor="SEND"
                    >
                      <Send className="w-4 h-4" />
                      <span>TRANSMIT MESSAGE</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
