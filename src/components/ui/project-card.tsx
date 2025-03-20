'use client';

import React from "react";
import { BackgroundGradient } from "./background-gradient";
import Image from "next/image";
import { 
  SiReact, 
  SiNextdotjs, 
  SiTypescript, 
  SiMongodb, 
  SiTailwindcss,
  SiDotnet,
  SiBootstrap,
  SiMysql,
  SiJavascript,
  SiPython,
  SiHtml5,
  SiCss3,
  SiGit,
  SiGithub,
  SiNodedotjs,
  SiNpm,
  SiPhp,
  SiLaravel,
} from "react-icons/si";
import { FaJava, FaCode } from "react-icons/fa";
import { IoLogoElectron } from "react-icons/io5";
import { Project } from "@/types";

export type ProjectCardProps = Project;

// Extended icon map with more technologies
const iconMap = {
  "React": SiReact,
  "NextJS": SiNextdotjs,
  "Next.js": SiNextdotjs,
  "TypeScript": SiTypescript,
  "MongoDB": SiMongodb,
  "Tailwind CSS": SiTailwindcss,
  "Tailwind": SiTailwindcss,
  "ASP.NET Core": SiDotnet,
  "ASP.NET": SiDotnet,
  ".NET": SiDotnet,
  "Bootstrap": SiBootstrap,
  "MySQL": SiMysql,
  "Java": FaJava,
  "JavaScript": SiJavascript,
  "Python": SiPython,
  "HTML": SiHtml5,
  "CSS": SiCss3,
  "Git": SiGit,
  "GitHub": SiGithub,
  "Node.js": SiNodedotjs,
  "NodeJS": SiNodedotjs,
  "npm": SiNpm,
  "PHP": SiPhp,
  "Laravel": SiLaravel,
  "ElectronJS": IoLogoElectron
};

// Default fallback icon
const DefaultIcon = FaCode;

export const ProjectCard: React.FC<ProjectCardProps> = ({ title, description, technologies, sourceCodeUrl, image }) => {
  return (
    <BackgroundGradient className="flex flex-col p-6 gap-4 ">
      <div className="relative w-full h-48 backdrop-blur-sm bg-black/40 rounded-lg overflow-hidden mb-2">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover object-center"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      
      {/* Title */}
      <div>
        <h3 className="text-xl font-semibold text-white truncate">{title}</h3>
      </div>
      
      {/* Description - full content without clamp */}
      <div>
        <p className="text-sm text-neutral-300">{description}</p>
      </div>
      
      {/* Technologies - removed fixed height and scrollbar */}
      <div className="mt-2">
        <div className="flex flex-wrap gap-2">
          {technologies.map((tech, index) => {
            // Use the icon from map or fallback to default icon if not found
            const Icon = iconMap[tech.name as keyof typeof iconMap] || DefaultIcon;
            return (
              <div key={index} className="flex items-center gap-1.5 bg-neutral-800/50 rounded px-2 py-1 mb-2">
                <Icon className="w-4 h-4 text-neutral-300" />
                <span className="text-sm text-neutral-300">{tech.name}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-auto pt-4">
        {sourceCodeUrl && (
          <a
            href={sourceCodeUrl}
            className="flex items-center justify-center w-full gap-2 px-4 py-2 text-sm font-medium text-neutral-300 bg-neutral-800/50 rounded-md hover:bg-neutral-700/50 transition-colors"
            target="_blank"
          >
            Source code
          </a>
        )}
      </div>
    </BackgroundGradient>
  );
} 