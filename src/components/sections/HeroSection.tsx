"use client";

import { Button } from "@/components/ui/button";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { useEffect, useState } from "react";

export function HeroSection() {
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section id="hero" className="h-screen w-full bg-black overflow-hidden">
      {isMounted ? (
        <AuroraBackground>
          <div className="text-center space-y-5 max-w-3xl z-10">
            <div className="space-y-3">
              <h1 className="text-7xl tracking-tight bg-clip-text bg-gradient-to-r from-gray-100 via-gray-300 to-gray-500 text-transparent font-semibold">
                Hi, I&apos;m Reese Parsons
              </h1>
            </div>
            <p className="text-gray-400 text-lg text-pretty">
              I am a <span className="bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-400 text-transparent font-semibold">Full Stack Developer</span> from
              Nova Scotia, Canada. Below you will find some info about me, my
              projects, and a resume outlining my skills and experiences
            </p>

            <div className="space-x-3">
              <Button variant="default" className="rounded-lg">
                <FaGithub className="w-4 h-4" />
                GitHub  
              </Button>
              <Button variant="secondary" className="rounded-lg">
                <FaLinkedin className="w-4 h-4" />
                LinkedIn
              </Button>
            </div>
          </div>
        </AuroraBackground>
      ) : (
        <div className="h-screen w-full flex items-center justify-center">
          <div className="text-center space-y-5 max-w-3xl">
            <div className="space-y-3">
              <h1 className="text-7xl tracking-tight bg-clip-text bg-gradient-to-r from-gray-100 via-gray-300 to-gray-500 text-transparent font-semibold">
                Hi, I&apos;m Reese Parsons
              </h1>
            </div>
            <p className="text-gray-400 text-lg text-pretty">
              I am a <span className="bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-400 text-transparent font-semibold">Full Stack Developer</span> from
              Nova Scotia, Canada.
            </p>
          </div>
        </div>
      )}
    </section>
  );
} 