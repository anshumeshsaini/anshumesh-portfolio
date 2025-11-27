import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { Download, Github, Code, Award, Briefcase, Coffee, Sparkles, Cpu, Database, Server, Terminal } from 'lucide-react';
import { useGithubStore } from '../store/githubStore';
import anshumesh from '../assets/anshumesh.jpeg';
import '../css/about.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';
import { useThemeStore } from '../store/themeStore';
import { Lens } from './lens';

const AboutSection: React.FC = () => {
  const { stats, fetchStats } = useGithubStore();
  const { theme } = useThemeStore();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px 0px" });
  const controls = useAnimation();
  const sectionRef = useRef<HTMLDivElement>(null);
  
  // Coffee drop animation refs & state
  const cupRef = useRef<HTMLDivElement>(null);
  const [impact, setImpact] = useState(false);
  const [hoveredStat, setHoveredStat] = useState<number | null>(null);
  
  // Initialize particles
  const particlesInit = useCallback(async engine => { 
    await loadFull(engine); 
  }, []);

  // Fetch stats when in view
  useEffect(() => {
    if (isInView) {
      fetchStats();
      controls.start("visible");
    }
  }, [isInView, fetchStats, controls]);

  // Enhanced stats items with more metrics
  const statsItems = [
    { 
      icon: <Github size={28} />, 
      value: `${stats.publicRepos}+`, 
      label: 'GitHub Repos',
      color: 'from-purple-500 to-pink-500'
    },
    { 
      icon: <Briefcase size={28} />, 
      value: '40+', 
      label: 'Projects',
      color: 'from-blue-500 to-cyan-400'
    },
    { 
      icon: <Coffee size={28} />, 
      value: '∞', 
      label: 'Coffee',
      color: 'from-amber-500 to-orange-500'
    },
    { 
      icon: <Terminal size={28} />, 
      value: '10K+', 
      label: 'Code Hours',
      color: 'from-emerald-500 to-teal-400'
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.8,
        ease: [0.2, 0.8, 0.4, 1]
      },
    },
  };

  // GSAP animations for coffee cup
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    // Coffee cup drop animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: cupRef.current,
        start: 'top 80%',
        toggleActions: 'play none none none',
        markers: false
      }
    });
    
    tl.from(cupRef.current, { 
      y: -300, 
      rotation: 15, 
      ease: 'bounce.out', 
      duration: 1.2 
    })
    .to(cupRef.current, { 
      rotation: -5, 
      duration: 0.3, 
      yoyo: true, 
      repeat: 1 
    })
    .to(cupRef.current, { 
      rotation: 0, 
      duration: 0.3, 
      onComplete: () => setImpact(true) 
    });

    // Floating tech icons animation
    const techIcons = gsap.utils.toArray('.tech-icon');
    techIcons.forEach((icon: any, i) => {
      gsap.from(icon, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        delay: i * 0.1,
        scrollTrigger: {
          trigger: icon,
          start: 'top 90%',
          toggleActions: 'play none none none'
        }
      });
    });

    // Background gradient animation
    if (sectionRef.current) {
      gsap.to(sectionRef.current, {
        backgroundPosition: '50% 70%',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });
    }
  }, []);

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="relative py-28 overflow-hidden transition-colors duration-300"
      style={{
        background: theme.isDark 
          ? 'radial-gradient(circle at 50% 50%, rgba(17, 24, 39, 0.8) 0%, rgba(3, 7, 18, 1) 70%)' 
          : 'radial-gradient(circle at 50% 50%, rgba(249, 250, 251, 0.9) 0%, rgba(229, 231, 235, 1) 70%)'
      }}
    >
      {/* Floating tech icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {['React', 'NextJS', 'Node', 'Python', 'MySQL', 'MongoDB', 'TensorFlow', 'Docker'].map((tech, i) => (
          <div 
            key={i}
            className="tech-icon absolute flex flex-col items-center"
            style={{
              left: `${Math.random() * 90 + 5}%`,
              top: `${Math.random() * 80 + 10}%`,
              transform: `rotate(${Math.random() * 360}deg)`
            }}
          >
            <Code size={20} className={theme.isDark ? "text-gray-400" : "text-gray-500"} />
            <span className={`text-xs mt-1 ${theme.isDark ? "text-gray-400 opacity-70" : "text-gray-500 opacity-70"}`}>
              {tech}
            </span>
          </div>
        ))}
      </div>

      {/* Particle background */}
      <div className="absolute inset-0 z-0 opacity-20 dark:opacity-30">
        <Particles
          id="about-particles"
          init={particlesInit}
          options={{
            fpsLimit: 60,
            interactivity: {
              events: {
                onHover: {
                  enable: true,
                  mode: "repulse",
                },
              },
              modes: {
                repulse: {
                  distance: 100,
                  duration: 0.4,
                },
              },
            },
            particles: {
              color: {
                value: theme.isDark ? "#3b82f6" : "#2563eb",
              },
              links: {
                color: theme.isDark ? "#3b82f6" : "#2563eb",
                distance: 150,
                enable: true,
                opacity: 0.3,
                width: 1,
              },
              move: {
                direction: "none",
                enable: true,
                outModes: {
                  default: "bounce",
                },
                random: false,
                speed: 1,
                straight: false,
              },
              number: {
                density: {
                  enable: true,
                  area: 800,
                },
                value: 80,
              },
              opacity: {
                value: 0.3,
              },
              shape: {
                type: "circle",
              },
              size: {
                value: { min: 1, max: 3 },
              },
            },
            detectRetina: true,
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section header with animated sparkles */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px 0px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center mb-4">
            <span className="text-sm font-medium bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-500">
              MY JOURNEY
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 dark:text-white text-gray-900">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400">Me</span>
          </h2>
          
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="w-32 h-1.5 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full mx-auto mb-8"
            style={{ originX: 0 }}
          />
          
          <p className="text-xl dark:text-gray-300 text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Crafting <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">digital experiences</span> that blend innovation with intuitive design
          </p>
        </motion.div>

        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image with floating effect */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px 0px" }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative group">
              <motion.div className="relative z-10">
                <div className="relative overflow-hidden rounded-3xl shadow-2xl z-20">
                  <img
                    src={anshumesh}
                    alt="Anshumesh Saini"
                    className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                </div>
              </motion.div>
              
              {/* GitHub followers badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="absolute -bottom-6 -right-6 backdrop-blur-lg dark:bg-gray-900/90 bg-white/80 p-4 rounded-xl shadow-xl z-30 border dark:border-gray-700 border-gray-200"
              >
                <div className="flex items-center space-x-3">
                  <Github className="dark:text-gray-200 text-gray-800" size={24} />
                  <div>
                    <div className="text-lg font-bold dark:text-white text-gray-900">{stats.followers}</div>
                    <div className="text-xs dark:text-gray-400 text-gray-600">GitHub Followers</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Text content */}
          <motion.div
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={containerVariants}
            className="relative"
          >
            {/* Glowing background element */}
            <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-blue-500/10 blur-3xl -z-10" />
            
            <motion.h3
              variants={itemVariants}
              className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-8 tracking-tight"
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                Full-Stack Developer
              </span>
              <span className="block text-2xl md:text-3xl mt-2 dark:text-gray-300 text-gray-700 font-medium">
                & AI Enthusiast
              </span>
            </motion.h3>

            <motion.p
              variants={itemVariants}
              className="text-lg dark:text-gray-300 text-gray-600 mb-6 leading-relaxed"
            >
              I'm <span className="font-semibold dark:text-white text-gray-800">Anshumesh Saini</span> a passionate full-stack developer specializing in building immersive web experiences with cutting-edge technologies. With expertise in JavaScript, Python, and modern frameworks, I create solutions that are as performant as they are beautiful.
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="text-lg dark:text-gray-300 text-gray-600 mb-10 leading-relaxed"
            >
              My work spans from dynamic UIs to robust backend systems, with a recent focus on AI integration to deliver smart, intuitive applications. Whether it's a portfolio, e-commerce platform, or complex management system, I approach each project with creativity and technical excellence.
            </motion.p>

            {/* Stats grid with hover effects */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12"
            >
              {statsItems.map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ 
                    y: -5,
                    transition: { duration: 0.3 }
                  }}
                  onHoverStart={() => setHoveredStat(index)}
                  onHoverEnd={() => setHoveredStat(null)}
                  className="relative overflow-hidden"
                >
                  <div className={`h-full p-5 rounded-xl backdrop-blur-lg dark:bg-white/5 bg-gray-100/80 border dark:border-white/10 border-gray-200 shadow-sm transition-all duration-300 ${
                    hoveredStat === index ? 'shadow-lg scale-105' : ''
                  }`}>
                    <div className={`text-4xl mb-3 transition-all duration-500 ${
                      hoveredStat === index ? `text-transparent bg-clip-text bg-gradient-to-r ${item.color}` : 'dark:text-gray-500 text-gray-400'
                    }`}>
                      {item.icon}
                    </div>
                    <div className="text-3xl font-bold dark:text-white text-gray-900 mb-1">
                      {item.value}
                    </div>
                    <div className="text-sm dark:text-gray-400 text-gray-600">
                      {item.label}
                    </div>
                    
                    {/* Hover effect */}
                    {hoveredStat === index && (
                      <div className={`absolute inset-0 rounded-xl opacity-20 bg-gradient-to-br ${item.color} -z-10`} />
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Action buttons */}
            <motion.div 
              variants={itemVariants}
              className="flex flex-wrap gap-4"
            >
              <motion.a
                href="/resume.pdf"
                download="Anshumesh_Saini_Resume.pdf"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 5px 20px rgba(59, 130, 246, 0.4)"
                }}
                whileTap={{ scale: 0.95 }}
                className="relative px-8 py-4 rounded-xl font-semibold text-white overflow-hidden group"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl transition-all duration-300 group-hover:from-blue-600 group-hover:to-purple-500" />
                <span className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-500 opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500" />
                <span className="relative z-10 flex items-center">
                  <Download size={20} className="mr-3" />
                  Download Resume
                </span>
              </motion.a>

              <motion.a
                href="https://github.com/username"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 5px 20px rgba(139, 92, 246, 0.3)"
                }}
                whileTap={{ scale: 0.95 }}
                className="relative px-8 py-4 rounded-xl font-semibold dark:text-white text-gray-900 overflow-hidden group"
              >
                <span className="absolute inset-0 backdrop-blur-md dark:bg-white/10 bg-white/50 rounded-xl border dark:border-white/10 border-gray-300 transition-all duration-300 group-hover:dark:bg-white/20 group-hover:bg-gray-200/50" />
                <span className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
                <span className="relative z-10 flex items-center">
                  <Github size={20} className="mr-3" />
                  GitHub Profile
                </span>
              </motion.a>
            </motion.div>
          </motion.div>
        </div>

        {/* Skills section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px 0px" }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-28"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4 dark:text-white text-gray-900">
              My <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400">Skills</span>
            </h3>
            <p className="text-lg dark:text-gray-300 text-gray-600 max-w-2xl mx-auto">
              Technologies I work with to bring ideas to life
            </p>
          </div>
          
          <div className="backdrop-blur-lg dark:bg-gray-800/50 bg-white/80 rounded-2xl shadow-xl p-8 border dark:border-gray-700 border-gray-200">
            {stats.topLanguages.map((lang, index) => (
              <div key={index} className="mb-6 last:mb-0">
                <div className="flex justify-between mb-3">
                  <span className="font-medium dark:text-gray-200 text-gray-900 flex items-center">
                    <span className="w-2 h-2 rounded-full bg-blue-500 mr-2" />
                    {lang.name}
                  </span>
                  <span className="dark:text-gray-400 text-gray-600">{lang.percentage}%</span>
                </div>
                <div className="w-full dark:bg-gray-700 bg-gray-200 rounded-full h-3 overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 relative"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${lang.percentage}%` }}
                    viewport={{ once: true }}
                    transition={{ 
                      duration: 1.5, 
                      delay: 0.1 * index,
                      ease: "anticipate"
                    }}
                  >
                    <div className="absolute inset-0 bg-white/20 animate-pulse-short" />
                  </motion.div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;