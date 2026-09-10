"use client";

import React, { useState } from "react";
import { Application, APPLICATION_STATUSES, ApplicationStatus } from "@/types/application";
import { KanbanColumn } from "./KanbanColumn";

interface KanbanBoardProps {
  applications: Application[];
  onStatusChange: (appId: string, newStatus: ApplicationStatus) => void;
  onCardClick: (id: string) => void;
}

export function KanbanBoard({ applications, onStatusChange, onCardClick }: KanbanBoardProps) {
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [dragOverColumn, setDragOverColumn] = useState<ApplicationStatus | null>(null);

  function handleDragStart(e: React.DragEvent, appId: string) {
    setDraggedId(appId);
    e.dataTransfer.setData("text/plain", appId);
    e.dataTransfer.effectAllowed = "move";
  }

  function handleDragOver(e: React.DragEvent, status: ApplicationStatus) {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setDragOverColumn(status);
  }

  function handleDragLeave() {
    setDragOverColumn(null);
  }

  function handleDrop(e: React.DragEvent, targetStatus: ApplicationStatus) {
    e.preventDefault();
    const appId = e.dataTransfer.getData("text/plain");
    if (appId) {
      onStatusChange(appId, targetStatus);
    }
    setDraggedId(null);
    setDragOverColumn(null);
  }

  return (
    <div className="flex gap-4 overflow-x-auto pb-4 pt-2">
      {APPLICATION_STATUSES.map((status) => (
        <KanbanColumn
          key={status.value}
          status={status}
          applications={applications.filter((a) => a.status === status.value)}
          dragOverColumn={dragOverColumn}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onCardClick={onCardClick}
        />
      ))}
    </div>
  );
}
