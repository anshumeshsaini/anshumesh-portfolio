import React, { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Download, Github, Code, Award, Briefcase, Coffee } from 'lucide-react';
import { useGithubStore } from '../store/githubStore';
import anshumesh from './anshumesh.jpeg'
import './about.css'

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
                className="text-3xl md:text-4xl font-extrabold mb-6 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent tracking-wide animate-glow-title"
            >
               Full-Stack Developer
            </motion.h3>


            <motion.p
                variants={itemVariants}
                className="text-gray-600 dark:text-gray-300 mb-6"
            >
              I'm Anshumesh Saini — a passionate full-stack developer and BCA student with a love for turning ideas into powerful, animated web experiences. I specialize in building frontend and backend applications using JavaScript, Python, MySQL, and cutting-edge tech. From dynamic UIs to complete systems like school management and e-commerce sites, I craft modern, interactive solutions that stand out in both design and performance.
            </motion.p>

            <motion.p
                variants={itemVariants}
                className="text-gray-600 dark:text-gray-300 mb-8"
            >
              I'm deeply passionate about building intuitive, animated user interfaces and powerful backend systems. Lately, I’ve been exploring AI integration in web applications to add smart features that boost user experience and deliver real business value. Whether it’s a dynamic portfolio, an e-commerce platform, or a school management system — I love bringing unique, meaningful ideas to life.
            </motion.p>

            <motion.div
                variants={itemVariants}
                className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-12"
            >
              {statsItems.map((item, index) => (
                  <div
                      key={index}
                      className="relative overflow-hidden flex flex-col items-center p-6 rounded-2xl backdrop-blur-lg bg-white/10 dark:bg-white/5 shadow-xl border border-white/20 dark:border-white/10 transition-transform hover:scale-105 hover:shadow-2xl group"
                      onClick={(e) => {
                        const shine = e.currentTarget.querySelector('.click-shine');
                        shine.classList.remove('animate-click-shine');
                        void shine.offsetWidth; // force reflow
                        shine.classList.add('animate-click-shine');
                      }}
                  >
                    {/* Shine on click */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent translate-x-[-100%] pointer-events-none click-shine" />

                    <div className="text-blue-400 mb-3 text-3xl z-10">
                      {item.icon}
                    </div>
                    <div className="text-3xl font-extrabold text-white drop-shadow-md z-10">
                      {item.value}
                    </div>
                    <div className="text-sm text-gray-300 mt-1 z-10">
                      {item.label}
                    </div>
                  </div>
              ))}
            </motion.div>



            <motion.div variants={itemVariants} className="flex space-x-4">
            <motion.a
    href="/resume.pdf"
    download="resume.pdf" // Updated to specify the desired filename
    whileHover={{ scale: 1.08 }}
    whileTap={{ scale: 0.96 }}
    className="relative px-8 py-4 backdrop-blur-md bg-blue-400/10 border border-blue-200/20 text-white rounded-2xl font-semibold shadow-xl hover:bg-blue-400/20 transition-all duration-300 ease-in-out flex items-center group overflow-hidden"
>
    <span className="absolute inset-0 bg-gradient-to-br from-blue-500/30 via-blue-400/20 to-blue-300/30 rounded-2xl blur-xl opacity-50 group-hover:opacity-70 transition-opacity duration-500"></span>
    <Download size={20} className="mr-3 z-10 text-white" />
    <span className="z-10">Download Resume</span>
</motion.a>


              <motion.a
                  href="https://github.com/username"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.96 }}
                  className="relative px-8 py-4 backdrop-blur-md bg-blue-400/10 border border-blue-300/20 text-white rounded-2xl font-semibold shadow-lg hover:bg-blue-400/20 transition-all duration-300 ease-in-out flex items-center group overflow-hidden"
              >
                <span className="absolute inset-0 bg-gradient-to-br from-blue-500/30 via-blue-400/20 to-blue-300/30 rounded-2xl blur-xl opacity-50 group-hover:opacity-70 transition-opacity duration-500"></span>
                <Github size={20} className="mr-3 z-10 text-white" />
                <span className="z-10">GitHub Profile</span>
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