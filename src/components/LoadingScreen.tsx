"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useLoading } from "@/contexts/LoadingContext";

export default function LoadingScreen() {
  const { isLoading, currentLoadingItem, progress } = useLoading();

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-midnight flex items-center justify-center"
        >
          <div className="w-full max-w-md space-y-4 p-6">
            <div className="space-y-2">
              <h2 className="text-xl text-sky-300 text-center">
                {currentLoadingItem}
              </h2>
              <div className="relative h-2 bg-sky-950/50 rounded-full overflow-hidden">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-sky-500"
                  style={{ width: `${progress}%` }}
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <p className="text-sm text-ice-blue/50 text-center">
                {progress.toFixed(0)}%
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
