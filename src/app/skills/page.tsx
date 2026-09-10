"use client";

import React, { useState, useMemo } from "react";
import { useData } from "@/providers/DataProvider";
import { Skill, SKILL_CATEGORIES } from "@/types/skill";
import { SkillCard } from "@/components/skills/SkillCard";
import { SkillForm } from "@/components/skills/SkillForm";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Plus, Search } from "lucide-react";

export default function SkillsPage() {
  const { skills, addSkill, updateSkill, deleteSkill } = useData();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);

  const filteredSkills = useMemo(() => {
    return skills.filter(skill => {
      const matchName = skill.name.toLowerCase().includes(search.toLowerCase());
      const matchCategory = selectedCategory === "all" || skill.category === selectedCategory;
      return matchName && matchCategory;
    });
  }, [skills, search, selectedCategory]);

  const handleOpenForm = (skill?: Skill) => {
    setEditingSkill(skill || null);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingSkill(null);
  };

  const handleSubmit = (input: any) => {
    if (editingSkill) {
      updateSkill(editingSkill.id, input);
    } else {
      addSkill(input);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Skills Manager</h1>
          <p className="mt-1 text-sm text-gray-500">Manage your technical skills and proficiency levels.</p>
        </div>
        <Button onClick={() => handleOpenForm()}>
          <Plus className="w-4 h-4 mr-2" /> Add Skill
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <Input 
            className="pl-10" 
            placeholder="Search skills..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select
          className="block w-full sm:w-48 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="all">All Categories</option>
          {SKILL_CATEGORIES.map(c => (
            <option key={c.value} value={c.value}>{c.label}</option>
          ))}
        </select>
      </div>

      {filteredSkills.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredSkills.map(skill => (
            <SkillCard 
              key={skill.id} 
              skill={skill} 
              onEdit={handleOpenForm}
              onDelete={deleteSkill}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-lg border border-dashed border-gray-300">
          <h3 className="mt-2 text-sm font-medium text-gray-900">No skills found</h3>
          <p className="mt-1 text-sm text-gray-500">Get started by creating a new skill.</p>
          <div className="mt-6">
            <Button onClick={() => handleOpenForm()}>
              <Plus className="w-4 h-4 mr-2" /> Add Skill
            </Button>
          </div>
        </div>
      )}

      <SkillForm 
        open={isFormOpen} 
        onClose={handleCloseForm} 
        onSubmit={handleSubmit} 
        existingSkills={skills}
        initialData={editingSkill}
      />
    </div>
  );
}
