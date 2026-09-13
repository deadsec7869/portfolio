import React, { useState, Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { socialData } from '../../data/social';
import { Mail, Copy, Check, Send, Sparkles, ArrowUpRight } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../UI/Icons';
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
    <section id="contact" className="relative w-full py-28 md:py-44 bg-transparent border-t border-black/[0.08] overflow-hidden">
      {/* 3D WebGL Ambient Atmosphere Layer for Contact */}
      <div className="absolute right-0 top-1/4 w-[420px] h-[420px] opacity-40 md:opacity-60 pointer-events-none hidden md:block">
        <Suspense fallback={<SceneFallback />}>
          <ContactScene />
        </Suspense>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex items-center gap-3 text-xs font-mono-tech uppercase tracking-[0.25em] text-slate-500 mb-8">
          <span className="text-[#111111] font-bold">06 / CONTACT</span>
          <span className="w-8 h-[1px] bg-black/20" />
          <span>DIRECT DISPATCH</span>
        </div>

        {/* Cinematic Final Statement */}
        <div className="my-8 md:my-16">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-display font-black tracking-tight text-[#111111] uppercase leading-[0.88]"
          >
            LET&apos;S BUILD <br />
            <span className="text-slate-400">
              SOMETHING
            </span> <br />
            INTERESTING.
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-16 items-start">
          {/* Left Column: Direct Studio Channels */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            {/* Primary GitHub Card */}
            <div className="p-8 rounded-3xl bg-white/60 border border-black/[0.08] backdrop-blur-md shadow-[0_4px_24px_rgba(0,0,0,0.02)] relative">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono-tech text-slate-700 uppercase tracking-widest flex items-center gap-2 font-semibold">
                  <GithubIcon className="w-4 h-4 text-[#111111]" />
                  PRIMARY CODE &amp; REACH
                </span>
                {socialData.availableForProjects && (
                  <span className="text-[10px] font-mono-tech text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200 font-medium">
                    {socialData.availabilityStatus}
                  </span>
                )}
              </div>

              <div className="text-2xl sm:text-3xl font-mono-tech font-bold text-[#111111] mb-8 break-all">
                github.com/deadsec7869
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <a
                  href={socialData.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => spatialAudio.playHover()}
                  className="px-6 py-3.5 rounded-full bg-[#111111] hover:bg-black text-white font-mono-tech font-bold text-xs tracking-wider uppercase transition-all shadow-[0_10px_20px_rgba(0,0,0,0.1)] cursor-pointer flex items-center gap-2"
                  data-cursor="GITHUB"
                >
                  <GithubIcon className="w-4 h-4 text-white" />
                  <span>VISIT GITHUB →</span>
                </a>

                {hasEmail && (
                  <button
                    onClick={copyEmail}
                    onMouseEnter={() => spatialAudio.playHover()}
                    className="px-5 py-3.5 rounded-full bg-white border border-black/10 hover:border-black/30 text-xs font-mono-tech text-slate-700 hover:text-black transition-all cursor-pointer flex items-center gap-2"
                    data-cursor="COPY"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-600" />
                        <span className="text-emerald-600 font-semibold">COPIED</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 text-slate-500" />
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
                className="p-6 rounded-2xl bg-white/50 hover:bg-white/80 border border-black/[0.08] hover:border-black/20 shadow-[0_2px_12px_rgba(0,0,0,0.02)] transition-all flex flex-col justify-between group cursor-pointer"
                data-cursor="GITHUB"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-black/5 border border-black/[0.06] flex items-center justify-center text-slate-700 group-hover:text-black transition-colors">
                    <GithubIcon className="w-5 h-5" />
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-black group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
                <div>
                  <span className="text-base font-display font-bold text-[#111111] block">
                    OPEN SOURCE →
                  </span>
                  <span className="text-xs font-mono-tech text-slate-500">
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
                  className="p-6 rounded-2xl bg-white/50 hover:bg-white/80 border border-black/[0.08] hover:border-black/20 shadow-[0_2px_12px_rgba(0,0,0,0.02)] transition-all flex flex-col justify-between group cursor-pointer"
                  data-cursor="LINKEDIN"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-black/5 border border-black/[0.06] flex items-center justify-center text-slate-700 group-hover:text-black transition-colors">
                      <LinkedinIcon className="w-5 h-5" />
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-black group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                  <div>
                    <span className="text-base font-display font-bold text-[#111111] block">
                      LINKEDIN →
                    </span>
                    <span className="text-xs font-mono-tech text-slate-500">
                      Professional Network
                    </span>
                  </div>
                </a>
              ) : (
                <div className="p-6 rounded-2xl bg-white/30 border border-black/[0.06] flex flex-col justify-between">
                  <div className="w-10 h-10 rounded-xl bg-black/5 border border-black/[0.06] flex items-center justify-center text-slate-400 mb-4">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-sm font-display font-bold text-slate-700 block">
                      DIRECT INQUIRIES
                    </span>
                    <span className="text-[11px] font-mono-tech text-slate-500">
                      Use the transmission form
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Direct Transmission Terminal */}
          <div className="lg:col-span-6">
            <div className="p-8 rounded-3xl bg-white/60 border border-black/[0.08] backdrop-blur-md shadow-[0_4px_24px_rgba(0,0,0,0.02)] relative">
              <div className="flex items-center justify-between pb-4 border-b border-black/[0.06] mb-6 text-xs font-mono-tech text-slate-500">
                <span className="flex items-center gap-2 text-[#111111] font-semibold">
                  <Sparkles className="w-4 h-4 text-slate-700" />
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
                  <div className="w-12 h-12 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
                    <Check className="w-6 h-6" />
                  </div>
                  <h4 className="text-xl font-display font-bold text-[#111111] uppercase">
                    MESSAGE TRANSMITTED
                  </h4>
                  <p className="text-xs font-mono-tech text-slate-600 max-w-sm">
                    Thank you for reaching out. Your message has been received.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-[11px] font-mono-tech text-slate-600 uppercase tracking-wider mb-2">
                      YOUR NAME / SENDER
                    </label>
                    <input
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      placeholder="e.g. Alex Vance"
                      className="w-full px-4 py-3.5 rounded-xl bg-white border border-black/10 text-[#111111] font-sans-clean placeholder:text-slate-400 focus:outline-none focus:border-black/40 transition-colors text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono-tech text-slate-600 uppercase tracking-wider mb-2">
                      YOUR EMAIL
                    </label>
                    <input
                      type="email"
                      required
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      placeholder="e.g. alex@company.io"
                      className="w-full px-4 py-3.5 rounded-xl bg-white border border-black/10 text-[#111111] font-sans-clean placeholder:text-slate-400 focus:outline-none focus:border-black/40 transition-colors text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono-tech text-slate-600 uppercase tracking-wider mb-2">
                      PROJECT / MESSAGE SCOPE
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      placeholder="Describe your project, question, or collaboration..."
                      className="w-full px-4 py-3.5 rounded-xl bg-white border border-black/10 text-[#111111] font-sans-clean placeholder:text-slate-400 focus:outline-none focus:border-black/40 transition-colors text-sm resize-none"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      onMouseEnter={() => spatialAudio.playHover()}
                      className="w-full py-4 rounded-xl bg-[#111111] hover:bg-black text-white font-mono-tech font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_10px_20px_rgba(0,0,0,0.1)]"
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
