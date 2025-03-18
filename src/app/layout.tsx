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
      <body className={`${montserrat.className} antialiased`}>
        <Navbar />
        <div className="relative">
          {children}
        </div>
      </body>
    </html>
  );
}
