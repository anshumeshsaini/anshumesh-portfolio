import React, { useEffect, useRef, useState, useCallback } from 'react';
import { ArrowDown, Mic, MicOff } from 'lucide-react';
import { useThemeStore } from '../store/themeStore';
import { useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react';
import animationData from './Code.json';
import "../css/hero.css";
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const HeroSection: React.FC = () => {
  const { theme } = useThemeStore();
  const [isSpeaking, setIsSpeaking] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const lottieRef = useRef<any>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadlineRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const cloudsRef = useRef<HTMLDivElement>(null);

  // GSAP Entrance and Parallax Animations
  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

    // Entrance sequence
    tl.from(headlineRef.current, {
      y: 100,
      opacity: 0,
      duration: 1.2,
      stagger: 0.2
    })
      .from(subheadlineRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.8
      }, "-=0.8")
      .from(descriptionRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8
      }, "-=0.6")
      .from(ctaRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.8
      }, "-=0.4");

    // Parallax for Background Clouds
    gsap.to(cloudsRef.current, {
      y: (index, target) => {
        const speed = target.dataset.speed || 0.2;
        return window.innerHeight * speed;
      },
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });

    // Subtle floating for Lottie container
    gsap.to(".lottie-frame", {
      y: -20,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
  }, { scope: containerRef });

  // Aurora Canvas Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const auroras = [
      { y: 0.2, amplitude: 120, frequency: 0.0015, speed: 0.005, color: [99, 102, 241], opacity: 0.12 },
      { y: 0.4, amplitude: 90, frequency: 0.002, speed: 0.008, color: [168, 85, 247], opacity: 0.1 },
      { y: 0.6, amplitude: 140, frequency: 0.001, speed: 0.004, color: [236, 72, 153], opacity: 0.08 },
      { y: 0.8, amplitude: 80, frequency: 0.0025, speed: 0.006, color: [168, 85, 247], opacity: 0.09 }, // Purple replacing Cyan
    ];

    let time = 0;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const vignette = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, canvas.width * 0.8
      );
      vignette.addColorStop(0, theme.isDark ? 'rgba(15, 23, 42, 0)' : 'rgba(248, 250, 252, 0)');
      vignette.addColorStop(1, theme.isDark ? 'rgba(2, 6, 23, 0.4)' : 'rgba(241, 245, 249, 0.6)');
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      auroras.forEach((aurora, i) => {
        ctx.beginPath();
        const gradient = ctx.createLinearGradient(0, canvas.height * aurora.y - aurora.amplitude, 0, canvas.height);
        const r = aurora.color[0] + Math.sin(time * 0.01 + i) * 20;
        const g = aurora.color[1] + Math.cos(time * 0.008 + i) * 20;
        const b = aurora.color[2];
        gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${aurora.opacity})`);
        gradient.addColorStop(0.5, `rgba(${r}, ${g}, ${b}, ${aurora.opacity * 0.5})`);
        gradient.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient;
        for (let x = 0; x <= canvas.width; x += 3) {
          const y = canvas.height * aurora.y +
            Math.sin(x * aurora.frequency + time * aurora.speed) * aurora.amplitude +
            Math.sin(x * aurora.frequency * 2.5 + time * aurora.speed * 0.7) * (aurora.amplitude * 0.4);
          if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        ctx.lineTo(canvas.width, canvas.height); ctx.lineTo(0, canvas.height); ctx.fill();
      });
      time += 1;
      animationRef.current = requestAnimationFrame(animate);
    };
    animate();
    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [theme.isDark]);

  const handleVoiceIntro = useCallback(() => {
    if (!('speechSynthesis' in window)) return;
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }
    setIsSpeaking(true);
    const speech = new SpeechSynthesisUtterance(
      "Welcome to my digital universe. I'm Anshumesh Saini - architecting the future through code and creativity."
    );
    speech.onend = () => setIsSpeaking(false);
    window.speechSynthesis.speak(speech);
  }, [isSpeaking]);

  const handleViewProjects = () => navigate('/projects');
  const handleContactMe = () => window.location.href = 'mailto:anshumesh.saini@gmail.com';

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-50 dark:bg-slate-950"
    >
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />

      {/* Parallax Gradient Mesh Clouds */}
      <div ref={cloudsRef} className="absolute inset-0 z-1 overflow-hidden pointer-events-none">
        <div
          data-speed="0.3"
          className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full blur-[100px] opacity-40 animate-morph"
          style={{ background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.4) 0%, rgba(168, 85, 247, 0.3) 100%)' }}
        />
        <div
          data-speed="0.1"
          className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full blur-[120px] opacity-30 animate-morph-delayed"
          style={{ background: 'linear-gradient(225deg, rgba(236, 72, 153, 0.3) 0%, rgba(99, 102, 241, 0.2) 100%)' }}
        />
      </div>

      {/* Noise Texture */}
      <div className="absolute inset-0 z-2 opacity-[0.015] dark:opacity-[0.03] pointer-events-none">
        <svg className="w-full h-full">
          <filter id="noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noise)" />
        </svg>
      </div>

      <div className="container mx-auto px-6 z-20 relative">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
          <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left space-y-8 max-w-3xl">
            <h1 ref={headlineRef} className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-none">
              <span className="block text-slate-900 dark:text-white mb-2">Anshumesh</span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 via-pink-500 to-orange-500 animate-gradient-shift bg-[length:300%_300%]">Saini</span>
            </h1>

            <div ref={subheadlineRef} className="flex flex-col sm:flex-row items-center gap-4 text-2xl md:text-3xl">
              <span className="font-light text-slate-600 dark:text-slate-400">Full-Stack</span>
              <span className="hidden sm:block w-12 h-px bg-slate-400 animate-pulse" />
              <span className="font-semibold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600">AI Architect</span>
            </div>

            <p ref={descriptionRef} className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
              I craft <span className="font-bold text-indigo-500">digital ecosystems</span> where design intelligence meets <span className="font-bold text-pink-500">computational artistry</span>.
            </p>

            <div ref={ctaRef} className="flex flex-col sm:flex-row items-center gap-6 pt-4">
              <button
                onClick={handleViewProjects}
                className="group relative px-10 py-5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-black uppercase text-xs tracking-widest overflow-hidden transition-all hover:scale-105 shadow-2xl"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="relative z-10 flex items-center gap-3">Explore Work <ArrowDown size={14} /></span>
              </button>

              <button
                onClick={handleContactMe}
                className="group px-10 py-5 rounded-2xl font-black uppercase text-xs tracking-widest border-2 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white hover:border-indigo-500 transition-all hover:scale-105"
              >
                Start a Project
              </button>

              <button
                onClick={handleVoiceIntro}
                className={`p-5 rounded-2xl transition-all hover:scale-110 ${isSpeaking ? 'bg-indigo-500 text-white animate-pulse' : 'bg-white dark:bg-slate-800 text-slate-600 border border-slate-200 dark:border-slate-700'}`}
              >
                {isSpeaking ? <MicOff size={24} /> : <Mic size={24} />}
              </button>
            </div>
          </div>

          <div className="flex-1 hidden lg:flex items-center justify-center relative lottie-frame">
            <div className="relative w-full max-w-lg aspect-square">
              <div className="absolute inset-0 rounded-full border border-slate-200/50 dark:border-slate-700/50 animate-spin-slow" />
              <div className="absolute inset-12 rounded-3xl bg-white/10 dark:bg-white/5 backdrop-blur-2xl border border-white/20 dark:border-white/10 shadow-2xl overflow-hidden p-8">
                <Lottie lottieRef={lottieRef} animationData={animationData} loop={true} className="w-full h-full" />
              </div>
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-indigo-500 opacity-20 blur-3xl rounded-full" />
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-purple-500 opacity-20 blur-3xl rounded-full" />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes morph {
          0%, 100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
          50% { border-radius: 50% 60% 30% 60% / 30% 60% 70% 40%; }
        }
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-morph { animation: morph 20s ease-in-out infinite; }
        .animate-morph-delayed { animation: morph 25s ease-in-out infinite 5s; }
        .animate-gradient-shift { animation: gradient-shift 8s ease infinite; }
        .animate-spin-slow { animation: spin-slow 30s linear infinite; }
      `}</style>
    </section>
  );
};

export default HeroSection;