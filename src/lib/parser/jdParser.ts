import { JobRequirement } from "@/types/application";
import { KNOWN_SKILLS, SKILL_ALIASES } from "./skillDictionary";
import { generateId } from "@/lib/utils/id";

export interface ParsedRequirements {
  required: JobRequirement[];
  preferred: JobRequirement[];
  all: JobRequirement[];
}

const REQUIRED_INDICATORS = [
  "required", "requirements", "must have", "must-have",
  "minimum qualifications", "essential", "what you need",
  "what we're looking for", "you must", "you should have",
  "qualifications", "what you'll need",
];

const PREFERRED_INDICATORS = [
  "preferred", "nice to have", "nice-to-have", "bonus",
  "plus", "preferred qualifications", "desirable",
  "good to have", "advantageous", "a plus",
  "ideally", "would be great",
];

export function parseJobDescription(text: string): ParsedRequirements {
  const normalized = normalizeText(text);
  const sections = splitIntoSections(normalized);
  const requirements = new Map<string, JobRequirement>();

  for (const section of sections) {
    const sectionType = classifySection(section.heading);
    const skills = detectSkills(section.content);

    for (const skill of skills) {
      if (!requirements.has(skill)) {
        requirements.set(skill, {
          id: generateId(),
          skill,
          type: sectionType,
          weight: sectionType === "required" ? 3 : 1,
        });
      }
    }
  }

  // If no sections were classified, treat all detected skills as required
  if (sections.length === 1 && sections[0].heading === "") {
    const skills = detectSkills(normalized);
    for (const skill of skills) {
      if (!requirements.has(skill)) {
        requirements.set(skill, {
          id: generateId(),
          skill,
          type: "required",
          weight: 3,
        });
      }
    }
  }

  const all = Array.from(requirements.values());
  return {
    required: all.filter((r) => r.type === "required"),
    preferred: all.filter((r) => r.type === "preferred"),
    all,
  };
}

function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .replace(/[\r\n]+/g, "\n")
    .replace(/[•·▪▸►●○◦‣⁃–—]/g, " ")
    .replace(/[^\w\s\n.#+\-/]/g, " ")
    .replace(/[ \t]+/g, " ");
}

interface Section {
  heading: string;
  content: string;
}

function splitIntoSections(text: string): Section[] {
  const lines = text.split("\n");
  const sections: Section[] = [];
  let currentHeading = "";
  let currentContent: string[] = [];

  for (const line of lines) {
    const trimmed = line.trim();
    if (isHeadingLine(trimmed)) {
      if (currentContent.length > 0) {
        sections.push({ heading: currentHeading, content: currentContent.join(" ") });
      }
      currentHeading = trimmed;
      currentContent = [];
    } else {
      currentContent.push(trimmed);
    }
  }
  if (currentContent.length > 0 || sections.length === 0) {
    sections.push({ heading: currentHeading, content: currentContent.join(" ") });
  }

  return sections;
}

function isHeadingLine(line: string): boolean {
  if (line.length > 80) return false;
  const indicators = [...REQUIRED_INDICATORS, ...PREFERRED_INDICATORS];
  return indicators.some((ind) => line.includes(ind));
}

function classifySection(heading: string): "required" | "preferred" {
  const h = heading.toLowerCase();
  if (PREFERRED_INDICATORS.some((ind) => h.includes(ind))) return "preferred";
  return "required"; 
}

function detectSkills(text: string): string[] {
  const found: string[] = [];
  const remaining = ` ${text} `; 

  const allTerms = [
    ...KNOWN_SKILLS.map((s) => ({ term: s, canonical: s })),
    ...Object.entries(SKILL_ALIASES).map(([alias, canonical]) => ({
      term: alias, canonical,
    })),
  ].sort((a, b) => b.term.length - a.term.length);

  const seen = new Set<string>();

  for (const { term, canonical } of allTerms) {
    if (seen.has(canonical)) continue;
    const regex = new RegExp(`(?<![\\w.#+-])${escapeRegex(term)}(?![\\w.#+-])`, "g");
    if (regex.test(remaining)) {
      found.push(canonical);
      seen.add(canonical);
    }
  }

  return found;
}

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
