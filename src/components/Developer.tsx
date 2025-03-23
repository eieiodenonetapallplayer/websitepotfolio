"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import type { LanyardData, Developer } from "@/types/lanyard";
import { ActivityIcon } from "./ActivityIcon";
import SkillsSection from "./SkillsSection";
import PreciseAge from "./PreciseAge";

const renderDescription = (text: string): React.ReactNode => {
  if (text.includes("<PreciseAge/>")) {
    const parts = text.split("<PreciseAge/>");
    return (
      <>
        {parts[0]}
        <PreciseAge />
        {parts[1]}
      </>
    );
  }
  return text;
};

export default function DeveloperCard({ developer }: { developer: Developer }) {
  const [data, setData] = useState<LanyardData | null>(null);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    let wsReconnectTimer: NodeJS.Timeout;
    let wsInstance: WebSocket | null = null;

    const connectWebSocket = () => {
      if (wsInstance?.readyState === WebSocket.OPEN) return;

      wsInstance = new WebSocket("wss://api.lanyard.rest/socket");

      wsInstance.onopen = () => {
        wsInstance?.send(
          JSON.stringify({
            op: 2,
            d: { subscribe_to_id: developer.discordId },
          })
        );
      };

      wsInstance.onmessage = (event) => {
        const response = JSON.parse(event.data);
        if (response.t === "INIT_STATE" || response.t === "PRESENCE_UPDATE") {
          setData(response.d);
        }
      };

      wsInstance.onclose = () => {
        wsReconnectTimer = setTimeout(connectWebSocket, 5000);
      };
    };

    fetch(`https://api.lanyard.rest/v1/users/${developer.discordId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setData(data.data);
      });

    connectWebSocket();

    return () => {
      clearTimeout(wsReconnectTimer);
      wsInstance?.close();
    };
  }, [developer.discordId]);

  const statusColors = {
    online: "bg-green-500",
    idle: "bg-yellow-500",
    dnd: "bg-red-500",
    offline: "bg-gray-500",
  };

  const statusText = {
    online: "Online",
    idle: "Away",
    dnd: "Do Not Disturb",
    offline: "Offline",
  };

  return (
    <div className="glass-card p-6 rounded-lg">
      {data?.discord_user && (
        <>
          <div className="relative w-full h-64 mb-4 rounded-lg overflow-hidden bg-midnight/30">
            <Image
              src={`https://dcdn.dstn.to/banners/${developer.discordId}?size=4096`}
              alt={developer.name}
              fill
              quality={100}
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              onLoad={() => setIsImageLoaded(true)}
              className={`object-cover object-center transition-all duration-700 
                ${
                  isImageLoaded
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-105"
                }
                hover:scale-105 hover:brightness-110`}
              style={{
                imageRendering: "crisp-edges",
                transform: "translate3d(0, 0, 0)",
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-midnight/80 via-midnight/20 to-transparent" />
          </div>
          <div className="flex items-center gap-4 mb-4">
            <div className="relative">
              <Image
                src={`https://cdn.discordapp.com/avatars/${data.discord_user.id}/${data.discord_user.avatar}`}
                alt={data.discord_user.global_name || developer.name}
                width={50}
                height={50}
                className="rounded-full"
              />
              <div
                className={`absolute bottom-0 right-0 w-3 h-3 rounded-full 
                  ${statusColors[data.discord_status]} ring-2 ring-midnight`}
              />
            </div>
            <div>
              <h3 className="text-xl font-bold gradient-text">
                {data.discord_user.global_name || developer.name}
              </h3>
              <div className="flex items-center gap-2">
                <span className="text-sm text-ice-blue/70">
                  {developer.role}
                </span>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full 
                  ${
                    data.discord_status === "online"
                      ? "bg-green-500/10 text-green-400"
                      : data.discord_status === "idle"
                      ? "bg-yellow-500/10 text-yellow-400"
                      : data.discord_status === "dnd"
                      ? "bg-red-500/10 text-red-400"
                      : "bg-gray-500/10 text-gray-400"
                  }`}
                >
                  {statusText[data.discord_status]}
                </span>
              </div>
            </div>
          </div>
          <div className="whitespace-pre-line text-ice-blue/70 text-sm mb-6 leading-relaxed">
            <div className="space-y-4">
              {developer.description.map((text, index) => (
                <p key={index} className="text-ice-blue/70">
                  {renderDescription(text)}
                </p>
              ))}
            </div>
          </div>
          {data.activities && data.activities.length > 0 && (
            <div className="space-y-3 mt-4">
              {data.activities
                .filter((a) => a.type !== 2)
                .map((activity, i) => (
                  <div
                    key={i}
                    className="glass-card p-3 rounded-lg flex items-start gap-3"
                  >
                    <ActivityIcon type={activity.type} name={activity.name} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-sm truncate">
                          {activity.name}
                        </p>
                        <span className="text-xs text-ice-blue/50">
                          {activity.type === 0
                            ? "Playing"
                            : activity.type === 1
                            ? "Streaming"
                            : activity.type === 3
                            ? "Watching"
                            : ""}
                        </span>
                      </div>
                      {activity.details && (
                        <p className="text-xs text-ice-blue/70 truncate">
                          {activity.details}
                        </p>
                      )}
                      {activity.state && (
                        <p className="text-xs text-ice-blue/60 truncate">
                          {activity.state}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          )}
          <SkillsSection skills={developer.skills} />
        </>
      )}
    </div>
  );
}
