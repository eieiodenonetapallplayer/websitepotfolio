import { GitHubRepo } from "@/types/github";
import { GITHUB_CONFIG } from "@/constants/config";

export async function getGithubProjects(): Promise<GitHubRepo[]> {
  try {
    const response = await fetch(GITHUB_CONFIG.API_URL, {
      headers: {
        Accept: "application/vnd.github.v3+json",
        "X-GitHub-Api-Version": "2022-11-28",
      },
      next: { revalidate: 3600 },
    });

    if (!response.ok) return [];

    const repos = await response.json();
    return repos.filter((repo: GitHubRepo) =>
      GITHUB_CONFIG.ALLOWED_PROJECTS.includes(repo.name)
    );
  } catch (error) {
    return [];
  }
}
