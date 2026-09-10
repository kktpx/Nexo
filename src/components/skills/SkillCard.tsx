import React from "react";
import { Skill, SKILL_CATEGORIES } from "@/types/skill";
import { SkillLevel } from "./SkillLevel";
import { Pencil, Trash2 } from "lucide-react";

interface SkillCardProps {
  skill: Skill;
  onEdit: (skill: Skill) => void;
  onDelete: (id: string) => void;
}

export function SkillCard({ skill, onEdit, onDelete }: SkillCardProps) {
  const categoryLabel = SKILL_CATEGORIES.find(c => c.value === skill.category)?.label || skill.category;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium text-gray-900">{skill.name}</h3>
          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800 mt-1">
            {categoryLabel}
          </span>
        </div>
        <div className="flex space-x-2">
          <button onClick={() => onEdit(skill)} className="text-gray-400 hover:text-blue-500">
            <Pencil className="w-4 h-4" />
          </button>
          <button onClick={() => onDelete(skill.id)} className="text-gray-400 hover:text-red-500">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div className="mt-4">
        <SkillLevel level={skill.level} />
      </div>
    </div>
  );
}
