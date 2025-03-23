import type { Developer } from "@/types/lanyard";

interface ContactInfo {
  email: string;
  github: string;
  twitter: string;
}

type AllowedProjects =
  | "Streaming-status"
  | "Custom-status"
  | "Online-VC"
  | "Executor-Key-Bypass-Discord-Bot"
  | "Streaming-status-Bot";

export const GITHUB_CONFIG = {
  API_URL: "https://api.github.com/users/4levy/repos",
  ALLOWED_PROJECTS: [
    "Streaming-status",
    "Custom-status",
    "Online-VC",
    "Executor-Key-Bypass-Discord-Bot",
    "Streaming-status-Bot",
  ] as AllowedProjects[],
} as const;

export const CONTACT_INFO: ContactInfo = {
  email: "miyako@4levy.xyz",
  github: "https://github.com/4levy",
  twitter: "https://x.com/4levyz",
};

export const DEVELOPERS: Developer[] = [
  {
    name: "4levy",
    discordId: "874898422233178142",
    role: "Self taught developer | Student",
    description: [
      "A <PreciseAge/>-year-old Discord bot developer.\n\nFreelancer.",
    ],
    avatar: "/images/avatar.png",
    status: "online",
    socials: {
      github: "https://github.com/4levy",
      twitter: "https://twitter.com/4levyz",
    },
    skills: [
      {
        name: "JavaScript",
        icon: "⚡",
        level: 10,
        color: "#f7df1e",
        status: "learning",
      },
      {
        name: "TypeScript",
        icon: "📘",
        level: 40,
        color: "#3178c6",
        status: "experienced",
      },
      {
        name: "React",
        icon: "⚛️",
        level: 40,
        color: "#61dafb",
        status: "experienced",
      },
      {
        name: "Node.js",
        icon: "🟢",
        level: 67,
        color: "#339933",
        status: "experienced",
      },
      {
        name: "Python",
        icon: "🐍",
        level: 96,
        color: "#3776ab",
        status: "mastered",
      },
      {
        name: "Discord.js",
        icon: "🤖",
        level: 95,
        color: "#5865f2",
        status: "mastered",
      },
      {
        name: "Vue.js",
        icon: "💚",
        level: 75,
        color: "#42b883",
        status: "experienced",
      },
      {
        name: "PHP",
        icon: "🐘",
        level: 60,
        color: "#777bb4",
        status: "experienced",
      },
      {
        name: "HTML",
        icon: "📄",
        level: 90,
        color: "#e34f26",
        status: "mastered",
      },
      {
        name: "CSS",
        icon: "🎨",
        level: 85,
        color: "#1572b6",
        status: "mastered",
      },
    ],
  },
];

export const PORTFOLIO_ITEMS = [
  {
    title: "Coming soon",
    description: "////////////////////////",
    image: "https://i.postimg.cc/vTkW3mYT/2acf1a7c694b96705a42ee054ab9c69f.jpg",
    tags: ["...."],
  },
  {
    title: "Coming soon",
    description: "////////////////////////",
    image: "https://i.postimg.cc/vTkW3mYT/2acf1a7c694b96705a42ee054ab9c69f.jpg",
    tags: ["Next.js"],
  },
];
