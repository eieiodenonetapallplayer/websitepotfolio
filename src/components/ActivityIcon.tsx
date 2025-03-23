"use client";

export function ActivityIcon({ type, name }: { type: number; name: string }) {
  // Discord Activity Types:
  // 0 = Playing, 1 = Streaming, 2 = Listening, 3 = Watching, 4 = Custom, 5 = Competing

  // Check for Spotify activity first
  if (type === 2 && name === "Spotify") {
    return (
      <div className="relative">
        <div className="w-3 h-3 rounded-full bg-[#1DB954] animate-pulse" />
        <svg
          className="w-4 h-4 absolute -top-0.5 -left-0.5 text-white"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
        </svg>
      </div>
    );
  }

  if (
    name.toLowerCase().includes("code") ||
    name.toLowerCase().includes("visual studio")
  ) {
    return (
      <svg
        className="w-4 h-4 text-blue-400"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M23.15 2.587L18.21.21a1.494 1.494 0 0 0-1.705.29l-9.46 8.63-4.12-3.128a.999.999 0 0 0-1.276.057L.327 7.261A1 1 0 0 0 .326 8.74L3.899 12 .326 15.26a1 1 0 0 0 .001 1.479L1.65 17.94a.999.999 0 0 0 1.276.057l4.12-3.128 9.46 8.63a1.492 1.492 0 0 0 1.704.29l4.942-2.377A1.5 1.5 0 0 0 24 20.06V3.939a1.5 1.5 0 0 0-.85-1.352zm-5.146 14.861L10.826 12l7.178-5.448v10.896z" />
      </svg>
    );
  }

  if (name.toLowerCase().includes("youtube")) {
    return (
      <svg
        className="w-4 h-4 text-red-500"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    );
  }

  switch (type) {
    case 0: // Playing
      return (
        <svg
          className="w-4 h-4 text-purple-400"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M5.418 8.177A2 2 0 013 6.293V5a2 2 0 012-2h14a2 2 0 012 2v1.293a2 2 0 01-2.418 1.884l-6.5-1.625a2 2 0 00-.964 0l-6.5 1.625zM3 7.9V19a2 2 0 002 2h14a2 2 0 002-2V7.9l-6.5 1.625a4 4 0 01-1.928 0L3 7.9z" />
        </svg>
      );
    case 1: // Streaming
      return (
        <svg
          className="w-4 h-4 text-purple-500"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 16H4c-.55 0-1-.45-1-1V6c0-.55.45-1 1-1h16c.55 0 1 .45 1 1v12c0 .55-.45 1-1 1zM8.95 12.37l3.09 1.71c.49.27 1.1-.07 1.1-.63V8.55c0-.56-.61-.9-1.1-.63l-3.09 1.71c-.49.27-.49.97 0 1.24z" />
        </svg>
      );
    case 3: // Watching
      return (
        <svg
          className="w-4 h-4 text-blue-500"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
        </svg>
      );
    default:
      return (
        <div className="w-3 h-3 rounded-full bg-gray-500">
          <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
          </svg>
        </div>
      );
  }
}

export default ActivityIcon;
