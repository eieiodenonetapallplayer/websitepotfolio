"use client";

import { motion } from "framer-motion";
import type { GitHubRepo } from "@/types/github";

interface ProjectsProps {
  projects: GitHubRepo[];
}

const Projects = ({ projects }: ProjectsProps) => {
  if (projects.length === 0) {
    return (
      <div className="glass-card col-span-2 text-center p-8 rounded-lg">
        <p className="text-ice-blue/70">No featured projects available.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {projects.map((project) => (
        <motion.a
          key={project.id}
          href={project.html_url}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.02 }}
          className="glass-card glow-effect p-6 rounded-lg group transition-all duration-300"
        >
          <h3 className="text-2xl font-bold mb-4 gradient-text">
            {project.name}
          </h3>
          <p className="text-ice-blue/70 mb-4">
            {project.description || "No description available"}
          </p>
          <div className="flex flex-wrap gap-4 text-sm">
            {project.language && (
              <span className="px-3 py-1 rounded-full glass-card text-glow">
                {project.language}
              </span>
            )}
            <div className="flex gap-4">
              <span className="px-3 py-1 rounded-full glass-card text-glow flex items-center gap-1">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z" />
                </svg>
                {project.stargazers_count}
              </span>
              <span className="px-3 py-1 rounded-full glass-card text-glow flex items-center gap-1">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 1 1.5 0v.878a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.128a2.251 2.251 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 3.5 6.25v-.878a2.25 2.25 0 1 1 1.5 0Z" />
                </svg>
                {project.forks_count}
              </span>
            </div>
          </div>
        </motion.a>
      ))}
    </div>
  );
};

export default Projects;
