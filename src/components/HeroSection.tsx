import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Mic, MicOff } from 'lucide-react';
import { useThemeStore } from '../store/themeStore';
import { useNavigate } from 'react-router-dom';
import "./hero.css"

const HeroSection: React.FC = () => {
  const { theme } = useThemeStore();
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const navigate = useNavigate();

  // Canvas animation for interactive background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: { x: number; y: number; size: number; speedX: number; speedY: number; color: string }[] = [];
    const particleCount = 100;
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 5 + 1,
        speedX: Math.random() * 3 - 1.5,
        speedY: Math.random() * 3 - 1.5,
        color: theme.isDark ? '#ffffff' : '#3b82f6',
      });
    }
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      for (const particle of particles) {
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.speedX *= -1;
        }
        
        if (particle.y < 0 || particle.y > canvas.height) {
          particle.speedY *= -1;
        }
        
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = 0.3;
        ctx.fill();
      }
      
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

  // Voice introduction function
  const handleVoiceIntro = () => {
    if ('speechSynthesis' in window) {
      if (isSpeaking) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
        return;
      }
      
      setIsSpeaking(true);
      const speech = new SpeechSynthesisUtterance(
        "Welcome to my portfolio. I am Anshumesh Saini, a software engineer and freelancer specializing in full-stack development and AI integration."
      );
      
      speech.onend = () => {
        setIsSpeaking(false);
      };
      
      window.speechSynthesis.speak(speech);
    }
  };

  const handleViewProjects = () => {
    navigate('/projects'); // This will redirect to ProjectsSection.tsx
  };

  const handleContactMe = () => {
    window.location.href = 'mailto:anshumesh.saini@gmail.com';
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />
      
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-white dark:to-gray-900 z-10" />
      
      <div className="container mx-auto px-6 z-20">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-4 flex items-center space-x-2"
          >
            <span className="w-1 h-1 rounded-full bg-gray-400" />
          </motion.div>

          <motion.h1
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
              className="text-5xl md:text-7xl font-extrabold mb-8 tracking-wide text-center relative z-10"
          >
            <span className="bg-gradient-to-r from-indigo-500 via-sky-400 to-emerald-400 bg-clip-text text-transparent drop-shadow-[0_1.5px_3px_rgba(0,255,255,0.7)]">
              Anshumesh Saini
            </span>
            <span className="absolute -z-10 top-1/2 left-1/2 w-full h-full transform -translate-x-1/2 -translate-y-1/2 blur-2xl opacity-40 bg-gradient-to-r from-indigo-500 via-sky-400 to-emerald-400 rounded-full animate-pulse" />
          </motion.h1>

          <motion.h2
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
              className="text-2xl md:text-3xl font-semibold text-center mb-10 relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-400 animate-text-glow"
          >
            Full-Stack Developer
            <span className="absolute -z-10 top-1/2 left-1/2 w-full h-full transform -translate-x-1/2 -translate-y-1/2 blur-xl opacity-30 bg-gradient-to-r from-purple-400 via-pink-500 to-red-400 rounded-full animate-pulse" />
          </motion.h2>

          <motion.p
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
              className="text-lg md:text-xl leading-relaxed text-center max-w-3xl mx-auto mb-12 px-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 animate-text-fade drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]"
          >
            Crafting <span className="font-semibold">Next-Level Digital Experiences</span><br />
            <span className="bold">Expert in:</span> React, Mysql, scalable, high-performance web applications<br />
            <span className="bold">Passionate About:</span> Innovation, animations, and futuristic UI/UX
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6"
          >
            <motion.button
                whileHover={{ scale: 1.08, boxShadow: "0 0 20px rgba(0, 255, 255, 0.6)" }}
                whileTap={{ scale: 0.95 }}
                onClick={handleViewProjects}
                className="relative px-10 py-3 text-white bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full font-semibold shadow-xl transition-all duration-300 hover:from-blue-600 hover:to-purple-500 overflow-hidden z-10"
            >
              <span className="relative z-20"> View Projects</span>
              <span className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-30 blur-xl rounded-full animate-pulse z-0" />
            </motion.button>

            <motion.button
                whileHover={{ scale: 1.08, boxShadow: "0 0 12px rgba(255,255,255,0.3)" }}
                whileTap={{ scale: 0.95 }}
                onClick={handleContactMe}
                className="relative px-9 py-3 border border-white/30 rounded-full font-medium text-white backdrop-blur-md bg-white/5 dark:bg-white/10 text-sm shadow-md transition-all duration-300 hover:bg-white/10 hover:backdrop-blur-lg dark:hover:bg-white/20 overflow-hidden z-10"
            >
              <span className="relative z-20">Contact Me</span>
              <span className="absolute inset-0 rounded-full blur-xl opacity-20 bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-400 animate-glow z-0" />
            </motion.button>

            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleVoiceIntro}
                className={`relative p-4 rounded-full transition-all duration-300 
                  ${
                    isSpeaking
                      ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg animate-pulse-mic'
                      : 'border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }
                `}
            >
              {isSpeaking ? <MicOff size={22} /> : <Mic size={22} />}
              {isSpeaking && (
                <span className="absolute inset-0 rounded-full blur-xl bg-red-500 opacity-20 animate-mic-glow z-[-1]" />
              )}
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;