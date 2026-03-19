import { create } from 'zustand';
import { Experience } from '../types';
import cyberonites from './cyberonites.png';


interface ExperienceState {
  experiences: Experience[];
}

const experienceData: Experience[] = [
  {
    "id": "1",
    "company": "Cyberonites Club",
    "position": "Web Developer",
    "duration": "December 2024 - April 2025",
    "description": "Developing and maintaining web applications with a focus on performance and security. Implementing modern UI/UX designs and enhancing website interactivity.",
    "technologies": ["HTML", "CSS", "JavaScript", "React", "Node.js", "MongoDB"],
    "logo": cyberonites
  },
  {
    "id": "2",
    "company": "Vize",
    "position": "Frontend Developer",
    "duration": "March 2025 - May 2025",
    "description": "Building responsive and high-performance user interfaces. Enhancing user experience through interactive web elements and optimized designs.",
    "technologies": ["React", "JavaScript", "Tailwind CSS", "Next.js", "TypeScript"],
    "logo": "https://via.placeholder.com/150"
  },
  {
    "id": "3",
    "company": "Freelancer.com",
    "position": "Freelance Web Developer",
    "duration": "May 2025 – Present",
    "description": "Developed responsive and dynamic websites for clients, ensuring optimal performance and user experience. Implemented modern front-end frameworks and collaborated with stakeholders to deliver customized solutions.",
    "technologies": ["React.js", "Tailwind CSS", "Node.js", "Express.js", "MongoDB", "MySQL"],
    "logo": "https://via.placeholder.com/150"
  },
  {
    "id": "4",
    "company": "Mediaonstake",
    "position": "Technical Lead",
    "duration": "Dec 2025 - May Present",
    "description": "Leading technical strategy, architecting scalable web solutions, and managing developer workflows. focused on delivering high-performance digital products and optimizing team productivity.",
    "technologies": ["System Design", "Architecture", "Project Management", "React", "Node.js"],
    "logo": "https://via.placeholder.com/150"
  },
  {
    "id": "5",
    "company": "Cybershield",
    "position": "Lead Instructor",
    "duration": "March 2025 - Feb 2026",
    "description": "Educating the next generation of security professionals. Designing curriculum for cybersecurity bootcamps and leading hands-on training in network defense and vulnerability assessment.",
    "technologies": ["Cybersecurity", "Network Defense", "Mentorship", "Training"],
    "logo": "https://via.placeholder.com/150"
  }
];

export const useExperienceStore = create<ExperienceState>(() => ({
  experiences: experienceData,
}));