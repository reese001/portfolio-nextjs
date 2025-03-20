"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItem {
  id: string;
  label: string;
  path: string;
}

export default function Navbar() {
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const [activeItemDimensions, setActiveItemDimensions] = useState({ width: 0, left: 0 });

  const navItems = useMemo<NavItem[]>(() => [
    { id: "hero", label: "Home", path: "/" },
    { id: "about", label: "About", path: "/about" },
    { id: "projects", label: "Projects", path: "/projects" },
    { id: "contact", label: "Contact", path: "/contact" }
  ], []);

  // This useEffect ensures the component is mounted before using browser APIs
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Update active item dimensions whenever pathname changes
  useEffect(() => {
    if (isMounted && pathname) {
      const activeElement = document.getElementById(`nav-${getCurrentSection(pathname)}`);
      const navElement = navRef.current;
      
      if (activeElement && navElement) {
        const activeRect = activeElement.getBoundingClientRect();
        const navRect = navElement.getBoundingClientRect();
        
        setActiveItemDimensions({
          width: activeRect.width,
          left: activeRect.left - navRect.left
        });
      }
    }
  }, [pathname, isMounted]);

  useEffect(() => {
    if (!isMounted) return;
    
    const handleScroll = () => {
      // Add shadow on scroll
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMounted]);

  const getCurrentSection = (path: string) => {
    if (path === "/") return "hero";
    return path.slice(1); // Remove the leading slash
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? "bg-black/80 backdrop-blur-sm shadow-lg" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          {/* Desktop Navigation */}
          <div ref={navRef} className="hidden md:flex items-center gap-1 relative">
            {/* Animated background indicator */}
            {isMounted && pathname && (
              <motion.div
                className="absolute h-7 rounded-full bg-gradient-to-r from-zinc-800/90 to-zinc-700/50 z-0"
                layoutId="activeSection"
                transition={{
                  type: "spring",
                  stiffness: 350,
                  damping: 30
                }}
                style={{
                  width: activeItemDimensions.width,
                  left: activeItemDimensions.left
                }}
              />
            )}

            {navItems.map((item) => (
              <motion.div 
                id={`nav-${item.id}`}
                key={item.id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * navItems.indexOf(item) + 0.3 }}
                className="relative px-1 z-10"
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <Link
                  href={item.path}
                  className={`relative text-sm transition-all duration-300 px-3 py-1.5 rounded-full inline-block cursor-pointer ${
                    getCurrentSection(pathname) === item.id 
                      ? "text-white font-medium" 
                      : hoveredItem === item.id
                      ? "text-gray-200"
                      : "text-gray-400"
                  }`}
                >
                  <span className="relative z-10">{item.label}</span>
                  
                  {/* Only keep the hover effect for non-active items */}
                  <AnimatePresence>
                    {isMounted && hoveredItem === item.id && getCurrentSection(pathname) !== item.id && (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.85 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.85 }}
                        transition={{ duration: 0.2 }}
                        className="absolute inset-0 bg-zinc-800/40 rounded-full"
                      />
                    )}
                  </AnimatePresence>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-zinc-800/50 transition-colors"
          >
            <svg
              className="w-6 h-6 text-gray-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: -20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -20 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="absolute top-14 right-0 bg-black/80 backdrop-blur-lg border border-zinc-800 rounded-xl p-4 w-48 shadow-xl"
              >
                <div className="flex flex-col gap-2">
                  {navItems.map((item) => (
                    <Link
                      key={item.id}
                      href={item.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`px-4 py-2 rounded-lg transition-colors ${
                        getCurrentSection(pathname) === item.id
                          ? "bg-zinc-800 text-white"
                          : "text-gray-400 hover:text-white hover:bg-zinc-800/50"
                      }`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>
    </>
  );
}


