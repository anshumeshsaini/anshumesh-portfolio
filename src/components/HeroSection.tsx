"use client";

import React, { useRef, useState, useCallback } from 'react';
import { Sparkles, Pencil, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react';
import animationData from './Code.json';
import "../css/hero.css";
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const HeroSection: React.FC = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const lottieRef = useRef<any>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, lerpX: 0, lerpY: 0 });

  // GSAP Entrance and Interaction
  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });

    // Staggered Entrance
    tl.from(".brutalist-text", {
      y: 120,
      opacity: 0,
      rotateZ: (i) => (i % 2 === 0 ? -5 : 5),
      duration: 1.6,
      stagger: 0.1
    })
      .from(".scribble-path", {
        strokeDashoffset: 600,
        opacity: 0,
        duration: 2,
        ease: "power2.inOut",
        stagger: 0.3
      }, "-=1")
      .from(".lottie-polaroid", {
        x: 100,
        opacity: 0,
        rotate: 15,
        duration: 1.5
      }, "-=1.5")
      .from(".designer-tag", {
        scale: 0,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2
      }, "-=0.5");

    // Mouse Tracking for "Tactile Warp" and Parallax
    const handleMouseMove = (e: MouseEvent) => {
      const bounds = containerRef.current?.getBoundingClientRect();
      if (!bounds) return;
      mouseRef.current.x = (e.clientX - bounds.left) / bounds.width - 0.5;
      mouseRef.current.y = (e.clientY - bounds.top) / bounds.height - 0.5;
    };

    const ticker = () => {
      mouseRef.current.lerpX += (mouseRef.current.x - mouseRef.current.lerpX) * 0.08;
      mouseRef.current.lerpY += (mouseRef.current.y - mouseRef.current.lerpY) * 0.08;

      gsap.set(".tactile-layer", {
        x: mouseRef.current.lerpX * 40,
        y: mouseRef.current.lerpY * 40,
        rotateY: mouseRef.current.lerpX * 10,
        rotateX: -mouseRef.current.lerpY * 10
      });

      gsap.set(".warp-cursor", {
        left: (mouseRef.current.x + 0.5) * 100 + "%",
        top: (mouseRef.current.y + 0.5) * 100 + "%"
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    gsap.ticker.add(ticker);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      gsap.ticker.remove(ticker);
    };
  }, { scope: containerRef });

  const handleVoiceIntro = useCallback(() => {
    if (!('speechSynthesis' in window)) return;
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }
    setIsSpeaking(true);
    const speech = new SpeechSynthesisUtterance("Anshumesh Saini. Human-made through design and code.");
    speech.onend = () => setIsSpeaking(false);
    window.speechSynthesis.speak(speech);
  }, [isSpeaking]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white dark:bg-[#0a0a0a] px-6 py-20"
      style={{ perspective: '2000px' }}
    >
      {/* Analog Paper Texture Overlay */}
      <div className="absolute inset-0 z-50 pointer-events-none opacity-[0.04] mix-blend-multiply dark:mix-blend-screen overflow-hidden">
        <svg className="w-full h-full">
          <filter id="paperTexture">
            <feTurbulence type="fractalNoise" baseFrequency="0.6" numOctaves="3" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#paperTexture)" />
        </svg>
      </div>

      {/* Warp Cursor Effect */}
      <div className="warp-cursor absolute w-64 h-64 -translate-x-1/2 -translate-y-1/2 rounded-full border border-indigo-500/10 pointer-events-none z-10 blur-3xl mix-blend-overlay dark:mix-blend-soft-light bg-indigo-500/5 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="container mx-auto relative z-20">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-0">

          <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left space-y-16 max-w-5xl tactile-layer">
            <div className="relative">
              {/* Designer Scribbles */}
              <svg className="absolute -top-16 -left-12 w-32 h-32 text-indigo-500/20" viewBox="0 0 100 100">
                <path d="M10,90 Q50,10 90,90 T50,50" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="300" className="scribble-path" />
              </svg>

              <h1 ref={headlineRef} className="flex flex-col space-y-1 md:space-y-2">
                <span className="brutalist-text text-6xl sm:text-7xl md:text-8xl lg:text-[10rem] xl:text-[11rem] font-black tracking-tighter leading-none text-slate-900 dark:text-white uppercase select-none">
                  Anshumesh
                </span>
                <span className="brutalist-text relative flex items-center justify-center lg:justify-start gap-4">
                  <span className="font-serif italic text-5xl sm:text-6xl md:text-8xl lg:text-9xl text-indigo-500 tracking-tight leading-none lowercase">Saini</span>
                  {/* Red Pen Annotation */}
                  <div className="designer-tag absolute -bottom-8 right-0 md:right-auto md:left-full md:bottom-auto md:top-1/2 md:-translate-y-1/2 ml-0 md:ml-8 px-3 py-1 md:px-4 md:py-2 bg-pink-500 text-white text-[8px] md:text-[10px] font-black uppercase tracking-widest -rotate-6 shadow-xl z-30">
                    Verified ++ Human
                    <svg className="absolute -left-6 top-1/2 -translate-y-1/2 w-6 h-6 md:w-8 md:h-8 text-pink-500 hidden md:block" viewBox="0 0 40 40">
                      <path d="M40,20 L10,20 M20,10 L10,20 L20,30" fill="none" stroke="currentColor" strokeWidth="2" />
                    </svg>
                  </div>
                </span>
              </h1>
            </div>

            <div className="space-y-6 md:space-y-8 max-w-2xl">
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 md:gap-4">
                <span className="designer-tag px-4 py-1.5 md:px-6 md:py-2 border-2 border-slate-900 dark:border-white font-black uppercase text-[10px] md:text-xs tracking-widest rotate-2 hover:rotate-0 transition-transform">Full-Stack Architect</span>
                <span className="designer-tag px-4 py-1.5 md:px-6 md:py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-black uppercase text-[10px] md:text-xs tracking-widest -rotate-1 hover:rotate-0 transition-transform">AI Driven</span>
              </div>

              <p className="text-xl md:text-2xl lg:text-3xl font-medium text-slate-600 dark:text-slate-400 leading-tight tracking-tight px-4 md:px-0">
                I build <span className="text-slate-900 dark:text-white underline decoration-indigo-500 decoration-4 underline-offset-8">systems</span> that don't feel like systems. Hand-crafted logic for the modern web.
              </p>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 md:gap-8 pt-4 md:pt-8">
                <button
                  onClick={() => navigate('/projects')}
                  className="group flex items-center gap-4 md:gap-6 text-lg md:text-xl font-black uppercase tracking-[0.2em] text-slate-900 dark:text-white hover:text-indigo-500 transition-colors"
                >
                  View Handbook <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                </button>

                <button
                  onClick={handleVoiceIntro}
                  className={`p-4 md:p-6 rounded-[1.5rem] md:rounded-[2rem] border-2 transition-all ${isSpeaking ? 'bg-indigo-500 border-indigo-400 text-white animate-pulse' : 'bg-transparent border-slate-200 dark:border-white/10 text-slate-400 hover:border-slate-900 dark:hover:border-white'}`}
                >
                  {isSpeaking ? <Sparkles size={20} className="md:w-6 md:h-6" /> : <Pencil size={20} className="md:w-6 md:h-6" />}
                </button>
              </div>
            </div>
          </div>

          {/* Compositional Asymmetry: Scattered Polaroid Frame */}
          <div className="flex-1 hidden lg:flex items-center justify-end relative lg:-mr-32">
            <div className="lottie-polaroid relative w-[500px] aspect-[4/5] bg-white dark:bg-slate-900 p-8 pb-32 shadow-[40px_40px_0_rgba(99,102,241,0.1)] border border-slate-200 dark:border-white/5 rotate-12 hover:rotate-0 transition-transform duration-700">
              <div className="w-full h-full bg-slate-100 dark:bg-slate-950 flex items-center justify-center overflow-hidden">
                <Lottie lottieRef={lottieRef} animationData={animationData} loop={true} className="w-5/6 h-5/6 opacity-90 mix-blend-multiply dark:mix-blend-normal hover:scale-110 transition-transform duration-500" />
              </div>

              {/* Scribbled Label */}
              <div className="absolute bottom-8 left-8 right-8">
                <div className="flex items-center justify-between text-slate-400 dark:text-slate-600 font-serif italic text-xl">
                  <span>Code_Anatomy_v1</span>
                  <span className="text-indigo-500 font-black not-italic text-sm tracking-widest">00:45</span>
                </div>
                <div className="mt-2 w-full h-1 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div className="w-2/3 h-full bg-indigo-500 transition-all duration-1000" />
                </div>
              </div>

              {/* "Pinned" Note */}
              <div className="absolute -top-12 -left-12 w-48 h-48 bg-yellow-100 dark:bg-indigo-900/50 p-6 shadow-xl -rotate-12 hover:rotate-0 transition-transform">
                <p className="text-slate-900 dark:text-indigo-200 font-signature text-2xl leading-none">
                  Make it <br /> human. <br /> ++ Ansh
                </p>
                <div className="absolute top-2 left-1/2 -ml-4 w-8 h-2 bg-indigo-500/20 rounded-full" />
              </div>
            </div>
          </div>

        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap');
        .font-signature { font-family: 'Dancing Script', cursive; }
        
        .brutalist-text {
            text-shadow: 4px 4px 0px rgba(99, 102, 241, 0.1);
        }
      `}</style>
    </section>
  );
};

export default HeroSection;