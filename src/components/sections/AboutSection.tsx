"use client";

import { useEffect, useState } from "react";
import { 
  SiHtml5, 
  SiCss3, 
  SiJavascript, 
  SiNextdotjs, 
  SiElectron, 
  SiReact, 
  SiPython, 
  SiPhp, 
  SiDotnet, 
  SiDocker, 
  SiLaravel, 
  SiSharp, 
  SiMongodb, 
  SiMysql,
  SiApache,
  SiNginx,
  SiWordpress,
  SiLua,
} from "react-icons/si";
import { FaJava, FaAws, FaChevronDown, FaChevronUp } from "react-icons/fa";

export function AboutSection() {
  const [isMounted, setIsMounted] = useState(false);
  const [showTechnologies, setShowTechnologies] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const technologies = [
    { name: "HTML", icon: SiHtml5 },
    { name: "CSS", icon: SiCss3 },
    { name: "JavaScript", icon: SiJavascript },
    { name: "NextJS", icon: SiNextdotjs },
    { name: "ElectronJS", icon: SiElectron },
    { name: "React", icon: SiReact },
    { name: "Java", icon: FaJava },
    { name: "Python", icon: SiPython },
    { name: "PHP", icon: SiPhp },
    { name: ".NET", icon: SiDotnet },
    { name: "Docker", icon: SiDocker },
    { name: "AWS", icon: FaAws },
    { name: "Laravel", icon: SiLaravel },
    { name: "C#", icon: SiSharp },
    { name: "MongoDB", icon: SiMongodb },
    { name: "MySQL", icon: SiMysql },
    { name: "Apache", icon: SiApache },
    { name: "Nginx", icon: SiNginx },
    { name: "Wordpress", icon: SiWordpress },
    { name: "Lua", icon: SiLua },
  ];

  return (
    <section id="about" className="relative w-full min-h-screen bg-black py-12 overflow-hidden">
      {isMounted && (
        <div className="absolute inset-0 w-screen overflow-hidden">
          <div className="relative w-full h-full">
            <div
              className="absolute inset-0"
              style={{
                backgroundSize: "20px 20px",
                backgroundImage: "radial-gradient(#404040 1px, transparent 1px)",
              }}
            />
            {/* Radial gradient for the container to give a faded look */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
          </div>
        </div>
      )}
      <div className="relative mx-auto px-4 py-8 text-center" style={{ zIndex: 10 }}>
        <h1 className="text-5xl md:text-7xl tracking-tight bg-clip-text bg-gradient-to-r from-white via-gray-300 to-gray-800 text-transparent font-semibold mb-16">
          About Me
        </h1>
        <div className="max-w-3xl mx-auto text-gray-300 space-y-6 mb-20">
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

        {/* Technology Stack */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-semibold text-gray-200 mb-12">Some Technologies I&apos;ve Worked With</h2>
          
          {/* Mobile Show/Hide Button */}
          <button
            onClick={() => setShowTechnologies(!showTechnologies)}
            className="md:hidden flex items-center justify-center gap-2 mx-auto mb-6 px-4 py-2 rounded-lg bg-zinc-800/50 hover:bg-zinc-700/50 text-gray-300 hover:text-white transition-colors duration-300"
          >
            {showTechnologies ? (
              <>
                Hide Technologies
                <FaChevronUp className="w-4 h-4" />
              </>
            ) : (
              <>
                Show Technologies
                <FaChevronDown className="w-4 h-4" />
              </>
            )}
          </button>

          {/* Technology Grid */}
          <div className={`
            grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8
            transition-all duration-500 ease-in-out
            ${showTechnologies ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0 md:max-h-none md:opacity-100 overflow-hidden'}
          `}>
            {technologies.map((tech, index) => {
              const Icon = tech.icon;
              return (
                <div 
                  key={index}
                  className="flex flex-col items-center group"
                >
                  <div className="p-4 rounded-lg bg-zinc-800/50 hover:bg-zinc-700/50 transition-colors duration-300">
                    <Icon className="w-8 h-8 text-gray-300 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <span className="mt-2 text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                    {tech.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
} 