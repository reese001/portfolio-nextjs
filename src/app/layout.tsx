import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Script from "next/script";

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
      <head>
        <Script src="https://www.google.com/recaptcha/enterprise.js?render=6LdDD_oqAAAAAGugzG2FXYf7ZdaPfOek1xTl1ksv"></Script>
      </head>
      <body className={`${montserrat.className} antialiased overflow-x-hidden`}>
        <Navbar />
        <div className="relative w-full max-w-[100vw] overflow-x-hidden">
          {children}
        </div>
      </body>
    </html>
  );
}
