import React from "react";
import { PipelineSummary as PipelineSummaryType } from "@/types/analytics";

interface PipelineSummaryProps {
  summary: PipelineSummaryType;
}

export function PipelineSummary({ summary }: PipelineSummaryProps) {
  const steps = [
    { label: "Wishlist", count: summary.wishlist },
    { label: "Applied", count: summary.applied },
    { label: "HR Review", count: summary.hrReview },
    { label: "Interview", count: summary.interview },
    { label: "Offer", count: summary.offer },
  ];

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Pipeline Summary</h3>
      <div className="flex items-center justify-between">
        {steps.map((step, idx) => (
          <React.Fragment key={step.label}>
            <div className="flex flex-col items-center flex-1">
              <span className="text-2xl font-semibold text-blue-600">{step.count}</span>
              <span className="text-sm font-medium text-gray-500 text-center mt-1">{step.label}</span>
            </div>
            {idx < steps.length - 1 && (
              <div className="hidden sm:block text-gray-300">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
