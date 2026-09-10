"use client";

import React, { useState, useMemo } from "react";
import { useData } from "@/providers/DataProvider";
import { Interview } from "@/types/interview";
import { InterviewCard } from "@/components/interviews/InterviewCard";
import { InterviewForm } from "@/components/interviews/InterviewForm";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Plus, Search } from "lucide-react";

export default function InterviewsPage() {
  const { interviews, applications, addInterview, updateInterview, deleteInterview } = useData();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingInterview, setEditingInterview] = useState<Interview | null>(null);

  const filteredInterviews = useMemo(() => {
    let result = [...interviews];
    
    // Sort by date (closest upcoming first, then past)
    result.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    return result.filter(interview => {
      const matchSearch = interview.company.toLowerCase().includes(search.toLowerCase()) || 
                          interview.position.toLowerCase().includes(search.toLowerCase());
      const matchStatus = statusFilter === "all" || interview.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [interviews, search, statusFilter]);

  const handleOpenForm = (interview?: Interview) => {
    setEditingInterview(interview || null);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingInterview(null);
  };

  const handleSubmit = (input: any) => {
    if (editingInterview) {
      updateInterview(editingInterview.id, input);
    } else {
      addInterview(input);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Interviews</h1>
          <p className="mt-1 text-sm text-gray-500">Track and prepare for your upcoming interviews.</p>
        </div>
        <Button onClick={() => handleOpenForm()}>
          <Plus className="w-4 h-4 mr-2" /> Schedule Interview
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
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
          <option value="upcoming">Upcoming</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {filteredInterviews.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredInterviews.map(interview => (
            <InterviewCard 
              key={interview.id} 
              interview={interview}
              onEdit={handleOpenForm}
              onDelete={deleteInterview}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-lg border border-dashed border-gray-300">
          <h3 className="mt-2 text-sm font-medium text-gray-900">No interviews found</h3>
          <p className="mt-1 text-sm text-gray-500">You don't have any interviews matching the criteria.</p>
          <div className="mt-6">
            <Button onClick={() => handleOpenForm()}>
              <Plus className="w-4 h-4 mr-2" /> Schedule Interview
            </Button>
          </div>
        </div>
      )}

      <InterviewForm 
        open={isFormOpen} 
        onClose={handleCloseForm} 
        onSubmit={handleSubmit} 
        applications={applications}
        initialData={editingInterview}
      />
    </div>
  );
}
