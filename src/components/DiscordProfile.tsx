"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import type { LanyardData } from "@/types/lanyard";

export default function DiscordProfile({ discordId }: { discordId: string }) {
  const [data, setData] = useState<LanyardData | null>(null);

  useEffect(() => {
    const ws = new WebSocket("wss://api.lanyard.rest/socket");

    ws.onopen = () => {
      ws.send(
        JSON.stringify({
          op: 2,
          d: { subscribe_to_ids: [discordId] },
        })
      );
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.t === "PRESENCE_UPDATE") {
        setData(data.d);
      }
    };

    return () => ws.close();
  }, [discordId]);

  if (!data?.discord_user) return null;

  return (
    <div className="glass-card p-6 rounded-lg max-w-md mx-auto">
      <div className="relative w-full h-48 -mt-6 -mx-6 mb-4">
        <Image
          src={`https://dcdn.dstn.to/banners/${discordId}?size=2048`}
          alt="Discord Banner"
          fill
          className="object-cover object-center rounded-t-lg transform hover:scale-105 transition-transform duration-500"
          priority
          quality={100}
        />
      </div>

      <div className="relative mt-[-50px] mb-4 flex items-end gap-4">
        <div className="relative">
          <Image
            src={`https://cdn.discordapp.com/avatars/${data.discord_user.id}/${data.discord_user.avatar}`}
            alt={data.discord_user.global_name}
            width={80}
            height={80}
            className="rounded-full border-4 border-midnight"
          />
          <div
            className={`absolute bottom-0 right-0 w-4 h-4 rounded-full 
            ${
              data.discord_status === "online"
                ? "bg-green-500"
                : data.discord_status === "idle"
                ? "bg-yellow-500"
                : data.discord_status === "dnd"
                ? "bg-red-500"
                : "bg-gray-500"
            } ring-2 ring-midnight`}
          />
        </div>
        <div>
          <h2 className="text-2xl font-bold gradient-text">
            {data.discord_user.global_name}
          </h2>
          <p className="text-ice-blue/70">@{data.discord_user.username}</p>
        </div>
      </div>

      {data.spotify && (
        <div className="luxury-border p-4 rounded-lg mb-4">
          <div className="flex items-center gap-4">
            <Image
              src={data.spotify.album_art_url}
              alt={data.spotify.album}
              width={60}
              height={60}
              className="rounded-md"
            />
            <div className="overflow-hidden">
              <p className="text-sm text-ice-blue">Listening to Spotify</p>
              <p className="font-medium truncate">{data.spotify.song}</p>
              <p className="text-sm text-ice-blue/70 truncate">
                by {data.spotify.artist}
              </p>
            </div>
          </div>
        </div>
      )}

      {data.activities
        ?.filter((a) => a.type !== 2)
        .map((activity, i) => (
          <div key={i} className="glass-card p-3 rounded-lg mb-2 last:mb-0">
            <p className="font-medium">{activity.name}</p>
            {activity.details && (
              <p className="text-sm text-ice-blue/70">{activity.details}</p>
            )}
            {activity.state && (
              <p className="text-sm text-ice-blue/60">{activity.state}</p>
            )}
          </div>
        ))}
    </div>
  );
}
