"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-midnight p-4">
      <div className="text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1
            className="text-[150px] font-bold text-transparent bg-clip-text 
            bg-gradient-to-r from-sky-400 to-blue-600 leading-none"
          >
            404
          </h1>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="space-y-4"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Page Not Found
          </h2>
          <p className="text-ice-blue/70 max-w-md mx-auto mb-8">
            The page you're looking for doesn't exist or has been moved. Let's
            get you back on track.
          </p>

          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 
              bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 
              rounded-full transition-all duration-300
              hover:gap-4 hover:shadow-lg hover:shadow-sky-500/10
              border border-sky-500/20 hover:border-sky-500/40"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Return Home
          </Link>
        </motion.div>

        <motion.div
          className="absolute inset-0 -z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 1 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-sky-500/20 to-blue-600/20 blur-3xl" />
        </motion.div>
      </div>
    </div>
  );
}
