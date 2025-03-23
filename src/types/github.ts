export interface GitHubRepo {
  id: number;
  name:
    | "Streaming-status"
    | "Custom-status"
    | "Online-VC"
    | "Executor-Key-Bypass-Discord-Bot"
    | "Streaming-status-Bot";
  description: string;
  html_url: string;
  topics: string[];
  stargazers_count: number;
  language: string;
  forks_count: number;
}
