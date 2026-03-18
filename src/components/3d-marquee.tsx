"use client";

import { motion, AnimatePresence } from "framer-motion";
import React, { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Sparkles, Heart, Award, ArrowUpRight, X, Quote } from "lucide-react";

export interface MarqueeImage {
  src?: string;
  alt: string;
  imgElement?: React.ReactNode;
  href?: string;
  target?: "_blank" | "_self" | "_parent" | "_top";
  reflection?: string; // New: Human context
  category?: string;   // New: Categorization
  date?: string;       // New: When it happened
}

export interface ThreeDMarqueeProps {
  images: MarqueeImage[];
  className?: string;
  cols?: number;
  onImageClick?: (image: MarqueeImage, index: number) => void;
  title?: string;
  subtitle?: string;
}

export const ThreeDMarquee: React.FC<ThreeDMarqueeProps> = ({
  images,
  className = "",
  cols = 4,
  onImageClick,
  title = "Moments of Growth",
  subtitle = "A collection of milestones, lessons, and artifacts from my journey as a creator.",
}) => {
  const [selectedImage, setSelectedImage] = useState<{
    image: MarqueeImage;
    index: number;
  } | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Organic Drift Animation with GSAP
  useGSAP(() => {
    if (!marqueeRef.current) return;

    // Base Floating Animation
    gsap.to(marqueeRef.current, {
      y: "10px",
      rotationZ: "48deg", // Slight variation from base
      duration: 5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    // Individual Column Drifts
    const columns = marqueeRef.current.querySelectorAll('.marquee-column');
    columns.forEach((col, i) => {
      gsap.to(col, {
        y: i % 2 === 0 ? "-=40" : "+=40",
        duration: 20 + i * 5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    });

    // Magnetic Card Effect
    cardRefs.current.forEach((card) => {
      if (!card) return;

      const xTo = gsap.quickTo(card, "x", { duration: 0.6, ease: "power3" });
      const yTo = gsap.quickTo(card, "y", { duration: 0.6, ease: "power3" });

      card.addEventListener("mousemove", (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const { height, width, left, top } = card.getBoundingClientRect();
        const x = clientX - (left + width / 2);
        const y = clientY - (top + height / 2);
        xTo(x * 0.15);
        yTo(y * 0.15);
      });

      card.addEventListener("mouseleave", () => {
        xTo(0);
        yTo(0);
      });
    });
  }, { scope: containerRef });

  // Ensure we have enough images to fill complete rows
  const imagesPerRow = 4;
  const neededImages = Math.ceil(images.length / imagesPerRow) * imagesPerRow;
  const filledImages = [...images];
  while (filledImages.length < neededImages) {
    filledImages.push(...images.slice(0, neededImages - filledImages.length));
  }

  const duplicatedImages = [...filledImages, ...filledImages];
  const groupSize = Math.ceil(duplicatedImages.length / cols);
  const imageGroups = Array.from({ length: cols }, (_, index) =>
    duplicatedImages.slice(index * groupSize, (index + 1) * groupSize)
  );

  const handleImageClick = (image: MarqueeImage, globalIndex: number) => {
    if (onImageClick) {
      onImageClick(image, globalIndex);
    } else {
      setSelectedImage({ image, index: globalIndex });
    }
  };

  return (
    <section
      ref={containerRef}
      className={`relative w-full py-32 overflow-hidden bg-slate-50 dark:bg-slate-950/50 ${className}`}
    >
      {/* Decorative Human Textures */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none">
        <svg width="100%" height="100%">
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 text-indigo-500 font-black uppercase tracking-[0.2em] text-xs mb-4"
          >
            <Sparkles size={14} />
            <span>Growth Gallery</span>
          </motion.div>

          <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-slate-900 dark:text-white mb-6">
            {title}
          </h2>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 font-medium leading-relaxed max-w-2xl">
            {subtitle}
          </p>
        </div>

        {/* The 3D Canvas */}
        <div className="relative h-[700px] w-full perspective-[2000px]">
          <div
            ref={marqueeRef}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            style={{
              transform: "rotateX(55deg) rotateZ(45deg)",
              transformStyle: "preserve-3d"
            }}
          >
            <div className="grid grid-cols-4 gap-8 w-[120%] pointer-events-auto">
              {imageGroups.map((imagesInGroup, colIdx) => (
                <div
                  key={`col-${colIdx}`}
                  className="marquee-column flex flex-col gap-8"
                >
                  {imagesInGroup.map((image, imgIdx) => {
                    const globalIdx = colIdx * groupSize + imgIdx;
                    return (
                      <div
                        key={`card-${globalIdx}`}
                        ref={(el) => (cardRefs.current[globalIdx] = el)}
                        className="group relative"
                        onClick={() => handleImageClick(image, globalIdx)}
                      >
                        {/* The Card */}
                        <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-white dark:bg-slate-900 shadow-2xl transition-all duration-500 group-hover:shadow-[0_40px_80px_rgba(0,0,0,0.2)] dark:group-hover:shadow-[0_40px_80px_rgba(255,255,255,0.05)] border border-slate-200 dark:border-slate-800 cursor-none">
                          {image.imgElement ? (
                            image.imgElement
                          ) : image.src ? (
                            <img
                              src={image.src}
                              alt={image.alt}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-slate-100 dark:bg-slate-800">
                              <Award size={40} className="text-slate-300 dark:text-slate-600" />
                            </div>
                          )}

                          {/* Overlay Info */}
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-6 flex flex-col justify-end">
                            <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400 mb-1">
                              {image.category || "Achievement"}
                            </span>
                            <h4 className="text-white font-bold text-lg leading-tight mb-2">
                              {image.alt}
                            </h4>
                            <div className="flex items-center gap-2 text-white/60 text-xs">
                              <Heart size={12} className="fill-indigo-500/30" />
                              <span>{image.date || "Artifact"}</span>
                            </div>
                          </div>
                        </div>

                        {/* Custom Pointer (Only on this element) */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-indigo-500 rounded-full flex items-center justify-center text-white scale-0 group-hover:scale-100 transition-transform duration-300 pointer-events-none z-20">
                          <ArrowUpRight size={20} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Achievement Detail Portal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 md:p-12"
          >
            <div
              className="absolute inset-0 bg-slate-950/90 backdrop-blur-xl"
              onClick={() => setSelectedImage(null)}
            />

            <motion.div
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              className="relative w-full max-w-5xl bg-white dark:bg-slate-900 rounded-[2rem] overflow-hidden shadow-2xl flex flex-col md:flex-row"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-6 right-6 z-10 p-3 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-rose-500 transition-all"
              >
                <X size={20} />
              </button>

              {/* Media Section */}
              <div className="w-full md:w-1/2 h-[300px] md:h-auto bg-slate-100 dark:bg-slate-800 border-r border-slate-100 dark:border-white/5 overflow-hidden">
                {selectedImage.image.imgElement ? (
                  React.cloneElement(selectedImage.image.imgElement as React.ReactElement, {
                    className: "w-full h-full object-contain p-8",
                  })
                ) : selectedImage.image.src ? (
                  <img
                    src={selectedImage.image.src}
                    alt={selectedImage.image.alt}
                    className="w-full h-full object-contain p-8"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Award size={80} className="text-slate-200 dark:text-slate-700" />
                  </div>
                )}
              </div>

              {/* Story Section */}
              <div className="w-full md:w-1/2 p-10 md:p-16 flex flex-col justify-center">
                <div className="flex items-center gap-2 text-indigo-500 font-black uppercase tracking-widest text-[10px] mb-6">
                  <span className="w-8 h-px bg-indigo-500/30" />
                  <span>The Story Behind</span>
                </div>

                <h3 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-6">
                  {selectedImage.image.alt}
                </h3>

                <div className="relative mb-10">
                  <Quote className="absolute -top-4 -left-4 text-indigo-500/10 w-12 h-12" />
                  <p className="text-lg text-slate-600 dark:text-slate-400 italic font-serif leading-relaxed relative z-10">
                    {selectedImage.image.reflection || "This moment represents a significant leap in my learning path. It wasn't just about the result, but the nights spent diving deep into the logic and the satisfaction of finally seeing it click."}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-8 border-t border-slate-100 dark:border-white/5 pt-10">
                  <div>
                    <span className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Focus Area</span>
                    <span className="text-sm font-bold text-slate-900 dark:text-white">
                      {selectedImage.image.category || "Fullstack Mastery"}
                    </span>
                  </div>
                  <div>
                    <span className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Timeline</span>
                    <span className="text-sm font-bold text-slate-900 dark:text-white">
                      {selectedImage.image.date || "Continuous Mastery"}
                    </span>
                  </div>
                </div>

                {selectedImage.image.href && (
                  <a
                    href={selectedImage.image.href}
                    target={selectedImage.image.target || "_blank"}
                    rel="noopener noreferrer"
                    className="mt-12 inline-flex items-center justify-center gap-3 px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl font-black uppercase tracking-widest text-xs hover:scale-105 transition-all shadow-xl"
                  >
                    View Credential
                    <ArrowUpRight size={16} />
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};