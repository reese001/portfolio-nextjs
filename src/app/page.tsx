import { HeroSection, AboutSection, ProjectsSection, ContactSection } from "@/components/sections";

export default function Home() {
  return (
    <main className="min-h-screen w-full bg-black overflow-x-hidden">
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <ContactSection />
    </main>
  );
}
