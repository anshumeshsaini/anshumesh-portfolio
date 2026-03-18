export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  image: string;
  githubUrl: string;
  liveUrl?: string;
  featured: boolean;
  category: 'frontend' | 'backend' | 'fullstack' | 'ai' | 'mobile';
  codeSnippet?: string;
  language?: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  duration: string;
  description: string;
  technologies: string[];
  logo: string;
}

export interface Skill {
  id: string;
  name: string;
  icon: string;
  category: 'frontend' | 'backend' | 'devops' | 'ai' | 'mobile' | 'database';
  proficiency: number; // 0-100
}

export interface Testimonial {
  id: string;
  name: string;
  position: string;
  company: string;
  testimonial: string;
  image: string;
  rating: number; // 1-5
}

export interface GithubStats {
  username: string;
  followers: number;
  following: number;
  publicRepos: number;
  stars: number;
  contributions: number;
  topLanguages: { name: string; percentage: number }[];
}

export interface ThemeType {
  isDark: boolean;
  primary: string;
  secondary: string;
  background: string;
  text: string;
  accent: string;
}