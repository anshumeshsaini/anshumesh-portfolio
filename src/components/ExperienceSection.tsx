import React, { useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useExperienceStore } from '../store/experienceStore';
import { FiExternalLink, FiGithub } from 'react-icons/fi';
import { SiTypescript, SiReact, SiNextdotjs } from 'react-icons/si';

const ExperienceSection: React.FC = () => {
  const { experiences } = useExperienceStore();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px 0px" });
  
  // 3D tilt effect configuration
  const tiltEffect = {
    rotateY: 5,
    rotateX: -5,
    transition: { duration: 0.5, ease: "easeOut" }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      },
    },
    hover: {
      y: -10,
      transition: { duration: 0.3 }
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
    <section id="experience" className="py-32 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 relative overflow-hidden">
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
              <span className="relative z-10">Professional Journey</span>
            </h2>
          </div>
          <motion.p 
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mt-6 leading-relaxed"
          >
            My career path through innovative companies and challenging roles, with <span className="text-blue-500 font-medium">key achievements</span> highlighted.
          </motion.p>
        </motion.div>

        {/* Enhanced Timeline */}
        <div className="relative">
          {/* Animated vertical line with gradient */}
          <motion.div 
            initial={{ height: 0 }}
            whileInView={{ height: '100%' }}
            viewport={{ once: true, margin: "-100px 0px" }}
            transition={{ duration: 1.5, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500"
          ></motion.div>
          
          {/* Glow effect */}
          <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 blur-md bg-blue-400/20 dark:bg-blue-600/20"></div>
          
          <motion.div
            ref={ref}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="relative z-10 space-y-24"
          >
            <AnimatePresence>
              {experiences.map((experience, index) => (
                <motion.div
                  key={experience.id}
                  variants={itemVariants}
                  whileHover="hover"
                  className={`group relative flex flex-col md:flex-row ${
                    index % 2 === 0 ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Experience Card */}
                  <div className={`md:w-1/2 flex justify-center ${index % 2 === 0 ? 'md:justify-start md:pl-8' : 'md:justify-end md:pr-8'}`}>
                    <motion.div
                      whileHover={tiltEffect}
                      className="w-full md:max-w-lg bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300 relative overflow-hidden"
                    >
                      {/* Card background pattern */}
                      <div className="absolute inset-0 opacity-5 dark:opacity-10">
                        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSg0NSkiPjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0iY3VycmVudENvbG9yIiBvcGFjaXR5PSIwLjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjcGF0dGVybikiLz48L3N2Zz4=')]"></div>
                      </div>
                      
                      <div className="relative z-10">
                        <div className="flex items-start mb-6">
                          <div className="w-16 h-16 rounded-2xl overflow-hidden mr-5 flex-shrink-0 shadow-md border-2 border-white dark:border-gray-700">
                            <img
                              src={experience.logo}
                              alt={experience.company}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                              {experience.position}
                            </h3>
                            <div className="flex items-center flex-wrap gap-2 mt-1">
                              <p className="text-blue-600 dark:text-blue-400 font-medium">
                                {experience.company}
                              </p>
                              {experience.website && (
                                <a 
                                  href={experience.website} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="text-gray-500 hover:text-blue-500 transition-colors"
                                  aria-label="Company website"
                                >
                                  <FiExternalLink className="w-4 h-4" />
                                </a>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        <div className="prose dark:prose-invert max-w-none mb-6">
                          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                            {experience.description}
                          </p>
                          
                          {/* Key achievements */}
                          {experience.achievements && (
                            <div className="mt-4">
                              <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Key Achievements:</h4>
                              <ul className="space-y-2">
                                {experience.achievements.map((achievement, i) => (
                                  <li key={i} className="flex items-start">
                                    <span className="text-blue-500 mr-2 mt-1">•</span>
                                    <span className="text-gray-700 dark:text-gray-300">{achievement}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                        
                        {/* Tech stack with icons */}
                        <div className="mt-8">
                          <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">Technologies Used</h4>
                          <div className="flex flex-wrap gap-3">
                            {experience.technologies.map((tech, techIndex) => {
                              // Map some tech names to icons
                              const techIcons: Record<string, JSX.Element> = {
                                'TypeScript': <SiTypescript className="w-5 h-5" />,
                                'React': <SiReact className="w-5 h-5" />,
                                'Next.js': <SiNextdotjs className="w-5 h-5" />
                              };
                              
                              return (
                                <span
                                  key={techIndex}
                                  className="px-3 py-2 bg-gray-50 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300 text-sm rounded-lg flex items-center gap-2 shadow-sm border border-gray-100 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
                                >
                                  {techIcons[tech] || null}
                                  {tech}
                                </span>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                  
                  {/* Timeline marker */}
                  <div className={`md:w-1/2 flex flex-col items-center ${index % 2 === 0 ? 'md:items-start' : 'md:items-end'}`}>
                    <motion.div 
                      whileHover={{ scale: 1.1 }}
                      className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center z-10 shadow-lg ring-4 ring-white dark:ring-gray-900"
                    >
                      <div className="w-3 h-3 bg-white rounded-full"></div>
                    </motion.div>
                    
                    {/* Date with animation */}
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 }}
                      className={`mt-4 px-5 py-2 bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 ${
                        index % 2 === 0 ? 'md:text-left' : 'md:text-right'
                      }`}
                    >
                      <span className="font-medium text-gray-700 dark:text-gray-300">
                        {experience.duration}
                      </span>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;