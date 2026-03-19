"use client";

import { motion, AnimatePresence } from "framer-motion";
import React, { useState, useRef, useMemo } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Award, ArrowUpRight, X, Quote, Zap } from "lucide-react";

export interface MarqueeImage {
  src?: string;
  alt: string;
  imgElement?: React.ReactNode;
  href?: string;
  target?: "_blank" | "_self" | "_parent" | "_top";
  reflection?: string;
  category?: string;
  date?: string;
}

export interface ThreeDMarqueeProps {
  images: MarqueeImage[];
  className?: string;
  title?: string;
  subtitle?: string;
}

// Procedural Waving Tentacles Component
const Tentacles: React.FC<{ color: string; count: number; active: boolean }> = ({ color, count, active }) => {
  const lineRefs = useRef<(SVGPathElement | null)[]>([]);

  useGSAP(() => {
    lineRefs.current.forEach((line) => {
      if (!line) return;

      const tl = gsap.timeline({ repeat: -1 });
      const duration = 2 + Math.random() * 2;
      const wave = 10 + Math.random() * 20;

      tl.to(line, {
        attr: { d: `M 0 0 Q ${-wave} 25, 0 50 T 0 100` },
        duration: duration / 2,
        ease: "sine.inOut"
      }).to(line, {
        attr: { d: `M 0 0 Q ${wave} 25, 0 50 T 0 100` },
        duration: duration / 2,
        ease: "sine.inOut"
      });
    });
  }, { dependencies: [active] });

  return (
    <svg className="absolute top-full left-1/2 -translate-x-1/2 w-40 h-64 pointer-events-none opacity-20 overflow-visible" viewBox="-20 0 40 100">
      {Array.from({ length: count }).map((_, i) => (
        <path
          key={i}
          ref={(el) => (lineRefs.current[i] = el)}
          d="M 0 0 Q 0 25, 0 50 T 0 100"
          stroke={color}
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          style={{ transform: `rotate(${(i - (count - 1) / 2) * 15}deg)`, transformOrigin: 'top' }}
        />
      ))}
    </svg>
  );
};

