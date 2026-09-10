"use client";

import React, { createContext, useContext, useState, useMemo, useEffect, useRef } from "react";
import { Skill, CreateSkillInput, UpdateSkillInput } from "@/types/skill";
import { Project, CreateProjectInput } from "@/types/project";
import { Application, CreateApplicationInput, ApplicationStatus } from "@/types/application";
import { Interview } from "@/types/interview";
import { MOCK_SKILLS, MOCK_PROJECTS, MOCK_APPLICATIONS, MOCK_INTERVIEWS } from "@/lib/data/mockData";
import { generateId } from "@/lib/utils/id";
import { nowISO } from "@/lib/utils/date";
import { LocalStorageRepository } from "@/lib/data/repositories/LocalStorageRepository";

interface DataState {
  skills: Skill[];
  projects: Project[];
  applications: Application[];
  interviews: Interview[];
}

interface DataContextType extends DataState {
  addSkill: (input: CreateSkillInput) => void;
  updateSkill: (id: string, input: UpdateSkillInput) => void;
  deleteSkill: (id: string) => void;
  
  addProject: (input: CreateProjectInput) => void;
  updateProject: (id: string, input: Partial<CreateProjectInput>) => void;
  deleteProject: (id: string) => void;
  
  addApplication: (input: CreateApplicationInput) => void;
  updateApplication: (id: string, data: Partial<Application>) => void;
  updateApplicationStatus: (id: string, newStatus: ApplicationStatus) => void;
  deleteApplication: (id: string) => void;
  
  addInterview: (input: Omit<Interview, "id" | "createdAt" | "updatedAt">) => void;
  updateInterview: (id: string, data: Partial<Interview>) => void;
  deleteInterview: (id: string) => void;
}

