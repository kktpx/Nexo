import React from "react";
import { Interview } from "@/types/interview";
import { daysUntil, formatDate } from "@/lib/utils/date";
import { Calendar, Video } from "lucide-react";

interface UpcomingInterviewProps {
  interview: Interview;
}

export function UpcomingInterview({ interview }: UpcomingInterviewProps) {
  const days = daysUntil(interview.date);
  
  return (
    <div className="flex items-center p-4 border-b border-gray-200 last:border-0 hover:bg-gray-50">
      <div className="flex-shrink-0 mr-4">
        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
          <Calendar className="h-5 w-5" />
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 truncate">
          {interview.position} at {interview.company}
        </p>
        <div className="flex items-center mt-1 text-sm text-gray-500">
          <span>{formatDate(interview.date)} • {interview.time}</span>
          <span className="mx-2">•</span>
          <span className="capitalize">{interview.type.replace("-", " ")}</span>
        </div>
      </div>
      <div className="flex flex-col items-end flex-shrink-0">
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${days <= 3 ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"}`}>
          {days === 0 ? "Today" : days === 1 ? "1 day left" : `${days} days left`}
        </span>
        {interview.meetingUrl && (
          <a href={interview.meetingUrl} target="_blank" rel="noopener noreferrer" className="mt-2 text-blue-600 hover:text-blue-800 text-xs flex items-center">
            <Video className="w-3 h-3 mr-1" /> Join
          </a>
        )}
      </div>
    </div>
  );
}
