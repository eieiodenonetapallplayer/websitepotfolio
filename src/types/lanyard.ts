export interface LanyardData {
  spotify: {
    track_id: string;
    timestamps: { start: number; end: number };
    song: string;
    artist: string;
    album_art_url: string;
    album: string;
  } | null;
  discord_status: "online" | "idle" | "dnd" | "offline";
  discord_user: {
    id: string;
    username: string;
    avatar: string;
    discriminator: string;
    global_name: string;
  };
  activities: Array<{
    name: string;
    type: number;
    state?: string;
    details?: string;
  }>;
}

export type SkillStatus = "mastered" | "learning" | "experienced" | "beginner";

export interface Skill {
  name: string;
  icon: string;
  level: number; 
  color: string;
  status: SkillStatus;
}

export interface Developer {
  name: string;
  role: string;
  description: string[];
  avatar: string;
  discordId: string;
  status: "online" | "idle" | "dnd" | "offline";
  socials: {
    github: string;
    twitter: string;
  };
  skills: Skill[];
}
