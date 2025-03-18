import Link from "next/link";
import React from "react";

export default function Navbar() {
  return <nav className="z-999 top-14 left-1/2 -translate-x-1/2 fixed flex items-center gap-5 py-2 px-4 rounded-full bg-black/60 backdrop-blur-md border text-white border-zinc-800">
    <Link href="/" className="hover:text-gray-300 transition-colors"><span>Home</span></Link>
    <Link href="/about" className="hover:text-gray-300 transition-colors"><span>About</span></Link>
    <Link href="/projects" className="hover:text-gray-300 transition-colors"><span>Projects</span></Link>
    <Link href="/contact" className="hover:text-gray-300 transition-colors"><span>Contact</span></Link>
  </nav>;
}


