import { create } from 'zustand';
import { Skill } from '../types';

interface SkillState {
  skills: Skill[];
  filteredSkills: Skill[];
  activeFilter: string;
  setFilter: (filter: string) => void;
}

const skillData: Skill[] = [
  // Frontend
  { id: '1', name: 'React', icon: 'react', category: 'frontend', proficiency: 95 },
  { id: '2', name: 'TypeScript', icon: 'typescript', category: 'frontend', proficiency: 90 },
  { id: '3', name: 'Next.js', icon: 'nextjs', category: 'frontend', proficiency: 85 },
  { id: '4', name: 'Tailwind CSS', icon: 'tailwind', category: 'frontend', proficiency: 90 },
  { id: '7', name: 'Framer Motion', icon: 'framer', category: 'frontend', proficiency: 80 },
  
  // Backend
  { id: '8', name: 'Node.js', icon: 'nodejs', category: 'backend', proficiency: 90 },
  {
    "id": "13",
    "name": "Supabase",
    "icon": "supabase",
    "category": "backend",
    "proficiency": 85
  },

  { id: '14', name: 'MongoDB', icon: 'MongoDB', category: 'backend', proficiency: 55 },
  // Database

  { id: '14', name: 'Mysql', icon: 'postgresql', category: 'database', proficiency: 85 },

  // DevOps
  // AI/ML
  { id: '20', name: 'TensorFlow', icon: 'tensorflow', category: 'ai', proficiency: 80 },
  { id: '22', name: 'OpenAI API', icon: 'openai', category: 'ai', proficiency: 85 },

  // Mobile
];

export const useSkillStore = create<SkillState>((set) => ({
  skills: skillData,
  filteredSkills: skillData,
  activeFilter: 'all',
  setFilter: (filter) => 
    set((state) => ({
      activeFilter: filter,
      filteredSkills: filter === 'all' 
        ? state.skills 
        : state.skills.filter(skill => skill.category === filter)
    })),
}));