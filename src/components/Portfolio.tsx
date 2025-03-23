"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useInView,
  UseInViewOptions,
} from "framer-motion";
import { PORTFOLIO_ITEMS } from "@/constants/config";
import { VIDEOS } from "@/constants/videos";
import { useBackground } from "@/contexts/BackgroundContext";

export default function Portfolio() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const ref = useRef(null);
  const previousInView = useRef(false);
  const { changeBackground } = useBackground();
  const isInView = useInView(ref, {
    amount: 0.2,
    once: false,
  } as UseInViewOptions);

  useEffect(() => {
    if (isInView !== previousInView.current) {
      previousInView.current = isInView;
    }
  }, [isInView]);

  return (
    <motion.section
      ref={ref}
      className="py-20 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 20 }, (_, i) => ({
          id: i,
          left: `${(i * 5.27) % 100}%`,
          top: `${(i * 7.31) % 100}%`,
          duration: 2 + (i % 3),
          delay: i * 0.1,
        })).map((petal) => (
          <motion.div
            key={petal.id}
            className="absolute w-3 h-3 bg-pink-200/20 rounded-full"
            style={{ left: petal.left, top: petal.top }}
            animate={{
              y: [0, 100],
              x: [0, 25],
              rotate: [0, 360],
              opacity: [0.2, 0],
            }}
            transition={{
              duration: petal.duration,
              delay: petal.delay,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-3 mb-12"
      >
        <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-300 to-pink-500">
          Portfolio
        </h2>
        <div className="h-px flex-1 bg-gradient-to-r from-pink-400/20 to-transparent" />
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {PORTFOLIO_ITEMS.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
            onHoverStart={() => setHoveredIndex(index)}
            onHoverEnd={() => setHoveredIndex(null)}
          >
            <div className="group relative overflow-hidden rounded-xl shadow-lg shadow-pink-500/10 border border-pink-500/10">
              <div className="relative h-64 w-full">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <AnimatePresence>
                  {hoveredIndex === index && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 bg-gradient-to-t from-pink-900/95 via-pink-900/80 to-transparent 
                        backdrop-blur-sm p-6 flex flex-col justify-end"
                    >
                      <h3 className="text-2xl font-bold mb-2 text-pink-200">
                        {item.title}
                      </h3>
                      <p className="text-pink-100/90 mb-4">
                        {item.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {item.tags.map((tag, i) => (
                          <motion.span
                            key={i}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                            className="px-3 py-1 text-xs rounded-full bg-pink-500/20 text-pink-200 
                              border border-pink-500/30 hover:bg-pink-500/30 transition-colors"
                          >
                            {tag}
                          </motion.span>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
