export type SkillCategory =
  | "frontend"
  | "backend"
  | "database"
  | "devops"
  | "testing"
  | "security"
  | "tools"
  | "other";

export const SKILL_CATEGORIES: { value: SkillCategory; label: string }[] = [
  { value: "frontend", label: "Frontend" },
  { value: "backend", label: "Backend" },
  { value: "database", label: "Database" },
  { value: "devops", label: "DevOps" },
  { value: "testing", label: "Testing" },
  { value: "security", label: "Security" },
  { value: "tools", label: "Tools" },
  { value: "other", label: "Other" },
];

export interface Skill {
  id: string;
  name: string;
  normalizedName: string;     // lowercase, trimmed, de-aliased
  category: SkillCategory;
  level: number;              // 1–5
  createdAt: string;          // ISO 8601
  updatedAt: string;
}

export interface CreateSkillInput {
  name: string;
  category: SkillCategory;
  level: number;
}

export interface UpdateSkillInput {
  name?: string;
  category?: SkillCategory;
  level?: number;
}
