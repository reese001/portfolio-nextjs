"use client";

import { Button } from "@/components/ui/button";
import { FaGithub, FaLinkedin, FaFileDownload } from "react-icons/fa";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { useEffect, useState } from "react";
import Link from "next/link";

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
            <p className="text-gray-400 text-lg text-pretty max-w-2xl mx-auto">
              I am a <span className="bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-400 text-transparent font-semibold">Full Stack Developer</span> from
              Nova Scotia, Canada. Below you will find some info about me, my
              projects, and a resume outlining my skills and experiences
            </p>

            <div className="space-x-4 pt-4">
              <a href="https://github.com/reese001" target="_blank" rel="noopener noreferrer">
                <Button variant="secondary" className="rounded-lg hover:cursor-pointer">
                  <FaGithub className="w-4 h-4 mr-2" />
                  GitHub  
                </Button>
              </a>
              <a href="https://www.linkedin.com/in/reese-parsons/" target="_blank" rel="noopener noreferrer">
                <Button variant="secondary" className="rounded-lg hover:cursor-pointer">
                  <FaLinkedin className="w-4 h-4 mr-2" />
                  LinkedIn
                </Button>
              </a>
              <a href="/resume-reese-parsons.pdf" download>
                <Button variant="secondary" className="rounded-lg hover:cursor-pointer">
                  <FaFileDownload className="w-4 h-4 mr-2" />
                  Resume
                </Button>
              </a>
            </div>

            <div className="pt-8 space-x-4">
              <Link href="/about">
                <Button variant="secondary" className="rounded-lg hover:cursor-pointer">
                  About Me
                </Button>
              </Link>
              <Link href="/projects">
                <Button variant="secondary" className="rounded-lg hover:cursor-pointer">
                  My Projects
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="secondary" className="rounded-lg hover:cursor-pointer">
                  Contact Me
                </Button>
              </Link>
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
            <p className="text-gray-400 text-lg text-pretty max-w-2xl mx-auto">
              I am a <span className="bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-400 text-transparent font-semibold">Full Stack Developer</span> from
              Nova Scotia, Canada.
            </p>
            
            <div className="space-x-4 pt-4">
              <a href="https://github.com/reese001" target="_blank" rel="noopener noreferrer">
                <Button variant="secondary" className="rounded-lg hover:cursor-pointer">
                  <FaGithub className="w-4 h-4 mr-2" />
                  GitHub  
                </Button>
              </a>
              <a href="https://www.linkedin.com/in/reese-parsons/" target="_blank" rel="noopener noreferrer">
                <Button variant="secondary" className="rounded-lg hover:cursor-pointer">
                  <FaLinkedin className="w-4 h-4 mr-2" />
                  LinkedIn
                </Button>
              </a>
              <a href="/resume-reese-parsons.pdf" download>
                <Button variant="secondary" className="rounded-lg hover:cursor-pointer">
                  <FaFileDownload className="w-4 h-4 mr-2" />
                  Resume
                </Button>
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
} 