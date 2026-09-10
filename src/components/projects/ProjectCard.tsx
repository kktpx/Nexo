import React from "react";
import { Project } from "@/types/project";
import { Skill } from "@/types/skill";
import { Pencil, Trash2, ExternalLink } from "lucide-react";

interface ProjectCardProps {
  project: Project;
  skills: Skill[];
  onEdit: (project: Project) => void;
  onDelete: (id: string) => void;
}

export function ProjectCard({ project, skills, onEdit, onDelete }: ProjectCardProps) {
  const statusColors = {
    "in-progress": "bg-yellow-100 text-yellow-800",
    "completed": "bg-green-100 text-green-800",
    "archived": "bg-gray-100 text-gray-800",
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow flex flex-col h-full">
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-gray-900 text-lg truncate pr-4">{project.name}</h3>
          <div className="flex space-x-2 flex-shrink-0">
            <button onClick={() => onEdit(project)} className="text-gray-400 hover:text-blue-500">
              <Pencil className="w-4 h-4" />
            </button>
            <button onClick={() => onDelete(project.id)} className="text-gray-400 hover:text-red-500">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        <p className="text-sm text-gray-600 mb-4 flex-1 line-clamp-3">
          {project.shortDescription}
        </p>

        <div className="space-y-3 mt-auto">
          {project.techStack.length > 0 && (
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1.5">Tech Stack</p>
              <div className="flex flex-wrap gap-1.5">
                {project.techStack.map(tech => (
                  <span key={tech} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {project.skillIds.length > 0 && (
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1.5">Skills Demonstrated</p>
              <div className="flex flex-wrap gap-1.5">
                {project.skillIds.map(id => {
                  const skill = skills.find(s => s.id === id);
                  return skill ? (
                    <span key={id} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-700">
                      {skill.name}
                    </span>
                  ) : null;
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="px-5 py-3 bg-gray-50 border-t border-gray-200 flex justify-between items-center text-sm">
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[project.status]}`}>
          {project.status.replace("-", " ")}
        </span>
        <div className="flex space-x-4">
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-900 flex items-center">
              Code
            </a>
          )}
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 flex items-center">
              <ExternalLink className="w-4 h-4 mr-1.5" /> Live
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
