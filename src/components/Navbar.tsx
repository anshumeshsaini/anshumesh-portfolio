import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { Menu, X, Github, Linkedin, Twitter, Moon, Sun, Home, User, Code, Briefcase, Phone, Award } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useThemeStore } from '../store/themeStore';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useThemeStore();
  const { scrollY } = useScroll();
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50);
  });

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/', icon: <Home size={18} /> },
    { name: 'About', path: '/about', },
    { name: 'Skills', path: '/skills',  },
    { name: 'Projects', path: '/projects',  },
    { name: 'Experience', path: '/experience',  },
    { name: 'Contact', path: '/contact',  },
  ];

  const navbarVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1]
      } 
    },
  };

  const menuVariants = {
    closed: { 
      opacity: 0,
      x: '100%',
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1]
      }
    },
    open: { 
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1]
      }
    },
  };

  const linkVariants = {
    closed: { opacity: 0, x: 20 },
    open: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: { 
        delay: 0.05 * i, 
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1]
      },
    }),
  };

  const socialIconVariants = {
    hover: {
      y: -5,
      transition: { type: "spring", stiffness: 400, damping: 10 }
    },
    tap: { scale: 0.9 }
  };

  return (
    <motion.nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl shadow-lg border-b border-gray-200/20 dark:border-gray-700/20' 
          : 'bg-transparent'
      }`}
      initial="hidden"
      animate="visible"
      variants={navbarVariants}
    >
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        {/* Logo with 3D effect */}
        <Link 
          to="/" 
          className="relative group"
          onClick={() => setActiveLink('/')}
        >
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10"
          >
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
              Anshumesh
            </span>
          </motion.div>
          <motion.span 
            className="absolute inset-0 bg-gradient-to-r from-blue-600 to-teal-500 rounded-lg blur-md opacity-0 group-hover:opacity-60 transition-opacity duration-500"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-1">
          {navLinks.map((link, index) => (
            <motion.div
              key={link.name}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link
                to={link.path}
                className={`relative px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors duration-300 ${
                  activeLink === link.path 
                    ? 'text-blue-600 dark:text-teal-400' 
                    : 'text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-teal-300'
                }`}
                onClick={() => setActiveLink(link.path)}
              >
                <span className="text-current">
                  {link.icon}
                </span>
                <span>{link.name}</span>
                {activeLink === link.path && (
                  <motion.span 
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 dark:bg-teal-400"
                    layoutId="activeLink"
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  />
                )}
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Right side controls */}
        <div className="flex items-center space-x-4">
          {/* Social icons with floating effect */}
          <div className="hidden md:flex items-center space-x-3">
            <motion.a
              href="https://github.com/anshumeshsaini"
              target="_blank"
              rel="noopener noreferrer"
              variants={socialIconVariants}
              whileHover="hover"
              whileTap="tap"
              className="relative p-2.5 rounded-full backdrop-blur-lg bg-white/80 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all duration-300 group"
            >
              <span className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/10 to-teal-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
              <Github size={18} className="relative z-10 text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-teal-400 transition-colors duration-300" />
            </motion.a>

            <motion.a
              href="https://www.linkedin.com/in/anshumesh-saini-628760234/"
              target="_blank"
              rel="noopener noreferrer"
              variants={socialIconVariants}
              whileHover="hover"
              whileTap="tap"
              className="relative p-2.5 rounded-full backdrop-blur-lg bg-white/80 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all duration-300 group"
            >
              <span className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/10 to-cyan-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
              <Linkedin size={18} className="relative z-10 text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-teal-400 transition-colors duration-300" />
            </motion.a>

            <motion.a
              href="https://www.instagram.com/anshumesh.saini?igsh=OG5yeTRxYnZxN2Js"
              target="_blank"
              rel="noopener noreferrer"
              variants={socialIconVariants}
              whileHover="hover"
              whileTap="tap"
              className="relative p-2.5 rounded-full backdrop-blur-lg bg-white/80 dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all duration-300 group"
            >
              <span className="absolute inset-0 rounded-full bg-gradient-to-br from-sky-400/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
              <Twitter size={18} className="relative z-10 text-gray-700 dark:text-gray-300 group-hover:text-sky-500 dark:group-hover:text-sky-400 transition-colors duration-300" />
            </motion.a>
          </div>

          {/* Theme toggle with smooth transition */}
        
          {/* Mobile Menu Button with animated lines */}
          <motion.button
            className="lg:hidden p-2 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-300"
            onClick={toggleMenu}
            whileTap={{ scale: 0.9 }}
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X size={20} className="text-gray-700 dark:text-gray-300" />
            ) : (
              <Menu size={20} className="text-gray-700 dark:text-gray-300" />
            )}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu with glass morphism effect */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur-2xl z-40 flex flex-col"
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
          >
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
              <Link 
                to="/" 
                className="text-2xl font-bold" 
                onClick={() => {
                  setIsOpen(false);
                  setActiveLink('/');
                }}
              >
                <span className="bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
                  Anshumesh
                </span>
              </Link>
              <motion.button
                onClick={toggleMenu}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border border-gray-200 dark:border-gray-700 shadow-sm"
              >
                <X size={20} className="text-gray-700 dark:text-gray-300" />
              </motion.button>
            </div>

            <div className="flex flex-col items-center justify-center flex-1 space-y-6 px-6">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  custom={index}
                  variants={linkVariants}
                  initial="closed"
                  animate="open"
                  className="w-full max-w-md"
                >
                  <Link
                    to={link.path}
                    className={`flex items-center space-x-3 w-full px-6 py-4 rounded-xl transition-all duration-300 ${
                      activeLink === link.path
                        ? 'bg-blue-50 dark:bg-gray-800 shadow-md'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-800/50'
                    }`}
                    onClick={() => {
                      setIsOpen(false);
                      setActiveLink(link.path);
                    }}
                  >
                    <span className={`p-2 rounded-lg ${
                      activeLink === link.path
                        ? 'bg-blue-100 dark:bg-gray-700 text-blue-600 dark:text-teal-400'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                    }`}>
                      {link.icon}
                    </span>
                    <span className={`text-xl font-medium ${
                      activeLink === link.path
                        ? 'text-blue-600 dark:text-teal-400'
                        : 'text-gray-700 dark:text-gray-300'
                    }`}>
                      {link.name}
                    </span>
                  </Link>
                </motion.div>
              ))}

              <motion.div
                className="flex items-center space-x-6 mt-8"
                variants={linkVariants}
                custom={navLinks.length}
              >
                <motion.a
                  href="https://github.com/anshumeshsaini"
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={socialIconVariants}
                  whileHover="hover"
                  whileTap="tap"
                  className="p-3 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <Github size={20} className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-teal-400 transition-colors duration-300" />
                </motion.a>
                <motion.a
                  href="https://www.linkedin.com/in/anshumesh-saini-628760234/"
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={socialIconVariants}
                  whileHover="hover"
                  whileTap="tap"
                  className="p-3 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <Linkedin size={20} className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-teal-400 transition-colors duration-300" />
                </motion.a>
                <motion.a
                  href="https://www.instagram.com/anshumesh.saini?igsh=OG5yeTRxYnZxN2Js"
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={socialIconVariants}
                  whileHover="hover"
                  whileTap="tap"
                  className="p-3 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <Twitter size={20} className="text-gray-700 dark:text-gray-300 hover:text-sky-500 dark:hover:text-sky-400 transition-colors duration-300" />
                </motion.a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;