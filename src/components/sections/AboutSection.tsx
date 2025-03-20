"use client";

import { Meteors } from "@/components/ui/meteors";
import { useEffect, useState } from "react";

export function AboutSection() {
  // Add state to control when the meteors should be visible
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    // Only show the meteors after component is mounted on the client
    setIsMounted(true);
  }, []);

  return (
    <section id="about" className="relative min-h-screen w-full bg-black py-12 mb-20 overflow-hidden">
      {isMounted && (
        <div className="absolute inset-0 w-screen overflow-hidden translate-x-12">
          {/* First layer of meteors - faster and more transparent */}
          <Meteors 
            number={60} 
            className="opacity-50" 
          />
          {/* Second layer of meteors - slower and more visible */}
          <div className="absolute inset-0 delay-1000">
            <Meteors 
              number={40} 
              className="opacity-80" 
            />
          </div>
        </div>
      )}
      <div className="relative mx-auto px-4 py-8 text-center" style={{ zIndex: 10 }}>
        <h1 className="text-5xl md:text-7xl tracking-tight bg-clip-text bg-gradient-to-r from-white via-gray-300 to-gray-800 text-transparent font-semibold mb-16">
          About Me
        </h1>
        <div className="max-w-3xl mx-auto text-gray-300 space-y-6">
          <p className="text-lg leading-relaxed">
            I&apos;m Reese Parsons, a 2nd year student in the IT Web Programming course at Nova Scotia Community College.
          </p>
          <p className="text-lg leading-relaxed">
            I was born and raised in Truro, Nova Scotia, and first starting programming in 2022, self teaching myself Python using online courses. I discovered a passion for programming and decided it was something I wanted to pursue.
          </p>
          <p className="text-lg leading-relaxed">
            Since starting the program, I have discovered and learned a multitude of technologies, including NextJS on React, ASP.NET Core, Java, SQL, MongoDB, and many, many more. I am always eager to learn new technologies and adapt to the ever changing world of web and software development.
          </p>
        </div>
      </div>
    </section>
  );
} 