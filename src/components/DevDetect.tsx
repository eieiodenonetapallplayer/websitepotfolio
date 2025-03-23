"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type ConsoleMethod = keyof Console;

export default function DevDetect() {
  const router = useRouter();
  const [isDevTools, setIsDevTools] = useState(false);

  useEffect(() => {
    // Prevent right click
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      return false;
    };

    // Prevent dev tool shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === "F12" ||
        (e.ctrlKey &&
          e.shiftKey &&
          (e.key === "I" || e.key === "J" || e.key === "C")) ||
        (e.ctrlKey && e.key === "u")
      ) {
        e.preventDefault();
        return false;
      }
    };

    const detectDevTools = () => {
      const threshold = 160;
      const widthThreshold = window.outerWidth - window.innerWidth > threshold;
      const heightThreshold =
        window.outerHeight - window.innerHeight > threshold;

      if (widthThreshold || heightThreshold) {
        setIsDevTools(true);
        router.push("/blocked");
      }
    };

    if (process.env.NODE_ENV === "production") {
      const noop = () => undefined;
      const methods: ConsoleMethod[] = [
        "log",
        "debug",
        "info",
        "warn",
        "error",
        "table",
      ];

      methods.forEach((method) => {
        (console[method] as any) = noop;
      });
    }

    window.addEventListener("contextmenu", handleContextMenu);
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", detectDevTools);

    const interval = setInterval(detectDevTools, 1000);

    return () => {
      window.removeEventListener("contextmenu", handleContextMenu);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", detectDevTools);
      clearInterval(interval);
    };
  }, [router]);

  if (isDevTools) {
    return (
      <div className="fixed inset-0 bg-midnight flex items-center justify-center z-50">
        <div className="text-center p-8">
          <h1 className="text-2xl font-bold text-red-500 mb-4">
            Access Denied
          </h1>
          <p className="text-ice-blue/70">
            Developer tools are not allowed on this site.
          </p>
        </div>
      </div>
    );
  }

  return null;
}
