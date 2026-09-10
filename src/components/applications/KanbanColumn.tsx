import React from "react";
import { Application, ApplicationStatus } from "@/types/application";
import { KanbanCard } from "./KanbanCard";

interface KanbanColumnProps {
  status: { value: ApplicationStatus; label: string; color: string };
  applications: Application[];
  dragOverColumn: ApplicationStatus | null;
  onDragStart: (e: React.DragEvent, id: string) => void;
  onDragOver: (e: React.DragEvent, status: ApplicationStatus) => void;
  onDragLeave: () => void;
  onDrop: (e: React.DragEvent, targetStatus: ApplicationStatus) => void;
  onCardClick: (id: string) => void;
}

export function KanbanColumn({
  status,
  applications,
  dragOverColumn,
  onDragStart,
  onDragOver,
  onDragLeave,
  onDrop,
  onCardClick
}: KanbanColumnProps) {
  const isOver = dragOverColumn === status.value;

  return (
    <div
      className={`flex-shrink-0 w-72 flex flex-col rounded-lg bg-gray-50 border-2 transition-colors ${isOver ? "border-blue-400 bg-blue-50" : "border-transparent"}`}
      onDragOver={(e) => onDragOver(e, status.value)}
      onDragLeave={onDragLeave}
      onDrop={(e) => onDrop(e, status.value)}
    >
      <div className="p-3 border-b border-gray-200 flex justify-between items-center bg-gray-100/50 rounded-t-lg">
        <h3 className="font-medium text-gray-900 text-sm">{status.label}</h3>
        <span className="bg-white text-gray-500 text-xs font-medium px-2 py-0.5 rounded-full border border-gray-200">
          {applications.length}
        </span>
      </div>
      <div className="p-3 flex-1 overflow-y-auto space-y-3 min-h-[150px]">
        {applications.map(app => (
          <KanbanCard 
            key={app.id} 
            application={app} 
            onDragStart={onDragStart} 
            onClick={onCardClick}
          />
        ))}
      </div>
    </div>
  );
}
