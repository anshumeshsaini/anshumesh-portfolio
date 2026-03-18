import React from 'react';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import SkillsSection from '../components/SkillsSection';
import ProjectsSection from '../components/ProjectsSection';
import ExperienceSection from '../components/ExperienceSection';
import TestimonialsSection from '../components/TestimonialsSection';
import SmokeyCursor from '../components/smokey-cursor';
import { ThreeDMarquee } from "../components/3d-marquee";
import img1 from '../assets/img1.png';
import img2 from '../assets/img2.png';
import img3 from '../assets/img3.png';
import img4 from '../assets/img4.png';
import img5 from '../assets/img5.png';


const images = [
  {
    src: img1,
    alt: "Fullstack Excellence Certificate",
    category: "Mastery",
    date: "Dec 2023",
    reflection: "This certificate represents the culmination of 500+ hours of deep-dive development into modern web architectures."
  },
  {
    src: img2,
    alt: "UI/UX Design Distinction",
    category: "Design",
    date: "Jan 2024",
    reflection: "Achieving this was about understanding the human element behind the pixel—where empathy meets engineering."
  },
  {
    src: img3,
    alt: "Cloud Engineering Artifact",
    category: "Infrastructure",
    date: "Feb 2024",
    reflection: "Mastering the invisible backbone of the web. This was a challenging multi-month journey into scalability."
  },
  {
    src: img4,
    alt: "Open Source Contribution Award",
    category: "Community",
    date: "March 2024",
    reflection: "A badge of honor for giving back to the ecosystem that taught me everything. Collaboration is the true superpower."
  },
  {
    src: img5,
    alt: "Advanced Algorithms Milestone",
    category: "Logic",
    date: "Spring 2024",
    reflection: "The thrill of solving complex problems with elegant code. This artifact marks a major shift in my algorithmic thinking."
  }
];


const HomePage: React.FC = () => {
  return (
    <div>
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ExperienceSection />
      <ProjectsSection />


      <ThreeDMarquee images={images} cols={3} />
      <TestimonialsSection />
    </div>
  );
};

export default HomePage;