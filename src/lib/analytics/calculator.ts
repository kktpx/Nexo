import { Application } from "@/types/application";
import { Interview } from "@/types/interview";
import { AnalyticsData, MonthlyCount, SkillFrequency } from "@/types/analytics";

export function calculateAnalytics(
  applications: Application[],
  interviews: Interview[]
): AnalyticsData {
  
  const applicationsByStatus = applications.reduce((acc, app) => {
    acc[app.status] = (acc[app.status] || 0) + 1;
    return acc;
  }, {
    wishlist: 0, applied: 0, "hr-review": 0, interview: 0, offer: 0, rejected: 0
  } as Record<string, number>);

  const monthCounts: Record<string, number> = {};
  for (const app of applications) {
    if (app.status === "wishlist") continue;
    
    const date = new Date(app.applicationDate);
    if (!isNaN(date.getTime())) {
      const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
      monthCounts[key] = (monthCounts[key] || 0) + 1;
    }
  }

  const applicationsPerMonth: MonthlyCount[] = Object.entries(monthCounts)
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([month, count]) => {
      const [y, m] = month.split("-");
      const date = new Date(parseInt(y), parseInt(m) - 1);
      return {
        month,
        label: date.toLocaleDateString("en-US", { month: "short", year: "numeric" }),
        count
      };
    });

  const submitted = applications.filter((a) => a.status !== "wishlist").length;
  
  const reachedInterview = applications.filter(a => 
    a.statusHistory.some(h => h.to === "interview") || a.status === "offer"
  ).length;

  const gotOffer = applications.filter(a => a.status === "offer").length;
  const gotRejected = applications.filter(a => a.status === "rejected").length;
  
  const responded = applications.filter((a) =>
    ["hr-review", "interview", "offer", "rejected"].includes(a.status)
  ).length;

  const interviewRate = submitted > 0 ? Math.round((reachedInterview / submitted) * 100) : 0;
  const offerRate = submitted > 0 ? Math.round((gotOffer / submitted) * 100) : 0;
  const rejectionRate = submitted > 0 ? Math.round((gotRejected / submitted) * 100) : 0;
  const responseRate = submitted > 0 ? Math.round((responded / submitted) * 100) : 0;

  const skillCounts: Record<string, number> = {};
  for (const app of applications) {
    for (const req of app.requirements) {
      skillCounts[req.skill] = (skillCounts[req.skill] || 0) + 1;
    }
  }

  const topRequestedSkills: SkillFrequency[] = Object.entries(skillCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([skill, count]) => ({ skill, count }));

  return {
    applicationsByStatus,
    applicationsPerMonth,
    interviewRate,
    offerRate,
    rejectionRate,
    responseRate,
    topRequestedSkills,
  };
}
