import { ApplicationStatus } from "./application";

export interface DashboardStats {
  totalApplications: number;
  applied: number;
  interviews: number;
  offers: number;
  rejected: number;
  responseRate: number;           // percentage
}

export interface PipelineSummary {
  wishlist: number;
  applied: number;
  hrReview: number;
  interview: number;
  offer: number;
  rejected: number;
}

export interface MonthlyCount {
  month: string;                  // "2026-01", "2026-02", etc.
  label: string;                  // "Jan 2026"
  count: number;
}

export interface SkillFrequency {
  skill: string;
  count: number;
}

export interface AnalyticsData {
  applicationsByStatus: Record<ApplicationStatus, number>;
  applicationsPerMonth: MonthlyCount[];
  interviewRate: number;
  offerRate: number;
  rejectionRate: number;
  responseRate: number;
  topRequestedSkills: SkillFrequency[];
}
