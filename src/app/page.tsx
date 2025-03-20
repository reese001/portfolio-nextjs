import { HeroSection, AboutSection, ProjectsSection, ContactSection } from "@/components/sections";
import { sendMail } from "@/app/actions/email";

export default function Home() {
  return (
    <main className="w-full bg-black overflow-x-hidden flex flex-col space-y-4">
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <ContactSection sendMail={sendMail} />
    </main>
  );
}
