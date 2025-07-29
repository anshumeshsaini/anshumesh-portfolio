import React from 'react';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import SkillsSection from '../components/SkillsSection';
import ProjectsSection from '../components/ProjectsSection';
import ExperienceSection from '../components/ExperienceSection';
import TestimonialsSection from '../components/TestimonialsSection';
import SmokeyCursor from '../components/smokey-cursor';

const HomePage: React.FC = () => {
  return (
    <div>
      <HeroSection />
      <AboutSection />
      <SkillsSection />
        <ExperienceSection />
      <ProjectsSection />
      <SmokeyCursor
      simulationResolution={256}
      dyeResolution={2048}
      densityDissipation={2}
      curl={5}
      splatForce={8000}
      enableShading={true}
    />
      <TestimonialsSection />
    </div>
  );
};

export default HomePage;