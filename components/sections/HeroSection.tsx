'use client';
import React, { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { ChevronDown, ArrowRight } from 'lucide-react';

// Enhanced background with better visual elements
const EnhancedBackground = () => {
  // Reference for the container to track scroll
  const containerRef = useRef(null);
  
  // Get scroll progress for parallax effect
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  // Transform scroll progress to values for parallax
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div ref={containerRef} className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/70 to-background z-10" />
      
      {/* Enhanced grid with depth effect */}
      <motion.div 
        style={{ opacity }}
        className="absolute inset-0"
      >
        {/* Main grid with better spacing */}
        <div className="absolute inset-0 grid grid-cols-12 gap-4">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={`col-${i}`} className="h-full w-px bg-primary/[0.03] justify-self-center" />
          ))}
        </div>
        <div className="absolute inset-0 grid grid-rows-12 gap-4">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={`row-${i}`} className="w-full h-px bg-primary/[0.03] self-center" />
          ))}
        </div>
        
        {/* Main accent lines */}
        <div className="absolute left-0 right-0 h-px bg-primary/10 top-1/4" />
        <div className="absolute left-0 right-0 h-px bg-primary/10 top-3/4" />
        <div className="absolute top-0 bottom-0 w-px bg-primary/10 left-1/4" />
        <div className="absolute top-0 bottom-0 w-px bg-primary/10 left-3/4" />
      </motion.div>
      
      {/* Animated glow elements with parallax effect */}
      <motion.div 
        style={{ y: y1, opacity }}
        className="absolute top-20 right-[10%] w-[30rem] h-[30rem] bg-primary/5 rounded-full blur-3xl"
      />
      
      <motion.div 
        style={{ y: y2, opacity }}
        initial={{ scale: 0.8, opacity: 0.5 }}
        animate={{ 
          scale: [0.8, 1.2, 0.8], 
          opacity: [0.5, 0.7, 0.5] 
        }}
        transition={{ 
          repeat: Infinity, 
          duration: 20,
          ease: "easeInOut",
          delay: 1 
        }}
        className="absolute bottom-[10%] left-[5%] w-[25rem] h-[25rem] bg-secondary/5 rounded-full blur-3xl"
      />
      
      <motion.div 
        style={{ y: y1, opacity }}
        initial={{ scale: 0.9, opacity: 0.4 }}
        animate={{ 
          scale: [0.9, 1.1, 0.9], 
          opacity: [0.4, 0.6, 0.4] 
        }}
        transition={{ 
          repeat: Infinity, 
          duration: 15,
          ease: "easeInOut",
          delay: 2 
        }}
        className="absolute top-[30%] left-[15%] w-[20rem] h-[20rem] bg-blue-500/5 rounded-full blur-3xl"
      />
    </div>
  );
};

export function HeroSection() {
  const { t } = useTranslation();
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const jobTitles = React.useMemo(() => ['Flutter', 'React', 'TypeScript', 'Django'], []);
  
  // Enhanced typing effect with variable speed
  useEffect(() => {
    // Skip effect if paused
    if (isPaused) return;
    
    // Variable typing speed for more natural effect
    const getRandomSpeed = (min: number, max: number) => 
      Math.floor(Math.random() * (max - min + 1)) + min;
    
    const baseSpeed = isDeleting ? 50 : 120;
    const randomizedSpeed = getRandomSpeed(baseSpeed * 0.8, baseSpeed * 1.2);
    
    const ticker = setTimeout(() => {
      const i = loopNum % jobTitles.length;
      const fullText = jobTitles[i];
      
      setText(
        isDeleting
          ? fullText.substring(0, text.length - 1)
          : fullText.substring(0, text.length + 1)
      );
      
      if (!isDeleting && text === fullText) {
        // Pause at the end of typing
        setIsPaused(true);
        setTimeout(() => {
          setIsDeleting(true);
          setIsPaused(false);
        }, 1800);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        // Small pause between words
        setIsPaused(true);
        setTimeout(() => setIsPaused(false), 500);
      }
    }, randomizedSpeed);
    
    return () => clearTimeout(ticker);
  }, [text, isDeleting, loopNum, jobTitles, isPaused]);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center pt-16 relative overflow-hidden"
    >
      {/* Enhanced background */}
      <EnhancedBackground />
      
      <div className="container mx-auto px-4 max-w-6xl text-center relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          <motion.div variants={itemVariants} className="space-y-2">
            <div className="inline-flex items-center gap-2 text-primary/70 mb-2">
              <span className="h-px w-6 bg-primary/50"></span>
              <span className="text-sm font-medium uppercase tracking-wider">{t('home.greeting')}</span>
              <span className="h-px w-6 bg-primary/50"></span>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80">
              {t('home.name')}
            </h1>
          </motion.div>
          
          <motion.div variants={itemVariants} className="flex flex-col items-center justify-center space-y-6">
            <h2 className="text-2xl md:text-3xl font-medium text-muted-foreground">
              {t('home.title')}
            </h2>
            
            <div className="relative h-16 flex items-center justify-center">
              <div className="relative px-4 py-2 rounded-lg overflow-hidden">
                <div className="absolute inset-0 bg-primary/10 backdrop-blur-sm rounded-lg border border-primary/20"></div>
                <span className="relative text-2xl md:text-3xl font-semibold text-primary">
                  {text}
                  <span className="typewriter-cursor animate-pulse">|</span>
                </span>
              </div>
            </div>
            
            <p className="max-w-2xl mx-auto text-lg text-muted-foreground leading-relaxed">
              {t('home.subtitle')}
            </p>
          </motion.div>
          
          <motion.div 
            variants={itemVariants}
            className="flex flex-wrap items-center justify-center gap-4 pt-6"
          >
            <Button 
              asChild 
              size="lg" 
              className="rounded-full px-8 py-6 text-base font-medium shadow-lg shadow-primary/20 group"
            >
              <Link href="#projects" className="flex items-center gap-2">
                {t('home.cta.projects')}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            
            <Button 
              asChild 
              variant="outline" 
              size="lg" 
              className="rounded-full px-8 py-6 text-base font-medium border-primary/30 hover:bg-primary/5"
            >
              <Link href="#contact">
                {t('home.cta.contact')}
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
      
      
    </section>
  );
}