import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ThemeToggle from './components/ThemeToggle';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import SkillsPage from './pages/SkillsPage';
import ProjectsPage from './pages/ProjectsPage';
import ExperiencePage from './pages/ExperiencePage';
import { useThemeStore } from './store/themeStore';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const ScrollHandler = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      lerp: 0.1,
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // Section-wise snapping logic for HomePage
    if (pathname === '/') {
      const getSnapPoints = () => {
        const sections = gsap.utils.toArray('section');
        const scrollHeight = document.documentElement.scrollHeight;
        const viewportHeight = window.innerHeight;
        const totalScrollableHeight = scrollHeight - viewportHeight;
        if (totalScrollableHeight <= 0) return [0];
        return sections.map((s: any) => s.offsetTop / totalScrollableHeight);
      };

      ScrollTrigger.create({
        start: 0,
        end: 'max',
        snap: {
          snapTo: (value) => {
            const points = getSnapPoints();
            return gsap.utils.snap(points, value);
          },
          duration: { min: 0.2, max: 0.8 },
          delay: 0.1,
          ease: 'power1.inOut'
        }
      });
    }

    lenis.scrollTo(0, { immediate: true });
    (window as any).lenis = lenis;

    // Refresh ScrollTrigger after a short delay for accuracy
    const timeoutId = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 500);

    return () => {
      clearTimeout(timeoutId);
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [pathname]);

  return null;
};

function App() {
  const { theme } = useThemeStore();

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme.isDark);
  }, [theme]);

  return (
    <Router>
      <ScrollHandler />
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-white transition-colors duration-300">
        <Navbar />
        <ThemeToggle />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/skills" element={<SkillsPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/experience" element={<ExperiencePage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;