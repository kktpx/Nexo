"use client";

import React, { createContext, useContext, useState, useMemo } from "react";
import { Skill, CreateSkillInput, UpdateSkillInput } from "@/types/skill";
import { Project, CreateProjectInput } from "@/types/project";
import { Application, CreateApplicationInput, ApplicationStatus } from "@/types/application";
import { Interview } from "@/types/interview";
import { MOCK_SKILLS, MOCK_PROJECTS, MOCK_APPLICATIONS, MOCK_INTERVIEWS } from "@/lib/data/mockData";
import { generateId } from "@/lib/utils/id";
import { nowISO } from "@/lib/utils/date";

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
  const [skills, setSkills] = useState<Skill[]>(MOCK_SKILLS);
  const [projects, setProjects] = useState<Project[]>(MOCK_PROJECTS);
  const [applications, setApplications] = useState<Application[]>(MOCK_APPLICATIONS);
  const [interviews, setInterviews] = useState<Interview[]>(MOCK_INTERVIEWS);

  // --- Skills ---
  const addSkill = (input: CreateSkillInput) => {
    const newSkill: Skill = {
      id: generateId(),
      ...input,
      normalizedName: input.name.trim().toLowerCase(), // Will be updated with normalizer later
      createdAt: nowISO(),
      updatedAt: nowISO(),
    };
    setSkills(prev => [...prev, newSkill]);
  };

  const updateSkill = (id: string, input: UpdateSkillInput) => {
    setSkills(prev => prev.map(s => {
      if (s.id === id) {
        return { 
          ...s, 
          ...input, 
          normalizedName: input.name ? input.name.trim().toLowerCase() : s.normalizedName,
          updatedAt: nowISO() 
        };
      }
      return s;
    }));
  };

  const deleteSkill = (id: string) => {
    setSkills(prev => prev.filter(s => s.id !== id));
    // Also remove from projects (cascading)
    setProjects(prev => prev.map(p => ({
      ...p,
      skillIds: p.skillIds.filter(sid => sid !== id)
    })));
  };

  // --- Projects ---
  const addProject = (input: CreateProjectInput) => {
    const newProject: Project = {
      id: generateId(),
      ...input,
      createdAt: nowISO(),
      updatedAt: nowISO(),
    };
    setProjects(prev => [...prev, newProject]);
  };

  const updateProject = (id: string, input: Partial<CreateProjectInput>) => {
    setProjects(prev => prev.map(p => {
      if (p.id === id) {
        return { ...p, ...input, updatedAt: nowISO() };
      }
      return p;
    }));
  };

  const deleteProject = (id: string) => {
    setProjects(prev => prev.filter(p => p.id !== id));
  };

  // --- Applications ---
  const addApplication = (input: CreateApplicationInput) => {
    const newApp: Application = {
      id: generateId(),
      ...input,
      statusHistory: [{ from: null, to: input.status, changedAt: nowISO() }],
      requirements: [],
      notes: input.notes || "",
      createdAt: nowISO(),
      updatedAt: nowISO(),
    };
    setApplications(prev => [...prev, newApp]);
  };

  const updateApplication = (id: string, data: Partial<Application>) => {
    setApplications(prev => prev.map(a => {
      if (a.id === id) {
        return { ...a, ...data, updatedAt: nowISO() };
      }
      return a;
    }));
  };

  const updateApplicationStatus = (id: string, newStatus: ApplicationStatus) => {
    setApplications(prev => prev.map(a => {
      if (a.id === id && a.status !== newStatus) {
        return {
          ...a,
          status: newStatus,
          statusHistory: [...a.statusHistory, { from: a.status, to: newStatus, changedAt: nowISO() }],
          updatedAt: nowISO()
        };
      }
      return a;
    }));
  };

  const deleteApplication = (id: string) => {
    setApplications(prev => prev.filter(a => a.id !== id));
    setInterviews(prev => prev.filter(i => i.applicationId !== id)); // Cascade
  };

  // --- Interviews ---
  const addInterview = (input: Omit<Interview, "id" | "createdAt" | "updatedAt">) => {
    const newInterview: Interview = {
      id: generateId(),
      ...input,
      createdAt: nowISO(),
      updatedAt: nowISO(),
    };
    setInterviews(prev => [...prev, newInterview]);
  };

  const updateInterview = (id: string, data: Partial<Interview>) => {
    setInterviews(prev => prev.map(i => {
      if (i.id === id) {
        return { ...i, ...data, updatedAt: nowISO() };
      }
      return i;
    }));
  };

  const deleteInterview = (id: string) => {
    setInterviews(prev => prev.filter(i => i.id !== id));
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
