"use client";

import React, { useRef, useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSkillStore } from '../store/skillStore';
import { Zap } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

// Single Skill Node Component
const SkillNode: React.FC<{
  skill: any;
  isSelected: boolean;
  onSelect: () => void;
}> = ({ skill, isSelected, onSelect }) => {
  return (
    <div
      onClick={onSelect}
      className={`absolute cursor-pointer transition-transform duration-500 ${isSelected ? 'z-50' : 'z-10'}`}
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div
        className={`relative group flex flex-col items-center justify-center w-20 h-20 md:w-32 md:h-32 rounded-full border transition-all duration-500 ${isSelected
          ? 'bg-indigo-600/40 border-indigo-400 shadow-[0_0_50px_rgba(79,70,229,0.5)] scale-110'
          : 'bg-slate-900/90 border-white/5 shadow-lg hover:border-indigo-500/30'
          }`}
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />

        <div className="text-xl md:text-3xl font-black text-indigo-400 font-serif mb-1 group-hover:text-white transition-colors">
          {skill.name.charAt(0)}
        </div>
        <span className="text-[7px] md:text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-white transition-colors text-center px-1">
          {skill.name}
        </span>

        <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none">
          <circle cx="50%" cy="50%" r="48%" fill="none" stroke="rgba(255,255,255,0.02)" strokeWidth="1" />
          <circle
            cx="50%" cy="50%" r="48%" fill="none"
            stroke="currentColor" strokeWidth="1.5"
            strokeDasharray="100 100"
            strokeDashoffset={100 - skill.proficiency}
            className="text-indigo-500/30"
          />
        </svg>
      </div>
    </div>
  );
};

const SkillsSection: React.FC = () => {
  const { skills } = useSkillStore();
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);

  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const nodesRef = useRef<(HTMLDivElement | null)[]>([]);
  const linesRef = useRef<(SVGPathElement | null)[]>([]);

  // Persistent Orbital State
  const orbitalState = useMemo(() => {
    return skills.map((_, i) => ({
      angle: (i / skills.length) * Math.PI * 2,
      baseRadius: 300 + Math.random() * 300,
      speed: 0.0003 + Math.random() * 0.0007,
      yOffset: (Math.random() - 0.5) * 800,
      phase: Math.random() * Math.PI * 2,
    }));
  }, [skills.length]);

  useGSAP(() => {
    if (!containerRef.current) return;

    const mouse = { x: 0, y: 0, lerpX: 0, lerpY: 0 };
    const handleMouseMove = (e: MouseEvent) => {
      const { left, top, width, height } = containerRef.current!.getBoundingClientRect();
      mouse.x = (e.clientX - (left + width / 2)) / (width / 2);
      mouse.y = (e.clientY - (top + height / 2)) / (height / 2);
    };

    window.addEventListener('mousemove', handleMouseMove);

    const update = () => {
      const time = Date.now() * 0.001;
      const isMobile = window.innerWidth < 768;
      const radiusFactor = isMobile ? 0.6 : 1;

      mouse.lerpX += (mouse.x - mouse.lerpX) * 0.05;
      mouse.lerpY += (mouse.y - mouse.lerpY) * 0.05;

      skills.forEach((_, i) => {
        const nodeEl = nodesRef.current[i];
        const lineEl = linesRef.current[i];
        if (!nodeEl || !lineEl) return;

        const state = orbitalState[i];
        const currentAngle = state.angle + time * state.speed;

        let tx = Math.cos(currentAngle) * state.baseRadius * radiusFactor;
        let tz = Math.sin(currentAngle) * state.baseRadius * radiusFactor;
        let ty = state.yOffset * (isMobile ? 0.7 : 1) + Math.sin(time + state.phase) * 40;

        const dist = Math.sqrt((mouse.lerpX * 400 - tx) ** 2 + (mouse.lerpY * 400 - ty) ** 2);
        const force = Math.max(0, (500 - dist) / 500);
        tx += (mouse.lerpX * 400 - tx) * force * 0.3;
        ty += (mouse.lerpY * 400 - ty) * force * 0.3;

        const depth = (tz + 500) / 1000;
        const scale = (isMobile ? 0.4 : 0.5) + depth * (isMobile ? 0.6 : 0.8);
        const opacity = 0.15 + depth * 0.85;

        gsap.set(nodeEl, {
          x: tx, y: ty, z: tz,
          scale: scale,
          opacity: opacity,
        });

        if (opacity > 0.2) {
          lineEl.setAttribute('d', `M 0 0 L ${tx} ${ty}`);
          lineEl.setAttribute('stroke-opacity', (opacity * 0.1).toString());
        }
      });
    };

    gsap.ticker.add(update);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      gsap.ticker.remove(update);
    };
  }, { dependencies: [skills, orbitalState], scope: sectionRef });

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-slate-950 py-32 md:py-60"
      style={{ perspective: '3000px' }}
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vw] h-[150vh] bg-[radial-gradient(circle,rgba(79,70,229,0.04)_0%,transparent_70%)]" />
        <div className="stars-container absolute inset-0 opacity-20">
          {Array.from({ length: 40 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-twinkle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`
              }}
            />
          ))}
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-black uppercase tracking-[0.4em] text-[10px] mb-8"
        >
          <Zap size={14} className="fill-indigo-400" />
          <span>Technical Domain</span>
        </motion.div>

        <h2 className="text-5xl md:text-9xl font-black tracking-tighter text-white mb-6 leading-none filter drop-shadow-[0_0_30px_rgba(79,70,229,0.2)]">
          My digital <br /><span className="text-indigo-500 italic font-serif">arsenal</span>.
        </h2>
        <p className="text-base md:text-xl text-slate-500 font-medium leading-relaxed max-w-xl mx-auto opacity-80 px-4">
          A full-immersion technical cloud. Hover to explore the gravitational expertise field.
        </p>
      </div>

      {/* Expanded Canvas for Full Area Coverage */}
      <div className="relative flex-1 min-h-[60vh] md:min-h-[800px] w-full flex items-center justify-center pointer-events-auto mt-10 md:mt-20">

        {/* Connection Connections */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-visible" style={{ transformStyle: 'preserve-3d' }}>
          <svg className="w-full h-full overflow-visible" viewBox="-1000 -1000 2000 2000">
            {skills.map((_, i) => (
              <path
                key={`line-${i}`}
                ref={(el) => (linesRef.current[i] = el)}
                fill="none"
                stroke="rgba(99, 102, 241, 0.4)"
                strokeWidth="1"
                strokeDasharray="2,4"
              />
            ))}
          </svg>
        </div>

        {/* Dynamic Skill Constellation */}
        <div ref={containerRef} className="absolute inset-0 w-full h-full flex items-center justify-center transform-style-3d">
          {skills.map((skill, i) => (
            <div
              key={skill.id}
              ref={(el) => (nodesRef.current[i] = el)}
              className="absolute"
            >
              <SkillNode
                skill={skill}
                isSelected={selectedSkill === skill.id}
                onSelect={() => setSelectedSkill(selectedSkill === skill.id ? null : skill.id)}
              />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .transform-style-3d { transform-style: preserve-3d; }
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; transform: scale(0.7); }
          50% { opacity: 0.8; transform: scale(1.1); }
        }
        .animate-twinkle { animation: twinkle 5s ease-in-out infinite; }
      `}</style>
    </section>
  );
};

export default SkillsSection;