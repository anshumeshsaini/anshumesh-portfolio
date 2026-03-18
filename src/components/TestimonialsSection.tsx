import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Volume2, VolumeX, Heart, Sparkles } from 'lucide-react';
import { useTestimonialStore } from '../store/testimonialStore';
import { useThemeStore } from '../store/themeStore';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const TestimonialsSection: React.FC = () => {
  const { testimonials, currentIndex, nextTestimonial, prevTestimonial, setTestimonial } = useTestimonialStore();
  const [isSpeaking, setIsSpeaking] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const bgCanvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useThemeStore();

  useGSAP(() => {
    // Organic entrance for the main card
    gsap.from(".testimonial-card", {
      opacity: 0,
      scale: 0.95,
      rotation: 2,
      y: 40,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 75%",
      }
    });

    // Subtle floating
    gsap.to(".testimonial-card", {
      rotation: -1,
      y: "-=15",
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
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
      canvas.height = sectionRef.current?.offsetHeight || 800;
    };
    resize();
    window.addEventListener('resize', resize);

    let time = 0;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const auroras = [
        { y: 0.2, a: 50, f: 0.001, s: 0.001, c: [168, 85, 247], o: 0.03 },
        { y: 0.8, a: 60, f: 0.0015, s: 0.002, c: [99, 102, 241], o: 0.04 },
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

  const handleVoicePlayback = () => {
    if ('speechSynthesis' in window) {
      if (isSpeaking) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
        return;
      }
      setIsSpeaking(true);
      const speech = new SpeechSynthesisUtterance(testimonials[currentIndex].testimonial);
      speech.onend = () => setIsSpeaking(false);
      window.speechSynthesis.speak(speech);
    }
  };

  const reflections: Record<string, string> = {
    '0': "Working with this team felt like a masterclass in collaboration. We didn't just meet deadlines; we grew together.",
    '1': "I learned so much about user empathy during this project. It wasn't just about the features, but the people using them.",
    '2': "This was a highlight of my year. Pure creative energy and a shared pursuit of something different.",
  };

  return (
    <section id="testimonials" ref={sectionRef} className="relative py-40 overflow-hidden bg-white dark:bg-slate-950 transition-colors duration-500">
      <canvas ref={bgCanvasRef} className="absolute inset-0 z-0 opacity-40 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10" ref={containerRef}>
        <div className="flex flex-col items-center text-center mb-32 space-y-6">
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-purple-500">
            Voices / Shared Success
          </span>
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-none text-slate-900 dark:text-white">
            Kind words from <span className="text-purple-600 italic font-serif">colleagues</span>.
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed font-medium">
            Behind every line of code is a conversation. These are the reflections of the wonderful people I've had the pleasure to build with.
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="testimonial-card p-12 md:p-20 rounded-[4rem] bg-white dark:bg-slate-900 shadow-2xl border border-slate-100 dark:border-white/5 relative"
            >
              <div className="flex flex-col md:flex-row items-center md:items-start gap-16">
                <div className="flex-shrink-0 relative">
                  <div className="w-40 h-40 rounded-[2.5rem] overflow-hidden rotate-3 hover:rotate-0 transition-transform duration-500 border-4 border-white dark:border-slate-800 shadow-xl">
                    <img
                      src={testimonials[currentIndex].image}
                      alt={testimonials[currentIndex].name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-6 -right-6 p-4 bg-purple-500 rounded-2xl shadow-xl text-white">
                    <Heart size={20} />
                  </div>
                </div>

                <div className="flex-1 space-y-10">
                  <div className="space-y-6 relative">
                    <Sparkles className="absolute -top-12 -left-8 text-purple-500/10 w-24 h-24" />
                    <blockquote className="text-2xl md:text-4xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.1] italic">
                      "{testimonials[currentIndex].testimonial}"
                    </blockquote>
                    <div className="flex gap-1 text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} fill={i < testimonials[currentIndex].rating ? 'currentColor' : 'none'} />
                      ))}
                    </div>
                  </div>

                  {/* Personal Reflection */}
                  <div className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-white/5 shadow-inner">
                    <p className="text-xs italic text-slate-500 dark:text-slate-500">
                      <span className="font-black text-purple-500 mr-2 uppercase tracking-tighter not-italic">My Reflection //</span>
                      "{reflections[currentIndex] || "A truly memorable collaboration built on trust and shared vision."}"
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-10 border-t border-slate-100 dark:border-white/5">
                    <div>
                      <h4 className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter">{testimonials[currentIndex].name}</h4>
                      <p className="text-xs font-black uppercase tracking-widest text-purple-500 mt-1">
                        {testimonials[currentIndex].position} @ {testimonials[currentIndex].company}
                      </p>
                    </div>

                    <div className="flex gap-4">
                      <button onClick={handleVoicePlayback} className={`p-4 rounded-2xl border transition-all ${isSpeaking ? 'bg-purple-500 text-white border-purple-400' : 'bg-slate-50 dark:bg-slate-800 text-slate-400 border-slate-100 dark:border-white/5'}`}>
                        {isSpeaking ? <VolumeX size={20} /> : <Volume2 size={20} />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <div className="absolute top-1/2 -translate-y-1/2 -left-8 md:-left-16 flex flex-col gap-4">
                <button onClick={prevTestimonial} className="p-5 rounded-3xl bg-white dark:bg-slate-900 shadow-xl border border-slate-100 dark:border-white/5 text-slate-400 hover:text-purple-500 transition-all hover:scale-110">
                  <ChevronLeft size={24} />
                </button>
              </div>
              <div className="absolute top-1/2 -translate-y-1/2 -right-8 md:-right-16 flex flex-col gap-4">
                <button onClick={nextTestimonial} className="p-5 rounded-3xl bg-white dark:bg-slate-900 shadow-xl border border-slate-100 dark:border-white/5 text-slate-400 hover:text-purple-500 transition-all hover:scale-110">
                  <ChevronRight size={24} />
                </button>
              </div>

              {/* Thank You Signature */}
              <div className="absolute -bottom-8 right-12">
                <svg width="120" height="50" viewBox="0 0 120 50" className="text-purple-500 opacity-30">
                  <path d="M10,35 Q30,5 50,35 T90,35 T110,15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <text x="5" y="40" style={{ fontFamily: 'Dancing Script, cursive', fontSize: '24px', fill: 'currentColor' }}>Thank you</text>
                </svg>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Indicators */}
          <div className="flex justify-center mt-16 gap-3">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setTestimonial(i)}
                className={`h-1.5 rounded-full transition-all duration-500 ${currentIndex === i ? 'bg-purple-500 w-12' : 'bg-slate-200 dark:bg-slate-800 w-4'}`}
              />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap');
      `}</style>
    </section>
  );
};

export default TestimonialsSection;