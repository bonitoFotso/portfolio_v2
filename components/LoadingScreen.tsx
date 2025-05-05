'use client';
import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const LoadingScreen = ({ isLoading, setIsLoading }) => {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Initializing');
  
  // Simulate loading steps with text changes
  useEffect(() => {
    if (!isLoading) return;
    
    const texts = [
      'Initializing',
      'Loading assets',
      'Preparing portfolio',
      'Almost ready'
    ];
    
    // Increment progress
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => setIsLoading(false), 300);
          return 100;
        }
        return prev + 1;
      });
    }, 30);
    
    // Update loading text
    const textInterval = setInterval(() => {
      setLoadingText(texts[Math.floor((progress / 100) * texts.length)] || texts[texts.length - 1]);
    }, 500);
    
    return () => {
      clearInterval(progressInterval);
      clearInterval(textInterval);
    };
  }, [isLoading, progress, setIsLoading]);

  // Logo animation variants
  const logoVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        duration: 0.8,
        ease: [0.6, 0.01, -0.05, 0.95]
      }
    },
    exit: { 
      scale: 1.1, 
      opacity: 0,
      transition: { 
        duration: 0.4,
        ease: "easeInOut"
      }
    }
  };
  
  // Letter animation variants
  const letterVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: (i) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: 0.1 + (i * 0.1),
        duration: 0.6,
        ease: [0.6, 0.01, -0.05, 0.95]
      }
    })
  };

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 bg-background z-[1000] flex flex-col items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, delay: 0.2 } }}
        >
          {/* Top gradient decoration */}
          <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-primary/5 to-transparent" />
          
          {/* Logo and animation container */}
          <motion.div
            variants={logoVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative mb-16"
          >
            {/* Logo ring with rotating gradient */}
            <div className="w-36 h-36 rounded-full bg-gradient-to-r from-primary via-blue-500 to-primary relative flex items-center justify-center animate-spin-slow">
              <div className="w-32 h-32 rounded-full bg-background absolute" />
            </div>
            
            {/* Central logo */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500">
                {"FFMB".split('').map((letter, i) => (
                  <motion.span
                    key={i}
                    custom={i}
                    variants={letterVariants}
                    initial="hidden"
                    animate="visible"
                    className="inline-block"
                  >
                    {letter}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
          
          {/* Progress section */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="text-center space-y-6 w-full max-w-xs"
          >
            {/* Loading text with dot animation */}
            <div className="text-muted-foreground text-sm font-medium">
              {loadingText}
              <motion.span
                animate={{
                  opacity: [0, 1, 0]
                }}
                transition={{
                  repeat: Infinity,
                  duration: 1.5,
                  ease: "linear"
                }}
              >...</motion.span>
            </div>
            
            {/* Progress bar */}
            <div className="w-full h-1 bg-muted/50 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-primary to-blue-500 origin-left"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: progress / 100 }}
                transition={{ ease: "easeOut" }}
              />
            </div>
            
            {/* Progress percentage */}
            <motion.div 
              className="text-xs text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              {Math.round(progress)}%
            </motion.div>
          </motion.div>
          
          {/* Bottom gradient decoration */}
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-primary/5 to-transparent" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingScreen;