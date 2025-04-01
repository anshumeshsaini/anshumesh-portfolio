import { create } from 'zustand';
import { Project } from '../types';

interface ProjectState {
  projects: Project[];
  filteredProjects: Project[];
  activeFilter: string;
  setFilter: (filter: string) => void;
}

const projectData: Project[] = [
  {
    "id": "1",
    "title": "Certiprox",
    "description": "A secure and scalable platform for certificate verification and management, utilizing blockchain technology for enhanced trust and transparency.",
    "technologies": ["React", "Tailwind", "AWS","Vercel"],
    "image": "https://plus.unsplash.com/premium_photo-1661751188825-710ec341b907?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2VydGlmaWNhdGV8ZW58MHx8MHx8fDA%3D",
    "githubUrl": "https://github.com/anshumeshsaini/certiproxs.git",
    "liveUrl": "https://certiproxs.vercel.app/",
    "featured": true,
    "category": "fullstack",
    "codeSnippet": "",
    "language": "javascript"
  },
  {

    "id": "2",
    "title": "Casino Gambling Game Website",
    "description": "A casino-style gambling game website featuring games like Aviator, Roulette, Blackjack, Slots, and more! Built purely for fun and practice, not for real-world use.",
    "technologies": ["React", "Node.js", "MongoDB", "WebSocket", "CSS Animations"],
    "image": "https://images.unsplash.com/photo-1504279807002-09854ccc9b6c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z2FtYmxpbmd8ZW58MHx8MHx8fDA%3D",
    "githubUrl": "https://github.com/anshumeshsaini",
    "liveUrl": "https://unique-cassata-9987b2.netlify.app/",
    "featured": true,
    "category": "gaming",
    "codeSnippet": "",
    "language": "javascript",

  },
  {
    "id": "3",
    "title": "ZoomCar Clone",
    "description": "A car rental platform built in React.js featuring powerful booking, top car listings, travel experiences, and road condition insights.",
    "technologies": ["React","CSS", "JavaScript"],
    "image": "https://media.istockphoto.com/id/467103541/photo/car-rental-sign.webp?a=1&b=1&s=612x612&w=0&k=20&c=eYs8kI__KMhef5Radnnl_TeSPsu2wihQ_c0haSGnBJU=",
    "githubUrl": "https://www.linkedin.com/posts/anshumesh-saini-628760234_reactjs-webdevelopment-carrental-activity-7300507191252283392-gal_?utm_source=share&utm_medium=member_desktop&rcm=ACoAADp8_YABlwsEpKr00be_L06qo8UW5Pz1vHw",
    "liveUrl": "https://www.linkedin.com/posts/anshumesh-saini-628760234_reactjs-webdevelopment-carrental-activity-7300507191252283392-gal_?utm_source=share&utm_medium=member_desktop&rcm=ACoAADp8_YABlwsEpKr00be_L06qo8UW5Pz1vHw",
    "featured": true,
    "category": "react",
    "codeSnippet": "",
    "language": "javascript"
  },

  {
    "id": "4",
    "title": "Dynamic Trading Dashboard",
    "description": "A responsive and interactive trading dashboard built with modern web technologies, featuring a real-time market chart, trading panel, and optimized UI for both desktop and mobile screens.",
    "technologies": ["React", "WebSocket", "Chart.js", "TailwindCss"],
    "image": "https://images.unsplash.com/photo-1621264448270-9ef00e88a935?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHRyYWRpbmd8ZW58MHx8MHx8fDA%3D",
    "githubUrl": "https://github.com/anshumeshsaini",
    "liveUrl": "https://jade-lollipop-1273a6.netlify.app/",
    "featured": true,
    "category": "web",
    "codeSnippet": "",
    "language": "javascript"
  },

  {
    "id": "5",
    "title": "MySong - Music Streaming Platform",
    "description": "A personalized music streaming platform designed to deliver unique and tailored music experiences, featuring playlist creation, music discovery, and seamless audio streaming.",
    "technologies": ["React", "Node.js", "MongoDB", "HTML5 Audio API", "CSS"],
    "image": "https://images.unsplash.com/photo-1598698287642-9ceaf9a7a011?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8bXVzaWMlMjBzdHJlYW1pbmd8ZW58MHx8MHx8fDA%3D",
    "githubUrl": "https://github.com/anshumeshsaini",
    "liveUrl": "https://66f4429968357d25789e5172--lovely-baklava-faa39e.netlify.app/",
    "featured": true,
    "category": "music",
    "codeSnippet": "",
    "language": "javascript"
  }

];

export const useProjectStore = create<ProjectState>((set) => ({
  projects: projectData,
  filteredProjects: projectData,
  activeFilter: 'all',
  setFilter: (filter) => 
    set((state) => ({
      activeFilter: filter,
      filteredProjects: filter === 'all' 
        ? state.projects 
        : state.projects.filter(project => project.category === filter)
    })),
}));