import { create } from 'zustand';
import { GithubStats } from '../types';

interface GithubState {
  stats: GithubStats;
  loading: boolean;
  error: string | null;
  fetchStats: () => Promise<void>;
}

// Mock data for GitHub stats
const mockGithubStats: GithubStats = {
  username: 'anshumesh',
  followers: 29,
  following: 450,
  publicRepos: 48,
  topLanguages: [
    { name: 'JavaScript', percentage: 95 },
    { name: 'TypeScript', percentage: 91 },
    { name: 'Python', percentage: 70 },
    { name: 'HTML/CSS', percentage: 99 },
    { name: 'Other', percentage: 50 },
  ],
};

export const useGithubStore = create<GithubState>((set) => ({
  stats: mockGithubStats,
  loading: false,
  error: null,
  fetchStats: async () => {
    set({ loading: true, error: null });
    try {
      // In a real implementation, this would fetch from GitHub API
      // For now, we'll use mock data with a simulated delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      set({ stats: mockGithubStats, loading: false });
    } catch (error) {
      set({ error: 'Failed to fetch GitHub stats', loading: false });
    }
  },
}));