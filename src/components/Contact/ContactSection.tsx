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
    <section id="contact" className="relative w-full py-28 md:py-44 bg-transparent border-t border-[#70707d]/20 overflow-hidden text-[#ededf3]">
      {/* 3D WebGL Ambient Atmosphere Layer for Contact */}
      <div className="absolute right-0 top-1/4 w-[420px] h-[420px] opacity-40 md:opacity-60 pointer-events-none hidden md:block">
        <Suspense fallback={<SceneFallback />}>
          <ContactScene />
        </Suspense>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        <SectionLabel number="07" label="CONTACT" tag="DIRECT DISPATCH" />

        {/* Final Statement */}
        <div className="my-8 md:my-16">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-display font-[480] tracking-[0.01em] text-[#ededf3] uppercase leading-[0.92]"
          >
            LET&apos;S BUILD <br />
            <span className="text-[#c3c3cc]">
              SOMETHING
            </span> <br />
            EXTRAORDINARY.
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-16 items-start">
          {/* Left Column: Direct Studio Channels */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            {/* Primary GitHub Card (Mercury Graphite Card) */}
            <div className="p-8 rounded-[12px] bg-[#1e1e2a] border-0 shadow-none relative text-[#ededf3]">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono-tech text-[#c3c3cc] uppercase tracking-widest flex items-center gap-2 font-[480]">
                  <GithubIcon className="w-4 h-4 text-[#ededf3]" />
                  PRIMARY CODE &amp; REACH
                </span>
                {socialData.availableForProjects && (
                  <span className="text-[10px] font-mono-tech text-[#ededf3] bg-[#272735] px-3 py-1 rounded-full border border-[#70707d]/20 font-[480]">
                    {socialData.availabilityStatus}
                  </span>
                )}
              </div>

              <div className="text-2xl sm:text-3xl font-mono-tech font-[480] text-[#ededf3] mb-8 break-all">
                github.com/deadsec7869
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <a
                  href={socialData.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() => spatialAudio.playHover()}
                  className="px-6 py-3.5 rounded-[32px] bg-[#272735] hover:bg-[#323244] text-[#ededf3] font-mono-tech font-[480] text-xs tracking-wider uppercase transition-all shadow-none border-0 cursor-pointer flex items-center gap-2"
                  data-cursor="GITHUB"
                >
                  <GithubIcon className="w-4 h-4 text-[#ededf3]" />
                  <span>VISIT GITHUB →</span>
                </a>

                {hasEmail && (
                  <button
                    onClick={copyEmail}
                    onMouseEnter={() => spatialAudio.playHover()}
                    className="px-6 py-3.5 rounded-[40px] bg-transparent border border-[#ededf3] hover:bg-white/5 text-xs font-mono-tech text-[#ededf3] transition-all cursor-pointer flex items-center gap-2 shadow-none font-[400]"
                    data-cursor="COPY"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 text-[#5266eb]" />
                        <span className="text-[#ffffff] font-[480]">COPIED</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 text-[#c3c3cc]" />
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
                className="p-6 rounded-[12px] bg-[#1e1e2a] hover:bg-[#232332] border-0 shadow-none transition-all flex flex-col justify-between group cursor-pointer text-[#ededf3]"
                data-cursor="GITHUB"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-full bg-[#272735] border border-[#70707d]/20 flex items-center justify-center text-[#ededf3] group-hover:bg-[#5266eb] group-hover:text-white transition-colors">
                    <GithubIcon className="w-5 h-5" />
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-[#c3c3cc] group-hover:text-[#5266eb] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
                <div>
                  <span className="text-base font-display font-[480] text-[#ededf3] group-hover:text-white transition-colors block">
                    OPEN SOURCE →
                  </span>
                  <span className="text-xs font-mono-tech text-[#c3c3cc]">
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
                  className="p-6 rounded-[12px] bg-[#1e1e2a] hover:bg-[#232332] border-0 shadow-none transition-all flex flex-col justify-between group cursor-pointer text-[#ededf3]"
                  data-cursor="LINKEDIN"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-full bg-[#272735] border border-[#70707d]/20 flex items-center justify-center text-[#ededf3] group-hover:bg-[#5266eb] group-hover:text-white transition-colors">
                      <LinkedinIcon className="w-5 h-5" />
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-[#c3c3cc] group-hover:text-[#5266eb] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                  <div>
                    <span className="text-base font-display font-[480] text-[#ededf3] group-hover:text-white transition-colors block">
                      LINKEDIN →
                    </span>
                    <span className="text-xs font-mono-tech text-[#c3c3cc]">
                      Professional Network
                    </span>
                  </div>
                </a>
              ) : (
                <div className="p-6 rounded-[12px] bg-[#1e1e2a] border-0 flex flex-col justify-between text-[#ededf3]">
                  <div className="w-10 h-10 rounded-full bg-[#272735] border border-[#70707d]/20 flex items-center justify-center text-[#c3c3cc] mb-4">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-sm font-display font-[480] text-[#ededf3] block">
                      DIRECT INQUIRIES
                    </span>
                    <span className="text-[11px] font-mono-tech text-[#c3c3cc]">
                      Use the transmission form
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Direct Transmission Terminal (Mercury Level 1 Card) */}
          <div className="lg:col-span-6">
            <div className="p-8 rounded-[12px] bg-[#1e1e2a] border-0 shadow-none relative text-[#ededf3]">
              <div className="flex items-center justify-between pb-4 border-b border-[#70707d]/20 mb-6 text-xs font-mono-tech text-[#c3c3cc]">
                <span className="flex items-center gap-2 text-[#ededf3] font-[480]">
                  <Sparkles className="w-4 h-4 text-[#5266eb]" />
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
                  <div className="w-12 h-12 rounded-full bg-[#272735] border border-[#70707d]/30 flex items-center justify-center text-[#5266eb]">
                    <Check className="w-6 h-6" />
                  </div>
                  <h4 className="text-xl font-display font-[480] text-[#ededf3] uppercase">
                    MESSAGE TRANSMITTED
                  </h4>
                  <p className="text-xs font-mono-tech text-[#c3c3cc] max-w-sm">
                    Thank you for reaching out. Your message has been received.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-[11px] font-mono-tech text-[#c3c3cc] uppercase tracking-wider mb-2 font-[480]">
                      YOUR NAME / SENDER
                    </label>
                    <input
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      placeholder="e.g. Alex Vance"
                      className="w-full px-5 py-3.5 rounded-[32px] bg-[#171721] border border-[#70707d]/30 text-[#ededf3] font-sans-clean placeholder:text-[#70707d] focus:outline-none focus:border-[#5266eb] transition-colors text-sm shadow-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono-tech text-[#c3c3cc] uppercase tracking-wider mb-2 font-[480]">
                      YOUR EMAIL
                    </label>
                    <input
                      type="email"
                      required
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      placeholder="e.g. alex@company.io"
                      className="w-full px-5 py-3.5 rounded-[32px] bg-[#171721] border border-[#70707d]/30 text-[#ededf3] font-sans-clean placeholder:text-[#70707d] focus:outline-none focus:border-[#5266eb] transition-colors text-sm shadow-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono-tech text-[#c3c3cc] uppercase tracking-wider mb-2 font-[480]">
                      PROJECT / MESSAGE SCOPE
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      placeholder="Describe your project, question, or collaboration..."
                      className="w-full px-5 py-3.5 rounded-[20px] bg-[#171721] border border-[#70707d]/30 text-[#ededf3] font-sans-clean placeholder:text-[#70707d] focus:outline-none focus:border-[#5266eb] transition-colors text-sm resize-none shadow-none"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      onMouseEnter={() => spatialAudio.playHover()}
                      className="w-full py-4 rounded-[32px] bg-[#5266eb] hover:bg-[#4355db] text-[#ffffff] font-mono-tech font-[400] text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-none border-0"
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
