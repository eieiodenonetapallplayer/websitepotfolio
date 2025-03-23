"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sun,
  Wind,
  Droplets,
  Thermometer,
  Cloud,
  CloudRain,
  CloudSnow,
  CloudLightning,
} from "lucide-react";

const WeatherIcon = ({
  condition,
  className,
}: {
  condition: string;
  className?: string;
}) => {
  switch (condition.toLowerCase()) {
    case "clear":
    case "sunny":
      return <Sun className={className} />;
    case "partly cloudy":
    case "cloudy":
    case "overcast":
      return <Cloud className={className} />;
    case "rain":
    case "light rain":
    case "heavy rain":
      return <CloudRain className={className} />;
    case "snow":
    case "light snow":
    case "heavy snow":
      return <CloudSnow className={className} />;
    case "thunder":
    case "thunderstorm":
      return <CloudLightning className={className} />;
    default:
      return <Sun className={className} />;
  }
};

interface WeatherData {
  location: {
    name: string;
    region: string;
    country: string;
    lat: number;
    lon: number;
    tz_id: string;
    localtime: string;
    localtime_epoch: number;
  };
  current: {
    last_updated: string;
    temp_c: number;
    temp_f: number;
    is_day: number;
    condition: {
      text: string;
      icon: string;
      code: number;
    };
    wind_mph: number;
    wind_kph: number;
    wind_degree: number;
    wind_dir: string;
    pressure_mb: number;
    pressure_in: number;
    precip_mm: number;
    precip_in: number;
    humidity: number;
    cloud: number;
    feelslike_c: number;
    feelslike_f: number;
    vis_km: number;
    vis_miles: number;
    uv: number;
    gust_mph: number;
    gust_kph: number;
    dewpoint_c: number;
    dewpoint_f: number;
  };
}

export default function LocalConditions() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isMetric, setIsMetric] = useState(true);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch(
          `https://api.weatherapi.com/v1/current.json?key=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&q=auto:ip&aqi=no`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch weather data");
        }

        const data = await response.json();
        setWeather(data);
      } catch (err) {
        console.error("Weather fetch error:", err);
        setError("Could not load weather data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchWeather();
    const interval = setInterval(fetchWeather, 300000);
    return () => clearInterval(interval);
  }, []);

  const getUVLevel = (uv: number) => {
    if (uv <= 2) return { text: "Low", color: "text-green-400" };
    if (uv <= 5) return { text: "Moderate", color: "text-yellow-400" };
    if (uv <= 7) return { text: "High", color: "text-orange-400" };
    return { text: "Very High", color: "text-red-400" };
  };

  if (isLoading) {
    return (
      <div className="glass-card p-6 rounded-lg animate-pulse">
        <div className="h-6 bg-sky-500/20 rounded w-1/3 mb-4" />
        <div className="h-4 bg-sky-500/20 rounded w-2/3 mb-2" />
        <div className="h-4 bg-sky-500/20 rounded w-1/2" />
      </div>
    );
  }

  if (error || !weather) {
    return (
      <div className="glass-card p-6 rounded-lg">
        <p className="text-ice-blue/70 text-center">
          {error || "No weather data available"}
        </p>
      </div>
    );
  }

  return (
    <div className="container max-w-6xl mx-auto">
      <motion.div
        className="relative overflow-hidden rounded-xl bg-midnight/40 border border-emerald-500/10
          hover:border-emerald-500/20 transition-all duration-500"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.005 }}
      >
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 via-transparent to-emerald-500/5"
            animate={{ x: ["0%", "100%", "0%"] }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          />
        </div>

        <div className="relative p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6">
            <div className="flex items-center gap-4">
              <motion.div
                className="relative w-14 h-14 rounded-2xl overflow-hidden bg-gradient-to-br from-emerald-400 to-emerald-600
                  flex items-center justify-center"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <WeatherIcon
                  condition={weather.current.condition.text}
                  className="w-8 h-8 text-white"
                />
              </motion.div>

              <div>
                <motion.h3
                  className="text-xl font-semibold bg-gradient-to-r from-emerald-300 to-emerald-500 bg-clip-text text-transparent"
                  whileHover={{ scale: 1.05 }}
                >
                  Local Conditions
                </motion.h3>
                <p className="text-sm text-emerald-300/60">
                  {weather.location.name}, {weather.location.country}
                </p>
              </div>
            </div>

            <div className="w-full sm:w-auto grid grid-cols-2 sm:grid-cols-4 gap-4">
              <WeatherStat
                icon={<Thermometer className="w-4 h-4" />}
                label="Temperature"
                value={`${weather.current.temp_c}°C`}
              />
              <WeatherStat
                icon={<Droplets className="w-4 h-4" />}
                label="Humidity"
                value={`${weather.current.humidity}%`}
              />
              <WeatherStat
                icon={<Wind className="w-4 h-4" />}
                label="Wind"
                value={`${weather.current.wind_kph} km/h`}
              />
              <WeatherStat
                icon={<Sun className="w-4 h-4" />}
                label="UV Index"
                value={`${weather.current.uv}`}
              />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function WeatherStat({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <motion.div
      className="flex items-center gap-2 bg-emerald-500/5 rounded-lg p-2 sm:p-3"
      whileHover={{ scale: 1.05 }}
    >
      <div className="text-emerald-400">{icon}</div>
      <div>
        <p className="text-xs text-emerald-300/60">{label}</p>
        <p className="text-sm font-medium text-emerald-200">{value}</p>
      </div>
    </motion.div>
  );
}
