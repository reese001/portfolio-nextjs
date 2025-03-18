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
      <div className="absolute -inset-[1px] rounded-lg bg-gradient-to-b from-neutral-800 to-neutral-950 p-[1px]">
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg" />
      </div>
      
      {/* Content */}
      <div className={cn("relative rounded-lg bg-[#0A0A0A] border border-neutral-800/50", className)}>
        {children}
      </div>
    </div>
  );
};
