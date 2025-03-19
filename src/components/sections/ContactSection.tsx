"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { WavyBackground } from "@/components/ui/wavy-background";
import { useEffect, useState } from "react";

export function ContactSection() {
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section id="contact" className="relative w-full bg-black min-h-screen overflow-hidden">
      {isMounted ? (
        <WavyBackground 
          waveWidth={100} 
          backgroundFill="black" 
          blur={10} 
          waveOpacity={0.5}
          colors={["#111827", "#1f2937", "#374151", "#4b5563", "#6b7280"]}
          containerClassName="py-32 min-h-screen"
        >
          <div className="container mx-auto px-4 text-center relative">
            <h1 className="text-7xl tracking-tight bg-clip-text bg-gradient-to-r from-white via-neutral-300 to-neutral-500 text-transparent font-semibold mb-20">
              Contact Me
            </h1>
            <div className="max-w-2xl mx-auto backdrop-blur-sm bg-black/20 p-8 rounded-xl border border-gray-800">
              <form className="space-y-6">
                <div className="space-y-2 text-left">
                  <label htmlFor="name" className="text-sm font-medium text-gray-300">
                    Name
                  </label>
                  <Input
                    type="text"
                    id="name"
                    placeholder="Your name"
                    className="bg-zinc-900/80 border-zinc-800 text-white"
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
                    className="bg-zinc-900/80 border-zinc-800 text-white"
                  />
                </div>
                <div className="space-y-2 text-left">
                  <label htmlFor="message" className="text-sm font-medium text-gray-300">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Your message..."
                    className="bg-zinc-900/80 border-zinc-800 text-white resize-none"
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
        </WavyBackground>
      ) : (
        <div className="py-32 min-h-screen flex items-center justify-center">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-7xl tracking-tight bg-clip-text bg-gradient-to-r from-white via-neutral-300 to-neutral-500 text-transparent font-semibold mb-20">
              Contact Me
            </h1>
            <div className="max-w-2xl mx-auto backdrop-blur-sm bg-black/20 p-8 rounded-xl border border-gray-800">
              {/* Placeholder form while the client-side component loads */}
              <div className="opacity-50">Loading form...</div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
} 