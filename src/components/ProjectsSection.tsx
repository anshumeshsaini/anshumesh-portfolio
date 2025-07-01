import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Code, ArrowRight, Sparkles } from 'lucide-react';
import { useProjectStore } from '../store/projectStore';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-solidity';

const ProjectsSection: React.FC = () => {
  const { projects, filteredProjects, activeFilter, setFilter } = useProjectStore();
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px 0px" });
  
  useEffect(() => {
    Prism.highlightAll();
  }, [selectedProject]);
  
  const categories = [
    { id: 'all', name: 'All', icon: '' },
    { id: 'frontend', name: 'Frontend', icon: '' },
    { id: 'backend', name: 'Backend', icon: '' },
    { id: 'fullstack', name: 'Full Stack', icon: '' },
    { id: 'ai', name: 'AI/ML', icon: '' },
    { id: 'mobile', name: 'Mobile', icon: '' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { 
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      },
    },
    hover: {
      y: -15,
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

  const tiltEffect = {
    rotateY: 5,
    rotateX: -5,
    transition: { duration: 0.5, ease: "easeOut" }
  };

  return (
    <section id="projects" className="py-32 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 relative overflow-hidden">
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
              <span className="relative z-10">Project Showcase</span>
            </h2>
          </div>
          <motion.p 
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mt-6 leading-relaxed"
          >
            A curated collection of my <span className="text-blue-500 font-medium">most impactful work</span>, demonstrating technical excellence and creative problem-solving.
          </motion.p>
        </motion.div>

        {/* Enhanced Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px 0px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-16"
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setFilter(category.id)}
              className={`px-5 py-3 rounded-xl text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                activeFilter === category.id
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 shadow-sm border border-gray-200 dark:border-gray-700'
              }`}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-lg">{category.icon}</span>
              {category.name}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                whileHover="hover"
                onHoverStart={() => setHoveredProject(project.id)}
                onHoverEnd={() => setHoveredProject(null)}
                className="relative"
              >
                {/* Project Card */}
                <motion.div
                  whileHover={tiltEffect}
                  className="h-full bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-xl border border-gray-100 dark:border-gray-700 transition-all duration-300 flex flex-col"
                >
                  {/* Project Image with Gradient Overlay */}
                  <div className="relative overflow-hidden h-56">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end">
                      <div className="p-5 w-full">
                        <span className="px-3 py-1.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs rounded-full inline-flex items-center">
                          {project.category.charAt(0).toUpperCase() + project.category.slice(1)}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Project Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                        {project.description}
                      </p>
                      
                      {/* Tech Stack */}
                      <div className="mb-5">
                        <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Built With</h4>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.slice(0, 4).map((tech, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-gray-50 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300 text-xs rounded-lg shadow-sm border border-gray-100 dark:border-gray-700"
                            >
                              {tech}
                            </span>
                          ))}
                          {project.technologies.length > 4 && (
                            <span className="px-3 py-1 bg-gray-50 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300 text-xs rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
                              +{project.technologies.length - 4}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex justify-between items-center pt-4 border-t border-gray-100 dark:border-gray-700">
                      <div className="flex space-x-3">
                        <motion.a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 p-2 rounded-full bg-gray-100 dark:bg-gray-700/50"
                          aria-label="View on GitHub"
                        >
                          <Github size={18} />
                        </motion.a>
                        {project.liveUrl && (
                          <motion.a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 p-2 rounded-full bg-gray-100 dark:bg-gray-700/50"
                            aria-label="View live demo"
                          >
                            <ExternalLink size={18} />
                          </motion.a>
                        )}
                      </div>
                      
                      {project.codeSnippet && (
                        <motion.button
                          onClick={() => setSelectedProject(selectedProject === project.id ? null : project.id)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex items-center text-sm text-blue-600 dark:text-blue-400 font-medium hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                        >
                          <Code size={16} className="mr-2" />
                          {selectedProject === project.id ? 'Hide Code' : 'View Code'}
                        </motion.button>
                      )}
                    </div>
                  </div>
                </motion.div>

                {/* Floating View Button (appears on hover) */}
                {hoveredProject === project.id && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.3 }}
                    className="absolute -bottom-4 left-1/2 transform -translate-x-1/2"
                  >
                    <motion.a
                      href={project.liveUrl || project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-lg flex items-center gap-2 text-sm font-medium"
                    >
                      View Project
                      <ArrowRight size={16} />
                    </motion.a>
                  </motion.div>
                )}
                
                {/* Code Snippet */}
                <AnimatePresence>
                  {selectedProject === project.id && project.codeSnippet && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-4 overflow-hidden rounded-xl"
                    >
                      <div className="relative">
                        <div className="absolute top-3 left-4 flex gap-2">
                          <div className="w-3 h-3 rounded-full bg-red-500"></div>
                          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                          <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        </div>
                        <pre className="text-xs sm:text-sm overflow-x-auto p-6 pt-10 bg-gray-900 rounded-xl">
                          <code className={`language-${project.language || 'javascript'}`}>
                            {project.codeSnippet}
                          </code>
                        </pre>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        
        {/* AI Project Recommender */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px 0px" }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-24 bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-2xl border border-gray-100 dark:border-gray-700 relative overflow-hidden"
        >
          {/* Decorative elements */}
          <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-blue-500/10 dark:bg-blue-600/10 blur-3xl"></div>
          
          <div className="flex flex-col md:flex-row items-center relative z-10">
            <div className="mb-6 md:mb-0 md:mr-8 flex-shrink-0">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-2xl flex items-center justify-center shadow-inner border border-gray-200 dark:border-gray-700">
                <Sparkles className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">
                AI-Powered Project Match
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl">
                Based on your interests in <span className="font-semibold text-blue-600 dark:text-blue-400">modern web technologies</span>, 
                I recommend checking out the "Real-time Collaborative Editor" project. It features WebSockets, 
                operational transformation, and a Monaco-based editor with intelligent code completion.
              </p>
              <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium flex items-center justify-center gap-2 shadow-lg"
                  onClick={() => {
                    setFilter('frontend');
                    setSelectedProject('2'); // ID of the collaborative editor project
                  }}
                >
                  View Recommended Project
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-xl font-medium flex items-center justify-center gap-2 shadow-sm border border-gray-200 dark:border-gray-600"
                >
                  Get Another Recommendation
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;