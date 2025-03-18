import { Button } from "@/components/ui/button";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { LampContainer } from "@/components/ui/lamp";
import { Spotlight } from "@/components/ui/spotlight-new";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import Image from "next/image";

const projects = [
  {
    title: "Full Stack Admin Website",
    link: "#",
    thumbnail: "/tech-admin.png",
  },
  {
    title: "LAMP Stack Documentation Website",
    link: "#",
    thumbnail: "/lamp-docs.png",
  },
  {
    title: "Weather App",
    link: "#",
    thumbnail: "/weather-app.png",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen w-full bg-black">
      {/* Hero Section */}
      <section className="h-screen w-full bg-black">
        <AuroraBackground>
          <div className="text-center space-y-5 max-w-3xl z-10">
            <div className="space-y-3">
              <h1 className="text-7xl tracking-tight bg-clip-text bg-gradient-to-r from-white via-blue-300 to-blue-500 text-transparent font-semibold">
                Hi, I&apos;m Reese Parsons
              </h1>
            </div>
            <p className="text-gray-400 text-lg text-pretty">
              I am a <span className="bg-clip-text bg-gradient-to-r from-blue-300 to-blue-500 text-transparent font-semibold">Full Stack Developer</span> from
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
      </section>

      {/* About Section */}
      <section className="relative min-h-screen w-full bg-black">
        <LampContainer>
        <div className="relative z-10 container mx-auto px-4 py-20 text-center">
        <h1 className="text-7xl tracking-tight bg-clip-text bg-gradient-to-r from-white via-blue-300 to-blue-500 text-transparent font-semibold mb-10">
                About Me
            </h1>
          <div className="max-w-3xl mx-auto text-gray-300">
            <p className="text-lg leading-relaxed mb-3">
              I&apos;m Reese Parsons, a 2nd year student in the IT Web Programming course at Nova Scotia Community College.</p>
            <p className="text-lg leading-relaxed mb-3">
              I was born and raised in Truro, Nova Scotia, and first starting programming in 2022, self teaching myself Python using online courses. I discovered a passion for programming and decided it was something I wanted to pursue.
            </p>
            <p className="text-lg leading-relaxed">
              Since starting the program, I have discovered and learned a multitude of technologies, including NextJS on React, ASP.NET Core, Java, SQL, MongoDB, and many, many more. I am always eager to learn new technologies and adapt to the ever changing world of web and software development.
            </p>
          </div>
        </div>
        </LampContainer>
      </section>

      {/* Projects Section */}
      <section className="relative w-full bg-black py-20 min-h-screen overflow-hidden">
        <Spotlight />
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-7xl tracking-tight bg-clip-text bg-gradient-to-r from-white via-blue-300 to-blue-500 text-transparent font-semibold mb-10">
            Projects
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 max-w-7xl mx-auto">
            {projects.map((project, index) => (
              <BackgroundGradient key={index} className="h-full">
                <div className="flex flex-col h-[400px] p-6">
                  <div className="relative w-full h-[250px] rounded-lg overflow-hidden">
                    <Image
                      src={project.thumbnail}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col flex-grow justify-between mt-4">
                    <h3 className="text-xl font-bold text-white">{project.title}</h3>
                    <a
                      href={project.link}
                      className="mt-2 inline-block text-sm text-gray-400 hover:text-white transition-colors"
                    >
                      View Project →
                    </a>
                  </div>
                </div>
              </BackgroundGradient>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
