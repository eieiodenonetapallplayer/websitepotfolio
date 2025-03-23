"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";

const PLAYLIST = [
  {
    title: "aishiterukarasa",
    artist: "itoguruma",
    src: "/music/Background.mp3",
  },
  {
    title: "Limerence (feat. Lilycat)",
    artist: "angelize, Lilycat",
    src: "/music/Limerence.mp3",
  },
];

export default function AudioPlayer() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.2);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hasInitialized = useRef(false);
  const loadAttemptRef = useRef<number>(0);
  const hasInteracted = useRef(false);

  useEffect(() => {
    const savedState = localStorage.getItem("audioPlayerState");
    if (savedState) {
      const { trackIndex, wasPlaying, lastTime, lastVolume, wasVisible } =
        JSON.parse(savedState);

      setCurrentTrackIndex(trackIndex || 0);
      setVolume(lastVolume || 0.2);
      setCurrentTime(lastTime || 0);
      setIsVisible(wasVisible ?? true);

      if (wasPlaying && hasInteracted.current) {
        setIsPlaying(true);
      }
    }

    const handleInteraction = () => {
      hasInteracted.current = true;
      window.removeEventListener("click", handleInteraction);
    };
    window.addEventListener("click", handleInteraction);

    return () => window.removeEventListener("click", handleInteraction);
  }, []);

  useEffect(() => {
    const saveState = () => {
      const state = {
        trackIndex: currentTrackIndex,
        wasPlaying: isPlaying,
        lastTime: audioRef.current?.currentTime || 0,
        lastVolume: volume,
        wasVisible: isVisible,
      };
      localStorage.setItem("audioPlayerState", JSON.stringify(state));
    };

    const intervalId = setInterval(saveState, 1000);

    window.addEventListener("beforeunload", saveState);

    return () => {
      clearInterval(intervalId);
      window.removeEventListener("beforeunload", saveState);
    };
  }, [currentTrackIndex, isPlaying, volume, isVisible]);

  const initializeAudio = async () => {
    if (!audioRef.current) return;

    try {
      setIsLoading(true);
      audioRef.current.src = PLAYLIST[currentTrackIndex].src;
      audioRef.current.volume = volume;

      await new Promise((resolve, reject) => {
        audioRef.current!.oncanplaythrough = resolve;
        audioRef.current!.onerror = reject;
      });

      const savedState = localStorage.getItem("audioPlayerState");
      if (savedState) {
        const { lastTime } = JSON.parse(savedState);
        if (lastTime) {
          audioRef.current.currentTime = lastTime;
        }
      }

      setIsLoading(false);

      if (isPlaying && hasInteracted.current) {
        const playPromise = audioRef.current.play();
        if (playPromise) {
          await playPromise;
        }
      }
    } catch (error) {
      console.error("Audio initialization error:", error);
      setIsLoading(false);
      if (loadAttemptRef.current < 3) {
        loadAttemptRef.current++;
        setTimeout(initializeAudio, 1000);
      }
    }
  };

  useEffect(() => {
    if (hasInitialized.current) return;
    hasInitialized.current = true;

    initializeAudio();

    const saveInterval = setInterval(() => {
      if (audioRef.current) {
        localStorage.setItem(
          "audioTime",
          audioRef.current.currentTime.toString()
        );
        localStorage.setItem("audioPlaying", isPlaying.toString());
      }
    }, 1000);

    return () => clearInterval(saveInterval);
  }, []);

  useEffect(() => {
    localStorage.setItem("audioVolume", volume.toString());
  }, [volume]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        localStorage.setItem(
          "audioTime",
          audioRef.current?.currentTime.toString() || "0"
        );
        localStorage.setItem("audioPlaying", isPlaying.toString());
      } else if (isPlaying && audioRef.current) {
        audioRef.current.play().catch(console.error);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [isPlaying]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener("timeupdate", handleTimeUpdate);
      audioRef.current.addEventListener("loadedmetadata", handleLoadMetadata);
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener("timeupdate", handleTimeUpdate);
        audioRef.current.removeEventListener(
          "loadedmetadata",
          handleLoadMetadata
        );
      }
    };
  }, []);

  useEffect(() => {
    localStorage.setItem("playerVisible", isVisible.toString());
  }, [isVisible]);

  useEffect(() => {
    initializeAudio();
  }, [currentTrackIndex]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => {
      playNextTrack();
    };

    audio.addEventListener("ended", handleEnded);
    return () => audio.removeEventListener("ended", handleEnded);
  }, []);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const togglePlay = async () => {
    if (!audioRef.current || isLoading) return;

    try {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        hasInteracted.current = true;
        await audioRef.current.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error("Playback error:", error);
      setIsPlaying(false);
    }
  };

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const changeTrack = useCallback(
    async (index: number) => {
      if (!audioRef.current || index === currentTrackIndex) return;

      try {
        setIsLoading(true);
        const wasPlaying = isPlaying;

        setCurrentTrackIndex(index);
        audioRef.current.src = PLAYLIST[index].src;
        await audioRef.current.load();

        if (wasPlaying) {
          const playPromise = audioRef.current.play();
          if (playPromise) {
            await playPromise;
            setIsPlaying(true);
          }
        }
      } catch (error) {
        console.error("Track change error:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [currentTrackIndex, isPlaying]
  );

  const playNextTrack = useCallback(() => {
    const nextIndex = (currentTrackIndex + 1) % PLAYLIST.length;
    changeTrack(nextIndex);
  }, [currentTrackIndex, changeTrack]);

  const playPreviousTrack = useCallback(() => {
    const prevIndex =
      (currentTrackIndex - 1 + PLAYLIST.length) % PLAYLIST.length;
    changeTrack(prevIndex);
  }, [currentTrackIndex, changeTrack]);

  const handleTrackSelect = (index: number) => {
    if (index === currentTrackIndex && isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(false);
    } else {
      changeTrack(index);
    }
  };

  return (
    <>
      <button
        onClick={toggleVisibility}
        className="fixed bottom-8 right-8 z-50 w-8 h-8 flex items-center justify-center 
          rounded-full bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 transition-all
          hover:scale-105 active:scale-95 hover:shadow-lg hover:shadow-sky-500/10"
      >
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
            d={
              isVisible
                ? "M19 9l-7 7-7-7"
                : isPlaying
                ? "M9 11l3 3 3-3m-3-3v6"
                : "M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            }
          />
        </svg>
      </button>

      {isVisible && (
        <div className="fixed bottom-20 right-8 z-50">
          <div
            className="glass-card p-4 rounded-xl flex flex-col gap-3 min-w-[300px]
            shadow-lg shadow-sky-500/10 border border-sky-500/20"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium text-sky-300 flex items-center gap-2">
                {isLoading ? (
                  <>
                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" />
                    Loading...
                  </>
                ) : isPlaying ? (
                  <>
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    Now Playing
                  </>
                ) : (
                  <>
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                    Stopped
                  </>
                )}
              </span>
              <span className="text-xs text-ice-blue/50">
                {PLAYLIST[currentTrackIndex].artist}
              </span>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={playPreviousTrack}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 transition-all"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
                </svg>
              </button>

              <button
                onClick={togglePlay}
                className="w-10 h-10 flex items-center justify-center rounded-full 
                  bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 transition-all
                  hover:scale-105 active:scale-95 hover:shadow-lg hover:shadow-sky-500/20"
              >
                {isPlaying ? (
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                  </svg>
                ) : (
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}
              </button>

              <button
                onClick={playNextTrack}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 transition-all"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
                </svg>
              </button>

              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min={0}
                    max={duration || 100}
                    value={currentTime}
                    onChange={(e) => {
                      const time = parseFloat(e.target.value);
                      if (audioRef.current) {
                        audioRef.current.currentTime = time;
                        setCurrentTime(time);
                      }
                    }}
                    className="w-full h-1 bg-sky-500/20 rounded-full appearance-none
                      cursor-pointer [&::-webkit-slider-thumb]:appearance-none
                      [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3
                      [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-sky-400
                      hover:[&::-webkit-slider-thumb]:bg-sky-300"
                  />
                </div>
                <div className="flex justify-between text-xs text-ice-blue/50">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <svg
                className="w-4 h-4 text-ice-blue/50"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
              </svg>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={(e) => {
                  const newVolume = parseFloat(e.target.value);
                  setVolume(newVolume);
                  if (audioRef.current) {
                    audioRef.current.volume = newVolume;
                  }
                }}
                className="w-20 h-1 bg-sky-500/20 rounded-full appearance-none
                  cursor-pointer [&::-webkit-slider-thumb]:appearance-none
                  [&::-webkit-slider-thumb]:w-2 [&::-webkit-slider-thumb]:h-2
                  [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-sky-400
                  hover:[&::-webkit-slider-thumb]:bg-sky-300"
              />
            </div>

            <div className="mt-2 pt-2 border-t border-sky-500/10">
              <div className="text-xs font-medium text-ice-blue/50 mb-2">
                Playlist
              </div>
              <div className="space-y-1 max-h-32 overflow-y-auto">
                {PLAYLIST.map((track, index) => (
                  <button
                    key={index}
                    onClick={() => handleTrackSelect(index)}
                    className={`w-full text-left px-2 py-1 rounded text-xs 
                      ${
                        currentTrackIndex === index
                          ? isPlaying
                            ? "text-sky-300 bg-sky-500/5"
                            : "text-pink-300 bg-pink-500/5"
                          : "text-ice-blue/70"
                      } hover:bg-sky-500/10 transition-colors`}
                  >
                    {track.title}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <audio
        ref={audioRef}
        preload="auto"
        onError={(e) => console.error("Audio error:", e)}
      />
    </>
  );
}