export const ThreeDMarquee: React.FC<ThreeDMarqueeProps> = ({
  images,
  className = "",
  title = "Moments of Growth",
  subtitle = "A collection of milestones, lessons, and artifacts from my journey as a creator.",
}) => {
  const [selectedImage, setSelectedImage] = useState<{
    image: MarqueeImage;
    index: number;
  } | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Generate sentient physics properties
  const reefNodes = useMemo(() => {
    const expandedImages = [...images, ...images, ...images, ...images.slice(0, Math.floor(images.length / 2))];

    return expandedImages.map((img) => ({
      ...img,
      initialX: (Math.random() - 0.5) * 1200,
      initialY: (Math.random() - 0.5) * 900,
      initialZ: (Math.random() - 0.5) * 500,
      phase: Math.random() * Math.PI * 2,
      buoyancy: 0.2 + Math.random() * 0.8,
      rotation: Math.random() * 20 - 10,
    }));
  }, [images]);

  // Deep Sea Physics Engine
  useGSAP(() => {
    if (!containerRef.current) return;

    const mouse = { x: 0, y: 0 };
    const proxy = { distortion: 0 };

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { left, top, width, height } = containerRef.current!.getBoundingClientRect();
      mouse.x = (clientX - (left + width / 2)) / (width / 2);
      mouse.y = (clientY - (top + height / 2)) / (height / 2);
      gsap.to(proxy, { distortion: 1, duration: 1, ease: "power2.out" });
    };

    const handleMouseLeave = () => {
      gsap.to(proxy, { distortion: 0, duration: 2, ease: "power2.inOut" });
    };

    window.addEventListener("mousemove", handleMouseMove);
    containerRef.current.addEventListener("mouseleave", handleMouseLeave);

    // Liquid Physics Ticker
    gsap.ticker.add(() => {
      reefNodes.forEach((node, i) => {
        const card = cardRefs.current[i];
        if (!card) return;

        const time = Date.now() * 0.001;

        // Buoyancy/Current logic
        const bx = Math.sin(time * node.buoyancy + node.phase) * 30;
        const by = Math.cos(time * 0.8 * node.buoyancy + node.phase) * 40;

        // Cursor current influence
        const dist = Math.sqrt(mouse.x * mouse.x + mouse.y * mouse.y);
        const currentForce = proxy.distortion * (1 / (1 + dist * 2));

        const tx = node.initialX + bx + (mouse.x * 200 * currentForce);
        const ty = node.initialY + by + (mouse.y * 200 * currentForce);
        const tz = node.initialZ + Math.sin(time + i) * 50;

        const scale = gsap.utils.mapRange(-500, 500, 0.4, 1.4, tz);

        gsap.set(card, {
          x: tx,
          y: ty,
          z: tz,
          scale: scale,
          opacity: gsap.utils.mapRange(-500, 500, 0.4, 1, tz),
          rotateX: mouse.y * -20 * currentForce,
          rotateY: mouse.x * 20 * currentForce,
          rotateZ: node.rotation + Math.sin(time * 0.5) * 5,
        });
      });
    });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      containerRef.current?.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, { scope: containerRef, dependencies: [reefNodes] });

  return (
    <section
      ref={containerRef}
      className={`relative w-full py-60 overflow-hidden bg-slate-50 dark:bg-black transition-colors duration-1000 ${className}`}
      style={{ perspective: "2000px" }}
    >
      {/* Deep Sea Particles */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(79,70,229,0.1),transparent_70%)]" />
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [-10, -800],
              x: [0, (Math.random() - 0.5) * 200],
              opacity: [0, 0.5, 0]
            }}
            transition={{
              duration: 5 + Math.random() * 15,
              repeat: Infinity,
              delay: Math.random() * 5
            }}
            className="absolute w-1 h-1 bg-indigo-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              bottom: "-10%"
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10 pointer-events-none">
        <div className="max-w-4xl mx-auto text-center mb-60">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-black uppercase tracking-[0.4em] text-[10px] mb-12 shadow-[0_0_50px_rgba(79,70,229,0.2)]"
          >
            <Zap size={14} className="fill-indigo-500" />
            <span>The Memory Constellation</span>
          </motion.div>

          <h2 className="text-6xl md:text-9xl font-black tracking-tighter text-slate-900 dark:text-white mb-10 leading-none filter drop-shadow-[0_0_30px_rgba(79,70,229,0.3)]">
            {title}
          </h2>
          <p className="text-xl md:text-2xl text-slate-500 dark:text-slate-400 font-medium leading-relaxed max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        {/* The Reef Canvas */}
        <div className="relative h-[1000px] w-full flex items-center justify-center pointer-events-auto">
          <div className="relative w-full h-full flex items-center justify-center transform-style-3d">
            {reefNodes.map((node, i) => (
              <div
                key={`reef-node-${i}`}
                ref={(el) => (cardRefs.current[i] = el)}
                className="absolute group"
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Organism Tentacles */}
                <Tentacles color="#6366f1" count={3} active={!selectedImage} />

                <div
                  onClick={() => setSelectedImage({ image: node, index: i })}
                  className="relative w-56 md:w-80 aspect-[4/3] rounded-[2.5rem] overflow-hidden bg-slate-900 border-2 border-indigo-500/30 group-hover:border-indigo-400 shadow-[0_0_50px_rgba(79,70,229,0.2)] cursor-pointer transition-all duration-700 group-hover:shadow-[0_0_100px_rgba(79,70,229,0.4)]"
                >
                  {node.src ? (
                    <img
                      src={node.src}
                      alt={node.alt}
                      className="w-full h-full object-cover transition-all duration-1000 scale-105 group-hover:scale-100"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-slate-900">
                      <Award size={60} className="text-indigo-500/20" />
                    </div>
                  )}

                  {/* Biological Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-indigo-950/90 via-transparent to-transparent opacity-40 group-hover:opacity-100 transition-opacity duration-700" />

                  <div className="absolute bottom-6 left-6 right-6 flex flex-col gap-1 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-700 delay-100">
                    <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest leading-none mb-1">
                      {node.category || "Artifact"}
                    </span>
                    <h4 className="text-white font-black text-xl tracking-tighter leading-none">
                      {node.alt}
                    </h4>
                  </div>

                  {/* Bioluminescent Pulse */}
                  <div className="absolute inset-0 bg-indigo-500/5 mix-blend-color-dodge opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Submergence Detail Portal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 md:p-12 overflow-hidden"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 bg-black/95 backdrop-blur-[150px]"
              onClick={() => setSelectedImage(null)}
            />

            <motion.div
              initial={{ scale: 0.5, y: 300, opacity: 0, rotateX: -60 }}
              animate={{ scale: 1, y: 0, opacity: 1, rotateX: 0 }}
              exit={{ scale: 0.5, y: -300, opacity: 0, rotateX: 60 }}
              transition={{ type: "spring", damping: 25, stiffness: 120 }}
              className="relative w-full max-w-6xl bg-white dark:bg-[#0a0a0a] rounded-[4rem] overflow-hidden shadow-[0_0_150px_rgba(79,70,229,0.3)] flex flex-col lg:flex-row border border-slate-200 dark:border-indigo-500/20"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-10 right-10 z-[110] w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 text-indigo-500 hover:text-white hover:bg-indigo-600 transition-all flex items-center justify-center shadow-2xl border border-slate-200 dark:border-white/5"
              >
                <X size={28} />
              </button>

              <div className="w-full lg:w-1/2 h-[450px] lg:h-auto bg-slate-100 dark:bg-slate-950 relative overflow-hidden group">
                {selectedImage.image.src ? (
                  <img
                    src={selectedImage.image.src}
                    alt={selectedImage.image.alt}
                    className="w-full h-full object-contain p-16 transition-all duration-1000 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Award size={150} className="text-indigo-500/10" />
                  </div>
                )}
                {/* Cinematic Water Effect Overlay */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(79,70,229,0.1),transparent)]" />
              </div>

              <div className="w-full lg:w-1/2 p-16 md:p-24 flex flex-col justify-center bg-white dark:bg-[#0a0a0a]">
                <div className="flex items-center gap-4 text-indigo-500 font-black uppercase tracking-[0.5em] text-[10px] mb-12">
                  <span className="w-16 h-px bg-indigo-500/50" />
                  <span>Deep Sea Memory</span>
                </div>

                <h3 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white mb-10 tracking-tighter leading-[0.9]">
                  {selectedImage.image.alt}
                </h3>

                <div className="relative mb-16">
                  <Quote className="absolute -top-12 -left-12 text-indigo-500/5 w-32 h-32 rotate-12" />
                  <p className="text-2xl md:text-3xl text-slate-500 dark:text-slate-400 font-serif leading-relaxed relative z-10 italic">
                    {selectedImage.image.reflection || "A rare moment of breakthrough submerged in deep focus. This represents an evolution of creative identity."}
                  </p>
                </div>

                <div className="flex flex-wrap gap-16 border-t border-white/5 pt-16">
                  <div>
                    <span className="block text-[10px] font-black uppercase tracking-[0.3em] text-indigo-500 mb-4">Origin</span>
                    <span className="text-xl font-bold text-white italic">
                      {selectedImage.image.category || "Innovation"}
                    </span>
                  </div>
                  <div>
                    <span className="block text-[10px] font-black uppercase tracking-[0.3em] text-indigo-500 mb-4">Lifecycle</span>
                    <span className="text-xl font-bold text-white italic">
                      {selectedImage.image.date || "Evergreen"}
                    </span>
                  </div>
                </div>

                {selectedImage.image.href && (
                  <motion.a
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    href={selectedImage.image.href}
                    target={selectedImage.image.target || "_blank"}
                    rel="noopener noreferrer"
                    className="mt-20 inline-flex items-center justify-center gap-5 px-12 py-6 bg-indigo-600 text-white rounded-[2rem] font-black uppercase tracking-[0.3em] text-xs shadow-[0_25px_50px_rgba(79,70,229,0.4)] hover:bg-indigo-500 transition-all"
                  >
                    Dive into Artifact
                    <ArrowUpRight size={22} />
                  </motion.a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};