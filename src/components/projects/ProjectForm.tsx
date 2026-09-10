import React, { useState, useEffect } from "react";
import { Project, CreateProjectInput, UpdateProjectInput, ProjectType, ProjectStatus } from "@/types/project";
import { Skill, SKILL_CATEGORIES } from "@/types/skill";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Modal } from "@/components/ui/Modal";

interface ProjectFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (input: CreateProjectInput | UpdateProjectInput) => void;
  existingSkills: Skill[];
  initialData?: Project | null;
}

export function ProjectForm({ open, onClose, onSubmit, existingSkills, initialData }: ProjectFormProps) {
  const [name, setName] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [longDescription, setLongDescription] = useState("");
  const [techStackInput, setTechStackInput] = useState("");
  const [selectedSkillIds, setSelectedSkillIds] = useState<Set<string>>(new Set());
  const [githubUrl, setGithubUrl] = useState("");
  const [liveUrl, setLiveUrl] = useState("");
  const [projectType, setProjectType] = useState<ProjectType>("web-app");
  const [status, setStatus] = useState<ProjectStatus>("completed");
  const [error, setError] = useState("");

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setShortDescription(initialData.shortDescription);
      setLongDescription(initialData.longDescription);
      setTechStackInput(initialData.techStack.join(", "));
      setSelectedSkillIds(new Set(initialData.skillIds));
      setGithubUrl(initialData.githubUrl || "");
      setLiveUrl(initialData.liveUrl || "");
      setProjectType(initialData.projectType);
      setStatus(initialData.status);
    } else {
      setName("");
      setShortDescription("");
      setLongDescription("");
      setTechStackInput("");
      setSelectedSkillIds(new Set());
      setGithubUrl("");
      setLiveUrl("");
      setProjectType("web-app");
      setStatus("completed");
    }
    setError("");
  }, [initialData, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Project name is required");
      return;
    }
    if (!shortDescription.trim()) {
      setError("Short description is required");
      return;
    }

    const techStack = techStackInput
      .split(",")
      .map(t => t.trim())
      .filter(t => t.length > 0);

    onSubmit({
      name,
      shortDescription,
      longDescription,
      techStack,
      skillIds: Array.from(selectedSkillIds),
      githubUrl,
      liveUrl,
      projectType,
      status
    });
    onClose();
  };

  const toggleSkill = (id: string) => {
    const newSet = new Set(selectedSkillIds);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    setSelectedSkillIds(newSet);
  };

  return (
    <Modal open={open} onClose={onClose} title={initialData ? "Edit Project" : "Add Project"}>
      <form onSubmit={handleSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto p-1">
        <Input label="Project Name" value={name} onChange={e => setName(e.target.value)} error={error} />
        <Input label="Short Description" value={shortDescription} onChange={e => setShortDescription(e.target.value)} />
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Long Description</label>
          <textarea
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            rows={3}
            value={longDescription}
            onChange={e => setLongDescription(e.target.value)}
          />
        </div>

        <Input 
          label="Tech Stack (comma separated)" 
          value={techStackInput} 
          onChange={e => setTechStackInput(e.target.value)} 
          placeholder="e.g. Next.js, TypeScript, Tailwind" 
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Skills Demonstrated</label>
          <div className="max-h-40 overflow-y-auto border border-gray-200 rounded-md p-2 bg-gray-50 grid grid-cols-2 gap-2">
            {existingSkills.length === 0 ? (
              <p className="text-sm text-gray-500 col-span-2 p-2">No skills available. Add some in the Skills manager first.</p>
            ) : (
              existingSkills.map(skill => (
                <label key={skill.id} className="flex items-center space-x-2 text-sm bg-white p-1.5 rounded border border-gray-100 cursor-pointer hover:bg-gray-50">
                  <input
                    type="checkbox"
                    className="rounded text-blue-600 focus:ring-blue-500 h-4 w-4"
                    checked={selectedSkillIds.has(skill.id)}
                    onChange={() => toggleSkill(skill.id)}
                  />
                  <span className="truncate">{skill.name}</span>
                </label>
              ))
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Input label="GitHub URL" value={githubUrl} onChange={e => setGithubUrl(e.target.value)} placeholder="https://github.com/..." />
          <Input label="Live URL" value={liveUrl} onChange={e => setLiveUrl(e.target.value)} placeholder="https://..." />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Select
            label="Project Type"
            value={projectType}
            onChange={e => setProjectType(e.target.value as ProjectType)}
            options={[
              { value: "web-app", label: "Web App" },
              { value: "mobile-app", label: "Mobile App" },
              { value: "api", label: "API" },
              { value: "cli", label: "CLI" },
              { value: "library", label: "Library" },
              { value: "data-science", label: "Data Science" },
              { value: "devops", label: "DevOps" },
              { value: "other", label: "Other" },
            ]}
          />
          <Select
            label="Status"
            value={status}
            onChange={e => setStatus(e.target.value as ProjectStatus)}
            options={[
              { value: "completed", label: "Completed" },
              { value: "in-progress", label: "In Progress" },
              { value: "archived", label: "Archived" },
            ]}
          />
        </div>

        <div className="mt-5 sm:mt-6 flex justify-end space-x-3 pt-4 border-t border-gray-200">
          <Button type="button" variant="ghost" onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="primary">Save Project</Button>
        </div>
      </form>
    </Modal>
  );
}
