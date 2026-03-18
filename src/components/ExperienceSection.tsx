import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useExperienceStore } from '../store/experienceStore';
import { useThemeStore } from '../store/themeStore';
import { Compass, Milestone, Coffee, Heart, Globe, Award } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ExperienceSection: React.FC = () => {
  const { experiences } = useExperienceStore();
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const bgCanvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useThemeStore();

  useGSAP(() => {
    // Animate the winding path on scroll
    gsap.from(pathRef.current, {
      strokeDashoffset: 1000,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 40%",
        end: "bottom 80%",
        scrub: 1,
      }
    });

    // Reveal experience cards with organic rotation
    gsap.utils.toArray('.exp-card').forEach((card: any, i) => {
      gsap.from(card, {
        y: 60,
        opacity: 0,
        rotation: i % 2 === 0 ? -3 : 3,
        duration: 1.2,
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      });

      // Continuous subtle float
      gsap.to(card, {
        y: "-=10",
        rotation: i % 2 === 0 ? "+=1" : "-=1",
        duration: 3 + i,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    });
  }, { scope: sectionRef });

  // Aurora Background logic
  useEffect(() => {
    const canvas = bgCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = sectionRef.current?.offsetHeight || 1200;
    };
    resize();
    window.addEventListener('resize', resize);

    let time = 0;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const auroras = [
        { y: 0.1, a: 50, f: 0.001, s: 0.001, c: [99, 102, 241], o: 0.04 },
        { y: 0.5, a: 70, f: 0.0015, s: 0.002, c: [168, 85, 247], o: 0.03 },
        { y: 0.9, a: 40, f: 0.0008, s: 0.001, c: [236, 72, 153], o: 0.04 },
      ];
      auroras.forEach(a => {
        ctx.beginPath();
        const g = ctx.createLinearGradient(0, canvas.height * a.y - a.a, 0, canvas.height);
        g.addColorStop(0, `rgba(${a.c[0]}, ${a.c[1]}, ${a.c[2]}, ${a.o})`);
        g.addColorStop(1, 'transparent');
        ctx.fillStyle = g;
        for (let x = 0; x <= canvas.width; x += 15) {
          const y = canvas.height * a.y + Math.sin(x * a.f + time * a.s) * a.a;
          if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        ctx.lineTo(canvas.width, canvas.height); ctx.lineTo(0, canvas.height); ctx.fill();
      });
      time += 1;
      requestAnimationFrame(animate);
    };
    animate();
    return () => window.removeEventListener('resize', resize);
  }, []);

  // Extra human context for experiences (Mocked as the store doesn't have it)
  const humanContext: Record<string, string> = {
    '1': "A period of intense learning and collaboration. Beyond the code, I discovered the power of a shared vision.",
    '2': "The highlight was leading a team through a critical launch—we survived on coffee and pure passion.",
    '3': "This is where I truly understood that good design is as much about empathy as it is about pixels.",
  };

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative py-40 overflow-hidden bg-white dark:bg-slate-950 transition-colors duration-500"
    >
      <canvas ref={bgCanvasRef} className="absolute inset-0 z-0 opacity-40 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10" ref={containerRef}>
        <div className="flex flex-col items-center text-center mb-32 space-y-6">
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-500">
            Roadmap / Chapters
          </span>
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-none text-slate-900 dark:text-white">
            The <span className="text-indigo-500 italic font-serif">chapters</span> of my growth.
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed font-medium">
            My career isn't just a series of job titles—it's a journey of <span className="text-indigo-500">shared lessons</span>, human connections, and the constant pursuit of better solutions.
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto min-h-[800px]">
          {/* Organic Winding Path SVG */}
          <div className="absolute left-8 md:left-1/2 md:-translate-x-1/2 top-0 h-full w-[100px] pointer-events-none overflow-visible">
            <svg width="100" height="100%" viewBox="0 0 100 1000" preserveAspectRatio="none" className="h-full w-full">
              <path
                ref={pathRef}
                d="M50,0 Q80,100 20,200 T50,400 T80,600 T20,800 T50,1000"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeDasharray="8 8"
                className="text-indigo-500/20 dark:text-indigo-500/10"
              />
            </svg>
          </div>

          <div className="space-y-40 relative">
            {experiences.map((exp, index) => (
              <div
                key={exp.id}
                className={`relative flex flex-col md:flex-row items-center gap-12 ${index % 2 === 0 ? '' : 'md:flex-row-reverse'}`}
              >
                {/* Milestone Marker */}
                <div className="absolute left-8 md:left-1/2 md:-translate-x-1/2 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-indigo-500 text-white flex items-center justify-center shadow-2xl z-20">
                    <Milestone size={24} />
                  </div>
                  <div className="absolute w-20 h-20 bg-indigo-500/20 rounded-full animate-ping" />
                </div>

                {/* Experience Card */}
                <div className={`exp-card flex-1 pl-24 md:pl-0 ${index % 2 === 0 ? 'md:pr-24' : 'md:pl-24'}`}>
                  <div className="p-10 rounded-[3rem] bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/5 shadow-xl hover:shadow-2xl transition-all relative overflow-hidden group">
                    <div className="absolute -top-12 -right-12 w-32 h-32 bg-indigo-500 opacity-[0.03] group-hover:opacity-[0.08] rounded-full transition-opacity" />

                    <div className="flex flex-col space-y-6">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black uppercase tracking-widest text-indigo-500 px-3 py-1 bg-indigo-500/10 rounded-full">
                          {exp.duration}
                        </span>
                        <div className="flex gap-2">
                          <Globe size={14} className="text-slate-300" />
                          <Award size={14} className="text-slate-300" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h3 className="text-3xl font-black text-slate-900 dark:text-white leading-none">{exp.position}</h3>
                        <p className="text-lg font-bold text-slate-400 italic font-serif">at {exp.company}</p>
                      </div>

                      <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                        {exp.description}
                      </p>

                      {/* Human Takeaway */}
                      <div className="p-6 rounded-2xl bg-white dark:bg-slate-950 border border-slate-100 dark:border-white/5 shadow-inner">
                        <p className="text-xs italic text-slate-500 dark:text-slate-400">
                          <span className="font-black text-indigo-500 mr-2 uppercase tracking-tighter not-italic">Key Takeaway //</span>
                          "{humanContext[exp.id] || "Growth is a collaborative effort."}"
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-2 pt-4">
                        {exp.technologies.map((tech, i) => (
                          <span key={i} className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-[10px] font-black tracking-widest text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-white/5">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="hidden md:block flex-1" />
              </div>
            ))}
          </div>
        </div>

        {/* Closing Thought */}
        <div className="mt-40 text-center space-y-8 max-w-2xl mx-auto">
          <div className="inline-flex p-4 rounded-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/5">
            <Compass className="text-indigo-500 animate-spin-slow" />
          </div>
          <p className="text-xl font-medium italic text-slate-500 dark:text-slate-400">
            "The journey never really ends; it just evolves into new landscapes and unexplored territories."
          </p>
        </div>
      </div>

      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow { animation: spin-slow 10s linear infinite; }
      `}</style>
    </section>
  );
};

export default ExperienceSection;