'use client';
import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface InteractiveLoaderProps {
  mousePosition: { x: number; y: number };
  onComplete: () => void;
}

export const InteractiveLoader: React.FC<InteractiveLoaderProps> = ({ 
  mousePosition, 
  onComplete 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [progress, setProgress] = useState<number>(0);
  
  // Gérer le canvas et l'animation des particules
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Ajuster la taille du canvas à celle de la fenêtre
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    // Créer les particules
    const particlesArray: Particle[] = [];
    const numberOfParticles = 200;
    
    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      
      constructor() {
        this.x = Math.random() * (canvas?.width ?? window.innerWidth);
        this.y = Math.random() * (canvas?.height ?? window.innerHeight);
        this.size = Math.random() * 5 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
        this.color = `hsl(${Math.random() * 60 + 180}, 100%, 50%)`;
      }
      
      update(mouseX: number, mouseY: number) {
        this.x += this.speedX;
        this.y += this.speedY;
        
        // Effet d'attraction vers la souris
        const dx = mouseX * (canvas?.width ?? window.innerWidth) - this.x;
        const dy = mouseY * (canvas?.height ?? window.innerHeight) - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        const forceDirectionX = dx / distance;
        const forceDirectionY = dy / distance;
        
        // Plus la souris est proche, plus l'attraction est forte
        const maxDistance = 100;
        const force = (maxDistance - distance) / maxDistance;
        
        if (distance < maxDistance) {
          this.speedX += forceDirectionX * force * 0.6;
          this.speedY += forceDirectionY * force * 0.6;
        }
        
        // Limiter la vitesse
        this.speedX = Math.min(Math.max(this.speedX, -5), 5);
        this.speedY = Math.min(Math.max(this.speedY, -5), 5);
        
        // Rebondir sur les bords
        if (this.x < 0 || this.x > (canvas?.width ?? window.innerWidth)) {
          this.speedX *= -1;
        }
        
        if (this.y < 0 || this.y > (canvas?.height ?? window.innerHeight)) {
          this.speedY *= -1;
        }
      }
      
      draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    
    // Initialiser les particules
    for (let i = 0; i < numberOfParticles; i++) {
      particlesArray.push(new Particle());
    }
    
    // Animation
    let animationId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Augmenter progressivement le chargement
      setProgress(prev => {
        const newProgress = prev + 0.5;
        if (newProgress >= 100) {
          cancelAnimationFrame(animationId);
          setTimeout(onComplete, 500); // Petite pause avant de finaliser
          return 100;
        }
        return newProgress;
      });
      
      // Dessiner les lignes entre particules proches
      ctx.strokeStyle = 'rgba(120, 200, 255, 0.1)';
      ctx.lineWidth = 1;
      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
          const dx = particlesArray[a].x - particlesArray[b].x;
          const dy = particlesArray[a].y - particlesArray[b].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
            ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
            ctx.stroke();
          }
        }
      }
      
      // Mettre à jour et dessiner toutes les particules
      for (const particle of particlesArray) {
        particle.update(mousePosition.x, mousePosition.y);
        particle.draw(ctx);
      }
      
      // Dessiner le texte du logo au centre
      const logoText = "PORTFOLIO";
      ctx.fillStyle = 'white';
      ctx.font = 'bold 48px Arial';
      const textMetrics = ctx.measureText(logoText);
      ctx.fillText(
        logoText, 
        canvas.width / 2 - textMetrics.width / 2, 
        canvas.height / 2
      );
      
      // Dessiner la barre de progression
      const progressBarWidth = 300;
      const progressBarHeight = 5;
      ctx.fillStyle = 'rgba(200, 200, 200, 0.3)';
      ctx.fillRect(
        canvas.width / 2 - progressBarWidth / 2, 
        canvas.height / 2 + 40, 
        progressBarWidth, 
        progressBarHeight
      );
      
      ctx.fillStyle = 'rgba(120, 200, 255, 0.8)';
      ctx.fillRect(
        canvas.width / 2 - progressBarWidth / 2, 
        canvas.height / 2 + 40, 
        progressBarWidth * (progress / 100), 
        progressBarHeight
      );
      
      animationId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [mousePosition, onComplete, progress]);
  
  return (
    <motion.div 
      className="interactive-loader"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 1000,
        backgroundColor: '#0a0a0a',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        // Effet de perspective basé sur la position de la souris
        transform: `perspective(1000px) rotateX(${mousePosition.y * -5}deg) rotateY(${mousePosition.x * 5}deg)`,
        transformStyle: 'preserve-3d',
        transition: 'transform 0.1s ease-out'
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%'
        }}
      />
    </motion.div>
  );
};