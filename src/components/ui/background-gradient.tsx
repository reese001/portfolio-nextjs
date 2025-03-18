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
    <div className={cn("relative group", containerClassName)}>
      {/* Glow effect */}
      <div className="absolute -inset-1 rounded-[22px] bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6] opacity-50 blur-lg group-hover:opacity-75 group-hover:blur-xl transition-all duration-500" />
      
      {/* Content */}
      <div className={cn("relative rounded-[22px] bg-zinc-900", className)}>
        {children}
      </div>
    </div>
  );
};
