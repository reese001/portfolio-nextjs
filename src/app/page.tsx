import { BackgroundBeams } from "@/components/background-beams";
import { Button } from "@/components/ui/button";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { AuroraBackground } from "@/components/aurora-background";
import { HeroParallax } from "@/components/hero-parallax";

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
              <h1 className="text-7xl tracking-tight bg-clip-text bg-gradient-to-r from-pink-500 via-purple-400 to-blue-500 text-transparent font-semibold">
                Hi, I&apos;m Reese Parsons
              </h1>
            </div>
            <p className="text-gray-400 text-lg text-pretty">
              I am a <span className="bg-clip-text bg-gradient-to-r from-purple-500  to-rose-500 text-transparent font-semibold">Full Stack Developer</span> from
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
        <BackgroundBeams />
        <div className="relative z-10 container mx-auto px-4 py-20">
          <h2 className="text-4xl font-bold text-center mb-8 bg-clip-text bg-gradient-to-r from-pink-500 to-blue-500 text-transparent">
            About Me
          </h2>
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
      </section>

      {/* Projects Section */}
      <section className="relative w-full">
        <HeroParallax products={projects} />
      </section>
    </main>
  );
}
