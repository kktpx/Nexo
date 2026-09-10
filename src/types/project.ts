export type ProjectType =
  | "web-app"
  | "mobile-app"
  | "api"
  | "cli"
  | "library"
  | "data-science"
  | "devops"
  | "other";

export type ProjectStatus = "in-progress" | "completed" | "archived";

export interface Project {
  id: string;
  name: string;
  shortDescription: string;
  longDescription: string;
  techStack: string[];         // technology names (e.g., "Next.js")
  skillIds: string[];          // references to Skill.id
  githubUrl?: string;
  liveUrl?: string;
  projectType: ProjectType;
  status: ProjectStatus;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProjectInput {
  name: string;
  shortDescription: string;
  longDescription: string;
  techStack: string[];
  skillIds: string[];
  githubUrl?: string;
  liveUrl?: string;
  projectType: ProjectType;
  status: ProjectStatus;
}

export type UpdateProjectInput = Partial<CreateProjectInput>;
