import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Volume2, VolumeX } from 'lucide-react';
import { useTestimonialStore } from '../store/testimonialStore';

const TestimonialsSection: React.FC = () => {
  const { testimonials, currentIndex, nextTestimonial, prevTestimonial, setTestimonial } = useTestimonialStore();
  const [isSpeaking, setIsSpeaking] = React.useState(false);
  
  // Auto-advance testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isSpeaking) {
        nextTestimonial();
      }
    }, 8000);
    
    return () => clearInterval(interval);
  }, [nextTestimonial, isSpeaking]);

  const handleVoicePlayback = () => {
    if ('speechSynthesis' in window) {
      if (isSpeaking) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
        return;
      }
      
      setIsSpeaking(true);
      const speech = new SpeechSynthesisUtterance(testimonials[currentIndex].testimonial);
      
      speech.onend = () => {
        setIsSpeaking(false);
      };
      
      window.speechSynthesis.speak(speech);
    }
  };

  return (
    <section id="testimonials" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px 0px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800 dark:text-white">
            Client Testimonials
          </h2>
          <div className="w-20 h-1 bg-blue-500 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            What clients and colleagues have to say about working with me.
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Testimonial Slider */}
          <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-gray-700 shadow-xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="p-8 md:p-12"
              >
                <div className="flex flex-col md:flex-row items-center">
                  <div className="mb-6 md:mb-0 md:mr-8">
                    <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-blue-100 dark:border-blue-900">
                      <img
                        src={testimonials[currentIndex].image}
                        alt={testimonials[currentIndex].name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={20}
                          className={i < testimonials[currentIndex].rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}
                        />
                      ))}
                    </div>
                    
                    <blockquote className="text-lg text-gray-700 dark:text-gray-300 italic mb-6">
                      "{testimonials[currentIndex].testimonial}"
                    </blockquote>
                    
                    <div>
                      <h4 className="text-xl font-bold text-gray-800 dark:text-white">
                        {testimonials[currentIndex].name}
                      </h4>
                      <p className="text-blue-600 dark:text-blue-400">
                        {testimonials[currentIndex].position}, {testimonials[currentIndex].company}
                      </p>
                    </div>
                  </div>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleVoicePlayback}
                  className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300"
                >
                  {isSpeaking ? <VolumeX size={20} /> : <Volume2 size={20} />}
                </motion.button>
              </motion.div>
            </AnimatePresence>
            
            {/* Navigation Buttons */}
            <div className="absolute bottom-4 right-4 flex space-x-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={prevTestimonial}
                className="p-2 rounded-full bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300"
              >
                <ChevronLeft size={20} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={nextTestimonial}
                className="p-2 rounded-full bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-gray-300"
              >
                <ChevronRight size={20} />
              </motion.button>
            </div>
          </div>
          
          {/* Testimonial Indicators */}
          <div className="flex justify-center mt-6 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentIndex === index
                    ? 'bg-blue-600 w-6'
                    : 'bg-gray-300 dark:bg-gray-600'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;