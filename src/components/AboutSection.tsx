import React, { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Download, Github, Code, Award, Briefcase, Coffee } from 'lucide-react';
import { useGithubStore } from '../store/githubStore';
import anshumesh from './anshumesh.jpeg'

const AboutSection: React.FC = () => {
  const { stats, fetchStats } = useGithubStore();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px 0px" });
  
  useEffect(() => {
    if (isInView) {
      fetchStats();
    }
  }, [isInView, fetchStats]);

  const statsItems = [

    { icon: <Github size={24} />, value: `${stats.publicRepos}+`, label: 'GitHub Repos' },
    { icon: <Briefcase size={24} />, value: '90+', label: 'Projects Completed' },
    { icon: <Coffee size={24} />, value: '∞', label: 'Coffee Cups' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section id="about" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px 0px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800 dark:text-white">
            About Me
          </h2>
          <div className="w-20 h-1 bg-blue-500 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Passionate about creating innovative solutions that solve real-world problems.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px 0px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500 to-teal-400 transform rotate-6 rounded-2xl"></div>
              <img
                src={anshumesh}
                alt="Anshumesh Saini"
                className="relative z-10 rounded-2xl shadow-xl"
              />
              
              <div className="absolute -bottom-6 -right-6 bg-white dark:bg-gray-900 p-4 rounded-lg shadow-lg z-20">
                <div className="flex items-center space-x-2">
                  <Github className="text-gray-700 dark:text-gray-300" size={20} />
                  <span className="font-medium text-gray-800 dark:text-gray-200">{stats.followers} Followers</span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={containerVariants}
          >
            <motion.h3 
              variants={itemVariants}
              className="text-2xl font-bold mb-4 text-gray-800 dark:text-white"
            >
              Full-Stack Developer & AI Specialist
            </motion.h3>
            
            <motion.p 
              variants={itemVariants}
              className="text-gray-600 dark:text-gray-300 mb-6"
            >
              With over 15 years of experience in software development, I specialize in building 
              high-performance web applications using cutting-edge technologies. My expertise spans 
              across frontend, backend, and AI integration, allowing me to deliver complete solutions 
              that meet complex business requirements.
            </motion.p>
            
            <motion.p 
              variants={itemVariants}
              className="text-gray-600 dark:text-gray-300 mb-8"
            >
              I'm passionate about creating intuitive user experiences and implementing efficient 
              backend systems. My recent focus has been on integrating AI capabilities into web 
              applications to provide intelligent features that enhance user engagement and business value.
            </motion.p>
            
            <motion.div 
              variants={itemVariants}
              className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8"
            >
              {statsItems.map((item, index) => (
                <div key={index} className="flex flex-col items-center p-4 bg-white dark:bg-gray-700 rounded-lg shadow-md">
                  <div className="text-blue-500 mb-2">{item.icon}</div>
                  <div className="text-2xl font-bold text-gray-800 dark:text-white">{item.value}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">{item.label}</div>
                </div>
              ))}
            </motion.div>
            
            <motion.div variants={itemVariants} className="flex space-x-4">
              <motion.a
                href="/resume.pdf"
                download
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium shadow-md hover:bg-blue-700 transition-colors duration-300 flex items-center"
              >
                <Download size={18} className="mr-2" /> Download Resume
              </motion.a>
              
              <motion.a
                href="https://github.com/username"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300 flex items-center"
              >
                <Github size={18} className="mr-2" /> GitHub Profile
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Language Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px 0px" }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-20"
        >
          <h3 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">
            Programming Languages
          </h3>
          
          <div className="bg-white dark:bg-gray-700 rounded-xl shadow-lg p-6">
            <div className="space-y-4">
              {stats.topLanguages.map((lang, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-700 dark:text-gray-300 font-medium">{lang.name}</span>
                    <span className="text-gray-600 dark:text-gray-400">{lang.percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2.5">
                    <motion.div
                      className="h-2.5 rounded-full bg-gradient-to-r from-blue-500 to-teal-400"
                      style={{ width: `${lang.percentage}%` }}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${lang.percentage}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.2 * index }}
                    ></motion.div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;