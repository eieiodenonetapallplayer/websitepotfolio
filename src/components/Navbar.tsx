"use client";

import { useState, useEffect } from "react";
import { useTheme } from "@/context/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "./ThemeToggle";

const navItems = [
  { name: "Home", path: "#" },
  { name: "About", path: "#about" },
  { name: "Work", path: "#work" },
  { name: "Portfolio", path: "#portfolio" }, // Added new nav item
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("");
  const { theme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["about", "work", "portfolio"];
      const current = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 150 && rect.bottom >= 150;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Desktop Navigation */}
      <motion.nav
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="fixed left-0 top-0 h-screen w-16 hidden md:flex flex-col items-center py-8 
          bg-slate-900/10 backdrop-filter backdrop-blur-2xl border-r border-sky-500/10 z-[100]
          shadow-[0_0_30px_rgba(0,0,0,0.1)] bg-gradient-to-b from-slate-900/20 to-slate-900/10"
      >
        <div className="relative mb-8">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="text-xl font-bold tracking-tight text-sky-400 hover:text-sky-300 active:scale-95 transition-all duration-200 cursor-pointer select-none"
          >
            .xyz
          </button>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-gradient-to-r from-sky-400 to-blue-600 rounded-full transition-all duration-200 group-hover:w-6" />
        </div>

        <div className="flex flex-col gap-4">
          {navItems.map((item) => {
            const isActive =
              activeSection === item.path.replace("#", "") ||
              (item.path === "#" && !activeSection);
            return (
              <div key={item.path} className="group relative">
                <motion.a
                  href={item.path}
                  whileTap={{ scale: 0.95 }}
                  whileHover={{ scale: 1.05 }}
                  className={`w-10 h-10 flex items-center justify-center rounded-lg transition-all duration-200 cursor-pointer select-none z-[100] ${
                    isActive
                      ? "bg-sky-500 text-white shadow-lg shadow-sky-500/20"
                      : "text-slate-400 hover:text-sky-300 hover:bg-slate-800/50"
                  }`}
                >
                  {item.name[0]}
                </motion.a>
                <div className="absolute left-14 top-1/2 -translate-y-1/2 px-2 py-1 bg-slate-800 rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="absolute left-0 top-1/2 -translate-x-1 -translate-y-1/2 border-4 border-transparent border-r-slate-800" />
                  <span className="text-white text-sm whitespace-nowrap">
                    {item.name}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-auto mb-8">
          <div className="group relative">
            <ThemeToggle />
          </div>
        </div>
      </motion.nav>

      {/* Mobile Navigation */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-[100]">
        <div className="p-4 flex items-center justify-between bg-slate-900/90 backdrop-blur-lg border-b border-sky-500/10">
          <span className="text-xl font-bold text-sky-400">.xyz</span>
          <button
            onClick={toggleMenu}
            className="p-2 rounded-lg hover:bg-slate-800/50 transition-colors"
          >
            <svg
              className="w-6 h-6 text-ice-blue"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
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
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 right-0 bg-slate-900/90 backdrop-blur-lg border-b border-sky-500/10"
            >
              <div className="p-4 flex flex-col gap-4">
                {["Home", "About", "Work", "Portfolio"].map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    onClick={() => setIsMenuOpen(false)}
                    className="px-4 py-2 rounded-lg text-ice-blue/70 hover:text-ice-blue hover:bg-slate-800/50 transition-colors"
                  >
                    {item}
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
