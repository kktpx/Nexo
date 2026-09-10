import { Skill, Project, Application, Interview } from "@/types";
// We need to export these types from an index or import them directly.
// Wait, I didn't create a types/index.ts, I will import them from their respective files.

import { Skill as SkillType } from "@/types/skill";
import { Project as ProjectType } from "@/types/project";
import { Application as ApplicationType } from "@/types/application";
import { Interview as InterviewType } from "@/types/interview";

export const MOCK_SKILLS: SkillType[] = [
  { id: "s1", name: "TypeScript", normalizedName: "typescript", category: "frontend", level: 4, createdAt: "2026-09-01T00:00:00.000Z", updatedAt: "2026-09-01T00:00:00.000Z" },
  { id: "s2", name: "React", normalizedName: "react", category: "frontend", level: 4, createdAt: "2026-09-01T00:00:00.000Z", updatedAt: "2026-09-01T00:00:00.000Z" },
  { id: "s3", name: "Next.js", normalizedName: "next.js", category: "frontend", level: 3, createdAt: "2026-09-01T00:00:00.000Z", updatedAt: "2026-09-01T00:00:00.000Z" },
  { id: "s4", name: "Node.js", normalizedName: "node.js", category: "backend", level: 3, createdAt: "2026-09-01T00:00:00.000Z", updatedAt: "2026-09-01T00:00:00.000Z" },
  { id: "s5", name: "PostgreSQL", normalizedName: "postgresql", category: "database", level: 3, createdAt: "2026-09-01T00:00:00.000Z", updatedAt: "2026-09-01T00:00:00.000Z" },
  { id: "s6", name: "Python", normalizedName: "python", category: "backend", level: 3, createdAt: "2026-09-01T00:00:00.000Z", updatedAt: "2026-09-01T00:00:00.000Z" },
  { id: "s7", name: "Docker", normalizedName: "docker", category: "devops", level: 2, createdAt: "2026-09-01T00:00:00.000Z", updatedAt: "2026-09-01T00:00:00.000Z" },
  { id: "s8", name: "Git", normalizedName: "git", category: "tools", level: 4, createdAt: "2026-09-01T00:00:00.000Z", updatedAt: "2026-09-01T00:00:00.000Z" },
  { id: "s9", name: "REST API", normalizedName: "rest api", category: "backend", level: 4, createdAt: "2026-09-01T00:00:00.000Z", updatedAt: "2026-09-01T00:00:00.000Z" },
  { id: "s10", name: "Tailwind CSS", normalizedName: "tailwind css", category: "frontend", level: 4, createdAt: "2026-09-01T00:00:00.000Z", updatedAt: "2026-09-01T00:00:00.000Z" }
];

export const MOCK_PROJECTS: ProjectType[] = [
  { id: "p1", name: "ThreatSentry", shortDescription: "Security monitoring platform", longDescription: "A comprehensive web intrusion detection and security monitoring platform.", techStack: ["Next.js", "TypeScript", "PostgreSQL", "Python"], skillIds: ["s1", "s3", "s5", "s6", "s9"], projectType: "web-app", status: "completed", createdAt: "2026-09-02T00:00:00.000Z", updatedAt: "2026-09-02T00:00:00.000Z" },
  { id: "p2", name: "Portfolio Website", shortDescription: "Personal developer portfolio", longDescription: "My personal developer portfolio built with React and Tailwind CSS.", techStack: ["React", "Tailwind CSS"], skillIds: ["s2", "s10"], projectType: "web-app", status: "completed", createdAt: "2026-09-03T00:00:00.000Z", updatedAt: "2026-09-03T00:00:00.000Z" },
  { id: "p3", name: "TaskFlow", shortDescription: "Project management tool", longDescription: "A Kanban-based project management tool for small teams.", techStack: ["Next.js", "TypeScript", "Node.js", "MongoDB"], skillIds: ["s1", "s2", "s3", "s4", "s9"], projectType: "web-app", status: "in-progress", createdAt: "2026-09-04T00:00:00.000Z", updatedAt: "2026-09-04T00:00:00.000Z" },
  { id: "p4", name: "DataPulse", shortDescription: "Analytics dashboard", longDescription: "A data visualization dashboard for analyzing website traffic.", techStack: ["React", "Python", "PostgreSQL"], skillIds: ["s2", "s5", "s6", "s9"], projectType: "web-app", status: "completed", createdAt: "2026-09-05T00:00:00.000Z", updatedAt: "2026-09-05T00:00:00.000Z" }
];

