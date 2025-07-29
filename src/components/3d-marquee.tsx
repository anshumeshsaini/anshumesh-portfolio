"use client";

import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";

export interface MarqueeImage {
  src?: string;
  alt: string;
  imgElement?: React.ReactNode;
  href?: string;
  target?: "_blank" | "_self" | "_parent" | "_top";
}

export interface ThreeDMarqueeProps {
  images: MarqueeImage[];
  className?: string;
  cols?: number;
  onImageClick?: (image: MarqueeImage, index: number) => void;
  title?: string;
  subtitle?: string;
}

export const ThreeDMarquee: React.FC<ThreeDMarqueeProps> = ({
  images,
  className = "",
  cols = 4,
  onImageClick,
  title = "Certificates and Achievements",
  subtitle = "Crafting digital experiences that blend innovation with intuitive design",
}) => {
  const [selectedImage, setSelectedImage] = useState<{
    image: MarqueeImage;
    index: number;
  } | null>(null);
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

  // Ensure we have enough images to fill complete rows of 4
  const imagesPerRow = 4;
  const neededImages = Math.ceil(images.length / imagesPerRow) * imagesPerRow;
  const filledImages = [...images];
  
  // Fill the remaining spots with duplicates if needed
  while (filledImages.length < neededImages) {
    filledImages.push(...images.slice(0, neededImages - filledImages.length));
  }
  
  const duplicatedImages = [...filledImages, ...filledImages];
  const groupSize = Math.ceil(duplicatedImages.length / cols);
  const imageGroups = Array.from({ length: cols }, (_, index) =>
    duplicatedImages.slice(index * groupSize, (index + 1) * groupSize)
  );

  const getGridColsClass = () => {
    switch(cols) {
      case 2: return "grid-cols-2";
      case 3: return "grid-cols-3";
      case 4: return "grid-cols-4";
      case 5: return "grid-cols-5";
      default: return "grid-cols-4";
    }
  };

  const handleImageClick = (image: MarqueeImage, globalIndex: number) => {
    if (onImageClick) {
      onImageClick(image, globalIndex);
    } else if (image.href) {
      window.open(image.href, image.target || "_self");
    } else {
      setSelectedImage({ image, index: globalIndex });
    }
  };

  const closeSelectedImage = () => {
    setSelectedImage(null);
  };

  return (
    <div 
      className={`w-full py-16 ${className}`}
      style={{
        background: isLightTheme 
          ? 'white' 
          : 'linear-gradient(135deg, #05080d 0%, #070a14 50%, #0a0f1c 100%)'
      }}
    >
      <div className="text-center mb-12 px-4 max-w-4xl mx-auto">
        <h2 className={`text-4xl md:text-5xl font-bold ${isLightTheme ? 'text-black' : 'text-blue-300'} mb-4`}>
          {title}
        </h2>
        <p 
          className={`text-xl md:text-2xl ${isLightTheme ? 'text-black' : 'text-transparent bg-clip-text bg-gradient-to-r from-blue-100 to-blue-50'}`}
          style={{ pointerEvents: 'none' }}
        >
          {subtitle}
        </p>
      </div>
      
      <section 
        className="mx-auto block h-[600px] max-sm:h-[400px] overflow-hidden rounded-2xl w-[90%] relative"
        style={{
          background: isLightTheme 
            ? 'white' 
            : 'linear-gradient(135deg, rgba(26,58,110,0.9) 0%, rgba(58,110,181,0.9) 100%)',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
          backdropFilter: 'blur(4px)',
          border: isLightTheme 
            ? '1px solid rgba(0,0,0,0.1)' 
            : '1px solid rgba(255,255,255,0.1)'
        }}
      >
        {/* Selected Image Overlay */}
        {selectedImage && (
          <div 
            className="absolute inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            onClick={closeSelectedImage}
          >
            <motion.div 
              className="relative w-full h-full max-w-4xl max-h-[80vh] rounded-xl overflow-hidden shadow-2xl"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
            >
              {selectedImage.image.imgElement ? (
                React.cloneElement(selectedImage.image.imgElement as React.ReactElement, {
                  className: "w-full h-full object-contain",
                  alt: selectedImage.image.alt
                })
              ) : selectedImage.image.src ? (
                <img
                  src={selectedImage.image.src}
                  alt={selectedImage.image.alt}
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className={`w-full h-full ${isLightTheme ? 'bg-gray-200' : 'bg-blue-700/50'} flex items-center justify-center`}>
                  <span className={isLightTheme ? "text-black" : "text-blue-100"}>No Image</span>
                </div>
              )}
              <button 
                className={`absolute top-4 right-4 ${isLightTheme ? 'bg-black/20 hover:bg-black/30' : 'bg-white/20 hover:bg-white/30'} rounded-full p-2 backdrop-blur-sm transition-colors`}
                onClick={(e) => {
                  e.stopPropagation();
                  closeSelectedImage();
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </motion.div>
          </div>
        )}
        
        <div className="flex w-full h-full items-center justify-center" style={{ transform: "rotateX(55deg) rotateY(0deg) rotateZ(45deg)" }}>
          <div className="w-full overflow-hidden scale-90 sm:scale-100">
            <div className={`relative grid h-full w-full origin-center ${getGridColsClass()} gap-3 transform`}>
              {imageGroups.map((imagesInGroup, idx) => (
                <motion.div
                  key={`column-${idx}`}
                  animate={{ y: idx % 2 === 0 ? 100 : -100 }}
                  transition={{ 
                    duration: idx % 2 === 0 ? 30 : 40,
                    repeat: Infinity, 
                    repeatType: "reverse",
                    ease: "linear"
                  }}
                  className="flex flex-col items-center gap-3 relative"
                >
                  <div className={`absolute left-0 top-0 h-full w-0.5 ${isLightTheme ? 'bg-black/20' : 'bg-blue-400/30'}`} />
                  {imagesInGroup.map((image, imgIdx) => {
                    const globalIndex = idx * groupSize + imgIdx;
                    const isClickable = image.href || onImageClick || !image.href;
                    const isFirstBox = idx === 0 && imgIdx === 0;

                    return (
                      <div key={`img-${imgIdx}`} className="relative">
                        <div className={`absolute top-0 left-0 w-full h-0.5 ${isLightTheme ? 'bg-black/20' : 'bg-blue-400/30'}`} />
                        <motion.div
                          whileHover={{ y: -10, scale: 1.05, zIndex: 10 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className={`aspect-[970/700] w-full max-w-[340px] rounded-xl overflow-hidden ${
                            isLightTheme && isFirstBox 
                              ? 'bg-white' 
                              : `ring-2 ${isLightTheme ? 'ring-black/20' : 'ring-blue-300/50'}`
                          } shadow-2xl hover:shadow-3xl transition-all duration-300 ${
                            isClickable ? "cursor-pointer" : ""
                          }`}
                          onClick={() => handleImageClick(image, globalIndex)}
                        >
                          {image.imgElement ? (
                            React.cloneElement(image.imgElement as React.ReactElement, {
                              className: "w-full h-full object-cover hover:scale-110 transition-transform duration-300",
                              alt: image.alt
                            })
                          ) : image.src ? (
                            <img
                              src={image.src}
                              alt={image.alt}
                              className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                            />
                          ) : (
                            <div className={`w-full h-full ${isLightTheme ? 'bg-gray-200' : 'bg-blue-700/50'} flex items-center justify-center`}>
                              <span className={isLightTheme ? "text-black" : "text-blue-100"}>No Image</span>
                            </div>
                          )}
                        </motion.div>
                      </div>
                    );
                  })}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};