import React from "react";

interface StatCardProps {
  title: string;
  value: number | string;
  trend?: string;
  trendUp?: boolean;
}

export function StatCard({ title, value, trend, trendUp }: StatCardProps) {
  return (
    <div className="bg-white overflow-hidden shadow rounded-lg p-5">
      <dt className="text-sm font-medium text-gray-500 truncate">{title}</dt>
      <dd className="mt-1 text-3xl font-semibold text-gray-900">{value}</dd>
      {trend && (
        <dd className={`mt-2 text-sm ${trendUp ? "text-green-600" : "text-gray-500"}`}>
          {trend}
        </dd>
      )}
    </div>
  );
}
