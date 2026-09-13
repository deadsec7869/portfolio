import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { socialData } from '../../data/social';
import { ArrowUpRight, GitFork, Star, Globe, Code2 } from 'lucide-react';
import { GithubIcon } from '../UI/Icons';
import { getGitHubProfile, getGitHubRepositories } from '../../lib/github';
import type { GitHubUser, GitHubRepo } from '../../types/github';
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
    <section id="opensource" className="relative w-full py-28 md:py-36 bg-transparent border-t border-black/[0.08]">
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Chapter Index */}
        <div className="flex items-center gap-3 text-xs font-mono-tech uppercase tracking-[0.25em] text-slate-500 mb-8">
          <span className="text-[#111111] font-bold">05 / OPEN SOURCE</span>
          <span className="w-8 h-[1px] bg-black/20" />
          <span>FEATURED REPOSITORIES</span>
        </div>

        {/* Editorial Heading */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-8"
          >
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-display font-black text-[#111111] tracking-tight leading-[0.92] uppercase">
              &ldquo;THE CODE IS PART <br />
              <span className="text-slate-400">
                OF THE WORK.&rdquo;
              </span>
            </h2>
            <p className="mt-6 text-base sm:text-lg text-slate-600 font-sans-clean font-light max-w-2xl leading-relaxed">
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
              className="px-8 py-4 rounded-full bg-[#111111] hover:bg-black text-white font-mono-tech text-xs tracking-wider uppercase font-bold transition-all flex items-center gap-3 shadow-[0_10px_30px_rgba(0,0,0,0.1)] cursor-pointer group"
              data-cursor="GITHUB"
            >
              <GithubIcon className="w-4 h-4 text-white" />
              <span>VIEW ALL ON GITHUB →</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </motion.div>
        </div>

        {/* Live GitHub Profile Stats Card */}
        <div className="mb-12 p-6 md:p-8 rounded-2xl bg-white/60 backdrop-blur-md border border-black/[0.08] shadow-[0_4px_24px_rgba(0,0,0,0.02)] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            {profile?.avatar_url && (
              <img
                src={profile.avatar_url}
                alt="GitHub Profile"
                className="w-14 h-14 rounded-full border border-black/10 object-cover"
              />
            )}
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-display font-bold text-[#111111]">
                  @{profile?.login || 'deadsec7869'}
                </span>
                <span className="text-[10px] font-mono-tech text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  VERIFIED GITHUB
                </span>
              </div>
              <p className="text-xs font-mono-tech text-slate-500 mt-1">
                Public profile and open source contributions
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6 font-mono-tech text-xs text-slate-700">
            <div>
              <span className="text-slate-400 block text-[10px] uppercase">PUBLIC REPOS</span>
              <span className="text-lg font-bold text-[#111111]">
                {loading ? '...' : profile?.public_repos ?? 3}
              </span>
            </div>
            <div className="w-[1px] h-8 bg-black/10" />
            <div>
              <span className="text-slate-400 block text-[10px] uppercase">FOLLOWERS</span>
              <span className="text-lg font-bold text-[#111111]">
                {loading ? '...' : profile?.followers ?? 0}
              </span>
            </div>
            <div className="w-[1px] h-8 bg-black/10" />
            <div>
              <span className="text-slate-400 block text-[10px] uppercase">FOLLOWING</span>
              <span className="text-lg font-bold text-[#111111]">
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
              className="p-6 rounded-2xl bg-white/50 hover:bg-white/80 backdrop-blur-sm border border-black/[0.08] hover:border-black/20 shadow-[0_2px_12px_rgba(0,0,0,0.02)] transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono-tech text-slate-500 mb-4">
                  <span className="text-[#111111] font-bold">[{`0${idx + 1}`}]</span>
                  <div className="flex items-center gap-3">
                    {repo.stargazers_count > 0 && (
                      <span className="flex items-center gap-1 text-slate-700">
                        <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                        {repo.stargazers_count}
                      </span>
                    )}
                    {repo.forks_count > 0 && (
                      <span className="flex items-center gap-1 text-slate-500">
                        <GitFork className="w-3.5 h-3.5 text-slate-400" />
                        {repo.forks_count}
                      </span>
                    )}
                  </div>
                </div>

                <h3 className="text-lg font-display font-bold text-[#111111] group-hover:text-black transition-colors mb-2">
                  {repo.name}
                </h3>

                <p className="text-xs font-sans-clean text-slate-600 leading-relaxed line-clamp-3 mb-6">
                  {repo.description || 'Open source software and engineering project.'}
                </p>
              </div>

              <div>
                <div className="flex items-center justify-between pt-4 border-t border-black/[0.06] text-xs font-mono-tech">
                  <div className="flex items-center gap-2 text-slate-600">
                    <Code2 className="w-3.5 h-3.5 text-slate-500" />
                    <span>{repo.language || 'TypeScript'}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    {repo.homepage && (
                      <a
                        href={repo.homepage}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-500 hover:text-black transition-colors"
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
                      className="text-[#111111] font-bold hover:underline transition-colors flex items-center gap-1"
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
