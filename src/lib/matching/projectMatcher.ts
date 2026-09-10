import { Project } from "@/types/project";
import { JobRequirement, ProjectMatchResult } from "@/types/application";
import { Skill } from "@/types/skill";
import { normalizeSkillName } from "@/lib/skills/normalizer";

export function recommendProjects(
  requirements: JobRequirement[],
  projects: Project[],
  allSkills: Skill[],
  topN: number = 3
): ProjectMatchResult[] {
  if (requirements.length === 0 || projects.length === 0) return [];

  const totalWeight = requirements.reduce((sum, r) => sum + r.weight, 0);
  if (totalWeight === 0) return [];

  const reqSkillWeights = new Map<string, number>();
  for (const req of requirements) {
    const normalized = normalizeSkillName(req.skill);
    if (!reqSkillWeights.has(normalized)) {
      reqSkillWeights.set(normalized, req.weight);
    }
  }

  const scored: ProjectMatchResult[] = projects.map((project) => {
    const projectSkillNames = project.skillIds
      .map((id) => allSkills.find((s) => s.id === id))
      .filter((s): s is Skill => s !== undefined)
      .map((s) => normalizeSkillName(s.name));

    const projectSkillSet = new Set(projectSkillNames);
    const matchedSkills: string[] = [];
    const missingSkills: string[] = [];
    let matchedWeight = 0;

    for (const [reqSkill, weight] of reqSkillWeights.entries()) {
      if (projectSkillSet.has(reqSkill)) {
        matchedSkills.push(reqSkill);
        matchedWeight += weight;
      } else {
        missingSkills.push(reqSkill);
      }
    }

    return {
      projectId: project.id,
      projectName: project.name,
      score: Math.round((matchedWeight / totalWeight) * 100),
      matchedSkills,
      missingSkills,
    };
  });

  return scored
    .filter((p) => p.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, topN);
}
