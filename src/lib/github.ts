import type { GitHubUser, GitHubRepo } from '../types/github';

const GITHUB_USERNAME = 'deadsec7869';
const CACHE_KEY_PROFILE = `gh_profile_${GITHUB_USERNAME}`;
const CACHE_KEY_REPOS = `gh_repos_${GITHUB_USERNAME}`;
const CACHE_TTL_MS = 1000 * 60 * 30; // 30 minutes cache

// Verified fallback data directly from deadsec7869's public GitHub profile
const FALLBACK_PROFILE: GitHubUser = {
  login: 'deadsec7869',
  name: null,
  avatar_url: 'https://avatars.githubusercontent.com/u/188173328?v=4',
  html_url: 'https://github.com/deadsec7869',
  bio: null,
  public_repos: 3,
  followers: 0,
  following: 0,
  created_at: '2024-11-12T09:19:43Z',
  updated_at: '2026-08-30T19:38:54Z',
};

const FALLBACK_REPOS: GitHubRepo[] = [
  {
    id: 854930112,
    name: 'AI-Robot-Command-Center',
    full_name: 'deadsec7869/AI-Robot-Command-Center',
    html_url: 'https://github.com/deadsec7869/AI-Robot-Command-Center',
    description: 'Autonomous Robotics Simulation & Intelligent Fleet Management Platform featuring A* pathfinding and space-time conflict detection.',
    homepage: 'https://ai-robot-command-center.vercel.app',
    language: 'TypeScript',
    stargazers_count: 0,
    forks_count: 0,
    updated_at: '2026-09-07T21:24:29Z',
    topics: ['robotics', 'pathfinding', 'simulation', 'a-star', 'typescript', 'react'],
    fork: false,
  },
  {
    id: 855012390,
    name: 'AApesh',
    full_name: 'deadsec7869/AApesh',
    html_url: 'https://github.com/deadsec7869/AApesh',
    description: 'Desktop-First Spatial Music Workstation with 3D environment, synchronized lyrics, graphic EQ, and YouTube Music streaming.',
    homepage: null,
    language: 'TypeScript',
    stargazers_count: 0,
    forks_count: 0,
    updated_at: '2026-09-09T16:56:22Z',
    topics: ['threejs', 'music-player', 'web-audio', 'gsap', 'spatial-audio'],
    fork: false,
  },
  {
    id: 821345981,
    name: 'vtu-study-app',
    full_name: 'deadsec7869/vtu-study-app',
    html_url: 'https://github.com/deadsec7869/vtu-study-app',
    description: 'AI-powered academic study platform and curriculum companion for VTU engineering students.',
    homepage: 'https://vtu-study-app-tau.vercel.app',
    language: 'TypeScript',
    stargazers_count: 0,
    forks_count: 0,
    updated_at: '2026-06-28T14:04:20Z',
    topics: ['nextjs', 'google-genai', 'engineering', 'react', 'tailwind'],
    fork: false,
  },
];

interface CacheEnvelope<T> {
  timestamp: number;
  data: T;
}

function getFromCache<T>(key: string): T | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    const envelope: CacheEnvelope<T> = JSON.parse(raw);
    if (Date.now() - envelope.timestamp < CACHE_TTL_MS) {
      return envelope.data;
    }
  } catch {
    // Ignore cache parsing errors
  }
  return null;
}

function saveToCache<T>(key: string, data: T): void {
  if (typeof window === 'undefined') return;
  try {
    const envelope: CacheEnvelope<T> = {
      timestamp: Date.now(),
      data,
    };
    localStorage.setItem(key, JSON.stringify(envelope));
  } catch {
    // Ignore localStorage write quota errors
  }
}

/**
 * Fetch GitHub user profile without exposing private tokens.
 * Gracefully falls back to cached or verified profile data.
 */
export async function getGitHubProfile(username: string = GITHUB_USERNAME): Promise<GitHubUser> {
  const cached = getFromCache<GitHubUser>(CACHE_KEY_PROFILE);
  if (cached) return cached;

  try {
    const res = await fetch(`https://api.github.com/users/${username}`, {
      headers: {
        Accept: 'application/vnd.github.v3+json',
      },
    });

    if (res.ok) {
      const data: GitHubUser = await res.json();
      saveToCache(CACHE_KEY_PROFILE, data);
      return data;
    }
  } catch {
    // Network or rate-limit error, fallback gracefully
  }

  return FALLBACK_PROFILE;
}

/**
 * Fetch public GitHub repositories sorted by update time.
 * Gracefully falls back to cached or verified repository data.
 */
export async function getGitHubRepositories(username: string = GITHUB_USERNAME): Promise<GitHubRepo[]> {
  const cached = getFromCache<GitHubRepo[]>(CACHE_KEY_REPOS);
  if (cached && cached.length > 0) return cached;

  try {
    const res = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=30`, {
      headers: {
        Accept: 'application/vnd.github.v3+json',
      },
    });

    if (res.ok) {
      const data: GitHubRepo[] = await res.json();
      // Filter out forks if needed or keep original repos
      const filtered = data.filter((repo) => !repo.fork);
      const result = filtered.length > 0 ? filtered : data;
      saveToCache(CACHE_KEY_REPOS, result);
      return result;
    }
  } catch {
    // Network or rate-limit error, fallback gracefully
  }

  return FALLBACK_REPOS;
}
