"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useData } from "@/providers/DataProvider";
import { APPLICATION_STATUSES, ApplicationStatus } from "@/types/application";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { KanbanBoard } from "@/components/applications/KanbanBoard";
import { Plus, Search, List, Kanban } from "lucide-react";
import { formatDate } from "@/lib/utils/date";

export default function ApplicationsPage() {
  const { applications, updateApplicationStatus } = useData();
  const router = useRouter();
  
  const [viewMode, setViewMode] = useState<"kanban" | "list">("kanban");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredApps = useMemo(() => {
    return applications.filter(app => {
      const matchSearch = 
        app.company.toLowerCase().includes(search.toLowerCase()) || 
        app.position.toLowerCase().includes(search.toLowerCase());
      const matchStatus = statusFilter === "all" || app.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [applications, search, statusFilter]);

  return (
    <div className="space-y-6 h-full flex flex-col min-h-0">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 flex-shrink-0">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Applications</h1>
          <p className="mt-1 text-sm text-gray-500">Track and manage your job applications.</p>
        </div>
        <Button onClick={() => router.push("/applications/new")}>
          <Plus className="w-4 h-4 mr-2" /> Add Application
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 flex-shrink-0">
        <div className="relative flex-1 max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <Input 
            className="pl-10" 
            placeholder="Search company or position..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        
        <select
          className="block w-full sm:w-48 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All Statuses</option>
          {APPLICATION_STATUSES.map(s => (
            <option key={s.value} value={s.value}>{s.label}</option>
          ))}
        </select>

        <div className="flex border border-gray-300 rounded-md overflow-hidden self-start">
          <button
            className={`px-3 py-2 flex items-center ${viewMode === "kanban" ? "bg-blue-50 text-blue-600" : "bg-white text-gray-500 hover:bg-gray-50"}`}
            onClick={() => setViewMode("kanban")}
            title="Kanban View"
          >
            <Kanban className="w-4 h-4" />
          </button>
          <button
            className={`px-3 py-2 border-l border-gray-300 flex items-center ${viewMode === "list" ? "bg-blue-50 text-blue-600" : "bg-white text-gray-500 hover:bg-gray-50"}`}
            onClick={() => setViewMode("list")}
            title="List View"
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto">
        {viewMode === "kanban" ? (
          <KanbanBoard 
            applications={filteredApps} 
            onStatusChange={updateApplicationStatus}
            onCardClick={(id) => router.push(`/applications/${id}`)}
          />
        ) : (
          <div className="bg-white shadow rounded-lg overflow-hidden border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applied On</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Match</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredApps.map(app => {
                  const statusDef = APPLICATION_STATUSES.find(s => s.value === app.status);
                  return (
                    <tr 
                      key={app.id} 
                      className="hover:bg-gray-50 cursor-pointer"
                      onClick={() => router.push(`/applications/${app.id}`)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{app.company}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{app.position}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusDef?.color}`}>
                          {statusDef?.label}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(app.applicationDate)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {app.matchResult ? `${app.matchResult.score}%` : "-"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {filteredApps.length === 0 && (
              <div className="p-8 text-center text-gray-500">No applications found.</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
