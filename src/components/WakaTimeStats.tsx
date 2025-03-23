"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import type { WakaTimeStats } from "@/types/wakatime";

export default function WakaTimeStats() {
  const [stats, setStats] = useState<WakaTimeStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/wakatime");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setStats(data.data);
      } catch (error) {
        console.error("Error fetching WakaTime stats:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (isLoading) {
    return (
      <div className="h-[600px] w-full rounded-lg bg-sky-500/5 animate-pulse" />
    );
  }

  if (!stats) return null;

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  const statSections = [
    {
      title: "Languages",
      data: stats?.languages.slice(0, 6) || [],
      color: "sky",
    },
    {
      title: "Editors",
      data: stats?.editors || [],
      color: "pink",
    },
    {
      title: "Operating Systems",
      data: stats?.operating_systems || [],
      color: "purple",
    },
    {
      title: "Projects",
      data: stats?.projects.slice(0, 6) || [],
      color: "emerald",
    },
    {
      title: "Machines",
      data: stats?.machines || [],
      color: "amber",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-6 rounded-lg space-y-6"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-sky-300">Coding Stats</h3>
        <div className="flex items-center gap-2">
          <span className="text-xs text-ice-blue/50">Last 7 Days</span>
          <span className="text-xs text-emerald-300">
            Total: {stats?.human_readable_total}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2 p-4 rounded-lg bg-sky-500/5">
          <h4 className="text-sm text-ice-blue/70">Daily Average</h4>
          <p className="text-xl font-medium text-sky-300">
            {stats?.human_readable_daily_average}
          </p>
        </div>
        <div className="space-y-2 p-4 rounded-lg bg-pink-500/5">
          <h4 className="text-sm text-ice-blue/70">Best Day</h4>
          <p className="text-xl font-medium text-pink-300">
            {new Date(stats?.best_day?.date || "").toLocaleDateString("en-US", {
              weekday: "long",
              month: "short",
              day: "numeric",
            })}
          </p>
          <p className="text-xs text-pink-300/70">{stats?.best_day?.text}</p>
        </div>
      </div>

      <div className="space-y-6">
        {statSections.map(({ title, data, color }) => (
          <div key={title} className="space-y-3">
            <h4 className="text-sm text-ice-blue/70 flex items-center justify-between">
              {title}
              <span className={`text-${color}-300 text-xs`}>
                Top {data.length}
              </span>
            </h4>
            <div className="space-y-2">
              {data.map((item) => (
                <div key={item.name} className="relative">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className={`text-${color}-300`}>{item.name}</span>
                    <span className="text-ice-blue/50">
                      {formatTime(item.total_seconds)}
                    </span>
                  </div>
                  <div className="h-1.5 w-full bg-gray-700/20 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${item.percent}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className={`h-full bg-${color}-500/50 rounded-full`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="border-t border-sky-500/10 pt-4">
          <h4 className="text-sm text-ice-blue/70 mb-3">Weekly Activity</h4>
          <div className="grid grid-cols-7 gap-1">
            {Object.entries(stats?.weekdays || {}).map(([day, data]) => (
              <div key={day} className="text-center">
                <div className="h-16 relative mb-1">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${data.percent}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="absolute bottom-0 left-0 right-0 mx-auto w-2 bg-sky-500/20 rounded-t-full"
                  >
                    <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-[10px] text-ice-blue/70">
                        {data.text}
                      </span>
                    </div>
                  </motion.div>
                </div>
                <span className="text-[10px] text-ice-blue/50">
                  {day.slice(0, 3)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {stats?.dependencies?.length > 0 && (
          <div className="border-t border-sky-500/10 pt-4">
            <h4 className="text-sm text-ice-blue/70 mb-3">Top Dependencies</h4>
            <div className="flex flex-wrap gap-2">
              {stats.dependencies.slice(0, 8).map((dep) => (
                <span
                  key={dep.name}
                  className="px-2 py-1 text-xs rounded-full bg-violet-500/10 text-violet-300"
                >
                  {dep.name}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
