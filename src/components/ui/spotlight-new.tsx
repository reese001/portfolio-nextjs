"use client";
import React, { useRef, useEffect } from "react";
import { motion } from "motion/react";

type SpotlightProps = {
  gradientFirst?: string;
  gradientSecond?: string;
  gradientThird?: string;
  translateY?: number;
  width?: number;
  height?: number;
  smallWidth?: number;
  duration?: number;
  xOffset?: number;
  opacity?: number;
  fadeSize?: number;
  highlightCards?: boolean;
};

export const Spotlight = ({
  gradientFirst = "radial-gradient(68.54% 68.72% at 55.02% 31.46%, hsla(210, 100%, 85%, .08) 0, hsla(210, 100%, 55%, .02) 50%, hsla(210, 100%, 45%, 0) 80%)",
  gradientSecond = "radial-gradient(50% 50% at 50% 50%, hsla(210, 100%, 85%, .06) 0, hsla(210, 100%, 55%, .02) 80%, transparent 100%)",
  gradientThird = "radial-gradient(50% 50% at 50% 50%, hsla(210, 100%, 85%, .04) 0, hsla(210, 100%, 45%, .02) 80%, transparent 100%)",
  translateY = -350,
  width = 560,
  height = 1380,
  smallWidth = 240,
  duration = 7,
  xOffset = 100,
  opacity = 0.7,
  fadeSize = 150,
  highlightCards = false,
}: SpotlightProps = {}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mousePosition = useRef({ x: 0, y: 0 });
  
  useEffect(() => {
    if (!highlightCards) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        mousePosition.current = {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        };
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [highlightCards]);

  if (highlightCards) {
    return (
      <motion.div
        ref={containerRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="pointer-events-none absolute inset-0 h-full w-full overflow-hidden"
        style={{ zIndex: 0 }}
      >
        {/* Fixed central spotlight for card area - positioned further down */}
        <div 
          className="absolute left-1/2 transform -translate-x-1/2"
          style={{
            top: '45%', // Positioned further down
            width: '90%',
            maxWidth: '1400px',
            height: '800px',
            background: `radial-gradient(ellipse at center, 
              rgba(100, 150, 255, 0.2) 0%, 
              rgba(80, 130, 220, 0.15) 20%, 
              rgba(60, 110, 200, 0.08) 40%,
              rgba(40, 80, 180, 0.04) 60%,
              rgba(0, 0, 0, 0) 80%)`,
            opacity: 0.8,
            filter: 'blur(40px)'
          }}
        />

        {/* Card highlight effect that follows mouse - with limits to keep it more central */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div 
            className="absolute w-full h-full"
            style={{
              background: `radial-gradient(1000px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), 
                rgba(100, 150, 255, 0.15) 0%, 
                rgba(70, 120, 220, 0.08) 25%, 
                rgba(40, 80, 180, 0.02) 50%,
                rgba(0, 0, 0, 0) 75%)`,
              top: 0,
              left: 0,
              '--mouse-x': `clamp(25%, ${mousePosition.current.x}px, 75%)`,
              '--mouse-y': `clamp(35%, ${Math.max(400, mousePosition.current.y)}px, 80%)`,
            } as React.CSSProperties}
          />
        </div>
        
        {/* Additional smaller glow spot with delay */}
        <div 
          className="absolute opacity-60"
          style={{
            background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), 
              rgba(130, 170, 255, 0.14) 0%, 
              rgba(100, 150, 230, 0.08) 30%, 
              rgba(0, 0, 0, 0) 70%)`,
            width: '100%',
            height: '100%',
            top: 0,
            left: 0,
            filter: 'blur(15px)',
            transition: 'all 0.8s cubic-bezier(0.1, 0.9, 0.2, 1)',
            '--mouse-x': `clamp(30%, ${Math.max(0, mousePosition.current.x - 100)}px, 70%)`,
            '--mouse-y': `clamp(40%, ${Math.max(400, mousePosition.current.y - 50)}px, 75%)`,
          } as React.CSSProperties}
        />
        
        {/* Top fade gradient overlay */}
        <div 
          className="absolute top-0 left-0 w-full pointer-events-none"
          style={{
            height: `${fadeSize}px`,
            background: `linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)`,
          }}
        />

        {/* Original spotlights with reduced opacity and repositioned */}
        <motion.div
          animate={{
            x: [0, xOffset, 0],
          }}
          transition={{
            duration,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
          className="absolute top-0 left-0 w-screen h-screen pointer-events-none"
        >
          <div
            style={{
              transform: `translateY(${translateY + 300}px) rotate(-45deg)`, // Moved further down
              background: gradientFirst,
              width: `${width}px`,
              height: `${height}px`,
              opacity: opacity * 0.4,
            }}
            className={`absolute top-0 left-0`}
          />
        </motion.div>

        <motion.div
          animate={{
            x: [0, -xOffset, 0],
          }}
          transition={{
            duration,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
          className="absolute top-0 right-0 w-screen h-screen pointer-events-none"
        >
          <div
            style={{
              transform: `translateY(${translateY + 300}px) rotate(45deg)`, // Moved further down
              background: gradientFirst,
              width: `${width}px`,
              height: `${height}px`,
              opacity: opacity * 0.4,
            }}
            className={`absolute top-0 right-0`}
          />
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      transition={{
        duration: 1.5,
      }}
      className="pointer-events-none absolute inset-0 h-full w-full"
    >
      {/* Top fade gradient overlay */}
      <div 
        className="absolute top-0 left-0 w-full pointer-events-none"
        style={{
          height: `${fadeSize}px`,
          background: `linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)`,
        }}
      />

      <motion.div
        animate={{
          x: [0, xOffset, 0],
        }}
        transition={{
          duration,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
        className="absolute top-0 left-0 w-screen h-screen pointer-events-none"
      >
        <div
          style={{
            transform: `translateY(${translateY}px) rotate(-45deg)`,
            background: gradientFirst,
            width: `${width}px`,
            height: `${height}px`,
            opacity: opacity,
          }}
          className={`absolute top-0 left-0`}
        />

        <div
          style={{
            transform: "rotate(-45deg) translate(5%, -50%)",
            background: gradientSecond,
            width: `${smallWidth}px`,
            height: `${height}px`,
            opacity: opacity * 0.95,
          }}
          className={`absolute top-0 left-0 origin-top-left`}
        />

        <div
          style={{
            transform: "rotate(-45deg) translate(-180%, -70%)",
            background: gradientThird,
            width: `${smallWidth}px`,
            height: `${height}px`,
            opacity: opacity * 0.9,
          }}
          className={`absolute top-0 left-0 origin-top-left`}
        />
      </motion.div>

      <motion.div
        animate={{
          x: [0, -xOffset, 0],
        }}
        transition={{
          duration,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
        className="absolute top-0 right-0 w-screen h-screen pointer-events-none"
      >
        <div
          style={{
            transform: `translateY(${translateY}px) rotate(45deg)`,
            background: gradientFirst,
            width: `${width}px`,
            height: `${height}px`,
            opacity: opacity,
          }}
          className={`absolute top-0 right-0`}
        />

        <div
          style={{
            transform: "rotate(45deg) translate(-5%, -50%)",
            background: gradientSecond,
            width: `${smallWidth}px`,
            height: `${height}px`,
            opacity: opacity * 0.95,
          }}
          className={`absolute top-0 right-0 origin-top-right`}
        />

        <div
          style={{
            transform: "rotate(45deg) translate(180%, -70%)",
            background: gradientThird,
            width: `${smallWidth}px`,
            height: `${height}px`,
            opacity: opacity * 0.9,
          }}
          className={`absolute top-0 right-0 origin-top-right`}
        />
      </motion.div>
    </motion.div>
  );
};
