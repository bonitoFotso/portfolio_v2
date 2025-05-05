'use client';
import React, { useEffect, useMemo, useRef, useState } from 'react';

interface ThemeType {
  background: string;
  gridColor: string;
  accentColor: string;
  particles: string;
  glowColor: string;
  patternOpacity: number;
}

interface ParticleType {
  x: number;
  y: number;
  radius: number;
  speedX: number;
  speedY: number;
  alpha: number;
  growing: boolean;
}

export const LabBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [theme, setTheme] = useState<number>(0);
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number } | null>(null);
  
  // Enhanced themes with more properties
  const themes = useMemo<ThemeType[]>(() => [
    {
      background: 'rgb(10, 10, 31)',
      gridColor: 'rgba(0, 255, 170, 0.2)',
      accentColor: 'rgba(0, 255, 255, 0.6)',
      particles: 'rgba(0, 255, 255, 0.8)',
      glowColor: '0, 255, 255',
      patternOpacity: 0.12
    },
    {
      background: 'rgb(15, 27, 43)',
      gridColor: 'rgba(255, 140, 0, 0.15)',
      accentColor: 'rgba(255, 200, 0, 0.5)',
      particles: 'rgba(255, 200, 0, 0.7)',
      glowColor: '255, 200, 0',
      patternOpacity: 0.1
    },
    {
      background: 'rgb(26, 10, 32)',
      gridColor: 'rgba(200, 0, 255, 0.15)',
      accentColor: 'rgba(255, 0, 200, 0.5)',
      particles: 'rgba(255, 0, 200, 0.7)',
      glowColor: '255, 0, 200',
      patternOpacity: 0.1
    },
    {
      background: 'rgb(5, 15, 25)',
      gridColor: 'rgba(0, 100, 255, 0.15)',
      accentColor: 'rgba(0, 150, 255, 0.5)',
      particles: 'rgba(0, 150, 255, 0.7)',
      glowColor: '0, 150, 255',
      patternOpacity: 0.12
    },
  ], []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let animationFrameId: number;
    let particles: ParticleType[] = [];
    let lastTime = 0;
    let symbolPositions: Array<{x: number, y: number, type: number, rotation: number, scale: number, pulse: number, pulseDir: boolean}> = [];
    
    // Handle canvas sizing
    const handleResize = (): void => {
      if (!canvas) return;
      
      // Use devicePixelRatio for sharper rendering on high-DPI screens
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      
      // Scale the canvas dimensions down in CSS
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      
      // Scale the context to adjust for the devicePixelRatio
      ctx.scale(dpr, dpr);
      
      createParticles();
      createSymbols();
    };

    // Mouse movement effect
    const handleMouseMove = (e: MouseEvent): void => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    handleResize();

    // Theme rotation every 30 seconds
    const themeInterval = setInterval(() => {
      setTheme((prevTheme) => (prevTheme + 1) % themes.length);
    }, 30000);

    // Create initial symbols at grid intersections
    function createSymbols(): void {
      if (!canvas) return;
      
      symbolPositions = [];
      const gridSize = 60; // Larger grid for better visibility
      const symbolDensity = 0.03; // Controls how many grid points have symbols
      
      for (let x = gridSize; x < canvas.width; x += gridSize) {
        for (let y = gridSize; y < canvas.height; y += gridSize) {
          if (Math.random() < symbolDensity) {
            symbolPositions.push({
              x,
              y,
              type: Math.floor(Math.random() * 6),
              rotation: Math.random() * Math.PI * 2,
              scale: 0.7 + Math.random() * 0.6,
              pulse: Math.random(),
              pulseDir: Math.random() > 0.5
            });
          }
        }
      }
    }

    // Create particles with enhanced properties
    function createParticles(): void {
      if (!canvas) return;
      
      particles = [];
      const particleCount = Math.floor(canvas.width * canvas.height / 20000);
      
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 1.5 + 0.5,
          speedX: (Math.random() - 0.5) * 0.3,
          speedY: (Math.random() - 0.5) * 0.3,
          alpha: 0.3 + Math.random() * 0.7,
          growing: Math.random() > 0.5
        });
      }
    }

    // Update particles with pulsing effect
    function updateParticles(deltaTime: number): void {
      if (!canvas) return;
      
      particles.forEach(particle => {
        // Movement
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Boundary checks
        if (particle.x < 0) {
          particle.x = canvas.width;
        } else if (particle.x > canvas.width) {
          particle.x = 0;
        }
        
        if (particle.y < 0) {
          particle.y = canvas.height;
        } else if (particle.y > canvas.height) {
          particle.y = 0;
        }
        
        // Pulsing alpha
        if (particle.growing) {
          particle.alpha += 0.002 * deltaTime;
          if (particle.alpha >= 1) {
            particle.growing = false;
          }
        } else {
          particle.alpha -= 0.002 * deltaTime;
          if (particle.alpha <= 0.3) {
            particle.growing = true;
          }
        }
        
        // Mouse interaction
        if (mousePosition) {
          const dx = mousePosition.x - particle.x;
          const dy = mousePosition.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            // Gentle repulsion from cursor
            const angle = Math.atan2(dy, dx);
            const force = (100 - distance) * 0.0002 * deltaTime;
            
            particle.speedX -= Math.cos(angle) * force;
            particle.speedY -= Math.sin(angle) * force;
            
            // Limit max speed
            const speed = Math.sqrt(particle.speedX * particle.speedX + particle.speedY * particle.speedY);
            if (speed > 0.8) {
              particle.speedX = (particle.speedX / speed) * 0.8;
              particle.speedY = (particle.speedY / speed) * 0.8;
            }
          }
        }
      });
    }

    // Draw grid with perspective effect
    function drawGrid(ctx: CanvasRenderingContext2D, gridSize: number): void {
      if (!canvas) return;
      
      const currentTheme = themes[theme];
      
      // Horizontal lines
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        
        // Vary line opacity based on position for depth illusion
        const opacity = (y % (gridSize * 2) === 0) ? 
          currentTheme.patternOpacity : currentTheme.patternOpacity * 0.7;
        
        ctx.strokeStyle = currentTheme.gridColor.replace('rgba', '').replace(/,\s*[\d.]+\)/, `, ${opacity})`);
        ctx.stroke();
      }

      // Vertical lines
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        
        const opacity = (x % (gridSize * 2) === 0) ? 
          currentTheme.patternOpacity : currentTheme.patternOpacity * 0.7;
        
        ctx.strokeStyle = currentTheme.gridColor.replace('rgba', '').replace(/,\s*[\d.]+\)/, `, ${opacity})`);
        ctx.stroke();
      }
    }

    // Draw a lab symbol with specified parameters
    function drawSymbol(ctx: CanvasRenderingContext2D, x: number, y: number, type: number, rotation: number, scale: number, pulse: number): void {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.scale(scale, scale);
      
      const currentTheme = themes[theme];
      
      // Apply pulse effect
      const baseAlpha = 0.6 + pulse * 0.4;
      const color = currentTheme.accentColor.replace('rgba', '').replace(/,\s*[\d.]+\)/, `, ${baseAlpha})`);
      ctx.strokeStyle = color;
      ctx.fillStyle = currentTheme.accentColor.replace('rgba', '').replace(/,\s*[\d.]+\)/, ', 0.1)');
      
      switch (type) {
        case 0: // Circle
          ctx.beginPath();
          ctx.arc(0, 0, 12, 0, Math.PI * 2);
          ctx.stroke();
          ctx.fill();
          break;
        case 1: // Cross
          ctx.beginPath();
          ctx.moveTo(-8, -8);
          ctx.lineTo(8, 8);
          ctx.moveTo(8, -8);
          ctx.lineTo(-8, 8);
          ctx.stroke();
          break;
        case 2: // Triangle
          ctx.beginPath();
          ctx.moveTo(0, -10);
          ctx.lineTo(10, 8);
          ctx.lineTo(-10, 8);
          ctx.closePath();
          ctx.stroke();
          ctx.fill();
          break;
        case 3: // Diamond
          ctx.beginPath();
          ctx.moveTo(0, -10);
          ctx.lineTo(10, 0);
          ctx.lineTo(0, 10);
          ctx.lineTo(-10, 0);
          ctx.closePath();
          ctx.stroke();
          ctx.fill();
          break;
        case 4: // Square
          ctx.beginPath();
          ctx.rect(-8, -8, 16, 16);
          ctx.stroke();
          ctx.fill();
          break;
        case 5: // Hexagon
          ctx.beginPath();
          for (let i = 0; i < 6; i++) {
            const angle = (Math.PI / 3) * i;
            const x = Math.cos(angle) * 10;
            const y = Math.sin(angle) * 10;
            
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.closePath();
          ctx.stroke();
          ctx.fill();
          break;
      }
      
      ctx.restore();
    }

    // Draw mouse glow effect
    function drawMouseGlow(ctx: CanvasRenderingContext2D): void {
      if (!mousePosition || !canvas) return;
      
      const { x, y } = mousePosition;
      const currentTheme = themes[theme];
      
      // Create radial gradient
      const glow = ctx.createRadialGradient(x, y, 0, x, y, 130);
      glow.addColorStop(0, `rgba(${currentTheme.glowColor}, 0.15)`);
      glow.addColorStop(0.6, `rgba(${currentTheme.glowColor}, 0.05)`);
      glow.addColorStop(1, `rgba(${currentTheme.glowColor}, 0)`);
      
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(x, y, 130, 0, Math.PI * 2);
      ctx.fill();
    }

    // Main render loop with time-based animation
    function draw(timestamp: number): void {
      if (!canvas || !ctx) return;
      
      // Delta time for smooth animation regardless of frame rate
      const deltaTime = timestamp - lastTime || 0;
      lastTime = timestamp;
      
      const currentTheme = themes[theme];
      
      // Clear canvas
      ctx.fillStyle = currentTheme.background;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw Grid
      const gridSize = 30;
      ctx.lineWidth = 1;
      drawGrid(ctx, gridSize);
      
      // Draw symbols with pulsing effect
      symbolPositions.forEach(symbol => {
        // Update pulse value
        if (symbol.pulseDir) {
          symbol.pulse += 0.0005 * deltaTime;
          if (symbol.pulse >= 1) symbol.pulseDir = false;
        } else {
          symbol.pulse -= 0.0005 * deltaTime;
          if (symbol.pulse <= 0) symbol.pulseDir = true;
        }
        
        // Slowly rotate symbols
        symbol.rotation += 0.0002 * deltaTime;
        
        drawSymbol(ctx, symbol.x, symbol.y, symbol.type, symbol.rotation, symbol.scale, symbol.pulse);
      });
      
      // Draw mouse glow
      drawMouseGlow(ctx);
      
      // Draw particles with updated alpha values
      particles.forEach(particle => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        
        // Use alpha property for fading effect
        ctx.fillStyle = currentTheme.particles.replace('rgba', '').replace(/,\s*[\d.]+\)/, `, ${particle.alpha})`);
        ctx.fill();
      });
      
      // Update particle positions and properties
      updateParticles(deltaTime);
      
      // Request next frame
      animationFrameId = window.requestAnimationFrame(draw);
    }

    // Initialize and start animation
    createParticles();
    createSymbols();
    animationFrameId = window.requestAnimationFrame(draw);

    // Cleanup function
    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(themeInterval);
    };
  }, [theme, themes, mousePosition]);

  // Smooth theme transition effect
  const currentTheme = themes[theme];
  const transitionStyle = {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: -1,
    opacity: 0.85,
    transition: 'background-color 2s ease-in-out',
    backgroundColor: currentTheme.background
  };

  return (
    <>
      <div style={transitionStyle}></div>
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: -1,
          opacity: 1,
          pointerEvents: 'none'
        }}
      />
    </>
  );
};