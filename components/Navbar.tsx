'use client';

import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/lib/hooks/useLanguage';
import { Button } from '@/components/ui/button';
import { 
  MoonIcon, 
  SunIcon, 
  MenuIcon, 
  XIcon, 
  GlobeIcon, 
  HomeIcon, 
  UserIcon, 
  CodeIcon, 
  BriefcaseIcon,
  GraduationCapIcon,
  MailIcon,
  FolderIcon,
  ChevronRightIcon,
  Settings
} from 'lucide-react';
import { useTheme } from 'next-themes';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export function Navbar() {
  const { t } = useTranslation();
  const { changeLanguage, currentLanguage } = useLanguage();
  const { setTheme, theme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Get the icon for each nav item
  const getNavIcon = (href: string) => {
    switch (href) {
      case '#home':
        return <HomeIcon className="h-4 w-4" />;
      case '#about':
        return <UserIcon className="h-4 w-4" />;
      case '#skills':
        return <CodeIcon className="h-4 w-4" />;
      case '#projects':
        return <FolderIcon className="h-4 w-4" />;
      case '#experience':
        return <BriefcaseIcon className="h-4 w-4" />;
      case '#education':
        return <GraduationCapIcon className="h-4 w-4" />;
      case '#contact':
        return <MailIcon className="h-4 w-4" />;
      default:
        return <ChevronRightIcon className="h-4 w-4" />;
    }
  };

  // Handle scroll events to change navbar style and detect active section
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Find the active section based on scroll position
      const sections = document.querySelectorAll('section[id]');
      let currentSection = 'home';
      
      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop - 100;
        const sectionHeight = (section as HTMLElement).offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
          currentSection = section.id;
        }
      });
      
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: '#home', label: t('nav.home') },
    { href: '#about', label: t('nav.about') },
    { href: '#skills', label: t('nav.skills') },
    { href: '#projects', label: t('nav.projects') },
    { href: '#experience', label: t('nav.experience') },
    { href: '#education', label: t('nav.education') },
    { href: '#contact', label: t('nav.contact') },
  ];

  // Animation variants
  const mobileMenuVariants = {
    closed: { 
      opacity: 0,
      height: 0,
      transition: { 
        duration: 0.3,
        when: "afterChildren" 
      }
    },
    open: { 
      opacity: 1,
      height: 'auto',
      transition: { 
        duration: 0.3,
        when: "beforeChildren",
        staggerChildren: 0.05
      }
    }
  };

  const mobileNavItemVariants = {
    closed: { 
      opacity: 0, 
      y: -5,
      transition: { duration: 0.2 }
    },
    open: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.2 }
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-background/90 backdrop-blur-xl border-b border-border/50 shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 max-w-7xl flex items-center justify-between h-16">
        <Link 
          href="#home" 
          className="text-xl font-bold relative group"
        >
          <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">FFMB</span>
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => {
            const isActive = `#${activeSection}` === item.href;
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-2 text-sm rounded-md transition-all duration-200 flex items-center gap-1.5 group relative
                  ${isActive 
                    ? 'text-primary font-medium' 
                    : 'text-muted-foreground hover:text-foreground'
                  }`}
              >
                <span className={`${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} transition-opacity`}>
                  {getNavIcon(item.href)}
                </span>
                {item.label}
                {isActive && (
                  <motion.span 
                    layoutId="activeIndicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                    transition={{ type: "spring", duration: 0.5 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center space-x-1">
          {/* Language Switcher */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full text-muted-foreground hover:text-foreground">
                <GlobeIcon className="h-5 w-5" />
                <span className="sr-only">Language</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-[120px] p-1">
              <DropdownMenuItem 
                onClick={() => changeLanguage('en')}
                className={`${currentLanguage === 'en' ? 'bg-muted' : ''} cursor-pointer rounded-md flex items-center justify-between`}
              >
                <span>English</span>
                {currentLanguage === 'en' && <span className="text-primary">✓</span>}
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => changeLanguage('fr')}
                className={`${currentLanguage === 'fr' ? 'bg-muted' : ''} cursor-pointer rounded-md flex items-center justify-between`}
              >
                <span>Français</span>
                {currentLanguage === 'fr' && <span className="text-primary">✓</span>}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Theme Switcher */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full text-muted-foreground hover:text-foreground">
                <SunIcon className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <MoonIcon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-[120px] p-1">
              <DropdownMenuItem 
                onClick={() => setTheme('light')}
                className={`${theme === 'light' ? 'bg-muted' : ''} cursor-pointer rounded-md flex items-center justify-between`}
              >
                <span>Light</span>
                {theme === 'light' && <span className="text-primary">✓</span>}
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => setTheme('dark')}
                className={`${theme === 'dark' ? 'bg-muted' : ''} cursor-pointer rounded-md flex items-center justify-between`}
              >
                <span>Dark</span>
                {theme === 'dark' && <span className="text-primary">✓</span>}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                onClick={() => setTheme('system')}
                className={`${theme === 'system' ? 'bg-muted' : ''} cursor-pointer rounded-md flex items-center justify-between`}
              >
                <span className="flex items-center">
                  <Settings className="h-3.5 w-3.5 mr-1.5" />
                  System
                </span>
                {theme === 'system' && <span className="text-primary">✓</span>}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden rounded-full text-muted-foreground hover:text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <XIcon className="h-5 w-5" />
            ) : (
              <MenuIcon className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation with Animation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            className="md:hidden bg-background/95 backdrop-blur-lg border-b border-border/50 overflow-hidden"
            variants={mobileMenuVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <nav className="container mx-auto px-4 py-4 flex flex-col space-y-1">
              {navItems.map((item) => {
                const isActive = `#${activeSection}` === item.href;
                
                return (
                  <motion.div 
                    key={item.href}
                    variants={mobileNavItemVariants}
                  >
                    <Link
                      href={item.href}
                      className={`px-4 py-2.5 rounded-lg flex items-center justify-between transition-colors
                        ${isActive 
                          ? 'bg-primary/10 text-primary font-medium' 
                          : 'hover:bg-muted text-muted-foreground hover:text-foreground'
                        }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <span className="flex items-center gap-3">
                        {getNavIcon(item.href)}
                        {item.label}
                      </span>
                      {isActive && <ChevronRightIcon className="h-4 w-4" />}
                    </Link>
                  </motion.div>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}