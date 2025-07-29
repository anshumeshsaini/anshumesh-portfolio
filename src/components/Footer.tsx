import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Mail, Heart, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const [isLightTheme, setIsLightTheme] = useState(false);

  useEffect(() => {
    // Check if window is defined (to avoid SSR issues)
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: light)');
      setIsLightTheme(mediaQuery.matches);
      
      const handler = (e: MediaQueryListEvent) => setIsLightTheme(e.matches);
      mediaQuery.addEventListener('change', handler);
      
      return () => mediaQuery.removeEventListener('change', handler);
    }
  }, []);

  const socialLinks = [
    {
      icon: <Github size={20} />,
      href: "https://github.com/anshumeshsaini",
      color: isLightTheme ? "from-purple-500/40 to-pink-500/40" : "from-purple-500/20 to-pink-500/20",
      hoverColor: isLightTheme ? "hover:shadow-purple-500/30" : "hover:shadow-purple-400/30",
      iconColor: isLightTheme ? "text-gray-700" : "text-gray-300"
    },
    {
      icon: <Linkedin size={20} />,
      href: "https://www.linkedin.com/in/anshumesh-saini-628760234/",
      color: isLightTheme ? "from-blue-500/40 to-cyan-500/40" : "from-blue-500/20 to-cyan-500/20",
      hoverColor: isLightTheme ? "hover:shadow-blue-500/30" : "hover:shadow-blue-400/30",
      iconColor: isLightTheme ? "text-gray-700" : "text-gray-300"
    },
    {
      icon: <Twitter size={20} />,
      href: "https://www.instagram.com/anshumesh.saini?igsh=OG5yeTRxYnZxN2Js",
      color: isLightTheme ? "from-sky-400/40 to-blue-500/40" : "from-sky-400/20 to-blue-500/20",
      hoverColor: isLightTheme ? "hover:shadow-sky-500/30" : "hover:shadow-sky-400/30",
      iconColor: isLightTheme ? "text-gray-700" : "text-gray-300"
    },
    {
      icon: <Mail size={20} />,
      href: "mailto:anshumeshsaini@gmail.com",
      color: isLightTheme ? "from-amber-500/40 to-red-500/40" : "from-amber-500/20 to-red-500/20",
      hoverColor: isLightTheme ? "hover:shadow-amber-500/30" : "hover:shadow-amber-400/30",
      iconColor: isLightTheme ? "text-gray-700" : "text-gray-300"
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
    <footer className={`relative ${isLightTheme ? 'bg-gray-50 text-gray-900' : 'bg-gradient-to-b from-gray-900 to-gray-950 text-white'} pt-20 pb-12 overflow-hidden`}>
      {/* Decorative elements */}
      <div className={`absolute inset-0 ${isLightTheme ? 'opacity-10' : 'opacity-20'}`}>
        <div className={`absolute top-0 left-0 w-full h-full ${isLightTheme ? 'bg-[url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSg0NSkiPjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0iIzAwMCIgb3BhY2l0eT0iMC4wNSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNwYXR0ZXJuKSIvPjwvc3ZnPg==")]' : 'bg-[url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSg0NSkiPjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0iI2ZmZiIgb3BhY2l0eT0iMC4xIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI3BhdHRlcm4pIi8+PC9zdmc+")]'}`}></div>
      </div>
      <div className={`absolute -top-32 -right-32 w-64 h-64 rounded-full ${isLightTheme ? 'bg-blue-400/10' : 'bg-blue-600/10'} blur-3xl`}></div>
      <div className={`absolute -bottom-32 -left-32 w-64 h-64 rounded-full ${isLightTheme ? 'bg-purple-400/10' : 'bg-purple-600/10'} blur-3xl`}></div>
      
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
                <span className={`bg-gradient-to-r from-blue-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent animate-gradient-x ${isLightTheme ? 'brightness-90' : ''}`}>
                  Anshumesh
                </span>
                <span className={`absolute inset-0 blur-lg bg-gradient-to-r from-blue-500 to-cyan-400 ${isLightTheme ? 'opacity-10' : 'opacity-20'} group-hover:opacity-30 transition-opacity duration-500 rounded-xl`}></span>
              </Link>
            </motion.div>

            <p className={`${isLightTheme ? 'text-gray-600' : 'text-gray-400'} mb-8 max-w-lg text-lg leading-relaxed`}>
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
                  className={`relative p-3 rounded-xl backdrop-blur-sm ${isLightTheme ? 'bg-gray-200/50 border-gray-300/50' : 'bg-white/5 border-white/10'} border text-white shadow-lg ${social.hoverColor} transition-all duration-300 group`}
                  aria-label={social.href.includes('github') ? 'GitHub' : 
                             social.href.includes('linkedin') ? 'LinkedIn' : 
                             social.href.includes('twitter') ? 'Twitter' : 'Email'}
                >
                  <span className={`absolute inset-0 rounded-xl bg-gradient-to-br ${social.color} blur-md ${isLightTheme ? 'opacity-30' : 'opacity-40'} group-hover:opacity-60 transition-opacity duration-500`}></span>
                  <span className={`relative z-10 ${social.iconColor} group-hover:text-gray-900 transition-colors duration-300`}>
                    {social.icon}
                  </span>
                </motion.a>
              ))}
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className={`text-xl font-semibold mb-6 ${isLightTheme ? 'text-gray-900' : 'text-white'} flex items-center`}>
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
                    className={`${isLightTheme ? 'text-gray-600 hover:text-gray-900' : 'text-gray-400 hover:text-white'} transition-colors duration-300 flex items-center group`}
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
            <h3 className={`text-xl font-semibold mb-6 ${isLightTheme ? 'text-gray-900' : 'text-white'} flex items-center`}>
              Services
              <span className="ml-2 w-4 h-0.5 bg-gradient-to-r from-teal-400 to-cyan-400 block"></span>
            </h3>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <motion.li 
                  key={index}
                  whileHover={{ x: 5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className={`${isLightTheme ? 'text-gray-600 hover:text-gray-900' : 'text-gray-400 hover:text-white'} transition-colors duration-300 flex items-center group`}
                >
                  <span className="w-2 h-2 rounded-full bg-teal-500 mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  {service}
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Back to top and copyright */}
        <div className={`border-t ${isLightTheme ? 'border-gray-200' : 'border-gray-800'} mt-16 pt-8 flex flex-col md:flex-row justify-between items-center`}>
          <motion.button
            onClick={scrollToTop}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.95 }}
            className="mb-4 md:mb-0 px-6 py-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg hover:shadow-blue-400/30 transition-all duration-300 flex items-center gap-2"
          >
            Back to Top
          </motion.button>
          
          <div className="flex flex-col items-center md:items-end gap-2">
           
            
            <p className={`${isLightTheme ? 'text-gray-400' : 'text-gray-500'} text-xs flex items-center`}>
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