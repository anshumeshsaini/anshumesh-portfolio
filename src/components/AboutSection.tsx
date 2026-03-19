"use client";

import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Download, Github, Coffee, BookOpen, Heart, Music, Camera, MapPin, Terminal } from 'lucide-react';
import { useGithubStore } from '../store/githubStore';
import anshumesh from '../assets/anshumesh.png';
import '../css/about.css';
import { useThemeStore } from '../store/themeStore';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const AboutSection: React.FC = () => {
  const { fetchStats } = useGithubStore();
  const { theme } = useThemeStore();
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const xMarquee = useTransform(scrollYProgress, [0, 1], [0, -1000]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  // 3D Morphing Blob Logic
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = sectionRef.current?.offsetHeight || 1000;

    let time = 0;
    const points: { x: number, y: number, originX: number, originY: number, angle: number }[] = [];
    const pointsCount = 10;
    const radius = Math.min(width, height) * 0.25;

    for (let i = 0; i < pointsCount; i++) {
      const angle = (i / pointsCount) * Math.PI * 2;
      points.push({
        x: 0, y: 0,
        originX: Math.cos(angle) * radius,
        originY: Math.sin(angle) * radius,
        angle: angle
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.008;

      const centerX = width * 0.5;
      const centerY = height * 0.5;

      ctx.beginPath();
      points.forEach((p, i) => {
        const noise = Math.sin(time + i * 2) * 40 + Math.cos(time * 0.5 + i * 1.5) * 30;
        const r = radius + noise;
        p.x = centerX + Math.cos(p.angle + time * 0.05) * r;
        p.y = centerY + Math.sin(p.angle + time * 0.05) * r;

        if (i === 0) ctx.moveTo(p.x, p.y);
        else {
          const prevP = points[i - 1];
          const xc = (p.x + prevP.x) / 2;
          const yc = (p.y + prevP.y) / 2;
          ctx.quadraticCurveTo(prevP.x, prevP.y, xc, yc);
        }
      });

      const pFirst = points[0];
      const pLast = points[pointsCount - 1];
      const xc = (pFirst.x + pLast.x) / 2;
      const yc = (pFirst.y + pLast.y) / 2;
      ctx.quadraticCurveTo(pLast.x, pLast.y, xc, yc);
      ctx.closePath();

      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius * 2);
      gradient.addColorStop(0, 'rgba(99, 102, 241, 0.1)');
      gradient.addColorStop(1, 'transparent');
      ctx.fillStyle = gradient;
      ctx.fill();

      requestAnimationFrame(animate);
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = sectionRef.current?.offsetHeight || 1000;
    };

    window.addEventListener('resize', handleResize);
    animate();
    return () => window.removeEventListener('resize', handleResize);
  }, [theme.isDark]);

  useGSAP(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!profileRef.current) return;
      const rect = profileRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      gsap.to(profileRef.current, {
        rotateY: x * 15,
        rotateX: -y * 15,
        duration: 0.5,
        ease: "power2.out"
      });
    };

    const resetTilt = () => {
      gsap.to(profileRef.current, { rotateX: 0, rotateY: 0, duration: 1 });
    };

    const el = profileRef.current;
    el?.addEventListener('mousemove', handleMouseMove);
    el?.addEventListener('mouseleave', resetTilt);

    gsap.from(".reveal-about", {
      y: 40,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 65%"
      }
    });

    return () => {
      el?.removeEventListener('mousemove', handleMouseMove);
      el?.removeEventListener('mouseleave', resetTilt);
    };
  }, { scope: sectionRef });

  const humanStats = [
    { icon: <Coffee size={18} />, value: '1,200+', label: 'Coffee Cups' },
    { icon: <BookOpen size={18} />, value: '42+', label: 'Sci-Fi Books' },
    { icon: <Heart size={18} />, value: 'Infinite', label: 'Passion' },
    { icon: <Music size={18} />, value: 'Nightly', label: 'Jazz/Lofi' },
    { icon: <Camera size={18} />, value: 'Street', label: 'Photography' },
    { icon: <MapPin size={18} />, value: 'Global', label: 'Explorer' },
  ];

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-40 overflow-hidden bg-white dark:bg-[#030303] text-slate-900 dark:text-white transition-colors duration-500"
    >
      <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-24">

          {/* Clean Profile ID Column */}
          <div className="flex-1 relative perspective-1000">
            <div
              ref={profileRef}
              className="relative z-10 p-4 bg-white dark:bg-white/5 backdrop-blur-2xl border border-slate-200 dark:border-white/20 rounded-[3rem] shadow-2xl transition-transform transform-style-3d group"
            >
              <img
                src={anshumesh}
                alt="Anshumesh"
                className="w-full aspect-[4/5] object-cover rounded-[2.5rem] transition-all duration-700"
              />

              <div className="absolute -bottom-6 -right-6 p-6 bg-slate-900 dark:bg-slate-900 text-white rounded-3xl shadow-2xl border border-white/10 rotate-3 group-hover:rotate-0 transition-transform">
                <div className="flex items-center gap-3 mb-2 text-emerald-500">
                  <div className="w-2 h-2 rounded-full bg-current animate-pulse" />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em]">Verified Organic</span>
                </div>
                <h4 className="text-xl font-black italic">A_Saini</h4>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">S_ID: 99.42 // HUMANITY</p>
              </div>

              <div className="absolute -top-20 -left-20 w-80 h-80 bg-indigo-500/10 blur-[100px] rounded-full z-[-1]" />
            </div>
          </div>

          {/* About Content Column */}
          <div className="flex-1 space-y-12">
            <div className="space-y-6">
              <span className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.5em] text-indigo-500">
                <Terminal size={12} /> Biological Protocol
              </span>
              <h2 className="reveal-about text-5xl md:text-7xl font-black tracking-tighter leading-none text-slate-900 dark:text-white">
                Decoding the <span className="text-indigo-500 italic font-serif">human</span> <br /> inside the machine.
              </h2>
              <div className="reveal-about text-lg md:text-xl text-slate-600 dark:text-slate-400 leading-relaxed font-medium space-y-6">
                <p>
                  I'm <span className="text-slate-900 dark:text-white border-b-2 border-indigo-500/20">Anshumesh Saini</span>—a creator who believes code is more than logic; it's a form of poetry. My approach is rooted in the belief that technology should serve to amplify our humanity, not replace it.
                </p>
                <p>
                  Whether I'm architecting a complex backend or polishing a micro-interaction, my focus is always on the <span className="text-indigo-500">residue of experience</span>—how it makes someone feel.
                </p>
              </div>
            </div>

            {/* Life Stats Bento Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {humanStats.map((stat, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -6, scale: 1.05 }}
                  className="p-6 rounded-[2rem] bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex flex-col items-center justify-center text-center transition-all group relative shadow-lg hover:shadow-indigo-500/20 hover:border-indigo-500/30"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative z-10 p-3 rounded-2xl bg-white dark:bg-white/5 shadow-inner mb-3 text-indigo-500 transition-transform group-hover:rotate-12">{stat.icon}</div>
                  <div className="relative z-10 text-xl font-black text-slate-900 dark:text-white tracking-tighter">{stat.value}</div>
                  <div className="relative z-10 text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Signature & GitHub Integration */}
            <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-10 border-t border-slate-200 dark:border-white/10">
              <div className="flex flex-col gap-2">
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Hand-crafted by</p>
                <svg width="180" height="70" viewBox="0 0 180 70" className="text-indigo-500 fill-none stroke-current stroke-[1.5] overflow-visible">
                  <motion.path
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 2.5, ease: "circInOut" }}
                    d="M20,50 Q40,10 60,50 T100,50 T140,20"
                    className="opacity-20"
                  />
                  <text x="20" y="55" className="font-signature italic text-[38px]" fill="currentColor" stroke="none">
                    Anshumesh
                  </text>
                </svg>
              </div>

              <div className="flex items-center gap-4">
                <a href="https://github.com/anshumeshsaini" target="_blank" className="p-4 rounded-xl bg-slate-100 dark:bg-white/5 text-slate-500 hover:text-white hover:bg-slate-900 dark:hover:bg-indigo-600 transition-all shadow-md border border-slate-200 dark:border-white/10">
                  <Github size={20} />
                </a>
                <a
                  href="/resume.pdf"
                  className="group relative px-8 py-5 bg-indigo-500 text-white rounded-[2rem] font-black text-[10px] uppercase tracking-widest overflow-hidden transition-all hover:scale-105 shadow-xl"
                >
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform" />
                  <span className="relative z-10 flex items-center gap-3">Manifesto <Download size={14} /></span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background Kinetic Marquee */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden py-10 opacity-[0.03] dark:opacity-[0.07] pointer-events-none">
        <motion.div
          style={{ x: xMarquee }}
          className="flex whitespace-nowrap gap-20 text-[12vw] font-black text-slate-900 dark:text-white leading-none uppercase tracking-tighter select-none"
        >
          <span>Design • Code • Soul • Design • Code • Soul • Design • Code • Soul • Design • Code • Soul •</span>
        </motion.div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap');
        .transform-style-3d { transform-style: preserve-3d; }
        .perspective-1000 { perspective: 1000px; }
        .font-signature { font-family: 'Dancing Script', cursive; }
      `}</style>
    </section>
  );
};

export default AboutSection;