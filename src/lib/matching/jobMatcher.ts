import { JobRequirement, MatchResult } from "@/types/application";
import { Skill } from "@/types/skill";
import { normalizeSkillName } from "@/lib/skills/normalizer";

export function calculateMatchScore(
  requirements: JobRequirement[],
  userSkills: Skill[]
): MatchResult {
  if (requirements.length === 0) {
    return { score: 0, matchedSkills: [], missingRequiredSkills: [], missingPreferredSkills: [] };
  }

  const userSkillSet = new Set(
    userSkills.map((s) => normalizeSkillName(s.name))
  );

  const deduped = deduplicateRequirements(requirements);

  const matched: string[] = [];
  const missingRequired: string[] = [];
  const missingPreferred: string[] = [];

  let earnedWeight = 0;
  let totalWeight = 0;

  for (const req of deduped) {
    totalWeight += req.weight;
    const normalizedReqSkill = normalizeSkillName(req.skill);

    if (userSkillSet.has(normalizedReqSkill)) {
      earnedWeight += req.weight;
      matched.push(req.skill);
    } else if (req.type === "required") {
      missingRequired.push(req.skill);
    } else {
      missingPreferred.push(req.skill);
    }
  }

  const score = totalWeight === 0
    ? 0
    : Math.round((earnedWeight / totalWeight) * 100);

  return {
    score,
    matchedSkills: matched,
    missingRequiredSkills: missingRequired,
    missingPreferredSkills: missingPreferred,
  };
}

function deduplicateRequirements(reqs: JobRequirement[]): JobRequirement[] {
  const seen = new Map<string, JobRequirement>();
  for (const req of reqs) {
    const key = normalizeSkillName(req.skill);
    if (!seen.has(key)) {
      seen.set(key, req);
    }
  }
  return Array.from(seen.values());
}
