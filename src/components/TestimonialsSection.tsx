import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Volume2, VolumeX, Quote } from 'lucide-react';
import { useTestimonialStore } from '../store/testimonialStore';

const TestimonialsSection: React.FC = () => {
  const { testimonials, currentIndex, nextTestimonial, prevTestimonial, setTestimonial } = useTestimonialStore();
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  
  // Auto-advance testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isSpeaking && !isHovering) {
        nextTestimonial();
      }
    }, 8000);
    
    return () => clearInterval(interval);
  }, [nextTestimonial, isSpeaking, isHovering]);

  const handleVoicePlayback = () => {
    if ('speechSynthesis' in window) {
      if (isSpeaking) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
        return;
      }
      
      setIsSpeaking(true);
      const speech = new SpeechSynthesisUtterance(testimonials[currentIndex].testimonial);
      speech.rate = 0.9;
      speech.pitch = 1;
      
      speech.onend = () => {
        setIsSpeaking(false);
      };
      
      window.speechSynthesis.speak(speech);
    }
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 1, ease: "easeOut" }
    }
  };

  return (
    <section id="testimonials" className="py-32 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 dark:opacity-5">
        <div className="absolute top-20 left-10 w-40 h-40 rounded-full bg-blue-500 blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-60 h-60 rounded-full bg-purple-500 blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px 0px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mb-20"
        >
          <div className="inline-block relative">
            <span className="absolute -bottom-1 left-0 w-full h-2 bg-blue-400/30 dark:bg-blue-600/30 rounded-full"></span>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white relative">
              <span className="relative z-10">Client Voices</span>
            </h2>
          </div>
          <motion.p 
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mt-6 leading-relaxed"
          >
            Hear what <span className="text-blue-500 font-medium">colleagues and clients</span> say about working with me.
          </motion.p>
        </motion.div>

        <div className="relative max-w-5xl mx-auto" 
             onMouseEnter={() => setIsHovering(true)}
             onMouseLeave={() => setIsHovering(false)}>
          {/* Testimonial Slider */}
          <div className="relative overflow-hidden rounded-3xl bg-white dark:bg-gray-800 shadow-2xl border border-gray-100 dark:border-gray-700">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="p-8 md:p-12"
              >
                <div className="flex flex-col md:flex-row items-start gap-8">
                  <div className="flex-shrink-0">
                    <div className="relative w-28 h-28 rounded-2xl overflow-hidden border-4 border-white dark:border-gray-700 shadow-lg">
                      <img
                        src={testimonials[currentIndex].image}
                        alt={testimonials[currentIndex].name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    </div>
                    {/* Rating on mobile */}
                    <div className="flex justify-center mt-4 md:hidden">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={20}
                          className={i < testimonials[currentIndex].rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 dark:text-gray-600'}
                        />
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex-1 relative">
                    {/* Quote icon */}
                    <Quote className="absolute -top-6 -left-2 text-gray-200 dark:text-gray-700 w-16 h-16 -z-10" />
                    
                    {/* Rating on desktop */}
                    <div className="hidden md:flex items-center mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={20}
                          className={i < testimonials[currentIndex].rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 dark:text-gray-600'}
                        />
                      ))}
                    </div>
                    
                    <blockquote className="text-xl text-gray-700 dark:text-gray-300 mb-8 leading-relaxed relative">
                      <span className="absolute -left-6 -top-4 text-5xl text-gray-200 dark:text-gray-700">"</span>
                      {testimonials[currentIndex].testimonial}
                      <span className="absolute -right-4 -bottom-6 text-5xl text-gray-200 dark:text-gray-700">"</span>
                    </blockquote>
                    
                    <div className="border-t border-gray-100 dark:border-gray-700 pt-6">
                      <h4 className="text-2xl font-bold text-gray-900 dark:text-white">
                        {testimonials[currentIndex].name}
                      </h4>
                      <p className="text-blue-600 dark:text-blue-400">
                        {testimonials[currentIndex].position} • {testimonials[currentIndex].company}
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Voice playback button */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleVoicePlayback}
                  className={`absolute top-6 right-6 p-3 rounded-xl ${
                    isSpeaking 
                      ? 'bg-blue-600 text-white shadow-lg' 
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 shadow-sm'
                  } transition-all duration-300`}
                  aria-label={isSpeaking ? "Stop playback" : "Listen to testimonial"}
                >
                  {isSpeaking ? <VolumeX size={24} /> : <Volume2 size={24} />}
                </motion.button>
              </motion.div>
            </AnimatePresence>
            
            {/* Navigation Buttons */}
            <div className="absolute bottom-6 right-6 flex space-x-3">
              <motion.button
                whileHover={{ scale: 1.1, backgroundColor: "rgba(37, 99, 235, 0.1)" }}
                whileTap={{ scale: 0.9 }}
                onClick={prevTestimonial}
                className="p-3 rounded-xl bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 shadow-sm border border-gray-200 dark:border-gray-600"
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={24} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1, backgroundColor: "rgba(37, 99, 235, 0.1)" }}
                whileTap={{ scale: 0.9 }}
                onClick={nextTestimonial}
                className="p-3 rounded-xl bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 shadow-sm border border-gray-200 dark:border-gray-600"
                aria-label="Next testimonial"
              >
                <ChevronRight size={24} />
              </motion.button>
            </div>
          </div>
          
          {/* Testimonial Indicators */}
          <div className="flex justify-center mt-8 space-x-3">
            {testimonials.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setTestimonial(index)}
                whileHover={{ scale: 1.2 }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentIndex === index
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 w-8'
                    : 'bg-gray-300 dark:bg-gray-600 w-3'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Client logos showcase */}
        {testimonials.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px 0px" }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-20"
          >
            <h3 className="text-center text-lg text-gray-500 dark:text-gray-400 mb-8 font-medium">
            
            </h3>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-80 hover:opacity-100 transition-opacity">
              {Array.from(new Set(testimonials.map(t => t.companyLogo)))
                .filter(logo => logo)
                .map((logo, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.1, y: -5 }}
                    className="h-12 grayscale hover:grayscale-0 transition-all duration-300"
                  >
                    <img 
                      src={logo} 
                      alt="Client company logo" 
                      className="h-full object-contain max-w-[120px]"
                    />
                  </motion.div>
                ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default TestimonialsSection;