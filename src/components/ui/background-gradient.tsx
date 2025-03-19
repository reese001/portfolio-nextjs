'use client';

import { cn } from "@/lib/utils";
import React from "react";

export const BackgroundGradient = ({
  children,
  className,
  containerClassName,
}: {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
}) => {
  return (
    <div className={cn("relative group h-full", containerClassName)}>
      {/* Glow effect */}
      <div className="absolute -inset-[1px] rounded-lg bg-gradient-to-b from-white/10 to-white/5 p-[1px] h-full">
        <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-white/10 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-lg blur-[2px]" />
      </div>
      
      {/* Subtle outer glow for spotlight interaction */}
      <div className="absolute -inset-[3px] rounded-lg bg-white/10 opacity-0 group-hover:opacity-100 blur-xl transition-all duration-300" />
      
      {/* Content */}
      <div className={cn("relative rounded-lg bg-[#0A0A0A] border border-white/10 backdrop-blur-sm transition-all duration-300 group-hover:border-white/30 h-full", className)}>
        {children}
      </div>
    </div>
  );
};
