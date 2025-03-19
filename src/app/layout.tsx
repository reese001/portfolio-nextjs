import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const montserrat = Montserrat();

export const metadata: Metadata = {
  title: "Reese Parsons | Portfolio",
  description: "Portfolio for Reese Parsons",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.className} antialiased overflow-x-hidden`}>
        <Navbar />
        <div className="relative w-full max-w-[100vw] overflow-x-hidden">
          {children}
        </div>
      </body>
    </html>
  );
}
