import React from 'react';
import ExperienceSection from '../components/ExperienceSection';
import TestimonialsSection from '../components/TestimonialsSection';

const ExperiencePage: React.FC = () => {
  return (
    <div className="pt-20">
      <ExperienceSection />
      <TestimonialsSection />
    </div>
  );
};

export default ExperiencePage;