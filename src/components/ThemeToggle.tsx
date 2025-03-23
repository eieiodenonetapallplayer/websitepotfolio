"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="group relative">
      <motion.button
        onClick={toggleTheme}
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.1 }}
        className="w-10 h-10 flex items-center justify-center rounded-lg transition-colors duration-200 text-slate-400 hover:text-sky-300 hover:bg-slate-800/50"
        aria-label="Toggle theme"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={theme}
            initial={{ y: -20, opacity: 0, rotate: -90 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: 20, opacity: 0, rotate: 90 }}
            transition={{ duration: 0.2 }}
          >
            {theme === "dark" ? "☀️" : "🌙"}
          </motion.div>
        </AnimatePresence>
      </motion.button>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileHover={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="absolute left-14 top-1/2 -translate-y-1/2 px-2 py-1 bg-slate-800 rounded-md pointer-events-none"
        >
          <motion.div className="absolute left-0 top-1/2 -translate-x-1 -translate-y-1/2 border-4 border-transparent border-r-slate-800" />
          <span className="text-white text-sm whitespace-nowrap">
            Toggle theme
          </span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