const DataContext = createContext<DataContextType | null>(null);

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [interviews, setInterviews] = useState<Interview[]>([]);
  
  // Use a ref to store repositories to avoid recreating them on every render
  const repos = useRef<{
    skills: LocalStorageRepository<Skill>;
    projects: LocalStorageRepository<Project>;
    applications: LocalStorageRepository<Application>;
    interviews: LocalStorageRepository<Interview>;
  } | null>(null);

  useEffect(() => {
    // Initialize repositories only on the client side
    repos.current = {
      skills: new LocalStorageRepository<Skill>("nexo_skills", MOCK_SKILLS),
      projects: new LocalStorageRepository<Project>("nexo_projects", MOCK_PROJECTS),
      applications: new LocalStorageRepository<Application>("nexo_applications", MOCK_APPLICATIONS),
      interviews: new LocalStorageRepository<Interview>("nexo_interviews", MOCK_INTERVIEWS),
    };

    setSkills(repos.current.skills.getAll());
    setProjects(repos.current.projects.getAll());
    setApplications(repos.current.applications.getAll());
    setInterviews(repos.current.interviews.getAll());
  }, []);

  // --- Skills ---
  const addSkill = (input: CreateSkillInput) => {
    if (!repos.current) return;
    const newSkill: Skill = {
      id: generateId(),
      ...input,
      normalizedName: input.name.trim().toLowerCase(),
      createdAt: nowISO(),
      updatedAt: nowISO(),
    };
    repos.current.skills.create(newSkill);
    setSkills(repos.current.skills.getAll());
  };

  const updateSkill = (id: string, input: UpdateSkillInput) => {
    if (!repos.current) return;
    const existing = repos.current.skills.getById(id);
    if (!existing) return;
    
    repos.current.skills.update(id, {
      ...input,
      normalizedName: input.name ? input.name.trim().toLowerCase() : existing.normalizedName,
      updatedAt: nowISO()
    });
    setSkills(repos.current.skills.getAll());
  };

  const deleteSkill = (id: string) => {
    if (!repos.current) return;
    repos.current.skills.delete(id);
    setSkills(repos.current.skills.getAll());
    
    // Cascade to projects
    const allProjects = repos.current.projects.getAll();
    allProjects.forEach(p => {
      if (p.skillIds.includes(id)) {
        repos.current!.projects.update(p.id, {
          skillIds: p.skillIds.filter(sid => sid !== id)
        });
      }
    });
    setProjects(repos.current.projects.getAll());
  };

  // --- Projects ---
  const addProject = (input: CreateProjectInput) => {
    if (!repos.current) return;
    const newProject: Project = {
      id: generateId(),
      ...input,
      createdAt: nowISO(),
      updatedAt: nowISO(),
    };
    repos.current.projects.create(newProject);
    setProjects(repos.current.projects.getAll());
  };

  const updateProject = (id: string, input: Partial<CreateProjectInput>) => {
    if (!repos.current) return;
    repos.current.projects.update(id, { ...input, updatedAt: nowISO() });
    setProjects(repos.current.projects.getAll());
  };

  const deleteProject = (id: string) => {
    if (!repos.current) return;
    repos.current.projects.delete(id);
    setProjects(repos.current.projects.getAll());
  };

  // --- Applications ---
  const addApplication = (input: CreateApplicationInput) => {
    if (!repos.current) return;
    const newApp: Application = {
      id: generateId(),
      ...input,
      statusHistory: [{ from: null, to: input.status, changedAt: nowISO() }],
      requirements: [],
      notes: input.notes || "",
      createdAt: nowISO(),
      updatedAt: nowISO(),
    };
    repos.current.applications.create(newApp);
    setApplications(repos.current.applications.getAll());
  };

  const updateApplication = (id: string, data: Partial<Application>) => {
    if (!repos.current) return;
    repos.current.applications.update(id, { ...data, updatedAt: nowISO() });
    setApplications(repos.current.applications.getAll());
  };

  const updateApplicationStatus = (id: string, newStatus: ApplicationStatus) => {
    if (!repos.current) return;
    const existing = repos.current.applications.getById(id);
    if (!existing || existing.status === newStatus) return;

    repos.current.applications.update(id, {
      status: newStatus,
      statusHistory: [...existing.statusHistory, { from: existing.status, to: newStatus, changedAt: nowISO() }],
      updatedAt: nowISO()
    });
    setApplications(repos.current.applications.getAll());
  };

  const deleteApplication = (id: string) => {
    if (!repos.current) return;
    repos.current.applications.delete(id);
    setApplications(repos.current.applications.getAll());
    
    // Cascade to interviews
    const allInterviews = repos.current.interviews.getAll();
    allInterviews.forEach(i => {
      if (i.applicationId === id) {
        repos.current!.interviews.delete(i.id);
      }
    });
    setInterviews(repos.current.interviews.getAll());
  };

  // --- Interviews ---
  const addInterview = (input: Omit<Interview, "id" | "createdAt" | "updatedAt">) => {
    if (!repos.current) return;
    const newInterview: Interview = {
      id: generateId(),
      ...input,
      createdAt: nowISO(),
      updatedAt: nowISO(),
    };
    repos.current.interviews.create(newInterview);
    setInterviews(repos.current.interviews.getAll());
  };

  const updateInterview = (id: string, data: Partial<Interview>) => {
    if (!repos.current) return;
    repos.current.interviews.update(id, { ...data, updatedAt: nowISO() });
    setInterviews(repos.current.interviews.getAll());
  };

  const deleteInterview = (id: string) => {
    if (!repos.current) return;
    repos.current.interviews.delete(id);
    setInterviews(repos.current.interviews.getAll());
  };



  const value = useMemo(() => ({
    skills, projects, applications, interviews,
    addSkill, updateSkill, deleteSkill,
    addProject, updateProject, deleteProject,
    addApplication, updateApplication, updateApplicationStatus, deleteApplication,
    addInterview, updateInterview, deleteInterview
  }), [skills, projects, applications, interviews]);

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
}
