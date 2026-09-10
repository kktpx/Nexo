import type { Application } from "@/types/application";
import type { Interview } from "@/types/interview";
import type { DashboardStats, PipelineSummary } from "@/types/analytics";

export function calculateDashboardStats(applications: Application[]): DashboardStats {
  const total = applications.length;
  const applied = applications.filter((a) => a.status === "applied").length;
  const interviews = applications.filter((a) => a.status === "interview").length;
  const offers = applications.filter((a) => a.status === "offer").length;
  const rejected = applications.filter((a) => a.status === "rejected").length;

  const submitted = applications.filter((a) => a.status !== "wishlist").length;
  const responded = applications.filter((a) =>
    ["hr-review", "interview", "offer", "rejected"].includes(a.status)
  ).length;
  const responseRate = submitted === 0 ? 0 : Math.round((responded / submitted) * 100);

  return { totalApplications: total, applied, interviews, offers, rejected, responseRate };
}

export function calculatePipelineSummary(applications: Application[]): PipelineSummary {
  return {
    wishlist:  applications.filter((a) => a.status === "wishlist").length,
    applied:   applications.filter((a) => a.status === "applied").length,
    hrReview:  applications.filter((a) => a.status === "hr-review").length,
    interview: applications.filter((a) => a.status === "interview").length,
    offer:     applications.filter((a) => a.status === "offer").length,
    rejected:  applications.filter((a) => a.status === "rejected").length,
  };
}

export function getUpcomingInterviews(interviews: Interview[], limit: number = 5): Interview[] {
  const now = new Date();
  // Clear time for precise day comparison if necessary, but ISO comparing works better for exact time
  return interviews
    .filter((i) => i.status === "upcoming" && new Date(i.date).getTime() >= now.getTime())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, limit);
}

export function getRecentApplications(applications: Application[], limit: number = 5): Application[] {
  return [...applications]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, limit);
}
