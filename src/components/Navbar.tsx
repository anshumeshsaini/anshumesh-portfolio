import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Menu, X, Github, Linkedin, Twitter, Home, User, Code, Briefcase, Phone, Award, Sparkles, Command, Heart } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useThemeStore } from '../store/themeStore';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0, opacity: 0 });
  const navRef = useRef<HTMLDivElement>(null);
  const islandRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<Map<string, HTMLAnchorElement>>(new Map());
  const { theme } = useThemeStore();
  const location = useLocation();

  // Track scroll with magnetic island transition
  useEffect(() => {
    let rafId: number;
    let lastScrollY = 0;

    const handleScroll = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        if (Math.abs(currentScrollY - lastScrollY) > 5) {
          setScrolled(currentScrollY > 50);
          lastScrollY = currentScrollY;
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  useGSAP(() => {
    // Magnetic Island Transition
    if (scrolled) {
      gsap.to(islandRef.current, {
        width: "auto",
        maxWidth: "95%",
        padding: "8px 20px",
        borderRadius: "40px",
        backgroundColor: theme.isDark ? "rgba(15, 23, 42, 0.8)" : "rgba(255, 255, 255, 0.8)",
        backdropFilter: "blur(20px)",
        border: theme.isDark ? "1px solid rgba(255,255,255,0.05)" : "1px solid rgba(0,0,0,0.05)",
        y: 0,
        boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
        duration: 0.6,
        ease: "power4.out"
      });
    } else {
      gsap.to(islandRef.current, {
        width: "100%",
        maxWidth: "100%",
        padding: "20px 40px",
        borderRadius: "0px",
        backgroundColor: "transparent",
        backdropFilter: "blur(0px)",
        border: "none",
        y: 0,
        boxShadow: "none",
        duration: 0.6,
        ease: "power4.out"
      });
    }

    // Magnetic Links & Logo
    const magneticElements = gsap.utils.toArray('.magnetic-link');
    magneticElements.forEach((el: any) => {
      const xTo = gsap.quickTo(el, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
      const yTo = gsap.quickTo(el, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });

      el.addEventListener("mousemove", (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const { height, width, left, top } = el.getBoundingClientRect();
        const x = clientX - (left + width / 2);
        const y = clientY - (top + height / 2);
        xTo(x * 0.3);
        yTo(y * 0.3);
      });

      el.addEventListener("mouseleave", () => {
        xTo(0);
        yTo(0);
      });
    });
  }, [scrolled, theme.isDark]);

  // Update active link based on location
  useEffect(() => {
    setActiveLink(location.pathname);
    setIsOpen(false);
  }, [location]);

  // Update sliding indicator position
  useEffect(() => {
    const activeEl = linkRefs.current.get(activeLink);
    if (activeEl && islandRef.current) {
      const navRect = islandRef.current.getBoundingClientRect();
      const linkRect = activeEl.getBoundingClientRect();
      setIndicatorStyle({
        left: linkRect.left - navRect.left,
        width: linkRect.width,
        opacity: 1
      });
    } else {
      setIndicatorStyle(prev => ({ ...prev, opacity: 0 }));
    }
  }, [activeLink, scrolled]);

  const navLinks = [
    { name: 'Home', path: '/', icon: Home, desc: 'Start here' },
    { name: 'About', path: '/about', icon: User, desc: 'My story' },
    { name: 'Skills', path: '/skills', icon: Award, desc: 'Expertise' },
    { name: 'Projects', path: '/projects', icon: Briefcase, desc: 'Portfolio' },
    { name: 'Experience', path: '/experience', icon: Code, desc: 'Journey' },
    { name: 'Contact', path: '/contact', icon: Phone, desc: 'Connect' },
  ];

  const setLinkRef = useCallback((el: HTMLAnchorElement | null, path: string) => {
    if (el) linkRefs.current.set(path, el);
  }, []);

  const handleMouseEnter = (path: string) => {
    setHoveredLink(path);
    const el = linkRefs.current.get(path);
    if (el && islandRef.current) {
      const navRect = islandRef.current.getBoundingClientRect();
      const linkRect = el.getBoundingClientRect();
      setIndicatorStyle({
        left: linkRect.left - navRect.left,
        width: linkRect.width,
        opacity: 0.6
      });
    }
  };

  const handleMouseLeave = () => {
    setHoveredLink(null);
    const activeEl = linkRefs.current.get(activeLink);
    if (activeEl && islandRef.current) {
      const navRect = islandRef.current.getBoundingClientRect();
      const linkRect = activeEl.getBoundingClientRect();
      setIndicatorStyle({
        left: linkRect.left - navRect.left,
        width: linkRect.width,
        opacity: 1
      });
    } else {
      setIndicatorStyle(prev => ({ ...prev, opacity: 0 }));
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex justify-center pointer-events-none">
      <div
        ref={islandRef}
        className="nav-container w-full flex items-center justify-between pointer-events-auto transition-all"
      >

        {/* Logo with Human Status */}
        <Link
          to="/"
          className="magnetic-link group flex items-center gap-3 z-10"
          onClick={() => setActiveLink('/')}
        >

          <div className="hidden sm:block">
            <span className="text-sm font-black text-slate-900 dark:text-white leading-none">Anshumesh</span>
            <span className="block text-[8px] font-black uppercase tracking-widest text-indigo-500 mt-1 flex items-center">
              Exploring <Heart size={8} className="mx-1 animate-pulse fill-indigo-500" /> code
            </span>
          </div>
        </Link>

        {/* Desktop Navigation with sliding indicator */}
        <div
          className="hidden lg:flex items-center relative"
          onMouseLeave={handleMouseLeave}
        >
          {/* Active link glow / pill */}


          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = activeLink === link.path;

            return (
              <Link
                key={link.name}
                ref={(el) => setLinkRef(el, link.path)}
                to={link.path}
                className="magnetic-link relative px-4 py-2 mx-1 group"
                onMouseEnter={() => handleMouseEnter(link.path)}
                onClick={() => setActiveLink(link.path)}
              >
                <div className="flex items-center gap-2 relative z-10">
                  <Icon
                    size={16}
                    className={`transition-all duration-300 ${isActive
                      ? 'text-indigo-600 dark:text-indigo-400 scale-110'
                      : 'text-slate-500 dark:text-slate-400 group-hover:text-indigo-500 dark:group-hover:text-indigo-400'
                      }`}
                  />
                  <span className={`text-xs font-black uppercase tracking-widest transition-colors duration-300 ${isActive
                    ? 'text-slate-900 dark:text-white'
                    : 'text-slate-500 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white'
                    }`}>
                    {link.name}
                  </span>
                </div>

                {/* Tooltip */}
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-[8px] font-black uppercase tracking-tighter rounded-md opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 pointer-events-none">
                  {link.desc}
                </div>
              </Link>
            );
          })}
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-4">


          <button
            className="lg:hidden p-3 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900"
            onClick={() => setIsOpen(!isOpen)}
          >
            <Menu size={18} />
          </button>
        </div>
      </div>

      {/* Mobile Menu Portal */}
      <div
        className={`fixed inset-0 z-[100] lg:hidden transition-all duration-700 ${isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'
          }`}
      >
        <div className="absolute inset-0 bg-white dark:bg-slate-950 p-12 flex flex-col">
          <div className="flex justify-between items-center mb-20">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-500">Navigation Portal</span>
            <button
              onClick={() => setIsOpen(false)}
              className="p-4 rounded-3xl bg-slate-50 dark:bg-slate-900"
            >
              <X size={24} />
            </button>
          </div>

          <nav className="flex flex-col gap-8">
            {navLinks.map((link, i) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="text-5xl md:text-7xl font-black tracking-tighter text-slate-900 dark:text-white hover:text-indigo-500 transition-all flex items-center gap-6 group"
              >
                <span className="text-xl text-slate-300 dark:text-slate-700 italic font-serif">0{i + 1}.</span>
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="mt-auto pt-12 border-t border-slate-100 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex gap-6">
              <Github size={20} className="text-slate-400" />
              <Linkedin size={20} className="text-slate-400" />
              <Twitter size={20} className="text-slate-400" />
            </div>
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Crafted with passion</p>
          </div>
        </div>
      </div>

      <style>{`
        .nav-container {
          max-width: 1400px;
          margin: 0 auto;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;