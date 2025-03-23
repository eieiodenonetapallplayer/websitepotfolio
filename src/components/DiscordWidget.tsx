"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { useInView } from "framer-motion";

const DISCORD_SERVER_ID = "1007520773096886323";
const DISCORD_INVITE_LINK = "https://discord.gg/TSdpyMMfrU";

export default function DiscordWidget() {
  const [isMounted, setIsMounted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false });

  useEffect(() => setIsMounted(true), []);

  return (
    <div ref={ref} className="container max-w-6xl mx-auto px-4 sm:px-6">
      <motion.div
        className="relative overflow-hidden rounded-xl bg-midnight/40 border border-sky-500/10
          hover:border-sky-500/20 transition-all duration-500"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.005 }}
        transition={{ duration: 0.3 }}
      >
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute inset-0 bg-[url('/discord-pattern.svg')] bg-repeat opacity-[0.02]"
            style={{ backgroundSize: "60px 60px" }}
          />
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-sky-500/10 via-transparent to-sky-500/10"
            animate={{
              x: ["0%", "100%", "0%"],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </div>

        <div className="relative p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <motion.div
                className="relative w-12 sm:w-14 h-12 sm:h-14 rounded-2xl overflow-hidden bg-gradient-to-br from-sky-400 to-sky-600
                  flex items-center justify-center shrink-0"
                whileHover={{ scale: 1.1, rotate: 10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.svg
                  className="w-7 h-7 text-white"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  animate={{
                    rotate: isHovered ? 360 : 0,
                    scale: isHovered ? 1.2 : 1,
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <path d="M20.317 4.492c-1.53-.69-3.17-1.2-4.885-1.49a.075.075 0 0 0-.079.036c-.21.369-.444.85-.608 1.23a18.566 18.566 0 0 0-5.487 0 12.36 12.36 0 0 0-.617-1.23A.077.077 0 0 0 8.562 3c-1.714.29-3.354.8-4.885 1.491a.07.07 0 0 0-.032.027C.533 9.093-.32 13.555.099 17.961a.08.08 0 0 0 .031.055 20.03 20.03 0 0 0 5.993 2.98.078.078 0 0 0 .084-.026c.462-.62.874-1.275 1.226-1.963.021-.04.001-.088-.041-.104a13.201 13.201 0 0 1-1.872-.878.075.075 0 0 1-.008-.125c.126-.093.252-.19.372-.287a.075.075 0 0 1 .078-.01c3.927 1.764 8.18 1.764 12.061 0a.075.075 0 0 1 .079.009c.12.098.245.195.372.288a.075.075 0 0 1-.006.125c-.598.344-1.22.635-1.873.877a.075.075 0 0 0-.041.105c.36.687.772 1.341 1.225 1.962a.077.077 0 0 0 .084.028 19.963 19.963 0 0 0 6.002-2.981.076.076 0 0 0 .032-.054c.5-5.094-.838-9.52-3.549-13.442a.06.06 0 0 0-.031-.028z" />
                </motion.svg>
              </motion.div>
              <div className="flex-1">
                <motion.h3
                  className="text-lg sm:text-xl font-semibold bg-gradient-to-r from-sky-300 to-sky-500 bg-clip-text text-transparent"
                  whileHover={{ scale: 1.05 }}
                >
                  Discord Community
                </motion.h3>
                <p className="text-xs sm:text-sm text-sky-300/60">
                  Join our growing community
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <motion.a
                href={DISCORD_INVITE_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg bg-sky-500 text-white text-sm font-medium
                  hover:bg-sky-400 transition-colors relative overflow-hidden group flex-1 sm:flex-none text-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
              >
                Join Server
              </motion.a>

              <motion.button
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-2 hover:bg-sky-500/10 rounded-lg transition-all shrink-0"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <motion.svg
                  className="w-6 h-6 text-sky-300"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </motion.svg>
              </motion.button>
            </div>
          </div>

          <AnimatePresence>
            {isMounted && isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              >
                <div className="mt-4 sm:mt-6 rounded-xl overflow-hidden border border-sky-500/10">
                  <iframe
                    src={`https://discord.com/widget?id=${DISCORD_SERVER_ID}&theme=dark`}
                    width="100%"
                    height={350}
                    frameBorder="0"
                    sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
                    className="bg-sky-950/20 w-full"
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
