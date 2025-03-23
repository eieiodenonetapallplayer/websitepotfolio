"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Star {
  id: number;
  left: number;
  size: number;
  delay: number;
  duration: number;
  rotation: number;
  color: string;
}

export default function FallingStars() {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    const colors = ["#60A5FA", "#38BDF8", "#818CF8", "#A78BFA", "#F472B6"];
    const createStar = () => {
      const newStar = {
        id: Math.random(),
        left: Math.random() * 100,
        size: Math.random() * 2 + 1,
        delay: Math.random() * 2,
        duration: 1 + Math.random() * 3,
        rotation: Math.random() * 360,
        color: colors[Math.floor(Math.random() * colors.length)],
      };

      setStars((prev) => [...prev, newStar]);

      setTimeout(() => {
        setStars((prev) => prev.filter((star) => star.id !== newStar.id));
      }, newStar.duration * 1000 + newStar.delay * 1000);
    };

    // Create initial stars
    for (let i = 0; i < 5; i++) {
      setTimeout(createStar, i * 200);
    }

    // Create new stars periodically
    const interval = setInterval(createStar, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[1]">
      <AnimatePresence>
        {stars.map((star) => (
          <motion.div
            key={star.id}
            initial={{
              x: `${star.left}vw`,
              y: -20,
              opacity: 0,
              scale: 0,
              rotate: star.rotation,
            }}
            animate={{
              x: `${star.left - 20}vw`,
              y: "110vh",
              opacity: [0, 1, 1, 0],
              scale: [0, 1, 1, 0],
              rotate: star.rotation + 360,
            }}
            transition={{
              duration: star.duration,
              delay: star.delay,
              ease: "easeOut",
            }}
            className="absolute"
          >
            <div
              className="relative"
              style={{
                width: `${star.size}px`,
                height: `${star.size}px`,
              }}
            >
              {/* Star core */}
              <div
                className="absolute rounded-full"
                style={{
                  width: `${star.size}px`,
                  height: `${star.size}px`,
                  backgroundColor: star.color,
                  boxShadow: `0 0 ${star.size * 2}px ${star.color}`,
                }}
              />
              {/* Star trail */}
              <div
                className="absolute origin-right"
                style={{
                  width: `${star.size * 50}px`,
                  height: `${star.size / 2}px`,
                  background: `linear-gradient(90deg, ${star.color}, transparent)`,
                  transform: "translateX(-100%)",
                }}
              />
              {/* Star sparkle */}
              <div
                className="absolute animate-ping"
                style={{
                  width: `${star.size * 1.5}px`,
                  height: `${star.size * 1.5}px`,
                  backgroundColor: star.color,
                  filter: "blur(1px)",
                  opacity: 0.5,
                }}
              />
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
