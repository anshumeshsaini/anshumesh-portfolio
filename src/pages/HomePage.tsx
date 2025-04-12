import React from 'react';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import SkillsSection from '../components/SkillsSection';
import ProjectsSection from '../components/ProjectsSection';
import ExperienceSection from '../components/ExperienceSection';
import TestimonialsSection from '../components/TestimonialsSection';

const HomePage: React.FC = () => {
  return (
    <div>
      <HeroSection />
      <AboutSection />
      <SkillsSection />
        <ExperienceSection />
      <ProjectsSection />

      <TestimonialsSection />
    </div>
  );
};

export default HomePage;