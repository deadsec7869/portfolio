import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { socialData } from '../../data/social';
import { ArrowUpRight, GitFork, Star, Globe, Code2 } from 'lucide-react';
import { GithubIcon } from '../UI/Icons';
import { SectionLabel } from '../UI/SectionLabel';
import { getGitHubProfile, getGitHubRepositories } from '../../lib/github';
import type { GitHubRepo, GitHubUser } from '../../types/github';
import { spatialAudio } from '../../lib/audio';

export function OpenSourceSection() {
  const [profile, setProfile] = useState<GitHubUser | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getGitHubProfile(), getGitHubRepositories()])
      .then(([userProfile, userRepos]) => {
        setProfile(userProfile);
        setRepos(userRepos);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="opensource" className="relative w-full py-28 md:py-36 bg-transparent border-t border-[#3F3F3C]/15">
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Chapter Index */}
        <SectionLabel number="06" label="OPEN SOURCE" tag="FEATURED REPOSITORIES" />

        {/* Editorial Heading */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-8"
          >
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-display font-black text-[#3F3F3C] tracking-tight leading-[0.92] uppercase">
              &ldquo;THE CODE IS PART <br />
              <span className="text-[#74736E]">
                OF THE WORK.&rdquo;
              </span>
            </h2>
            <p className="mt-6 text-base sm:text-lg text-[#74736E] font-sans-clean font-light max-w-2xl leading-relaxed">
              Every codebase is built publicly with strict TypeScript standards, modular component architectures, and open algorithms.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-4 flex flex-col items-start lg:items-end justify-start"
          >
            <a
              href={socialData.github}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => spatialAudio.playHover()}
              className="px-8 py-4 rounded-full bg-[#3F3F3C] hover:bg-[#74736E] text-[#F4F1E8] font-mono-tech text-xs tracking-wider uppercase font-bold transition-all flex items-center gap-3 shadow-md cursor-pointer group"
              data-cursor="GITHUB"
            >
              <GithubIcon className="w-4 h-4 text-[#F4F1E8]" />
              <span>VIEW ALL ON GITHUB →</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </motion.div>
        </div>

        {/* Live GitHub Profile Stats Card */}
        <div className="mb-12 p-6 md:p-8 rounded-3xl bg-[#ECE8DD]/60 backdrop-blur-md border border-[#3F3F3C]/15 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            {profile?.avatar_url && (
              <img
                src={profile.avatar_url}
                alt="GitHub Profile"
                className="w-14 h-14 rounded-full border border-[#3F3F3C]/20 object-cover"
              />
            )}
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-display font-bold text-[#3F3F3C]">
                  @{profile?.login || 'deadsec7869'}
                </span>
                <span className="text-[10px] font-mono-tech text-[#3F3F3C] bg-white/60 px-2 py-0.5 rounded border border-[#3F3F3C]/15 font-semibold">
                  VERIFIED GITHUB
                </span>
              </div>
              <p className="text-xs font-mono-tech text-[#74736E] mt-1">
                Public profile and open source contributions
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6 font-mono-tech text-xs text-[#3F3F3C]">
            <div>
              <span className="text-[#A5A39C] block text-[10px] uppercase">PUBLIC REPOS</span>
              <span className="text-lg font-bold text-[#3F3F3C]">
                {loading ? '...' : profile?.public_repos ?? 3}
              </span>
            </div>
            <div className="w-[1px] h-8 bg-[#3F3F3C]/15" />
            <div>
              <span className="text-[#A5A39C] block text-[10px] uppercase">FOLLOWERS</span>
              <span className="text-lg font-bold text-[#3F3F3C]">
                {loading ? '...' : profile?.followers ?? 0}
              </span>
            </div>
            <div className="w-[1px] h-8 bg-[#3F3F3C]/15" />
            <div>
              <span className="text-[#A5A39C] block text-[10px] uppercase">FOLLOWING</span>
              <span className="text-lg font-bold text-[#3F3F3C]">
                {loading ? '...' : profile?.following ?? 0}
              </span>
            </div>
          </div>
        </div>

        {/* Public Repository Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {repos.map((repo, idx) => (
            <motion.div
              key={repo.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              onMouseEnter={() => spatialAudio.playHover()}
              className="p-6 rounded-3xl bg-[#ECE8DD]/40 hover:bg-[#ECE8DD]/80 backdrop-blur-sm border border-[#3F3F3C]/15 hover:border-[#3F3F3C]/30 shadow-xs transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono-tech text-[#A5A39C] mb-4">
                  <span className="text-[#74736E] font-bold">[{`0${idx + 1}`}]</span>
                  <div className="flex items-center gap-3">
                    {repo.stargazers_count > 0 && (
                      <span className="flex items-center gap-1 text-[#3F3F3C]">
                        <Star className="w-3.5 h-3.5 text-[#19C9E8] fill-[#19C9E8]" />
                        {repo.stargazers_count}
                      </span>
                    )}
                    {repo.forks_count > 0 && (
                      <span className="flex items-center gap-1 text-[#74736E]">
                        <GitFork className="w-3.5 h-3.5 text-[#74736E]" />
                        {repo.forks_count}
                      </span>
                    )}
                  </div>
                </div>

                <h3 className="text-lg font-display font-bold text-[#3F3F3C] group-hover:text-[#19C9E8] transition-colors mb-2">
                  {repo.name}
                </h3>

                <p className="text-xs font-sans-clean text-[#74736E] leading-relaxed line-clamp-3 mb-6">
                  {repo.description || 'Open source software and engineering project.'}
                </p>
              </div>

              <div>
                <div className="flex items-center justify-between pt-4 border-t border-[#3F3F3C]/12 text-xs font-mono-tech">
                  <div className="flex items-center gap-2 text-[#74736E]">
                    <Code2 className="w-3.5 h-3.5 text-[#A5A39C]" />
                    <span>{repo.language || 'TypeScript'}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    {repo.homepage && (
                      <a
                        href={repo.homepage}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#74736E] hover:text-[#3F3F3C] transition-colors"
                        title="Live Demo"
                        data-cursor="OPEN"
                      >
                        <Globe className="w-4 h-4" />
                      </a>
                    )}
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#3F3F3C] font-bold hover:text-[#19C9E8] transition-colors flex items-center gap-1"
                      data-cursor="GITHUB"
                    >
                      <span>REPO</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
