import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useSkillStore } from '../store/skillStore';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';


const SkillsSection: React.FC = () => {
  const { skills, filteredSkills, activeFilter, setFilter } = useSkillStore();
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px 0px" });
  
  const categories = [
    { id: 'all', name: 'All Skills' },
    { id: 'frontend', name: 'Frontend' },
    { id: 'backend', name: 'Backend' },
    { id: 'database', name: 'Database' },
    { id: 'devops', name: 'DevOps' },
    { id: 'ai', name: 'AI/ML' },
    { id: 'mobile', name: 'Mobile' },
  ];

  // Initialize Three.js scene
  useEffect(() => {
    if (!canvasRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0);
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(canvasRef.current.clientWidth, canvasRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    canvasRef.current.appendChild(renderer.domElement);

    // Lighting setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    // Camera controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1;

    // Load car model
    const loader = new GLTFLoader();
    let carModel: THREE.Group;

    loader.load(
      'future_car.glb',
      (glb) => {
        carModel = glb.scene;
        carModel.scale.set(0.8, 0.8, 0.8);
        carModel.position.y = -0.5;
        scene.add(carModel);

        // Animation loop
        const animate = () => {
          if (carModel) {
            carModel.rotation.y += 0.002;
          }
          requestAnimationFrame(animate);
          controls.update();
          renderer.render(scene, camera);
        };
        animate();
      },
      undefined,
      (error) => {
        console.error('Error loading model:', error);
      }
    );

    camera.position.z = 3;

    // Handle window resize
    const handleResize = () => {
      if (!canvasRef.current) return;
      camera.aspect = canvasRef.current.clientWidth / canvasRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(canvasRef.current.clientWidth, canvasRef.current.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
      if (canvasRef.current && canvasRef.current.contains(renderer.domElement)) {
        canvasRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.5,
        type: "spring",
        damping: 10,
        stiffness: 100
      },
    },
  };

  const progressVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { 
      opacity: 1, 
      height: "auto",
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    exit: { 
      opacity: 0, 
      height: 0,
      transition: {
        duration: 0.2,
        ease: "easeIn"
      }
    }
  };

  return (
    <section id="skills" className="relative py-28 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full filter blur-3xl opacity-20 dark:opacity-30"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full filter blur-3xl opacity-20 dark:opacity-30"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px 0px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-block relative">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800 dark:text-white bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-400">
              Technical Skills
            </h2>
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-teal-400 rounded-full"></div>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mt-6 leading-relaxed">
            A comprehensive set of technologies I've mastered over <span className="font-semibold text-blue-600 dark:text-blue-400">3+ years</span> in the industry.
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px 0px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-16"
        >
          {categories.map((category) => (
            <motion.button
            
              key={category.id}
              onClick={() => setFilter(category.id)}
              className={`relative px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 overflow-hidden ${
                activeFilter === category.id
                  ? 'text-white shadow-lg'
                  : 'bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-700 shadow-sm backdrop-blur-sm'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {activeFilter === category.id && (
                <motion.span 
                  className="absolute inset-0 bg-gradient-to-r from-blue-600 to-teal-500"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  layoutId="activeFilter"
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                {category.name}
                {activeFilter === category.id && (
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-2 h-2 bg-white rounded-full"
                  />
                )}
              </span>
            </motion.button>
          ))}
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8"
        >
          {filteredSkills.map((skill) => (
            <motion.div
              key={skill.id}
              variants={itemVariants}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedSkill(selectedSkill === skill.id ? null : skill.id)}
              className="relative p-1 rounded-2xl"
            >

              <div className={`relative bg-white/70 dark:bg-gray-800/70 rounded-xl p-6 flex flex-col items-center justify-center transition-all duration-300 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 shadow-sm hover:shadow-md cursor-pointer ${
                selectedSkill === skill.id ? 'ring-2 ring-blue-500/50 dark:ring-blue-400/50 shadow-lg' : ''
              }`}>
                <div className="relative">
                  <div className="text-5xl mb-4">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400">
                      {skill.icon.charAt(0).toUpperCase()}
                    </span>
                  </div>
                </div>
                
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">{skill.name}</h3>
                
                {/* Progress bar and mastery percentage - only shown when clicked */}
                <AnimatePresence>
                  {selectedSkill === skill.id && (
                    <motion.div
                      variants={progressVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="w-full overflow-hidden"
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs font-medium text-gray-600 dark:text-gray-400">Mastery</span>
                        <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">
                          {skill.proficiency}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200/70 dark:bg-gray-700/70 rounded-full h-2 overflow-hidden">
                        <motion.div 
                          className="h-full rounded-full bg-gradient-to-r from-blue-500 to-teal-400"
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.proficiency}%` }}
                          transition={{ 
                            duration: 0.8,
                            type: "spring"
                          }}
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* 3D Future Car Visualization */}
       
      </div>
    </section>
  );
};

export default SkillsSection;