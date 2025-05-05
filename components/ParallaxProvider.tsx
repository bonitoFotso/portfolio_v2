'use client';
import React, { forwardRef, ForwardedRef, useEffect, useState } from 'react';

interface ParallaxProviderProps {
  children: React.ReactNode;
}

export const ParallaxProvider = forwardRef<HTMLDivElement, ParallaxProviderProps>(
  ({ children }, ref: ForwardedRef<HTMLDivElement>) => {
    const [scrollY, setScrollY] = useState<number>(0);
    const [mousePosition, setMousePosition] = useState<{ x: number, y: number }>({ x: 0, y: 0 });
    
    // Suivi du défilement pour les effets de parallaxe
    useEffect(() => {
      const handleScroll = () => {
        setScrollY(window.scrollY);
      };
      
      window.addEventListener('scroll', handleScroll);
      
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);
    
    // Suivi des mouvements de souris pour les effets de parallaxe réactifs
    useEffect(() => {
      const handleMouseMove = (e: MouseEvent) => {
        const x = (e.clientX / window.innerWidth) * 2 - 1;
        const y = (e.clientY / window.innerHeight) * 2 - 1;
        setMousePosition({ x, y });
      };
      
      window.addEventListener('mousemove', handleMouseMove);
      
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
      };
    }, []);
    
    return (
      <div 
        ref={ref}
        className="parallax-container"
        style={{
          position: 'relative',
          width: '100%',
          minHeight: '100vh',
          perspective: '1000px',
          perspectiveOrigin: 'center'
        }}
        data-scroll-y={scrollY}
        data-mouse-x={mousePosition.x}
        data-mouse-y={mousePosition.y}
      >
        {/* Créer une couche de profondeur pour le rendu des éléments */}
        <div 
          className="parallax-depth-layer"
          style={{
            position: 'relative',
            width: '100%',
            transformStyle: 'preserve-3d',
            transition: 'transform 0.05s ease-out'
          }}
        >
          {children}
        </div>
      </div>
    );
  }
);

// Assigner un nom d'affichage pour les outils de débogage React
ParallaxProvider.displayName = 'ParallaxProvider';