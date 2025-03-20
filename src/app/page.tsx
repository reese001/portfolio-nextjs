import { HeroSection, AboutSection, ProjectsSection, ContactSection } from "@/components/sections";
import { sendMail } from "@/app/actions/email";
import { Suspense } from "react";

export default function Home() {
  return (
    <main className="w-full bg-black overflow-x-hidden flex flex-col space-y-4">
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-white">Loading contact form...</div>}>
        <ContactSection sendMail={sendMail} />
      </Suspense>
    </main>
  );
}
