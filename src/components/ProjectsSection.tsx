import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, ArrowRight, Sparkles, Cpu, Code2, Users, Rocket, Coffee } from 'lucide-react';
import { useProjectStore } from '../store/projectStore';
import { useThemeStore } from '../store/themeStore';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ProjectsSection: React.FC = () => {
  const { filteredProjects, activeFilter, setFilter } = useProjectStore();
  const [expandedDetails, setExpandedDetails] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const bgCanvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useThemeStore();

  useGSAP(() => {
    // Polaroid-style organic entrance
    gsap.from(".project-polaroid", {
      opacity: 0,
      scale: 0.8,
      y: 100,
      rotation: (i) => (i % 2 === 0 ? -10 : 10),
      duration: 1.2,
      stagger: 0.1,
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
      }
    });

    // Subtle continuous floating
    gsap.to(".project-polaroid", {
      rotation: (i) => (i % 2 === 0 ? "+=1" : "-=1"),
      y: "-=10",
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: 0.2
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
      canvas.height = sectionRef.current?.offsetHeight || 1200;
    };
    resize();
    window.addEventListener('resize', resize);

    let time = 0;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const auroras = [
        { y: 0.15, a: 60, f: 0.001, s: 0.001, c: [99, 102, 241], o: 0.04 },
        { y: 0.5, a: 80, f: 0.0012, s: 0.002, c: [168, 85, 247], o: 0.03 },
        { y: 0.85, a: 50, f: 0.0008, s: 0.0015, c: [129, 140, 248], o: 0.04 },
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

  const categories = [
    { id: 'all', name: 'All' },
    { id: 'frontend', name: 'Frontend' },
    { id: 'backend', name: 'Backend' },
    { id: 'fullstack', name: 'Full Stack' },
    { id: 'ai', name: 'AI/ML' },
  ];

  // Human-centric narratives for projects
  const behindTheBuild: Record<string, string> = {
    'ai-dashboard': "I built this because I was frustrated with complex data viz. I wanted something that felt like a conversation, not a spreadsheet.",
    'e-commerce': "The challenge here was scaling. I spent three days optimizing the state management just to make it feels 'buttery'. Worth it.",
    'portfolio': "This very portfolio. It's my digital playground where I test the limits of what's possible with code and design.",
  };

  const renderProjectArchitecture = (project: any) => (
    <motion.div
      initial={{ opacity: 0, scaleY: 0 }}
      animate={{ opacity: 1, scaleY: 1 }}
      exit={{ opacity: 0, scaleY: 0 }}
      className="mt-8 p-8 rounded-[2.5rem] bg-slate-100 dark:bg-[#0a0a0a] border border-slate-200 dark:border-white/5 shadow-inner"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h4 className="text-[10px] font-black uppercase tracking-widest text-indigo-500">The Human Takeaway</h4>
          <p className="text-sm text-slate-500 dark:text-slate-400 italic">
            "{behindTheBuild[project.id] || "This project taught me that the best code is the one that solves a real human problem."}"
          </p>
        </div>
        <div className="space-y-4">
          <h4 className="text-[10px] font-black uppercase tracking-widest text-purple-500">The Tech Stack</h4>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech: string, i: number) => (
              <span key={i} className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/5 text-[9px] font-black text-slate-500 tracking-tighter">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <section id="projects" ref={sectionRef} className="relative py-40 overflow-hidden bg-white dark:bg-[#030303] text-slate-900 dark:text-white transition-colors duration-500">
      <canvas ref={bgCanvasRef} className="absolute inset-0 z-0 opacity-40 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10" ref={containerRef}>
        <div className="flex flex-col items-center text-center mb-32 space-y-6">
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-500">
            Showcase / Lab
          </span>
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-none text-slate-900 dark:text-white">
            A <span className="text-indigo-600 italic font-serif">labor</span> of curiosity.
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl leading-relaxed font-medium">
            Every project here started as a late-night brainstorm or a problem I just couldn't ignore. These are my <span className="text-indigo-500">experiments</span> in creating things that matter.
          </p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-4 mb-24">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id)}
              className={`px-6 py-3 rounded-2xl font-black text-xs tracking-tight transition-all duration-300 ${activeFilter === cat.id ? 'bg-indigo-600 text-white shadow-xl scale-105' : 'bg-slate-100 dark:bg-[#0a0a0a] text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-white/5 hover:border-indigo-500/30'}`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                className="project-polaroid group flex flex-col"
              >
                <div className="p-4 bg-white dark:bg-slate-900 shadow-xl rounded-[2.5rem] border border-slate-100 dark:border-white/5 transition-all hover:shadow-2xl">
                  {/* Image Container */}
                  <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden mb-8">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-40" />
                    <div className="absolute top-6 right-6">
                      <div className="p-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl text-white">
                        <Rocket size={16} />
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="px-4 pb-4 space-y-6">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] font-black uppercase text-indigo-500 bg-indigo-500/10 px-2 py-0.5 rounded-md">
                          {project.category}
                        </span>
                        {project.featured && <Sparkles size={12} className="text-amber-500" />}
                      </div>
                      <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter leading-none group-hover:text-indigo-600 transition-colors">
                        {project.title}
                      </h3>
                    </div>

                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2 font-medium">
                      {project.description}
                    </p>

                    <div className="flex items-center justify-between pt-6 border-t border-slate-100 dark:border-white/5">
                      <div className="flex gap-4">
                        <a href={project.githubUrl} target="_blank" className="text-slate-400 hover:text-indigo-600 transition-colors">
                          <Github size={20} />
                        </a>
                        {project.liveUrl && (
                          <a href={project.liveUrl} target="_blank" className="text-slate-400 hover:text-indigo-600 transition-colors">
                            <ExternalLink size={20} />
                          </a>
                        )}
                      </div>
                      <button
                        onClick={() => setExpandedDetails(expandedDetails === project.id ? null : project.id)}
                        className="text-[10px] font-black uppercase tracking-widest text-indigo-600 flex items-center gap-2 hover:gap-3 transition-all"
                      >
                        {expandedDetails === project.id ? 'Close' : 'Behind the Build'}
                        <ArrowRight size={12} />
                      </button>
                    </div>

                    <AnimatePresence>
                      {expandedDetails === project.id && renderProjectArchitecture(project)}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Bottom Callout */}
        <div className="mt-40 text-center space-y-8 max-w-2xl mx-auto">
          <div className="inline-flex p-4 rounded-full bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-500/20">
            <Coffee className="text-indigo-600" />
          </div>
          <p className="text-xl font-medium italic text-slate-500 dark:text-slate-400">
            "Every project is a conversation between creativity and logic. I'm always looking for the next problem to solve."
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;