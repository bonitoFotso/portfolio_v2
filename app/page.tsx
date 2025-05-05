'use client';
import React, { useEffect, useState, useRef, Suspense } from 'react';
import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/sections/HeroSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { SkillsSection } from '@/components/sections/SkillsSection';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { ExperienceSection } from '@/components/sections/ExperienceSection';
import { EducationSection } from '@/components/sections/EducationSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { Footer } from '@/components/Footer';
import { LabBackground } from '@/components/LabBackground';
import { Toaster } from '@/components/ui/toaster';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { InteractiveLoader } from '@/components/InteractiveLoader';

// Progress indicator component avec effets améliorés
const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setScrolled(latest > 0.01);
  });
  
  return (
    <motion.div 
      className="fixed top-0 left-0 right-0 z-[100] h-1 bg-gradient-to-r from-primary/80 via-primary to-primary/80 origin-left"
      style={{ scaleX: scrollYProgress }}
      initial={{ opacity: 0 }}
      animate={{ opacity: scrolled ? 1 : 0 }}
      transition={{ opacity: { duration: 0.3 } }}
    />
  );
};

// Back to top button component avec animation et design améliorés
const BackToTopButton = () => {
  const { scrollYProgress } = useScroll();
  const [showButton, setShowButton] = useState(false);
  
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setShowButton(latest > 0.2);
  });
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  return (
    <AnimatePresence>
      {showButton && (
        <motion.button
          className="fixed bottom-8 right-8 p-3.5 bg-gradient-to-tr from-primary/90 to-primary text-background rounded-full shadow-lg z-50 backdrop-blur-sm border border-primary/20"
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          whileHover={{ scale: 1.1, boxShadow: "0 0 15px rgba(0, 200, 255, 0.5)" }}
          whileTap={{ scale: 0.95 }}
          aria-label="Retour en haut"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

// Nouveau composant pour les indications de navigation de section
const SectionIndicator = ({ activeSection }: { activeSection: string }) => {
  const sections = ['home', 'about', 'skills', 'projects', 'experience', 'education', 'contact'];
  
  return (
    <motion.div 
      className="fixed right-6 top-1/2 transform -translate-y-1/2 z-40 hidden md:flex flex-col gap-3"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1, duration: 0.5 }}
    >
      {sections.map((section) => (
        <a
          key={section}
          href={`#${section}`}
          className="relative group flex items-center"
        >
          <div className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity text-xs text-foreground/70 pr-2">
            {section.charAt(0).toUpperCase() + section.slice(1)}
          </div>
          <div 
            className={`h-3 w-3 rounded-full transition-colors duration-300 border ${
              activeSection === section 
                ? 'bg-primary border-primary/50 scale-125' 
                : 'bg-muted border-border/50 group-hover:bg-primary/30'
            }`}
          />
          {activeSection === section && (
            <motion.div
              layoutId="activeSectionDot"
              className="absolute right-0 h-3 w-3 rounded-full bg-primary"
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 20
              }}
            />
          )}
        </a>
      ))}
    </motion.div>
  );
};

