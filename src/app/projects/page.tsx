"use client";

import React, { useState, useMemo } from "react";
import { useData } from "@/providers/DataProvider";
import { Project } from "@/types/project";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { ProjectForm } from "@/components/projects/ProjectForm";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Plus, Search } from "lucide-react";

export default function ProjectsPage() {
  const { projects, skills, addProject, updateProject, deleteProject } = useData();
  const [search, setSearch] = useState("");
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const matchName = project.name.toLowerCase().includes(search.toLowerCase());
      const matchTech = project.techStack.some(t => t.toLowerCase().includes(search.toLowerCase()));
      return matchName || matchTech;
    });
  }, [projects, search]);

  const handleOpenForm = (project?: Project) => {
    setEditingProject(project || null);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingProject(null);
  };

  const handleSubmit = (input: any) => {
    if (editingProject) {
      updateProject(editingProject.id, input);
    } else {
      addProject(input);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Projects</h1>
          <p className="mt-1 text-sm text-gray-500">Showcase your personal projects and the skills they demonstrate.</p>
        </div>
        <Button onClick={() => handleOpenForm()}>
          <Plus className="w-4 h-4 mr-2" /> Add Project
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <Input 
            className="pl-10" 
            placeholder="Search projects or technologies..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredProjects.map(project => (
            <ProjectCard 
              key={project.id} 
              project={project}
              skills={skills}
              onEdit={handleOpenForm}
              onDelete={deleteProject}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-lg border border-dashed border-gray-300">
          <h3 className="mt-2 text-sm font-medium text-gray-900">No projects found</h3>
          <p className="mt-1 text-sm text-gray-500">Get started by creating a new project.</p>
          <div className="mt-6">
            <Button onClick={() => handleOpenForm()}>
              <Plus className="w-4 h-4 mr-2" /> Add Project
            </Button>
          </div>
        </div>
      )}

      <ProjectForm 
        open={isFormOpen} 
        onClose={handleCloseForm} 
        onSubmit={handleSubmit} 
        existingSkills={skills}
        initialData={editingProject}
      />
    </div>
  );
}
