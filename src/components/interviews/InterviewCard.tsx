import React from "react";
import { Interview, INTERVIEW_TYPES } from "@/types/interview";
import { formatDate, daysUntil } from "@/lib/utils/date";
import { Calendar, Clock, Video, Pencil, Trash2 } from "lucide-react";

interface InterviewCardProps {
  interview: Interview;
  onEdit: (interview: Interview) => void;
  onDelete: (id: string) => void;
}

export function InterviewCard({ interview, onEdit, onDelete }: InterviewCardProps) {
  const typeLabel = INTERVIEW_TYPES.find(t => t.value === interview.type)?.label || interview.type;
  const days = daysUntil(interview.date);
  
  const statusColors = {
    upcoming: "bg-blue-100 text-blue-800",
    completed: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-semibold text-gray-900 text-lg truncate pr-4">{interview.company}</h3>
          <p className="text-sm text-gray-600 truncate">{interview.position}</p>
        </div>
        <div className="flex space-x-2">
          <button onClick={() => onEdit(interview)} className="text-gray-400 hover:text-blue-500">
            <Pencil className="w-4 h-4" />
          </button>
          <button onClick={() => onDelete(interview.id)} className="text-gray-400 hover:text-red-500">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center text-sm text-gray-700">
          <Calendar className="w-4 h-4 text-gray-400 mr-2" />
          {formatDate(interview.date)}
        </div>
        <div className="flex items-center text-sm text-gray-700">
          <Clock className="w-4 h-4 text-gray-400 mr-2" />
          {interview.time}
        </div>
        {interview.meetingUrl && (
          <div className="flex items-center text-sm text-blue-600">
            <Video className="w-4 h-4 text-blue-400 mr-2" />
            <a href={interview.meetingUrl} target="_blank" rel="noopener noreferrer" className="hover:underline truncate">
              Join Meeting
            </a>
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
          Round {interview.stage}
        </span>
        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
          {typeLabel}
        </span>
        <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${statusColors[interview.status]}`}>
          {interview.status}
        </span>
        {interview.status === "upcoming" && (
          <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${days <= 3 ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"}`}>
            {days === 0 ? "Today" : days === 1 ? "In 1 day" : `In ${days} days`}
          </span>
        )}
      </div>

      {interview.notes && (
        <div className="pt-3 border-t border-gray-100">
          <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Notes</p>
          <p className="text-sm text-gray-700 line-clamp-2">{interview.notes}</p>
        </div>
      )}
    </div>
  );
}
