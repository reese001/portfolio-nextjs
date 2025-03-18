import { Button } from "@/components/ui/button";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { LampContainer } from "@/components/ui/lamp";
import { Spotlight } from "@/components/ui/spotlight-new";
import { ProjectCard, ProjectCardProps } from "@/components/ui/project-card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";

const projects = [
  {
    title: "Tech Roster Admin",
    description: "An administration end that allows users to edit the content of the Tech Roster frontend. Made with React and NextJS using a MongoDB database and the Shadcn UI library. Uses a custom REST API for data handling between the app and database.",
    technologies: [
      { name: "React" },
      { name: "NextJS" },
      { name: "TypeScript" },
      { name: "MongoDB" },
      { name: "Tailwind CSS" },
    ],
    sourceCodeUrl: "#",
    image: "/tech-admin.png"
  },
  {
    title: "Launch Pad",
    description: "A launch pad app made with ASP.NET Core using EF Core. A web app that features authentication and some dashboard customization options, including the ability to pin links, edit categories and light/dark mode.",
    technologies: [
      { name: "ASP.NET Core" },
      { name: "Bootstrap" },
      { name: "MySQL" },
      { name: "Tailwind CSS" },
    ],
    sourceCodeUrl: "#",
    image: "/launch-pad.png"
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
              <h1 className="text-7xl tracking-tight bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-400 text-transparent font-semibold">
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
      </section>

      {/* About Section */}
      <section className="relative min-h-screen w-full bg-black">
        <LampContainer>
        <div className="relative z-10 container mx-auto px-4 py-20 text-center">
        <h1 className="text-7xl tracking-tight bg-clip-text bg-gradient-to-r from-white via-neutral-300 to-neutral-500 text-transparent font-semibold mb-10">
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
      <section className="relative w-full bg-black py-32 min-h-screen overflow-hidden">
        <Spotlight />
        <div className="container mx-auto px-4 text-center relative">
          <h1 className="text-7xl tracking-tight bg-clip-text bg-gradient-to-r from-white via-neutral-300 to-neutral-500 text-transparent font-semibold mb-20">
            Projects
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 max-w-7xl mx-auto">
            {projects.map((project: ProjectCardProps, index) => (
              <ProjectCard
                key={index}
                {...project}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="relative w-full bg-black py-32 min-h-screen overflow-hidden">
        <div className="container mx-auto px-4 text-center relative">
          <h1 className="text-7xl tracking-tight bg-clip-text bg-gradient-to-r from-white via-neutral-300 to-neutral-500 text-transparent font-semibold mb-20">
            Contact Me
          </h1>
          <div className="max-w-2xl mx-auto">
            <form className="space-y-6">
              <div className="space-y-2 text-left">
                <label htmlFor="name" className="text-sm font-medium text-gray-300">
                  Name
                </label>
                <Input
                  type="text"
                  id="name"
                  placeholder="Your name"
                  className="bg-zinc-900 border-zinc-800 text-white"
                />
              </div>
              <div className="space-y-2 text-left">
                <label htmlFor="email" className="text-sm font-medium text-gray-300">
                  Email
                </label>
                <Input
                  type="email"
                  id="email"
                  placeholder="your.email@example.com"
                  className="bg-zinc-900 border-zinc-800 text-white"
                />
              </div>
              <div className="space-y-2 text-left">
                <label htmlFor="message" className="text-sm font-medium text-gray-300">
                  Message
                </label>
                <Textarea
                  id="message"
                  placeholder="Your message..."
                  className="bg-zinc-900 border-zinc-800 text-white resize-none"
                />
              </div>
              <HoverBorderGradient
                as="button"
                containerClassName="w-full"
                className="w-full bg-white text-black hover:bg-gray-200"
              >
                Send Message
              </HoverBorderGradient>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
