import React from "react";
import { Application, APPLICATION_STATUSES } from "@/types/application";
import { formatDate } from "@/lib/utils/date";

interface KanbanCardProps {
  application: Application;
  onDragStart: (e: React.DragEvent, id: string) => void;
  onClick: (id: string) => void;
}

export function KanbanCard({ application, onDragStart, onClick }: KanbanCardProps) {
  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, application.id)}
      onClick={() => onClick(application.id)}
      className="bg-white p-3 rounded-md shadow-sm border border-gray-200 cursor-grab active:cursor-grabbing hover:border-blue-300 transition-colors"
    >
      <div className="font-semibold text-gray-900 text-sm truncate">{application.company}</div>
      <div className="text-sm text-gray-600 truncate mt-0.5">{application.position}</div>
      <div className="flex items-center justify-between mt-3 text-xs">
        <span className="text-gray-500">{formatDate(application.applicationDate)}</span>
        {application.matchResult && (
          <span className={`px-1.5 py-0.5 rounded font-medium ${application.matchResult.score >= 80 ? "bg-green-100 text-green-700" : application.matchResult.score >= 50 ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700"}`}>
            {application.matchResult.score}%
          </span>
        )}
      </div>
    </div>
  );
}
