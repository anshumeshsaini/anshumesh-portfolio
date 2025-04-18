import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link
                to="/"
                className="text-3xl font-bold mb-6 inline-block relative group"
            >
  <span className="bg-gradient-to-r from-blue-500 via-cyan-400 to-teal-400 bg-clip-text text-transparent animate-gradient-x transition-all duration-700 ease-in-out">
    Anshumesh
  </span>

              {/* Optional glowing aura effect */}
              <span className="absolute inset-0 blur-md bg-gradient-to-r from-blue-500 via-cyan-400 to-teal-400 opacity-25 group-hover:opacity-40 transition duration-700 rounded-xl"></span>
            </Link>

            <p className="text-gray-400 mb-6 max-w-md">
              Full-stack developer and AI specialist with 15+ years of experience building innovative digital solutions for clients worldwide.
            </p>
            <div className="flex space-x-4">
              <motion.a
                  href="https://github.com/anshumeshsaini"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.15, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative p-3 rounded-full backdrop-blur-md bg-white/5 border border-white/10 text-white shadow-lg hover:shadow-blue-400/30 transition-all duration-300"
              >
                <span className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/20 to-indigo-500/20 blur-md opacity-40 group-hover:opacity-60 transition-opacity duration-500"></span>
                <Github size={20} className="relative z-10 text-gray-300 group-hover:text-white transition-colors duration-300" />
              </motion.a>

              <motion.a
                  href="https://www.linkedin.com/in/anshumesh-saini-628760234/"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.15, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative p-3 rounded-full backdrop-blur-md bg-white/5 border border-white/10 text-white shadow-lg hover:shadow-sky-400/30 transition-all duration-300 group"
              >
                <span className="absolute inset-0 rounded-full bg-gradient-to-br from-sky-400/20 to-blue-500/20 blur-md opacity-40 group-hover:opacity-60 transition-opacity duration-500"></span>
                <Linkedin size={20} className="relative z-10 text-gray-300 group-hover:text-white transition-colors duration-300" />
              </motion.a>

              <motion.a
                  href="https://www.instagram.com/anshumesh.saini?igsh=OG5yeTRxYnZxN2Js"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.15, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative p-3 rounded-full backdrop-blur-md bg-white/5 border border-white/10 text-white shadow-lg hover:shadow-sky-300/30 transition-all duration-300 group"
              >
                <span className="absolute inset-0 rounded-full bg-gradient-to-br from-sky-300/20 to-blue-400/20 blur-md opacity-40 group-hover:opacity-60 transition-opacity duration-500"></span>
                <Twitter size={20} className="relative z-10 text-gray-300 group-hover:text-white transition-colors duration-300" />
              </motion.a>

            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors duration-300">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition-colors duration-300">
                  About
                </Link>
              </li>
              <li>
                <Link to="/skills" className="text-gray-400 hover:text-white transition-colors duration-300">
                  Skills
                </Link>
              </li>
              <li>
                <Link to="/projects" className="text-gray-400 hover:text-white transition-colors duration-300">
                  Projects
                </Link>
              </li>
              <li>
                <Link to="/experience" className="text-gray-400 hover:text-white transition-colors duration-300">
                  Experience
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors duration-300">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li className="text-gray-400">Web Development</li>
              <li className="text-gray-400">Mobile App Development</li>
              <li className="text-gray-400">AI Integration</li>
              <li className="text-gray-400">UI/UX Design</li>
              <li className="text-gray-400">Technical Consultation</li>
              <li className="text-gray-400">Code Review</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            &copy; {currentYear} Anshumesh Saini. All rights reserved.
          </p>
          
          <p className="text-gray-400 text-sm flex items-center">
            Made with <Heart size={14} className="mx-1 text-red-500" /> using React, Tailwind & Framer Motion
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;