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
  SiMysql
} from "react-icons/si";

interface Technology {
  name: string;
  icon?: React.ElementType;
}

export interface ProjectCardProps {
  title: string;
  description: string;
  technologies: Technology[];
  sourceCodeUrl: string;
  image: string;
}

const iconMap = {
  "React": SiReact,
  "NextJS": SiNextdotjs,
  "TypeScript": SiTypescript,
  "MongoDB": SiMongodb,
  "Tailwind CSS": SiTailwindcss,
  "ASP.NET Core": SiDotnet,
  "Bootstrap": SiBootstrap,
  "MySQL": SiMysql
};

export const ProjectCard: React.FC<ProjectCardProps> = ({ title, description, technologies, sourceCodeUrl, image }) => {
  return (
    <BackgroundGradient className="flex flex-col h-full p-6 gap-4">
      <div className="relative w-full h-48 rounded-lg overflow-hidden mb-2">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
        />
      </div>
      <h3 className="text-xl font-semibold text-white">{title}</h3>
      <p className="text-sm text-neutral-300">{description}</p>
      
      <div className="flex flex-wrap gap-2 mt-2">
        {technologies.map((tech, index) => {
          const Icon = iconMap[tech.name as keyof typeof iconMap];
          return (
            <div key={index} className="flex items-center gap-1.5 bg-neutral-800/50 rounded px-2 py-1">
              <Icon className="w-4 h-4 text-neutral-300" />
              <span className="text-sm text-neutral-300">{tech.name}</span>
            </div>
          );
        })}
      </div>

      <div className="mt-auto pt-4">
        {sourceCodeUrl && (
          <a
            href={sourceCodeUrl}
            className="flex items-center justify-center w-full gap-2 px-4 py-2 text-sm font-medium text-neutral-300 bg-neutral-800/50 rounded-md hover:bg-neutral-700/50 transition-colors"
          >
            Source code
          </a>
        )}
      </div>
    </BackgroundGradient>
  );
} 