import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Instagram, Mail, Heart, Sparkles, Clock, Compass } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useThemeStore } from '../store/themeStore';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const Footer: React.FC = () => {
  const { theme } = useThemeStore();
  const bgCanvasRef = useRef<HTMLCanvasElement>(null);
  const footerRef = useRef<HTMLElement>(null);
  const [time, setTime] = useState(new Date().toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
    timeZone: 'Asia/Kolkata' // Assuming IST based on user's locale
  }));

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
        timeZone: 'Asia/Kolkata'
      }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useGSAP(() => {
    // Organic entrance for social links
    gsap.from(".footer-element", {
      opacity: 0,
      y: 20,
      rotation: (i) => (i % 2 === 0 ? -2 : 2),
      duration: 1,
      stagger: 0.1,
      scrollTrigger: {
        trigger: footerRef.current,
        start: "top 90%",
      }
    });

    // Subtle drift
    gsap.to(".social-icon", {
      rotation: (i) => (i % 2 === 0 ? "+=2" : "-=2"),
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: 0.2
    });
  }, { scope: footerRef });

  // Aurora Background logic
  useEffect(() => {
    const canvas = bgCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = footerRef.current?.offsetHeight || 600;
    };
    resize();
    window.addEventListener('resize', resize);

    let t = 0;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const auroras = [
        { y: 0.8, a: 40, f: 0.001, s: 0.001, c: [99, 102, 241], o: 0.03 },
        { y: 0.95, a: 60, f: 0.0015, s: 0.002, c: [168, 85, 247], o: 0.04 },
      ];
      auroras.forEach(a => {
        ctx.beginPath();
        const g = ctx.createLinearGradient(0, canvas.height * a.y - a.a, 0, canvas.height);
        g.addColorStop(0, `rgba(${a.c[0]}, ${a.c[1]}, ${a.c[2]}, ${a.o})`);
        g.addColorStop(1, 'transparent');
        ctx.fillStyle = g;
        for (let x = 0; x <= canvas.width; x += 15) {
          const y = canvas.height * a.y + Math.sin(x * a.f + t * a.s) * a.a;
          if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        ctx.lineTo(canvas.width, canvas.height); ctx.lineTo(0, canvas.height); ctx.fill();
      });
      t += 1;
      requestAnimationFrame(animate);
    };
    animate();
    return () => window.removeEventListener('resize', resize);
  }, []);

  const socialLinks = [
    { icon: <Github size={20} />, href: "https://github.com/anshumeshsaini", label: "GitHub" },
    { icon: <Linkedin size={20} />, href: "https://www.linkedin.com/in/anshumesh-saini-628760234/", label: "LinkedIn" },
    { icon: <Instagram size={20} />, href: "https://www.instagram.com/anshumesh.saini?igsh=OG5yeTRxYnZxN2Js", label: "Instagram" },
    { icon: <Mail size={20} />, href: "mailto:anshumeshsaini@gmail.com", label: "Email" }
  ];

  const pathways = [
    { name: "The Beginning", path: "/" },
    { name: "My Story", path: "/about" },
    { name: "My Tools", path: "/skills" },
    { name: "Creations", path: "/projects" },
    { name: "Journey", path: "/experience" },
  ];

  const scrollToTop = () => {
    (window as any).lenis?.scrollTo(0);
  };

  return (
    <footer
      ref={footerRef}
      className="relative pt-32 pb-16 overflow-hidden bg-white dark:bg-[#030303] text-slate-900 dark:text-white transition-colors duration-500"
    >
      <canvas ref={bgCanvasRef} className="absolute inset-0 z-0 opacity-40 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20">

          {/* Sincere Invitation */}
          <div className="col-span-1 lg:col-span-2 space-y-10 footer-element">
            <div className="space-y-4">
              <h3 className="text-4xl md:text-5xl font-black tracking-tighter text-slate-900 dark:text-white leading-[1.1]">
                Let's build something <span className="text-indigo-500 italic font-serif">human</span> together.
              </h3>
              <p className="text-lg text-slate-400 max-w-md leading-relaxed font-medium">
                I'm always open to new conversations, shared challenges, and late-night digital dreams. Reach out and say hi.
              </p>
            </div>

            <div className="flex flex-wrap gap-6">
              {socialLinks.map((social, i) => (
                <motion.a
                  key={i}
                  href={social.href}
                  target="_blank"
                  className="social-icon p-5 rounded-[2rem] bg-slate-100 dark:bg-[#0a0a0a] border border-slate-200 dark:border-white/5 text-slate-500 dark:text-slate-400 hover:text-indigo-500 transition-all shadow-sm hover:shadow-xl"
                  aria-label={social.label}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>

            <div className="flex items-center gap-4 p-4 rounded-3xl bg-indigo-900/10 border border-indigo-500/10 max-w-fit">
              <Clock size={16} className="text-indigo-500" />
              <span className="text-xs font-black uppercase tracking-widest text-slate-400">
                Local Time: {time} (IST)
              </span>
            </div>
          </div>

          {/* Pathways */}
          <div className="space-y-10 footer-element">
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Pathways</h4>
            <ul className="space-y-6">
              {pathways.map((link, i) => (
                <li key={i}>
                  <Link
                    to={link.path}
                    className="text-lg font-bold text-slate-400 hover:text-indigo-500 transition-colors flex items-center group"
                  >
                    <Compass size={14} className="mr-3 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Bottom Note / Ascend */}
          <div className="flex flex-col justify-between items-start md:items-end footer-element">
            <div className="space-y-6 text-left md:text-right">
              <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Ascend</h4>
              <button
                onClick={scrollToTop}
                className="group relative p-8 rounded-[3rem] bg-indigo-600 text-white overflow-hidden shadow-2xl transition-transform hover:scale-105 active:scale-95"
              >
                <span className="relative z-10 font-black text-xs uppercase tracking-[0.3em]">Back to Start</span>
                <div className="absolute inset-0 bg-indigo-500 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              </button>
            </div>

            <div className="pt-20 space-y-4 text-left md:text-right">
              <div className="flex items-center md:justify-end gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
                Handcrafted <Heart size={10} className="text-indigo-500 fill-indigo-500 animate-pulse" /> under the stars.
              </div>
              <div className="text-[10px] font-bold text-slate-500 dark:text-slate-700">
                ANSHUMESH © 2024
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Decorative Signature Grid */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-slate-200 dark:via-slate-800 to-transparent" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 p-2 bg-white dark:bg-slate-950 border border-slate-100 dark:border-transparent">
        <Sparkles size={12} className="text-indigo-500/20" />
      </div>
    </footer>
  );
};

export default Footer;