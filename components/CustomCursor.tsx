'use client';

import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [clicked, setClicked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isText, setIsText] = useState(false);
  const [isLink, setIsLink] = useState(false);
  const [isButton, setIsButton] = useState(false);

  // Smooth cursor movement with spring physics
  const cursorX = useSpring(0, {
    stiffness: 150,
    damping: 15,
    mass: 0.5
  });
  const cursorY = useSpring(0, {
    stiffness: 150,
    damping: 15,
    mass: 0.5
  });

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const mouseDown = () => setClicked(true);
    const mouseUp = () => setClicked(false);

    const handleElementDetection = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      setIsButton(target.tagName === 'BUTTON' || target.closest('button') !== null);
      setIsLink(target.tagName === 'A' || target.closest('a') !== null);
      setIsText(
        !target.closest('button') && 
        !target.closest('a') && 
        (target.tagName === 'P' || target.tagName === 'SPAN' || target.tagName === 'DIV')
      );
    };

    const handleHoverStart = () => setIsHovered(true);
    const handleHoverEnd = () => setIsHovered(false);

    window.addEventListener('mousemove', mouseMove);
    window.addEventListener('mousedown', mouseDown);
    window.addEventListener('mouseup', mouseUp);
    window.addEventListener('mouseover', handleElementDetection);

    const interactiveElements = document.querySelectorAll('a, button');
    interactiveElements.forEach((element) => {
      element.addEventListener('mouseenter', handleHoverStart);
      element.addEventListener('mouseleave', handleHoverEnd);
    });

    return () => {
      window.removeEventListener('mousemove', mouseMove);
      window.removeEventListener('mousedown', mouseDown);
      window.removeEventListener('mouseup', mouseUp);
      window.removeEventListener('mouseover', handleElementDetection);

      interactiveElements.forEach((element) => {
        element.removeEventListener('mouseenter', handleHoverStart);
        element.removeEventListener('mouseleave', handleHoverEnd);
      });
    };
  }, [cursorX, cursorY]);

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-50 hidden md:block mix-blend-difference"
      animate={{
        x: position.x,
        y: position.y,
        scale: clicked ? 0.8 : isButton ? 1.5 : isLink ? 1.25 : isText ? 0.75 : 1,
        opacity: 0.6,
        rotate: isHovered ? 15 : 0,
        width: isLink ? '25px' : '20px',
        height: isLink ? '15px' : '20px',
        borderRadius: isLink ? '25px' : '50%',
      }}
      transition={{
        type: 'spring',
        stiffness: 150,
        damping: 15,
        mass: 0.5,
        duration: 0.15,
      }}
      style={{
        border: '2px solid white',
        transform: 'translate(-50%, -50%)',
      }}
    >
      {clicked && (
        <motion.div
          className="absolute inset-0 bg-white rounded-full"
          initial={{ scale: 0, opacity: 0.5 }}
          animate={{ scale: 2, opacity: 0 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </motion.div>
  );
}