"use client";

import { useEffect, useState } from "react";

export default function PlaylistCard() {
  const [isLoading, setIsLoading] = useState(true);
  const [iframeError, setIframeError] = useState(false);

  const reloadIframe = () => {
    setIsLoading(true);
    setIframeError(false);
  };

  return (
    <div className="glass-card p-6 rounded-lg h-full flex flex-col">
      <div className="flex items-center gap-3 mb-4">
        <svg
          className="w-6 h-6 text-green-400"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
        </svg>
        <h3 className="text-xl font-bold gradient-text">My Playlist</h3>
      </div>

      <div className="relative flex-1 rounded-lg overflow-hidden bg-midnight/30 min-h-[400px]">
        {isLoading && !iframeError && (
          <div className="absolute inset-0 flex items-center justify-center bg-midnight/50 backdrop-blur-sm">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-ice-blue" />
          </div>
        )}

        {iframeError ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-ice-blue/70">
            <p>Failed to load playlist</p>
            <button
              onClick={reloadIframe}
              className="mt-2 px-4 py-2 rounded-lg bg-sky-500/20 hover:bg-sky-500/30 transition-colors"
            >
              Retry
            </button>
          </div>
        ) : (
          <iframe
            src="https://open.spotify.com/embed/playlist/6LvTIqcFCAiZEk0e9Wqnx1?utm_source=generator"
            width="100%"
            height="100%"
            style={{ border: 0, borderRadius: "12px", minHeight: "400px" }}
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            title="Spotify Playlist"
            sandbox="allow-same-origin allow-scripts allow-presentation allow-popups allow-popups-to-escape-sandbox"
            onLoad={() => {
              setTimeout(() => setIsLoading(false), 1000);
            }}
            onError={() => {
              setIsLoading(false);
              setIframeError(true);
            }}
            className="bg-transparent"
          />
        )}
      </div>

      <div className="mt-4 flex items-center justify-between">
        <a
          href="https://open.spotify.com/playlist/6LvTIqcFCAiZEk0e9Wqnx1"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-ice-blue/70 hover:text-ice-blue flex items-center gap-2 transition-colors"
        >
          <span>Open in Spotify</span>
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        </a>
      </div>
    </div>
  );
}