export const MOCK_APPLICATIONS: ApplicationType[] = [
  { id: "a1", company: "TechCorp", position: "Frontend Engineer", jobDescription: "We are looking for a frontend engineer with React and TypeScript experience.", applicationDate: "2026-09-01T00:00:00.000Z", status: "interview", statusHistory: [{ from: null, to: "applied", changedAt: "2026-09-01T00:00:00.000Z" }, { from: "applied", to: "hr-review", changedAt: "2026-09-05T00:00:00.000Z" }, { from: "hr-review", to: "interview", changedAt: "2026-09-10T00:00:00.000Z" }], requirements: [], notes: "First interview went well.", createdAt: "2026-09-01T00:00:00.000Z", updatedAt: "2026-09-10T00:00:00.000Z" },
  { id: "a2", company: "Innovate Inc", position: "Fullstack Developer", jobDescription: "Looking for a fullstack dev with Next.js and Node.js skills.", applicationDate: "2026-09-02T00:00:00.000Z", status: "applied", statusHistory: [{ from: null, to: "applied", changedAt: "2026-09-02T00:00:00.000Z" }], requirements: [], notes: "Referral from John.", createdAt: "2026-09-02T00:00:00.000Z", updatedAt: "2026-09-02T00:00:00.000Z" },
  { id: "a3", company: "StartupX", position: "Backend Engineer", jobDescription: "Python and PostgreSQL required.", applicationDate: "2026-09-03T00:00:00.000Z", status: "rejected", statusHistory: [{ from: null, to: "applied", changedAt: "2026-09-03T00:00:00.000Z" }, { from: "applied", to: "rejected", changedAt: "2026-09-08T00:00:00.000Z" }], requirements: [], notes: "Not enough python experience.", createdAt: "2026-09-03T00:00:00.000Z", updatedAt: "2026-09-08T00:00:00.000Z" },
  { id: "a4", company: "GlobalTech", position: "Software Engineer Intern", jobDescription: "General software engineering internship.", applicationDate: "2026-09-04T00:00:00.000Z", status: "hr-review", statusHistory: [{ from: null, to: "applied", changedAt: "2026-09-04T00:00:00.000Z" }, { from: "applied", to: "hr-review", changedAt: "2026-09-09T00:00:00.000Z" }], requirements: [], notes: "", createdAt: "2026-09-04T00:00:00.000Z", updatedAt: "2026-09-09T00:00:00.000Z" },
  { id: "a5", company: "DesignStudio", position: "UI Developer", jobDescription: "React and Tailwind CSS required.", applicationDate: "2026-09-05T00:00:00.000Z", status: "offer", statusHistory: [{ from: null, to: "applied", changedAt: "2026-09-05T00:00:00.000Z" }, { from: "applied", to: "interview", changedAt: "2026-09-07T00:00:00.000Z" }, { from: "interview", to: "offer", changedAt: "2026-09-11T00:00:00.000Z" }], requirements: [], notes: "Salary negotiation ongoing.", createdAt: "2026-09-05T00:00:00.000Z", updatedAt: "2026-09-11T00:00:00.000Z" },
  { id: "a6", company: "NextGen", position: "Frontend Developer", jobDescription: "React, Next.js, and general frontend skills.", applicationDate: "2026-09-06T00:00:00.000Z", status: "wishlist", statusHistory: [{ from: null, to: "wishlist", changedAt: "2026-09-06T00:00:00.000Z" }], requirements: [], notes: "Need to update resume before applying.", createdAt: "2026-09-06T00:00:00.000Z", updatedAt: "2026-09-06T00:00:00.000Z" }
];

export const MOCK_INTERVIEWS: InterviewType[] = [
  { id: "i1", applicationId: "a1", company: "TechCorp", position: "Frontend Engineer", type: "technical-interview", date: "2026-09-15T00:00:00.000Z", time: "14:00", meetingUrl: "https://zoom.us/j/123", stage: 1, notes: "Focus on React.", status: "upcoming", createdAt: "2026-09-10T00:00:00.000Z", updatedAt: "2026-09-10T00:00:00.000Z" },
  { id: "i2", applicationId: "a5", company: "DesignStudio", position: "UI Developer", type: "hr-interview", date: "2026-09-07T00:00:00.000Z", time: "10:00", stage: 1, notes: "General fit check.", status: "completed", createdAt: "2026-09-06T00:00:00.000Z", updatedAt: "2026-09-06T00:00:00.000Z" },
  { id: "i3", applicationId: "a5", company: "DesignStudio", position: "UI Developer", type: "technical-interview", date: "2026-09-09T00:00:00.000Z", time: "11:00", stage: 2, notes: "Live coding with Tailwind.", status: "completed", createdAt: "2026-09-08T00:00:00.000Z", updatedAt: "2026-09-08T00:00:00.000Z" }
];
