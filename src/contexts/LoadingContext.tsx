"use client";

import { createContext, useContext, useState, useEffect } from "react";

interface LoadingContextType {
  isLoading: boolean;
  currentLoadingItem: string;
  progress: number;
  setLoadingItem: (item: string) => void;
  setProgress: (progress: number) => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [currentLoadingItem, setCurrentLoadingItem] =
    useState("Initializing...");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const hasLoadedBefore = localStorage.getItem("hasLoadedBefore");
    if (hasLoadedBefore) {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("hasLoadedBefore", "true");
    }
  }, [isLoading]);

  const setLoadingItem = (item: string) => {
    setCurrentLoadingItem(item);
  };

  return (
    <LoadingContext.Provider
      value={{
        isLoading,
        currentLoadingItem,
        progress,
        setLoadingItem,
        setProgress,
      }}
    >
      {children}
    </LoadingContext.Provider>
  );
}

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context)
    throw new Error("useLoading must be used within LoadingProvider");
  return context;
};
