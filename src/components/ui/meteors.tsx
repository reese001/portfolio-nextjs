"use client";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";

export const Meteors = ({
  number,
  className,
}: {
  number?: number;
  className?: string;
}) => {
  const [meteors, setMeteors] = useState<Array<{
    id: number;
    top: number;
    left: string;
    delay: string;
    duration: string;
  }>>([]);

  // Generate meteors only on the client side to avoid hydration errors
  useEffect(() => {
    const meteorCount = number || 20;
    const generatedMeteors = Array(meteorCount).fill(0).map((_, idx) => {
      // Calculate position to evenly distribute meteors across a wider container width
      const position = idx * (1200 / meteorCount) - 600; // Spread across 1200px range, centered
      
      return {
        id: idx,
        top: Math.floor(Math.random() * 50) - 150, // Randomize starting positions
        left: position + "px",
        delay: Math.random() * 8 + "s", // More varied delays (0-8s)
        duration: Math.floor(Math.random() * (12 - 6) + 6) + "s", // Varied duration between 6-12s
      };
    });
    
    setMeteors(generatedMeteors);
  }, [number]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full h-full"
    >
      {meteors.map((meteor) => (
        <span
          key={"meteor" + meteor.id}
          className={cn(
            "animate-meteor-effect absolute h-0.5 w-0.5 rotate-[45deg] rounded-[9999px] bg-slate-500 shadow-[0_0_0_1px_#ffffff10]",
            "before:absolute before:top-1/2 before:h-[1px] before:w-[50px] before:-translate-y-[50%] before:transform before:bg-gradient-to-r before:from-[#64748b] before:to-transparent before:content-['']",
            className,
          )}
          style={{
            top: meteor.top,
            left: meteor.left,
            animationDelay: meteor.delay,
            animationDuration: meteor.duration,
          }}
        ></span>
      ))}
    </motion.div>
  );
};
