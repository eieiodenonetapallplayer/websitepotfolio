"use client";

import { motion } from "framer-motion";
import type { GitHubRepo } from "@/types/github";

export default function ProjectCard({ project }: { project: GitHubRepo }) {
  return (
    <motion.a
      href={project.html_url}
      target="_blank"
      rel="noopener noreferrer"
      className="card-3d glass-card glow-effect p-6 rounded-lg group"
      onMouseMove={(e) => {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        card.style.setProperty("--mouse-x", `${x}px`);
        card.style.setProperty("--mouse-y", `${y}px`);
        card.style.transform = `
          perspective(1000px)
          rotateX(${rotateX}deg)
          rotateY(${rotateY}deg)
          scale3d(1.05, 1.05, 1.05)
        `;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "";
      }}
    >
      <div className="card-3d-content space-y-4">
        <h3 className="text-2xl font-bold gradient-text">{project.name}</h3>
        <p className="text-ice-blue/70">
          {project.description || "No description available"}
        </p>

        {/* Repository Stats */}
        <div className="flex flex-col gap-3">
          {/* Language Stats */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-ice-blue/50">Primary Language:</span>
            <span className="px-2 py-1 rounded-full bg-sky-500/10 text-sky-300 text-xs border border-sky-500/20">
              {project.language || "Not specified"}
            </span>
          </div>

          {/* Repository Metrics */}
          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center gap-2 p-2 rounded-lg bg-sky-500/5 border border-sky-500/10">
              <svg
                className="w-4 h-4 text-sky-400"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z" />
              </svg>
              <div className="flex flex-col">
                <span className="text-xs text-ice-blue/50">Stars</span>
                <span className="text-sm font-medium text-sky-300">
                  {project.stargazers_count}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 p-2 rounded-lg bg-sky-500/5 border border-sky-500/10">
              <svg
                className="w-4 h-4 text-sky-400"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 1 1.5 0v.878a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.128a2.251 2.251 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 3.5 6.25v-.878a2.25 2.25 0 1 1 1.5 0Z" />
              </svg>
              <div className="flex flex-col">
                <span className="text-xs text-ice-blue/50">Forks</span>
                <span className="text-sm font-medium text-sky-300">
                  {project.forks_count}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="card-3d-shine group-hover:opacity-100" />
    </motion.a>
  );
}
