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
  {id:'8', name :'Redux', icon:'Redux', category:'frontend', proficiency: 80},
  {id:'9',name:'Styled Components', icon:'styled-components', category:'frontend', proficiency: 80},
  {id:'10', name:'React Query', icon:'react-query', category:'frontend', proficiency: 80},
  {id:'11', name:'Bun', icon:'Bun', category:'backend', proficiency: 80},
  {id:'12',name:'Vite', icon:'vite', category:'frontend', proficiency: 80},
  {id:'13', name:'Three.js', icon:'threejs', category:'frontend', proficiency: 80},
  

  
  // Backend
  { id: '14', name: 'Node.js', icon: 'nodejs', category: 'backend', proficiency: 90 },
  {
    "id": "15",
    "name": "Supabase",
    "icon": "supabase",
    "category": "backend",
    "proficiency": 85
  },
  {id:'16', name:'Express.js', icon:'express', category:'backend', proficiency: 85},
  { id: '17', name: 'GraphQL', icon: 'graphql', category: 'backend', proficiency: 80 },
  { id: '18', name: 'Firebase', icon: 'firebase', category: 'backend', proficiency: 80 },
  { id: '19', name: 'Prisma', icon: 'prisma', category: 'backend', proficiency: 80 },
  { id: '20', name: 'PostgreSQL', icon: 'postgresql', category: 'backend', proficiency: 85 },

  { id: '21', name: 'MongoDB', icon: 'MongoDB', category: 'backend', proficiency: 55 },
  // Database
  { id: '22', name: 'Mysql', icon: 'postgresql', category: 'database', proficiency: 85 },
  {id:'23', name:'SQLite', icon:'sqlite', category:'database', proficiency: 80 },
  {id:'24', name:'MongoDB', icon:'MongoDB', category:'database', proficiency: 80 },
  {id:'25', name:'Firebase', icon:'Firebase', category:'database', proficiency: 80 },
  {id: '26', name: 'Supabase', icon: 'Supabase', category: 'database', proficiency: 75 },

  // DevOps
  // AI/ML
  { id: '27', name: 'TensorFlow', icon: 'tensorflow', category: 'ai', proficiency: 80 },
  { id: '28', name: 'OpenAI API', icon: 'openai', category: 'ai', proficiency: 85 },

  // Mobile
  { id: '29', name: 'React Native', icon: 'react', category: 'mobile', proficiency: 85 },
  {id:'30', name: 'Flutter', icon: 'flutter', category: 'mobile', proficiency: 80 },
  
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