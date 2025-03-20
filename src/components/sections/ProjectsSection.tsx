"use client";

import { Spotlight } from "@/components/ui/spotlight-new";
import { ProjectCard } from "@/components/ui/project-card";
import projectsData from "@/data/projects.json";
import { Project } from "@/types";
import { useEffect, useState } from "react";

const projects: Project[] = projectsData;

export function ProjectsSection() {
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section 
      id="projects" 
      className="relative w-full bg-black py-16 min-h-screen overflow-hidden"
    >
      <div className="container mx-auto px-4 text-center relative z-10">
        <h1 className="text-7xl tracking-tight leading-tight bg-clip-text bg-gradient-to-r from-white via-gray-300 to-gray-800 text-transparent font-semibold mb-20">
          Projects
        </h1>
        
        {/* The spotlight is positioned here in the middle of content */}
        <div className="relative">
          {isMounted && (
            <div className="absolute inset-0 -translate-y-8 z-0">
              <Spotlight />
            </div>
          )}
          
          <p className="text-gray-400 text-md mb-16 relative z-10 max-w-2xl mx-auto">
            (Some repositories have been asked to be made private by the instructors. If you would like to view the source code, please contact me.)
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto relative z-10">
            {projects.map((project: Project, index) => (
              <div 
                key={index} 
                className="transform transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] h-[550px]"
                style={{ 
                  position: 'relative',
                  zIndex: 10 
                }}
              >
                <ProjectCard
                  {...project}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 