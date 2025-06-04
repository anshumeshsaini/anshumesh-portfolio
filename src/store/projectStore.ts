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
    "title": "AI Gesture Rock Paper Scissors",
    "description": "An advanced gesture-controlled Rock Paper Scissors game featuring real-time hand recognition using TensorFlow.js, adaptive AI opponent, and comprehensive game analytics.",
    "technologies": [
      "React 18",
      "TypeScript",
      "TensorFlow.js",
      "Chakra UI",
      "Framer Motion",
      "Vite",
      "Jest",
      "React Testing Library"
    ],
    "image": "https://images.unsplash.com/photo-1608889825205-eebdb9fc5806?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cm9jayUyMHBhcGVyJTIwc2Npc3NvcnN8ZW58MHx8MHx8fDA%3D",
    "githubUrl": "https://github.com/anshumeshsaini/Neural-Combat.git",
    "liveUrl": "https://gesture-fights.vercel.app/",
    "featured": true,
    "category": "ai",
    "codeSnippet": "",
    "language": "typescript",
    "keyFeatures": [
      "Real-time hand gesture recognition",
      "Custom-trained TensorFlow.js models",
      "Adaptive AI difficulty system",
      "60fps performance optimization",
      "Dark/light mode with auto-switching",
      "Game analytics dashboard",
      "Interactive tutorial system",
      "Session persistence"
    ],
    "techDetails": {
      "aiImplementation": "HandPose model fine-tuned for RPS gestures",
      "stateManagement": "Context API + useReducer",
      "animations": "Framer Motion + custom SVG",
      "testing": "Jest + React Testing Library (90% coverage)"
    },
    "challengesSolved": [
      "Browser-based model optimization",
      "Lighting/hand-size invariant recognition",
      "No-backend architecture",
      "Fair AI opponent algorithm"
    ],
    "roadmap": [
      "WebRTC multiplayer mode",
      "Gesture-based game expansion pack",
      "Offline model caching",
      "Voice command integration"
    ],
    "performanceMetrics": {
      "modelAccuracy": "94.7% on test dataset",
      "inferenceSpeed": "28ms average",
      "bundleSize": "Under 300kb (compressed)"
    }
  },{
    "id": "2",
    "title": "MemeTrace - AI-Powered Meme Investigator",
    "description": "An advanced meme forensics platform that tracks origins, spread patterns, and variations of viral memes using AI and computer vision technologies.",
    "technologies": [
      "React 18",
      "TypeScript",
      "TensorFlow.js",
      "PyTorch",
      "Three.js",
      "PostgreSQL",
      "Redis",
      "Vite"
    ],
    "image": "https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bWVtZXN8ZW58MHx8MHx8fDA%3D",
    "githubUrl": "https://github.com/anshumeshsaini/MemeIQ.git",
    "liveUrl": "https://memeiq.vercel.app/",
    "featured": true,
    "category": "ai",
    "codeSnippet": "",
    "language": "typescript",
    "keyFeatures": [
      "AI-powered meme template recognition",
      "Meme genealogy visualization",
      "Viral spread pattern tracking",
      "Origin detection with timestamping",
      "Trend analytics dashboard",
      "Meme template generator",
      "Client-side TensorFlow.js processing"
    ],
    "techStack": {
      "frontend": "React 18 + Vite + TypeScript + Three.js",
      "ai": "TensorFlow.js (client) + PyTorch (server)",
      "database": "Redis (caching) + PostgreSQL (genealogy)",
      "computerVision": "CLIP embeddings + Google Vision API"
    },
    "useCases": [
      "Journalism (misinformation tracking)",
      "Brand marketing analysis",
      "Internet culture preservation",
      "Meme stock market analysis",
      "Content creator analytics"
    ],
    "roadmap": [
      "AR meme hunting mode",
      "NFT verification for creators",
      "Twitch streamer analytics",
      "Enhanced cringe detection",
      "Chrome extension development"
    ],
    "funFact": "The model identified a Wojak variant that spread from 4chan to WallStreetBets in just 3 hours!"
  },{
    "id": "3",
    "title": "HackMania - Real Estate Platform",
    "description": "A digital platform to bring local real estate businesses online, connecting buyers and sellers directly with advanced search, secure communication, and easy property management.",
    "technologies": ["React", "Node.js", "MongoDB", "Express", "Tailwind CSS"],
    "image": "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmVhbCUyMGVzdGF0ZXxlbnwwfHwwfHx8MA%3D%3D",
    "githubUrl": "https://github.com/anshumeshsaini/EstateForge.git",
    "liveUrl": "https://estate-forge.vercel.app/",
    "featured": true,
    "category": "fullstack",
    "codeSnippet": "",
    "language": "javascript",
    "team": [
      {
        "name": "Anshumesh Saini",
        "role": "Frontend Developer"
      },
      {
        "name": "Sharthak Bansal",
        "role": "Backend Developer"
      },
      {
        "name": "Ayushi Sharma",
        "role": "UI/UX Designer"
      },
      {
        "name": "Arpit Bindil",
        "role": "Presentation"
      }
    ],
    "features": [
      "Property browsing (buy, rent, commercial)",
      "Direct buyer-seller communication",
      "Advanced search and filter options",
      "Easy property listing uploads",
      "Admin panel for management",
      "Mobile-responsive design",
      "Secure authentication system"
    ]
  },{
    "id": "4",
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
    "id": "Fullstack",
    "title": "Aether-Commerce – AI-Enhanced E-Commerce Platform",
    "description": "A futuristic full-stack eCommerce platform blending AI with real-time user interactions, smart product discovery, and a visually immersive experience using React and Supabase.",
    "technologies": [
      "React.js",
      "Tailwind CSS",
      "Framer Motion",
      "GSAP",
      "Supabase",
      "OpenAI API"
    ],
    "image": "https://images.unsplash.com/photo-1688561808434-886a6dd97b8c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZWNvbW1lcmNlfGVufDB8fDB8fHww",
    "githubUrl": "https://github.com/anshumeshsaini/aether-commerce-verse",
    "liveUrl": "https://aether-commerce.vercel.app/",
    "featured": true,
    "category": "ecommerce",
    "codeSnippet": "",
    "language": "javascript"
  },
  {

    "id": "6",
    "title": "Casino Gambling Game Website",
    "description": "A casino-style gambling game website featuring games like Aviator, Roulette, Blackjack, Slots, and more! Built purely for fun and practice, not for real-world use.",
    "technologies": ["React", "Node.js", "MongoDB", "WebSocket", "CSS Animations"],
    "image": "https://images.unsplash.com/photo-1504279807002-09854ccc9b6c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z2FtYmxpbmd8ZW58MHx8MHx8fDA%3D",
    "githubUrl": "https://github.com/anshumeshsaini",
    "liveUrl": "https://unique-cassata-9987b2.netlify.app/",
    "featured": true,
    "category": "Fullstack",
    "codeSnippet": "",
    "language": "javascript",

  },
  {
    "id": "7",
    "title": "filealchemy – Frontend PDF & Data Conversion Platform",
    "description": "A futuristic frontend-only app for editing and converting PDFs and various file formats, featuring advanced tools and blazing-fast performance with zero backend.",
    "technologies": ["React", "TypeScript", "Vite", "Tailwind CSS", "Framer Motion", "pdf-lib", "Web APIs"],
    "image": "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500&auto=format&fit=crop&q=60",
    "githubUrl": "https://github.com/anshumeshsaini/fileflow-alchemy-lab",
    "liveUrl": "https://filealchemy.vercel.app/",
    "featured": true,
    "category": "frontend",
    "codeSnippet": "",
    "language": "typescript"
  },
  {
    "id": "8",
    "title": "ZoomCar Clone",
    "description": "A car rental platform built in React.js featuring powerful booking, top car listings, travel experiences, and road condition insights.",
    "technologies": ["React","CSS", "JavaScript"],
    "image": "https://media.istockphoto.com/id/467103541/photo/car-rental-sign.webp?a=1&b=1&s=612x612&w=0&k=20&c=eYs8kI__KMhef5Radnnl_TeSPsu2wihQ_c0haSGnBJU=",
    "githubUrl": "https://www.linkedin.com/posts/anshumesh-saini-628760234_reactjs-webdevelopment-carrental-activity-7300507191252283392-gal_?utm_source=share&utm_medium=member_desktop&rcm=ACoAADp8_YABlwsEpKr00be_L06qo8UW5Pz1vHw",
    "liveUrl": "https://www.linkedin.com/posts/anshumesh-saini-628760234_reactjs-webdevelopment-carrental-activity-7300507191252283392-gal_?utm_source=share&utm_medium=member_desktop&rcm=ACoAADp8_YABlwsEpKr00be_L06qo8UW5Pz1vHw",
    "featured": true,
    "category": "forntend",
    "codeSnippet": "",
    "language": "javascript"
  },




  

  {
    "id": "9",
    "title": "MySong - Music Streaming Platform",
    "description": "A personalized music streaming platform designed to deliver unique and tailored music experiences, featuring playlist creation, music discovery, and seamless audio streaming.",
    "technologies": ["React", "Node.js", "MongoDB", "HTML5 Audio API", "CSS"],
    "image": "https://images.unsplash.com/photo-1598698287642-9ceaf9a7a011?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8bXVzaWMlMjBzdHJlYW1pbmd8ZW58MHx8MHx8fDA%3D",
    "githubUrl": "https://github.com/anshumeshsaini",
    "liveUrl": "https://66f4429968357d25789e5172--lovely-baklava-faa39e.netlify.app/",
    "featured": true,
    "category": "forntend",
    "codeSnippet": "",
    "language": "javascript"
  },


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