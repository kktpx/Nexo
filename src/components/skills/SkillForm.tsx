import React, { useState, useEffect } from "react";
import { Skill, SkillCategory, SKILL_CATEGORIES, CreateSkillInput, UpdateSkillInput } from "@/types/skill";
import { normalizeSkillName } from "@/lib/skills/normalizer";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Modal } from "@/components/ui/Modal";

interface SkillFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (input: CreateSkillInput | UpdateSkillInput) => void;
  existingSkills: Skill[];
  initialData?: Skill | null;
}

export function SkillForm({ open, onClose, onSubmit, existingSkills, initialData }: SkillFormProps) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState<SkillCategory>("frontend");
  const [level, setLevel] = useState(3);
  const [error, setError] = useState("");

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setCategory(initialData.category);
      setLevel(initialData.level);
    } else {
      setName("");
      setCategory("frontend");
      setLevel(3);
    }
    setError("");
  }, [initialData, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Skill name is required");
      return;
    }

    const normalized = normalizeSkillName(name);
    const duplicate = existingSkills.find(
      (s) => s.normalizedName === normalized && s.id !== initialData?.id
    );
    if (duplicate) {
      setError(`"${duplicate.name}" already exists`);
      return;
    }

    onSubmit({ name, category, level });
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} title={initialData ? "Edit Skill" : "Add Skill"}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Skill Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. React, TypeScript, Docker"
          error={error}
          autoFocus
        />
        
        <Select
          label="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value as SkillCategory)}
          options={SKILL_CATEGORIES}
        />
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Proficiency Level ({level}/5)
          </label>
          <input
            type="range"
            min="1"
            max="5"
            value={level}
            onChange={(e) => setLevel(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>Beginner</span>
            <span>Expert</span>
          </div>
        </div>

        <div className="mt-5 sm:mt-6 flex justify-end space-x-3">
          <Button type="button" variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary">
            Save
          </Button>
        </div>
      </form>
    </Modal>
  );
}
