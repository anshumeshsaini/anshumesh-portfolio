import React from 'react';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import SkillsSection from '../components/SkillsSection';
import ProjectsSection from '../components/ProjectsSection';
import ExperienceSection from '../components/ExperienceSection';
import TestimonialsSection from '../components/TestimonialsSection';
import SmokeyCursor from '../components/smokey-cursor';
import { ThreeDMarquee} from "../components/3d-marquee";
import img1 from '../assets/img1.png';
import img2 from '../assets/img2.png';  
import img3 from '../assets/img3.png';
import img4 from '../assets/img4.png';
import img5 from '../assets/img5.png';


const images = [
  { 
    imgElement: <img src={img1} alt="Gallery item 1" />,
    alt: "Gallery item 1"
  },
  { 
    imgElement: <img src={img3} alt="Gallery item 2" />,
    alt: "Gallery item 2" 
  },
  { 
    imgElement: <img src={img2} alt="Gallery item 2" />,
    alt: "Gallery item 2" 
  },
  { 
    imgElement: <img src={img4} alt="Gallery item 2" />,
    alt: "Gallery item 2" 
  },{ 
    imgElement: <img src={img5} alt="Gallery item 2" />,
    alt: "Gallery item 2" 
  },
  // ...
];


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

<ThreeDMarquee images={images} cols={3} />
      <TestimonialsSection />
    </div>
  );
};

export default HomePage;