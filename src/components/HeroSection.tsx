import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { ArrowDown, Mic, MicOff, Sparkles, Code, Cpu, Server, Database } from 'lucide-react';
import { useThemeStore } from '../store/themeStore';
import { useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react';
import animationData from './Code.json';
import "../css/hero.css";

const HeroSection: React.FC = () => {
  const { theme } = useThemeStore();
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const navigate = useNavigate();
  const mainRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(mainRef, { once: true });
  const controls = useAnimation();
  const lottieRef = useRef<any>(null);

  // Floating tech icons with more variety
  const techIcons = [
  
  ];

  // Canvas animation for advanced particle system
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      alpha: number;
      targetAlpha: number;
      connectionRadius: number;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 4 + 1;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
        this.color = theme.isDark ? 
          `hsl(${Math.random() * 60 + 180}, 70%, 60%)` : 
          `hsl(${Math.random() * 60 + 200}, 80%, 60%)`;
        this.alpha = 0;
        this.targetAlpha = Math.random() * 0.4 + 0.1;
        this.connectionRadius = Math.random() * 150 + 50;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
        
        // Smooth alpha transition
        this.alpha += (this.targetAlpha - this.alpha) * 0.05;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.alpha;
        ctx.fill();
      }
    }

    const particles: Particle[] = [];
    const particleCount = 150;
    
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const connectParticles = () => {
      for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < particles[a].connectionRadius) {
            ctx.beginPath();
            ctx.strokeStyle = particles[a].color;
            ctx.globalAlpha = (particles[a].connectionRadius - distance) / particles[a].connectionRadius * 0.2;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw connections first (behind particles)
      connectParticles();
      
      // Update and draw particles
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', handleResize);
    };
  }, [theme.isDark]);

  // Voice introduction with more personality
  const handleVoiceIntro = () => {
    if ('speechSynthesis' in window) {
      if (isSpeaking) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
        return;
      }
      
      setIsSpeaking(true);
      const speech = new SpeechSynthesisUtterance(
        "Welcome to my digital universe. I'm Anshumesh Saini - a full-stack developer and AI enthusiast. " +
        "I build immersive web experiences that push boundaries. " +
        "Scroll down to explore my projects or contact me to discuss how we can create something amazing together."
      );
      
      speech.rate = 1.1;
      speech.pitch = 1;
      speech.volume = 1;
      
      speech.onend = () => {
        setIsSpeaking(false);
      };
      
      window.speechSynthesis.speak(speech);
    }
  };

  const handleViewProjects = () => {
    navigate('/projects');
  };

  const handleContactMe = () => {
    window.location.href = 'mailto:anshumesh.saini@gmail.com';
  };

  // Animate when in view
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
      if (lottieRef.current) {
        lottieRef.current.play();
      }
    }
  }, [isInView, controls]);

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      ref={mainRef}
    >
      {/* Advanced background with gradient mesh */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <canvas ref={canvasRef} className="absolute inset-0" />
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/10 dark:to-black/30" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-transparent via-transparent to-white/20 dark:to-black/50" />
      </div>
      
      {/* Floating tech icons with improved animation */}
      <div className="absolute inset-0 z-5 overflow-hidden pointer-events-none">
        {techIcons.map((tech, index) => (
          <motion.div
            key={index}
            initial={{ 
              opacity: 0,
              x: Math.random() * 100 - 50,
              y: Math.random() * 100 - 50,
              rotate: Math.random() * 360
            }}
            animate={{ 
              opacity: [0.2, 0.4, 0.2],
              x: Math.random() * (window.innerWidth - 200) + 100,
              y: Math.random() * (window.innerHeight - 200) + 100,
              rotate: Math.random() * 360,
              scale: [0.8, 1.2, 0.8]
            }}
            transition={{
              duration: 40 + Math.random() * 40,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear"
            }}
            className={`absolute ${tech.color} flex flex-col items-center`}
          >
            {tech.icon}
            <span className="text-xs mt-1 opacity-70">{tech.name}</span>
          </motion.div>
        ))}
      </div>

      {/* Main content */}
      <div className="container mx-auto px-6 z-20 relative">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left column - Text content */}
          <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left">
            {/* Animated sparkles intro */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={controls}
              variants={{
                visible: {
                  opacity: 1,
                  scale: 1,
                  transition: { duration: 0.5 }
                }
              }}
              className="mb-6 flex items-center"
            >

              <span className="text-sm font-medium bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-500">
                Welcome to my digital universe
              </span>
            </motion.div>

            {/* Name with advanced text effects */}
            <motion.h1
  initial={{ opacity: 0, y: 40, scale: 0.95 }}
  animate={{ 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { 
      duration: 1, 
      delay: 0.3, 
      ease: [0.2, 0.8, 0.4, 1] 
    }
  }}
  className="text-5xl md:text-7xl lg:text-8xl font-extrabold mb-6 tracking-tight relative z-10"
>
  <span className={theme.isDark ? "text-white" : "text-black"}>
    Anshumesh Saini
  </span>
  <span className="absolute -z-10 top-1/2 left-0 w-full h-[120%] transform -translate-y-1/2 blur-3xl opacity-30 bg-gradient-to-r from-indigo-500 via-sky-400 to-emerald-400 rounded-full animate-pulse" />
</motion.h1>

            {/* Title with animated underline */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                transition: { 
                  duration: 0.8, 
                  delay: 0.6, 
                  ease: "easeOut" 
                }
              }}
              className="relative mb-10 w-full"
            >
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-400">
                Full-Stack Developer & AI Specialist
              </h2>
              <motion.div 
                className="absolute -bottom-2 left-0 h-1 w-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                initial={{ scaleX: 0 }}
                animate={{ 
                  scaleX: 1,
                  transition: { 
                    delay: 0.9, 
                    duration: 0.8, 
                    ease: "backOut" 
                  }
                }}
              />
            </motion.div>

            {/* Description with typing animation effect */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                transition: { 
                  duration: 1, 
                  delay: 0.8, 
                  ease: "easeOut" 
                }
              }}
              className="relative w-full"
            >
              <p className="text-lg md:text-xl leading-relaxed max-w-3xl mb-12 text-gray-700 dark:text-gray-300">
                <span className="highlight-text">Digital architect</span> crafting immersive experiences with{" "}
                <span className="highlight-text">cutting-edge tech</span>. Specializing in{" "}
                <span className="highlight-text">scalable solutions</span> that blend aesthetics with{" "}
                <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-orange-500">
                  performance
                </span>.
              </p>
              <div className="absolute -inset-4 rounded-xl bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 opacity-20 blur-xl -z-10" />
            </motion.div>

            {/* Interactive buttons with advanced hover effects */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                transition: { 
                  duration: 0.8, 
                  delay: 1, 
                  ease: "easeOut" 
                }
              }}
              className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 relative z-20 w-full"
            >
              {/* View Projects Button */}
              <motion.button
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 0 25px rgba(59, 130, 246, 0.4)"
                }}
                whileTap={{ scale: 0.95 }}
                onHoverStart={() => setHoveredButton('projects')}
                onHoverEnd={() => setHoveredButton(null)}
                onClick={handleViewProjects}
                className="relative px-8 py-3 text-white bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl font-semibold shadow-lg transition-all duration-300 overflow-hidden group flex-1 sm:flex-none"
              >
                <span className="relative z-20 flex items-center justify-center gap-2">
                  <span>View Projects</span>
                  <ArrowDown className="transition-transform duration-300 group-hover:translate-y-1" size={16} />
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-500 opacity-0 group-hover:opacity-30 transition-opacity duration-300 blur-xl z-10" />
                <span className="absolute inset-0 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10" />
                
                {/* Animated border */}
                <span className="absolute inset-0 rounded-xl overflow-hidden">
                  <span className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-blue-300 to-transparent animate-border-top" />
                  <span className="absolute top-0 right-0 w-0.5 h-full bg-gradient-to-b from-transparent via-blue-300 to-transparent animate-border-right" />
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-blue-300 to-transparent animate-border-bottom" />
                  <span className="absolute top-0 left-0 w-0.5 h-full bg-gradient-to-b from-transparent via-blue-300 to-transparent animate-border-left" />
                </span>
              </motion.button>

              {/* Contact Me Button */}
              <motion.button
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 0 25px rgba(168, 85, 247, 0.3)"
                }}
                whileTap={{ scale: 0.95 }}
                onHoverStart={() => setHoveredButton('contact')}
                onHoverEnd={() => setHoveredButton(null)}
                onClick={handleContactMe}
                className="relative px-8 py-3 text-white bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl font-semibold shadow-lg transition-all duration-300 overflow-hidden group flex-1 sm:flex-none"
              >
                <span className="relative z-20">Contact Me</span>
                <span className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 group-hover:opacity-30 transition-opacity duration-300 blur-xl z-10" />
                <span className="absolute inset-0 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10" />
                
                {/* Particle burst effect on hover */}
                {hoveredButton === 'contact' && (
                  <div className="absolute inset-0 overflow-hidden rounded-xl">
                    {[...Array(20)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ 
                          opacity: 0,
                          x: "50%",
                          y: "50%",
                          scale: 0
                        }}
                        animate={{ 
                          opacity: [1, 0],
                          x: `${Math.random() * 100}%`,
                          y: `${Math.random() * 100}%`,
                          scale: [0.5, 1.5],
                          transition: { 
                            duration: 0.8,
                            ease: "easeOut"
                          }
                        }}
                        className="absolute w-2 h-2 rounded-full bg-white/50"
                      />
                    ))}
                  </div>
                )}
              </motion.button>

              {/* Voice Intro Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onHoverStart={() => setHoveredButton('voice')}
                onHoverEnd={() => setHoveredButton(null)}
                onClick={handleVoiceIntro}
                className={`relative p-4 rounded-xl transition-all duration-300 flex items-center justify-center
                  ${
                    isSpeaking
                      ? 'bg-gradient-to-br from-red-500 to-pink-600 text-white shadow-lg'
                      : 'bg-gray-800/50 dark:bg-white/10 text-gray-300 hover:bg-gray-700/50 dark:hover:bg-white/20 border border-gray-700/50 dark:border-white/10'
                  }
                `}
              >
                {isSpeaking ? (
                  <>
                    <MicOff size={21} className="relative z-20" />
                    <span className="absolute inset-0 rounded-xl bg-red-500/20 animate-pulse" />
                  </>
                ) : (
                  <>
                    <Mic size={21} className="relative z-20" />
                    <span className="absolute inset-0 rounded-xl bg-white/5 backdrop-blur-sm" />
                  </>
                )}
                
                {/* Soundwave animation when speaking */}
                {isSpeaking && (
                  <div className="absolute -inset-2 flex items-center justify-center gap-1 overflow-hidden">
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        animate={{
                          height: [`${Math.random() * 20 + 5}px`, `${Math.random() * 30 + 10}px`, `${Math.random() * 20 + 5}px`],
                          opacity: [0.6, 1, 0.6],
                        }}
                        transition={{
                          duration: 0.8,
                          repeat: Infinity,
                          repeatType: "reverse",
                          delay: i * 0.1
                        }}
                        className="w-1 bg-white rounded-full"
                      />
                    ))}
                  </div>
                )}
              </motion.button>
            </motion.div>
          </div>

          {/* Right column - Lottie animation */}
          <div className="flex-1 hidden lg:flex items-center justify-center relative">
            <div className="relative w-full max-w-2xl">
              <Lottie 
                lottieRef={lottieRef}
                animationData={animationData} 
                loop={true}
                className="w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-white/50 dark:to-black/50 rounded-full" />
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: 1, 
            y: 0,
            transition: { 
              delay: 1.5,
              duration: 0.8 
            }
          }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
        >
          <motion.div
            animate={{ 
              y: [0, 10, 0],
              opacity: [0.6, 1, 0.6]
            }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <ArrowDown className="text-gray-400 dark:text-gray-500" size={24} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;