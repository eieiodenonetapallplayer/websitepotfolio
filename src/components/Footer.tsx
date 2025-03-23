"use client";

import { useState, useEffect } from "react";

interface Commit {
  sha: string;
  commit: {
    message: string;
    author: {
      date: string;
    };
  };
  html_url: string;
}

export default function Footer() {
  const [latestCommit, setLatestCommit] = useState<Commit | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCommits = async () => {
      try {
        const response = await fetch(
          "https://api.github.com/repos/4levy/website/commits"
        );
        const data = await response.json();
        setLatestCommit(data[0]);
      } catch (error) {
        console.error("Error fetching commits:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCommits();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <footer className="w-full py-6 px-8 mt-20">
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="flex items-center gap-2 text-sm text-ice-blue/70">
          <img
            src="https://count.getloli.com/@4levy?name=4levy&theme=booru-qualityhentais"
            alt="Visitor Counter"
            className="h-200"
            style={{ minWidth: "120px" }}
            loading="lazy"
          />
        </div>

        {loading ? (
          <div className="text-sm text-ice-blue/50 animate-pulse">
            Loading commit data...
          </div>
        ) : (
          latestCommit && (
            <a
              href={latestCommit.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center text-center hover:opacity-80 transition-opacity"
            >
              <div className="flex items-center gap-2 text-xs text-ice-blue/50">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
                </svg>
                <span>Latest Update</span>
              </div>
              <div className="text-xs text-ice-blue/40 mt-1">
                {latestCommit.commit.message.split("\n")[0]}
              </div>
              <div className="text-[10px] text-ice-blue/30 mt-0.5">
                {formatDate(latestCommit.commit.author.date)}
              </div>
            </a>
          )
        )}

        <div className="flex flex-col items-center gap-2 text-center">
          <p className="text-xs text-ice-blue/50">
            © {new Date().getFullYear()} 4levy.xyz • All rights reserved
          </p>
          <a
            href="https://github.com/4levy/website/blob/main/LICENSE"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] text-ice-blue/30 hover:text-ice-blue/50 transition-colors"
          >
            Released under the MIT License
          </a>
        </div>
      </div>
    </footer>
  );
}
