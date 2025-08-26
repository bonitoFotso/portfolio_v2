"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface InteractiveLoaderProps {
  mousePosition: { x: number; y: number };
  onComplete: () => void;
}

export const InteractiveLoader: React.FC<InteractiveLoaderProps> = ({
  mousePosition,
  onComplete,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [progress, setProgress] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      setError("Canvas context not supported");
      return;
    }

    // Adjust canvas size with device pixel ratio for sharp rendering
    const dpr = window.devicePixelRatio || 1;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    // Create particles with improved performance
    const particlesArray: Particle[] = [];
    const numberOfParticles = Math.min(
      200,
      Math.floor((canvas.width * canvas.height) / 20000)
    );

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;

      constructor() {
        this.x = Math.random() * window.innerWidth;
        this.y = Math.random() * window.innerHeight;
        this.size = Math.random() * 3 + 1;
        this.speedX = (Math.random() - 0.5) * 2;
        this.speedY = (Math.random() - 0.5) * 2;
        this.color = `hsl(${Math.random() * 60 + 180}, 100%, 50%)`;
      }

      update(mouseX: number, mouseY: number) {
        this.x += this.speedX;
        this.y += this.speedY;

        // Optimized mouse interaction
        const dx = mouseX * window.innerWidth - this.x;
        const dy = mouseY * window.innerHeight - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 100) {
          const angle = Math.atan2(dy, dx);
          const force = (100 - distance) / 100;
          this.speedX += Math.cos(angle) * force * 0.2;
          this.speedY += Math.sin(angle) * force * 0.2;
        }

        // Speed limits
        this.speedX = Math.min(Math.max(this.speedX, -4), 4);
        this.speedY = Math.min(Math.max(this.speedY, -4), 4);

        // Boundary checks with improved performance
        if (this.x < 0) this.x = window.innerWidth;
        else if (this.x > window.innerWidth) this.x = 0;
        if (this.y < 0) this.y = window.innerHeight;
        else if (this.y > window.innerHeight) this.y = 0;
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Initialize particles
    for (let i = 0; i < numberOfParticles; i++) {
      particlesArray.push(new Particle());
    }

    let animationId: number;
    let lastTime = performance.now();

    const animate = (currentTime: number) => {
      const deltaTime = currentTime - lastTime;
      lastTime = currentTime;

      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      // Update progress with smooth animation
      setProgress((prev) => {
        const newProgress = prev + 0.3 * (deltaTime / 16.67);
        if (newProgress >= 100) {
          cancelAnimationFrame(animationId);
          setTimeout(onComplete, 500);
          return 100;
        }
        return newProgress;
      });

      // Batch particle updates for better performance
      const mouseXNormalized = mousePosition.x;
      const mouseYNormalized = mousePosition.y;

      for (const particle of particlesArray) {
        particle.update(mouseXNormalized, mouseYNormalized);
        particle.draw(ctx);
      }

      // Draw logo and progress bar with improved visuals
      ctx.save();
      ctx.fillStyle = "white";
      ctx.font = "bold 48px Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("PORTFOLIO", window.innerWidth / 2, window.innerHeight / 2);

      const progressBarWidth = 300;
      const progressBarHeight = 5;
      const progressBarX = window.innerWidth / 2 - progressBarWidth / 2;
      const progressBarY = window.innerHeight / 2 + 40;

      // Progress bar background
      ctx.fillStyle = "rgba(200, 200, 200, 0.3)";
      ctx.fillRect(
        progressBarX,
        progressBarY,
        progressBarWidth,
        progressBarHeight
      );

      // Progress bar fill with gradient
      const gradient = ctx.createLinearGradient(
        progressBarX,
        0,
        progressBarX + progressBarWidth,
        0
      );
      gradient.addColorStop(0, "rgba(120, 200, 255, 0.8)");
      gradient.addColorStop(1, "rgba(80, 160, 255, 0.8)");
      ctx.fillStyle = gradient;
      ctx.fillRect(
        progressBarX,
        progressBarY,
        progressBarWidth * (progress / 100),
        progressBarHeight
      );

      ctx.restore();
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [mousePosition, onComplete, progress]);

  if (error) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black text-white">
        <p>Loading failed: {error}</p>
      </div>
    );
  }

  return (
    <motion.div
      className="interactive-loader"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 1000,
        backgroundColor: "#0a0a0a",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        transform: `perspective(1000px) rotateX(${
          (mousePosition.y - 0.5) * 5
        }deg) rotateY(${(mousePosition.x - 0.5) * 5}deg)`,
        transformStyle: "preserve-3d",
        transition: "transform 0.1s ease-out",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      />
    </motion.div>
  );
};
