"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";

interface NavItem {
  id: string;
  label: string;
}

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("hero");
  const [isMounted, setIsMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  // Add state for active item dimensions to avoid DOM access in render
  const [activeItemDimensions, setActiveItemDimensions] = useState({ width: 0, left: 0 });

  const navItems = useMemo<NavItem[]>(() => [
    { id: "hero", label: "Home" },
    { id: "about", label: "About" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" }
  ], []);

  // This useEffect ensures the component is mounted before using browser APIs
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Update active item dimensions whenever active section changes
  useEffect(() => {
    if (isMounted && activeSection) {
      const activeElement = document.getElementById(`nav-${activeSection}`);
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
  }, [activeSection, isMounted]);

  useEffect(() => {
    if (!isMounted) return;
    
    const handleScroll = () => {
      // Add shadow on scroll
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
      
      // Skip active section detection during programmatic scrolling
      if (isScrolling) return;
      
      // Active section detection
      const sections = navItems.map(item => item.id);
      const scrollPosition = window.scrollY + 100; // Adding offset for better detection

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop && 
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMounted, navItems, isScrolling]);

  const handleScrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    if (!isMounted) return;
    
    const section = document.getElementById(sectionId);
    
    if (section) {
      // Set active section immediately and lock scrolling detection
      setActiveSection(sectionId);
      setIsScrolling(true);
      
      window.scrollTo({
        top: section.offsetTop,
        behavior: "smooth"
      });
      
      // Unlock scrolling detection after animation completes
      setTimeout(() => {
        setIsScrolling(false);
      }, 1000); // Adjust timing as needed (typical scroll animation is ~1s)
      
      setIsMobileMenuOpen(false); // Close mobile menu after clicking
    }
  };
  
  return (
    <>
      {/* Desktop Navigation */}
      <motion.nav 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`z-999 top-5 left-1/2 -translate-x-1/2 fixed hidden md:flex items-center justify-between py-2 px-6 rounded-full backdrop-blur-md border border-zinc-800/60 ${
          isScrolled 
            ? 'bg-black/70 shadow-lg shadow-black/20 border-zinc-800/80' 
            : 'bg-black/40'
        } transition-all duration-300`}
      >
        {/* Logo/Brand */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mr-3"
        >
          <div className="text-white font-bold text-lg pr-3 border-r border-zinc-700/50">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-100 to-gray-500">RP</span>
          </div>
        </motion.div>

        {/* Nav Items */}
        <div ref={navRef} className="flex items-center gap-1 relative">
          {/* Animated background indicator */}
          {isMounted && activeSection && (
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

          {navItems.map((item, index) => (
            <motion.div 
              id={`nav-${item.id}`}
              key={item.id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index + 0.3 }}
              className="relative px-1 z-10"
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <a 
                href={`#${item.id}`} 
                onClick={(e) => handleScrollToSection(e, item.id)}
                className={`relative text-sm transition-all duration-300 px-3 py-1.5 rounded-full inline-block cursor-pointer ${
                  activeSection === item.id 
                    ? "text-white font-medium" 
                    : hoveredItem === item.id
                    ? "text-gray-200"
                    : "text-gray-400"
                }`}
              >
                <span className="relative z-10">{item.label}</span>
                
                {/* Only keep the hover effect for non-active items */}
                <AnimatePresence>
                  {isMounted && hoveredItem === item.id && activeSection !== item.id && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.85 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.85 }}
                      transition={{ duration: 0.2 }}
                      className="absolute inset-0 bg-zinc-800/40 rounded-full"
                    />
                  )}
                </AnimatePresence>
              </a>
            </motion.div>
          ))}
        </div>
      </motion.nav>

      {/* Mobile Navigation */}
      <div className="md:hidden fixed top-5 right-5 z-50">
        {/* Mobile Menu Button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className={`p-2 rounded-full ${
            isScrolled ? 'bg-black/70 shadow-lg shadow-black/20 border border-zinc-800/80' : 'bg-black/40 border border-zinc-800/60'
          } backdrop-blur-md transition-all duration-300`}
        >
          <div className="w-6 flex flex-col items-end gap-1.5">
            <motion.span 
              animate={{ 
                rotate: isMobileMenuOpen ? 45 : 0,
                y: isMobileMenuOpen ? 8 : 0,
                width: isMobileMenuOpen ? '24px' : '24px'
              }}
              className="h-0.5 bg-white rounded-full block"
            />
            <motion.span 
              animate={{ 
                opacity: isMobileMenuOpen ? 0 : 1,
                width: '16px'
              }}
              className="h-0.5 bg-white rounded-full block"
            />
            <motion.span 
              animate={{ 
                rotate: isMobileMenuOpen ? -45 : 0,
                y: isMobileMenuOpen ? -8 : 0,
                width: isMobileMenuOpen ? '24px' : '20px'
              }}
              className="h-0.5 bg-white rounded-full block"
            />
          </div>
        </motion.button>

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
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={(e) => handleScrollToSection(e, item.id)}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      activeSection === item.id
                        ? "bg-zinc-800 text-white"
                        : "text-gray-400 hover:text-white hover:bg-zinc-800/50"
                    }`}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}


