import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Mail, Heart, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    {
      icon: <Github size={20} />,
      href: "https://github.com/anshumeshsaini",
      color: "from-purple-500/20 to-pink-500/20",
      hoverColor: "hover:shadow-purple-400/30"
    },
    {
      icon: <Linkedin size={20} />,
      href: "https://www.linkedin.com/in/anshumesh-saini-628760234/",
      color: "from-blue-500/20 to-cyan-500/20",
      hoverColor: "hover:shadow-blue-400/30"
    },
    {
      icon: <Twitter size={20} />,
      href: "https://www.instagram.com/anshumesh.saini?igsh=OG5yeTRxYnZxN2Js",
      color: "from-sky-400/20 to-blue-500/20",
      hoverColor: "hover:shadow-sky-400/30"
    },
    {
      icon: <Mail size={20} />,
      href: "mailto:anshumeshsaini@gmail.com",
      color: "from-amber-500/20 to-red-500/20",
      hoverColor: "hover:shadow-amber-400/30"
    }
  ];

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Skills", path: "/skills" },
    { name: "Projects", path: "/projects" },
    { name: "Experience", path: "/experience" },
    { name: "Contact", path: "/contact" }
  ];

  const services = [
    "Web Development",
    "Mobile App Development",
    "AI Integration",
    "UI/UX Design",
    "Technical Consultation",
    "Code Review"
  ];

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="relative bg-gradient-to-b from-gray-900 to-gray-950 text-white pt-20 pb-12 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSg0NSkiPjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0iY3VycmVudENvbG9yIiBvcGFjaXR5PSIwLjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjcGF0dGVybikiLz48L3N2Zz4=')]"></div>
      </div>
      <div className="absolute -top-32 -right-32 w-64 h-64 rounded-full bg-blue-600/10 blur-3xl"></div>
      <div className="absolute -bottom-32 -left-32 w-64 h-64 rounded-full bg-purple-600/10 blur-3xl"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand and social */}
          <div className="col-span-1 lg:col-span-2">
            <motion.div
              whileHover={{ y: -5 }}
              className="inline-block mb-8"
            >
              <Link
                to="/"
                className="text-4xl font-bold inline-block relative group"
              >
                <span className="bg-gradient-to-r from-blue-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent animate-gradient-x">
                  Anshumesh
                </span>
                <span className="absolute inset-0 blur-lg bg-gradient-to-r from-blue-500 to-cyan-400 opacity-20 group-hover:opacity-30 transition-opacity duration-500 rounded-xl"></span>
              </Link>
            </motion.div>

            <p className="text-gray-400 mb-8 max-w-lg text-lg leading-relaxed">
              Full-stack developer and AI specialist with 3+ years of experience building innovative digital solutions that drive business growth.
            </p>
            
            <div className="flex flex-wrap gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.15, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className={`relative p-3 rounded-xl backdrop-blur-sm bg-white/5 border border-white/10 text-white shadow-lg ${social.hoverColor} transition-all duration-300 group`}
                  aria-label={social.href.includes('github') ? 'GitHub' : 
                             social.href.includes('linkedin') ? 'LinkedIn' : 
                             social.href.includes('twitter') ? 'Twitter' : 'Email'}
                >
                  <span className={`absolute inset-0 rounded-xl bg-gradient-to-br ${social.color} blur-md opacity-40 group-hover:opacity-60 transition-opacity duration-500`}></span>
                  <span className="relative z-10 text-gray-300 group-hover:text-white transition-colors duration-300">
                    {social.icon}
                  </span>
                </motion.a>
              ))}
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-6 text-white flex items-center">
              Navigation
              <span className="ml-2 w-4 h-0.5 bg-gradient-to-r from-blue-400 to-cyan-400 block"></span>
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <motion.li 
                  key={index}
                  whileHover={{ x: 5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <Link 
                    to={link.path} 
                    className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center group"
                  >
                    <span className="w-2 h-2 rounded-full bg-blue-500 mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    {link.name}
                    <ArrowUpRight size={14} className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>
          
          {/* Services */}
          <div>
            <h3 className="text-xl font-semibold mb-6 text-white flex items-center">
              Services
              <span className="ml-2 w-4 h-0.5 bg-gradient-to-r from-teal-400 to-cyan-400 block"></span>
            </h3>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <motion.li 
                  key={index}
                  whileHover={{ x: 5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center group"
                >
                  <span className="w-2 h-2 rounded-full bg-teal-500 mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  {service}
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Back to top and copyright */}
        <div className="border-t border-gray-800 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center">
          <motion.button
            onClick={scrollToTop}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.95 }}
            className="mb-4 md:mb-0 px-6 py-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg hover:shadow-blue-400/30 transition-all duration-300 flex items-center gap-2"
          >
            Back to Top
          </motion.button>
          
          <div className="flex flex-col items-center md:items-end gap-2">
            <p className="text-gray-400 text-sm text-center md:text-right">
              &copy; {currentYear} Anshumesh Saini. All rights reserved.
            </p>
            
            <p className="text-gray-500 text-xs flex items-center">
              Crafted with <Heart size={12} className="mx-1 text-red-500 animate-pulse" /> 
              using React, Tailwind & Framer Motion
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;