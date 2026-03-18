import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Github, Coffee, BookOpen, Heart, Music, Camera, MapPin } from 'lucide-react';
import { useGithubStore } from '../store/githubStore';
import anshumesh from '../assets/anshumesh.jpeg';
import '../css/about.css';
import { useThemeStore } from '../store/themeStore';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const AboutSection: React.FC = () => {
  const { stats, fetchStats } = useGithubStore();
  const { theme } = useThemeStore();
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    fetchStats();
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [fetchStats]);

  useGSAP(() => {
    // Asymmetrical floating for cards
    gsap.to(".human-card", {
      rotation: (i) => (i % 2 === 0 ? 2 : -2),
      y: -10,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: 0.5
    });

    // Reveal animations
    gsap.from(".reveal-text", {
      y: 30,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
      }
    });
  }, { scope: sectionRef });

  // Aurora Background logic
  useEffect(() => {
    const canvas = canvasRef.current;
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
        { y: 0.3, a: 80, f: 0.001, s: 0.002, c: [99, 102, 241], o: 0.05 },
        { y: 0.7, a: 100, f: 0.0012, s: 0.003, c: [168, 85, 247], o: 0.04 },
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

  const humanStats = [
    { icon: <Coffee size={24} />, value: '1,200+', label: 'Cups of Coffee', color: 'from-amber-500 to-orange-600', desc: 'Fueling late-night ideas' },
    { icon: <BookOpen size={24} />, value: '42+', label: 'Books Read', color: 'from-emerald-500 to-teal-600', desc: 'Mostly Sci-Fi & Philosophy' },
    { icon: <Heart size={24} />, value: 'Infinite', label: 'Passion', color: 'from-rose-500 to-pink-600', desc: 'For details and quality' },
  ];

  const curiosities = [
    { icon: <Music size={16} />, text: "Jazz & Lofi enthusiast" },
    { icon: <Camera size={16} />, text: "Street photography" },
    { icon: <MapPin size={16} />, text: "Explorer of hidden alleys" },
  ];

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-40 overflow-hidden bg-white dark:bg-slate-950 transition-colors duration-500"
    >
      <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-40 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10" ref={containerRef}>
        <div className="flex flex-col lg:flex-row items-center gap-24">

          {/* Visual Column */}
          <div className="flex-1 relative">
            <motion.div
              initial={{ opacity: 0, rotate: -5 }}
              whileInView={{ opacity: 1, rotate: 0 }}
              transition={{ duration: 1 }}
              className="relative z-10"
            >
              <div className="p-3 bg-white dark:bg-slate-900 shadow-2xl rounded-[2rem] rotate-3 hover:rotate-0 transition-transform duration-500 overflow-hidden">
                <img
                  src={anshumesh}
                  alt="Anshumesh"
                  className="w-full aspect-[3/4] object-cover rounded-[1.5rem]"
                />
              </div>
              {/* Organic Overlays */}
              <div className="absolute -top-6 -left-6 p-4 bg-indigo-500 text-white rounded-full shadow-xl -rotate-12 animate-float">
                <span className="text-xs font-bold uppercase tracking-widest">Hello!</span>
              </div>
              <div className="absolute -bottom-10 -right-6 p-6 glass rounded-2xl border border-white/20 shadow-xl rotate-6 animate-float-delayed max-w-[180px]">
                <p className="text-[10px] uppercase font-black text-slate-500 dark:text-slate-400 mb-2 leading-none">Vibe Check</p>
                <div className="space-y-2">
                  {curiosities.map((c, i) => (
                    <div key={i} className="flex items-center gap-2 text-[10px] font-bold text-slate-900 dark:text-white">
                      <span className="text-indigo-500">{c.icon}</span>
                      {c.text}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Content Column */}
          <div className="flex-1 space-y-12">
            <div className="space-y-6">
              <span className="reveal-text inline-block text-[10px] font-black uppercase tracking-[0.4em] text-indigo-500">
                Identity / Story
              </span>
              <h2 className="reveal-text text-6xl md:text-7xl font-black tracking-tighter leading-none text-slate-900 dark:text-white">
                I'm just a <span className="text-indigo-500 italic font-serif">human</span> who loves to build.
              </h2>
              <div className="reveal-text space-y-6 text-xl text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                <p>
                  I'm <span className="text-slate-900 dark:text-white border-b-2 border-indigo-500/20">Anshumesh Saini</span>. Beyond the lines of code and the technical architectures, I'm someone who stands at the intersection of curiosity and creation.
                </p>
                <p>
                  I don't just "architect excellence"—I solve puzzles. To me, every project is a story waiting to be told, and code is the medium I use to bring that story to life. I believe the best digital experiences aren't just efficient; they're <span className="text-indigo-500">felt</span>.
                </p>
              </div>
            </div>

            {/* Organic Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {humanStats.map((stat, i) => (
                <div key={i} className="human-card group p-6 rounded-3xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-white/5 transition-all shadow-lg hover:shadow-2xl">
                  <div className={`p-3 rounded-2xl bg-gradient-to-br ${stat.color} w-fit shadow-lg mb-4 text-white`}>
                    {stat.icon}
                  </div>
                  <div className="text-3xl font-black text-slate-900 dark:text-white">{stat.value}</div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-1">{stat.label}</div>
                  <p className="text-[9px] text-slate-500 dark:text-slate-500 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    {stat.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Signature and CTA */}
            <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-12">
              <div className="space-y-4 text-center sm:text-left">
                <p className="text-xs font-black uppercase tracking-widest text-slate-400">Hand-crafted by</p>
                <svg width="150" height="60" viewBox="0 0 150 60" className="text-indigo-500 fill-none stroke-current stroke-2">
                  <motion.path
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                    d="M10,40 Q30,10 50,40 T90,40 T130,20"
                    className="opacity-50"
                  />
                  <text x="10" y="45" style={{ fontFamily: 'Dancing Script, cursive', fontSize: '32px' }} fill="currentColor" stroke="none">
                    Anshumesh
                  </text>
                </svg>
              </div>

              <div className="flex gap-4">
                <a href="https://github.com/anshumeshsaini" target="_blank" className="p-5 rounded-2xl glass border border-slate-200 dark:border-white/5 text-slate-500 hover:text-indigo-500 transition-all shadow-xl">
                  <Github size={24} />
                </a>
                <a href="/resume.pdf" download className="px-8 py-5 bg-indigo-500 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-2xl hover:bg-indigo-600 transition-all flex items-center gap-3">
                  <Download size={16} /> Get PDF
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap');
        
        .glass {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
        }
        .dark .glass {
          background: rgba(15, 23, 42, 0.3);
        }
        
        @keyframes morph {
          0%, 100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
          50% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(-12deg); }
          50% { transform: translateY(-10px) rotate(-8deg); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) rotate(6deg); }
          50% { transform: translateY(-15px) rotate(9deg); }
        }
        .animate-morph { animation: morph 15s ease-in-out infinite; }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-delayed { animation: float-delayed 5s ease-in-out infinite 1s; }
      `}</style>
    </section>
  );
};

export default AboutSection;