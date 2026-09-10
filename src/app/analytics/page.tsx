"use client";

import React from "react";
import { useData } from "@/providers/DataProvider";
import { calculateAnalytics } from "@/lib/analytics/calculator";
import { APPLICATION_STATUSES } from "@/types/application";

export default function AnalyticsPage() {
  const { applications, interviews } = useData();
  const data = calculateAnalytics(applications, interviews);

  const maxMonthCount = Math.max(...data.applicationsPerMonth.map(m => m.count), 1);
  const maxSkillCount = Math.max(...data.topRequestedSkills.map(s => s.count), 1);

  return (
    <div className="space-y-6 pb-12">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Analytics</h1>
        <p className="mt-1 text-sm text-gray-500">Gain insights into your application performance.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <p className="text-sm font-medium text-gray-500 truncate">Response Rate</p>
          <p className="mt-1 text-2xl font-semibold text-gray-900">{data.responseRate}%</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <p className="text-sm font-medium text-gray-500 truncate">Interview Rate</p>
          <p className="mt-1 text-2xl font-semibold text-blue-600">{data.interviewRate}%</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <p className="text-sm font-medium text-gray-500 truncate">Offer Rate</p>
          <p className="mt-1 text-2xl font-semibold text-green-600">{data.offerRate}%</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <p className="text-sm font-medium text-gray-500 truncate">Rejection Rate</p>
          <p className="mt-1 text-2xl font-semibold text-red-600">{data.rejectionRate}%</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Applications Over Time (Bar Chart) */}
        <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-6">
          <h3 className="text-base font-medium text-gray-900 mb-6">Applications Over Time</h3>
          {data.applicationsPerMonth.length > 0 ? (
            <div className="flex items-end h-48 space-x-2">
              {data.applicationsPerMonth.map(month => (
                <div key={month.month} className="flex-1 flex flex-col items-center group relative">
                  <div className="absolute bottom-full mb-2 hidden group-hover:block bg-gray-900 text-white text-xs py-1 px-2 rounded whitespace-nowrap z-10">
                    {month.label}: {month.count} apps
                  </div>
                  <div 
                    className="w-full bg-blue-500 rounded-t hover:bg-blue-600 transition-colors"
                    style={{ height: `${(month.count / maxMonthCount) * 100}%` }}
                  ></div>
                  <span className="text-xs text-gray-500 mt-2 rotate-45 transform origin-top-left ml-2 whitespace-nowrap">
                    {month.label}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="h-48 flex items-center justify-center text-gray-500 text-sm">Not enough data to display.</div>
          )}
        </div>

        {/* Top Requested Skills (Horizontal Bar Chart) */}
        <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-6">
          <h3 className="text-base font-medium text-gray-900 mb-6">Top Requested Skills</h3>
          {data.topRequestedSkills.length > 0 ? (
            <div className="space-y-4">
              {data.topRequestedSkills.map(skill => (
                <div key={skill.skill} className="flex items-center">
                  <div className="w-24 text-sm font-medium text-gray-700 truncate capitalize" title={skill.skill}>
                    {skill.skill}
                  </div>
                  <div className="flex-1 ml-4 h-5 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-indigo-500 rounded-full"
                      style={{ width: `${(skill.count / maxSkillCount) * 100}%` }}
                    ></div>
                  </div>
                  <div className="ml-4 w-8 text-right text-sm text-gray-500">
                    {skill.count}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="h-48 flex items-center justify-center text-gray-500 text-sm">No skills extracted yet.</div>
          )}
        </div>
      </div>
    </div>
  );
}
