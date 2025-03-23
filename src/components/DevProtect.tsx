"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export default function DevProtect() {
  const router = useRouter();
  const checksRef = useRef<number>(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const redirectToBlocked = () => {
      try {
        router.replace("/blocked");
      } catch (error) {
        window.location.href = "/blocked";
      }
    };

    const detectDevTools = () => {
      try {
        const heightDiff = Math.abs(window.outerHeight - window.innerHeight);
        const widthDiff = Math.abs(window.outerWidth - window.innerWidth);

        if (heightDiff > 150 || widthDiff > 300) {
          checksRef.current++;
          if (checksRef.current >= 3) {
            redirectToBlocked();
          }
        } else {
          checksRef.current = 0;
        }
      } catch (error) {

      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === "F12" ||
        (e.ctrlKey && e.shiftKey && ["I", "J", "C"].includes(e.key)) ||
        (e.ctrlKey && e.key === "u")
      ) {
        e.preventDefault();
        checksRef.current++;
        if (checksRef.current >= 3) {
          redirectToBlocked();
        }
      }
    };

    const handleContextMenu = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName !== "INPUT" && target.tagName !== "TEXTAREA") {
        e.preventDefault();
      }
    };

    // Set up event listeners
    document.addEventListener("keydown", handleKeyDown, { capture: true });
    document.addEventListener("contextmenu", handleContextMenu, {
      capture: true,
    });
    window.addEventListener("resize", detectDevTools);

    // Periodic check
    intervalRef.current = setInterval(detectDevTools, 1000);

    // Cleanup
    return () => {
      document.removeEventListener("keydown", handleKeyDown, { capture: true });
      document.removeEventListener("contextmenu", handleContextMenu, {
        capture: true,
      });
      window.removeEventListener("resize", detectDevTools);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [router]);

  return null;
}
