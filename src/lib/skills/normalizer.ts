import { SKILL_ALIASES } from "@/lib/parser/skillDictionary";

export function normalizeSkillName(name: string): string {
  let normalized = name.trim().toLowerCase().replace(/\s+/g, " ");

  if (SKILL_ALIASES[normalized]) {
    normalized = SKILL_ALIASES[normalized];
  }

  return normalized;
}

export function areSkillsEqual(a: string, b: string): boolean {
  return normalizeSkillName(a) === normalizeSkillName(b);
}