export default function Home(): React.ReactNode {
  // Refs pour chaque section afin de suivre la section active
  const sectionRefs = {
    home: useRef<HTMLDivElement>(null),
    about: useRef<HTMLDivElement>(null),
    skills: useRef<HTMLDivElement>(null),
    projects: useRef<HTMLDivElement>(null),
    experience: useRef<HTMLDivElement>(null),
    education: useRef<HTMLDivElement>(null),
    contact: useRef<HTMLDivElement>(null)
  };
  
  const [activeSection, setActiveSection] = useState('home');
  const [isLoading, setIsLoading] = useState(true);
  const [assetsLoaded, setAssetsLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });
  const [sectionLoadProgress, setSectionLoadProgress] = useState({
    home: false,
    about: false,
    skills: false,
    projects: false,
    experience: false,
    education: false,
    contact: false
  });

  // Capturer la position de la souris
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Simulation du chargement réel des ressources
  useEffect(() => {
    // Chargement des images du site
    const imageElements = document.querySelectorAll('img');
    const totalImages = imageElements.length;
    let loadedImages = 0;

    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          if (img.complete) {
            handleImageLoaded();
          } else {
            img.addEventListener('load', handleImageLoaded);
            img.addEventListener('error', handleImageLoaded);
          }
          imageObserver.unobserve(img);
        }
      });
    });

    const handleImageLoaded = () => {
      loadedImages++;
      if (loadedImages === totalImages && !assetsLoaded) {
        setAssetsLoaded(true);
      }
    };

    imageElements.forEach(img => imageObserver.observe(img));

    // Précharger les principales ressources et polices
    Promise.all([
      // Simulation du chargement des polices
      document.fonts.ready,
      // Délai minimum pour le loader (peut être supprimé en production)
      new Promise(resolve => setTimeout(resolve, 2000))
    ]).then(() => {
      setAssetsLoaded(true);
    });

    return () => {
      imageElements.forEach(img => {
        img.removeEventListener('load', handleImageLoaded);
        img.removeEventListener('error', handleImageLoaded);
      });
    };
  }, [assetsLoaded]);

  // Fonction pour gérer la fin du chargement
  const handleLoaderComplete = () => {
    setIsLoading(false);
    // Animer l'entrée du contenu principal
    setTimeout(() => {
      // Activer le défilement page par page avec le clavier (optionnel)
      document.addEventListener('keydown', handleKeyNavigation);
    }, 800);
  };

  // Navigation par clavier
  const handleKeyNavigation = (e: KeyboardEvent) => {
    if (e.key === 'ArrowDown' || e.key === 'PageDown') {
      navigateToNextSection();
    } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
      navigateToPrevSection();
    }
  };

  const navigateToNextSection = () => {
    const sections = Object.keys(sectionRefs);
    const currentIndex = sections.indexOf(activeSection);
    if (currentIndex < sections.length - 1) {
      const nextSection = sections[currentIndex + 1];
      scrollToSection(nextSection);
    }
  };

  const navigateToPrevSection = () => {
    const sections = Object.keys(sectionRefs);
    const currentIndex = sections.indexOf(activeSection);
    if (currentIndex > 0) {
      const prevSection = sections[currentIndex - 1];
      scrollToSection(prevSection);
    }
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navHeight = 80;
      const offset = element.getBoundingClientRect().top + window.scrollY - navHeight;
      
      window.scrollTo({
        top: offset,
        behavior: 'smooth'
      });
      
      window.history.pushState(null, '', `#${sectionId}`);
    }
  };

  // Gestion améliorée du défilement pour les liens d'ancrage
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent): void => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');
      
      if (link && link.hash && link.hash.startsWith('#')) {
        e.preventDefault();
        const targetId = link.hash.substring(1);
        scrollToSection(targetId);
      }
    };
    
    document.addEventListener('click', handleAnchorClick);
    return () => {
      document.removeEventListener('click', handleAnchorClick);
      document.removeEventListener('keydown', handleKeyNavigation);
    };
  }, [handleKeyNavigation]);
  
  // Suivi amélioré de la section active basé sur la position de défilement
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      
      // Trouver la section active actuelle avec une meilleure détection des limites
      let current = 'home';
      Object.entries(sectionRefs).forEach(([section, ref]) => {
        if (ref.current) {
          const { offsetTop, offsetHeight } = ref.current;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            current = section;
          }
        }
      });
      
      if (current !== activeSection) {
        setActiveSection(current);
        // Mise à jour de l'URL sans déclencher de défilement
        window.history.replaceState(null, '', `#${current}`);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Vérifier immédiatement au chargement
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection]);
  
  // Empêcher le défilement pendant le chargement
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isLoading]);

  // Animation pour les transitions de section
  const contentVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        when: 'beforeChildren'
      }
    }
  };

  return (
    <>
      {/* Écran de chargement interactif */}
      <AnimatePresence mode="wait">
        {isLoading && (
          <InteractiveLoader 
            mousePosition={mousePosition} 
            onComplete={handleLoaderComplete} 
          />
        )}
      </AnimatePresence>

      {/* Indicateur de progression du défilement */}
      <ScrollProgress />
      
      {/* Bouton de retour en haut */}
      <BackToTopButton />
      
      {/* Indicateur de section (navigation latérale) */}
      <SectionIndicator activeSection={activeSection} />
      
      <motion.main 
        className="relative"
        variants={contentVariants}
        initial={isLoading ? "hidden" : "visible"}
        animate="visible"
      >
        <LabBackground />
        <Navbar />
        
        <div ref={sectionRefs.home} id="home">
          <HeroSection />
        </div>
        
        <div ref={sectionRefs.about} id="about">
          <AboutSection />
        </div>
        
        <div ref={sectionRefs.skills} id="skills">
          <SkillsSection />
        </div>
        
        <div ref={sectionRefs.projects} id="projects">
          <ProjectsSection />
        </div>
        
        <div ref={sectionRefs.experience} id="experience">
          <ExperienceSection />
        </div>
        
        <div ref={sectionRefs.education} id="education">
          <EducationSection />
        </div>
        
        <div ref={sectionRefs.contact} id="contact">
          <ContactSection />
        </div>
        
        <Footer />
        <Toaster />
      </motion.main>
    </>
  );
}