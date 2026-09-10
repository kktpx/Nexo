import React from "react";
import { Application, APPLICATION_STATUSES } from "@/types/application";
import { formatDate } from "@/lib/utils/date";
import { Briefcase } from "lucide-react";

interface RecentApplicationProps {
  application: Application;
}

export function RecentApplication({ application }: RecentApplicationProps) {
  const statusDef = APPLICATION_STATUSES.find(s => s.value === application.status);
  
  return (
    <div className="flex items-center p-4 border-b border-gray-200 last:border-0 hover:bg-gray-50">
      <div className="flex-shrink-0 mr-4">
        <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600">
          <Briefcase className="h-5 w-5" />
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 truncate">
          {application.position} at {application.company}
        </p>
        <p className="text-sm text-gray-500 truncate mt-1">
          Applied on {formatDate(application.applicationDate)}
        </p>
      </div>
      <div className="flex-shrink-0">
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusDef?.color || "bg-gray-100 text-gray-800"}`}>
          {statusDef?.label || application.status}
        </span>
      </div>
    </div>
  );
}
