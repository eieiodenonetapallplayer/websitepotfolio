"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import packageJson from "../../package.json";

export default function VersionDisplay() {
  const [isExpanded, setIsExpanded] = useState(false);

  // Fixed build date (adjust if needed)
  const buildDate =
    process.env.NEXT_PUBLIC_BUILD_DATE || new Date().toLocaleDateString();

  // Hardcoded Next.js version or from ENV
  const nextVersion = process.env.NEXT_PUBLIC_NEXT_VERSION || "13.5.4";

  // Ensure React version matches the image
  const reactVersion = "^19.0.0"; // Manually set, or fetch dynamically if needed

  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
      <motion.div
        onClick={() => setIsExpanded(!isExpanded)}
        className="cursor-pointer"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div
          className="px-3 py-1.5 bg-blue-900/80 text-sky-300 rounded-full
          border border-blue-800 backdrop-blur-sm hover:bg-blue-800/80
          transition-all duration-300 flex items-center gap-2"
        >
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-xs font-medium">v{packageJson.version}</span>
        </div>
      </motion.div>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            className="absolute bottom-12 left-1/2 transform -translate-x-1/2 p-3 rounded-md bg-blue-900/90
              backdrop-blur-md border border-blue-800/50 w-36"
          >
            <div className="space-y-1 text-xs">
              <div className="flex justify-between items-center text-gray-300">
                <span>App</span>
                <span className="text-sky-300">{packageJson.version}</span>
              </div>
              <div className="flex justify-between items-center text-gray-300">
                <span>Next.js</span>
                <span className="text-sky-300">{nextVersion}</span>
              </div>
              <div className="flex justify-between items-center text-gray-300">
                <span>React</span>
                <span className="text-sky-300">{reactVersion}</span>
              </div>
              <div className="flex justify-between items-center text-gray-300">
                <span>Build<br />Date</span>
                <span className="text-sky-300">{buildDate}</span>
              </div>
              <div className="pt-1 mt-1 border-t border-blue-700/50 text-center">
              <a
                  href="https://github.com/4levy/website"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sky-300 hover:text-sky-400 transition-colors flex items-center gap-1"
                >
                  <svg
                    className="w-3 h-3"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  <span className="ml-1">View Source</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
