import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSkillStore } from '../store/skillStore';
import { Zap, Feather, Code2, Layers, Sparkles, BrainCircuit } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const SkillsSection: React.FC = () => {
  const { filteredSkills, activeFilter, setFilter } = useSkillStore();
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const bgCanvasRef = useRef<HTMLCanvasElement>(null);

  useGSAP(() => {
    // Asymmetrical floating for skill cards
    gsap.to(".skill-card", {
      rotation: (i) => (i % 2 === 0 ? 1.5 : -1.5),
      y: (i) => (i % 2 === 0 ? -8 : -12),
      duration: 3 + Math.random(),
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: 0.2
    });

    // Reveal animations
    gsap.from(".reveal-element", {
      y: 40,
      opacity: 0,
      duration: 1,
      stagger: 0.1,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
      }
    });
  }, { scope: sectionRef });

  // Aurora Background
  useEffect(() => {
    const canvas = bgCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = sectionRef.current?.offsetHeight || 800;
    };
    resize();
    window.addEventListener('resize', resize);

    let time = 0;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const auroras = [
        { y: 0.2, a: 60, f: 0.001, s: 0.002, c: [168, 85, 247], o: 0.04 },
        { y: 0.6, a: 80, f: 0.0012, s: 0.0015, c: [99, 102, 241], o: 0.05 },
      ];
      auroras.forEach(a => {
        ctx.beginPath();
        const g = ctx.createLinearGradient(0, canvas.height * a.y - a.a, 0, canvas.height);
        g.addColorStop(0, `rgba(${a.c[0]}, ${a.c[1]}, ${a.c[2]}, ${a.o})`);
        g.addColorStop(1, 'transparent');
        ctx.fillStyle = g;
        for (let x = 0; x <= canvas.width; x += 10) {
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

  const categories = [
    { id: 'all', name: 'All', icon: <Sparkles size={14} />, insight: "A versatile toolkit for end-to-end digital creation." },
    { id: 'frontend', name: 'Frontend', icon: <Feather size={14} />, insight: "Crafting interfaces that breathe and speak to users." },
    { id: 'backend', name: 'Backend', icon: <Code2 size={14} />, insight: "Building the resilient heart of every application." },
    { id: 'database', name: 'Database', icon: <Layers size={14} />, insight: "Architecting speed and data integrity." },
    { id: 'devops', name: 'DevOps', icon: <Zap size={14} />, insight: "Automating the path to production excellence." },
    { id: 'ai', name: 'AI/ML', icon: <BrainCircuit size={14} />, insight: "Merging code with cognitive intelligence." },
  ];

  const exploring = [
    { name: "Web3/Solidity", status: "Diving deep" },
    { name: "Advanced GLSL", status: "Experimenting" },
    { name: "Rust", status: "Learning" },
  ];

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-40 overflow-hidden bg-white dark:bg-slate-950 transition-colors duration-500"
    >
      <canvas ref={bgCanvasRef} className="absolute inset-0 z-0 opacity-40 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center mb-24 space-y-6">
          <span className="reveal-element text-[10px] font-black uppercase tracking-[0.4em] text-indigo-500">
            My Workbench / The Craft
          </span>
          <h2 className="reveal-element text-5xl md:text-7xl font-black tracking-tighter leading-none text-slate-900 dark:text-white">
            The <span className="text-indigo-500 italic font-serif">brushes</span> I use to build.
          </h2>
          <p className="reveal-element text-xl text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed font-medium">
            To me, technology isn't just a list of proficiencies—it's a collection of tools, each hand-picked for its ability to turn an idea into a <span className="text-indigo-500">meaningful digital reality</span>.
          </p>
        </div>

        {/* Categories with Human Insight */}
        <div className="reveal-element flex flex-wrap justify-center gap-4 mb-16">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id)}
              className={`group flex items-center gap-3 px-6 py-3 rounded-2xl font-bold text-xs tracking-tight transition-all duration-300 ${activeFilter === cat.id ? 'bg-indigo-500 text-white shadow-xl scale-105' : 'bg-slate-50 dark:bg-slate-900/50 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-white/5 hover:border-indigo-500/30'}`}
            >
              {cat.icon}
              {cat.name}
            </button>
          ))}
        </div>

        <div className="reveal-element max-w-lg mx-auto mb-20 text-center animate-fade-in">
          <p className="text-xs italic text-slate-400 dark:text-slate-500">
            "{categories.find(c => c.id === activeFilter)?.insight}"
          </p>
        </div>

        {/* Skills Workbench Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 mb-32">
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill) => (
              <motion.div
                key={skill.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={() => setSelectedSkill(selectedSkill === skill.id ? null : skill.id)}
                className={`skill-card p-6 rounded-3xl cursor-pointer transition-all border ${selectedSkill === skill.id ? 'bg-indigo-500/5 border-indigo-500/40 shadow-2xl scale-105' : 'bg-white dark:bg-slate-900 shadow-sm border-slate-200 dark:border-white/5 hover:shadow-xl'}`}
              >
                <div className="flex flex-col items-center gap-4">
                  <div className="text-2xl font-black text-indigo-500 font-serif">
                    {skill.name.charAt(0)}
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-indigo-500 transition-colors">
                    {skill.name}
                  </span>
                </div>
                {selectedSkill === skill.id && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 space-y-2">
                    <div className="flex justify-between text-[10px] font-black text-indigo-500">
                      <span>Proficiency</span>
                      <span>{skill.proficiency}%</span>
                    </div>
                    <div className="h-1 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-indigo-500" style={{ width: `${skill.proficiency}%` }} />
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Continuous Journey */}
        <div className="reveal-element p-12 rounded-[3rem] bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="space-y-4 text-center md:text-left">
              <h3 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">Currently Exploring</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm">
                The craft never stops evolving. Here's what I'm currently adding to my bench.
              </p>
            </div>
            <div className="flex flex-wrap gap-4 justify-center md:justify-end">
              {exploring.map((exp, i) => (
                <div key={i} className="px-6 py-4 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-white/10 shadow-sm text-center">
                  <div className="text-xs font-black text-slate-900 dark:text-white mb-1">{exp.name}</div>
                  <div className="text-[9px] font-black uppercase tracking-widest text-indigo-500">{exp.status}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes morph {
          0%, 100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
          50% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
        }
        .animate-morph { animation: morph 15s ease-in-out infinite; }
      `}</style>
    </section>
  );
};

export default SkillsSection;