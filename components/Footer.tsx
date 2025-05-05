'use client';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Github, Linkedin, Mail, Heart, ChevronUp, ExternalLink, MessageSquare, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="relative pt-16 pb-10 bg-gradient-to-b from-background to-card border-t border-border/20">
      {/* Wave decoration */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none rotate-180">
        <svg 
          className="relative block w-full h-12 text-card/50" 
          data-name="Layer 1" 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none"
        >
          <path 
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" 
            className="fill-background"
          ></path>
        </svg>
      </div>
      
      {/* Scroll to top button */}
      <div className="absolute -top-5 left-1/2 transform -translate-x-1/2">
        <Button 
          onClick={scrollToTop} 
          size="sm" 
          className="h-10 w-10 rounded-full p-0 bg-primary/90 hover:bg-primary shadow-lg"
        >
          <ChevronUp className="h-5 w-5" />
          <span className="sr-only">Scroll to top</span>
        </Button>
      </div>
      
      <div className="container mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand column */}
          <div className="md:col-span-2 space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-primary tracking-tight">FFMB</h3>
              <p className="text-muted-foreground mt-2">
                Fotso Fotso Mossi Bonito
              </p>
            </div>
            <p className="text-muted-foreground max-w-sm text-sm">
              A passionate web developer focused on creating intuitive, responsive, and modern web experiences. Specializing in frontend technologies with a strong foundation in backend development.
            </p>
            <div className="flex space-x-4 pt-2">
              <a
                href="https://github.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-muted/50 p-2.5 rounded-full text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com/in/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-muted/50 p-2.5 rounded-full text-muted-foreground hover:text-blue-500 hover:bg-blue-500/10 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="mailto:youremail@example.com"
                className="bg-muted/50 p-2.5 rounded-full text-muted-foreground hover:text-purple-500 hover:bg-purple-500/10 transition-colors"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-base font-semibold mb-4 flex items-center gap-2">
              <span className="w-1.5 h-4 bg-primary/70 rounded-full"></span>
              Quick Links
            </h4>
            <ul className="space-y-2">
              {['home', 'about', 'skills', 'experience', 'projects', 'contact'].map((item) => (
                <li key={item}>
                  <a 
                    href={`#${item}`} 
                    className="text-muted-foreground hover:text-primary transition-colors text-sm flex items-center"
                  >
                    <span className="w-1 h-1 bg-primary/50 rounded-full mr-2"></span>
                    {t(`nav.${item}`)}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h4 className="text-base font-semibold mb-4 flex items-center gap-2">
              <span className="w-1.5 h-4 bg-primary/70 rounded-full"></span>
              Contact
            </h4>
            <ul className="space-y-3">
              <li>
                <a 
                  href="mailto:youremail@example.com" 
                  className="text-muted-foreground hover:text-primary transition-colors text-sm flex items-center gap-2"
                >
                  <Mail className="h-4 w-4 text-primary/70" />
                  youremail@example.com
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-muted-foreground hover:text-primary transition-colors text-sm flex items-center gap-2"
                >
                  <MessageSquare className="h-4 w-4 text-primary/70" />
                  Send me a message
                </a>
              </li>
              <li>
                <a 
                  href="https://calendly.com/yourusername" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors text-sm flex items-center gap-2"
                >
                  <Calendar className="h-4 w-4 text-primary/70" />
                  Schedule a call
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom section */}
        <div className="border-t border-border/20 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-xs">
            &copy; {currentYear} Fotso Fotso Mossi Bonito. All rights reserved.
          </p>
          
          <div className="flex items-center gap-6">
            <p className="text-muted-foreground text-xs flex items-center">
              Built with <Heart className="h-3 w-3 mx-1 text-red-500 animate-pulse" /> using Next.js & Tailwind CSS
            </p>
            
            <div className="flex items-center gap-3">
              <a 
                href="https://nextjs.org" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-muted-foreground hover:text-primary transition-colors text-xs flex items-center gap-1"
              >
                Next.js <ExternalLink className="h-3 w-3" />
              </a>
              <span className="text-muted-foreground/40 text-xs">•</span>
              <a 
                href="https://tailwindcss.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-muted-foreground hover:text-primary transition-colors text-xs flex items-center gap-1"
              >
                Tailwind <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}