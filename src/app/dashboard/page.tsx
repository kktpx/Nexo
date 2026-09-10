"use client";

import React from "react";
import { useData } from "@/providers/DataProvider";
import { 
  calculateDashboardStats, 
  calculatePipelineSummary, 
  getUpcomingInterviews, 
  getRecentApplications 
} from "@/lib/dashboard/calculator";
import { StatCard } from "@/components/dashboard/StatCard";
import { PipelineSummary } from "@/components/dashboard/PipelineSummary";
import { UpcomingInterview } from "@/components/dashboard/UpcomingInterview";
import { RecentApplication } from "@/components/dashboard/RecentApplication";

export default function DashboardPage() {
  const { applications, interviews } = useData();
  
  const stats = calculateDashboardStats(applications);
  const pipeline = calculatePipelineSummary(applications);
  const upcomingInterviews = getUpcomingInterviews(interviews);
  const recentApps = getRecentApplications(applications);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
        <StatCard title="Total Applications" value={stats.totalApplications} />
        <StatCard title="Applied" value={stats.applied} />
        <StatCard title="Interviews" value={stats.interviews} />
        <StatCard title="Offers" value={stats.offers} />
        <StatCard title="Response Rate" value={`${stats.responseRate}%`} />
      </div>

      {/* Pipeline Summary */}
      <PipelineSummary summary={pipeline} />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Upcoming Interviews */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-5 border-b border-gray-200">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Upcoming Interviews</h3>
          </div>
          <div className="flex flex-col">
            {upcomingInterviews.length > 0 ? (
              upcomingInterviews.map(interview => (
                <UpcomingInterview key={interview.id} interview={interview} />
              ))
            ) : (
              <div className="p-6 text-center text-gray-500">No upcoming interviews.</div>
            )}
          </div>
        </div>

        {/* Recent Applications */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-5 border-b border-gray-200">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Applications</h3>
          </div>
          <div className="flex flex-col">
            {recentApps.length > 0 ? (
              recentApps.map(app => (
                <RecentApplication key={app.id} application={app} />
              ))
            ) : (
              <div className="p-6 text-center text-gray-500">No recent applications.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
