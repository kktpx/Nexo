import React from "react";
import { JobRequirement } from "@/types/application";
import { Trash2 } from "lucide-react";

interface RequirementsListProps {
  requirements: JobRequirement[];
  onRemove: (id: string) => void;
}

export function RequirementsList({ requirements, onRemove }: RequirementsListProps) {
  const required = requirements.filter(r => r.type === "required");
  const preferred = requirements.filter(r => r.type === "preferred");

  const renderList = (list: JobRequirement[]) => (
    <ul className="space-y-2">
      {list.length > 0 ? (
        list.map(req => (
          <li key={req.id} className="flex items-center justify-between bg-gray-50 p-2 rounded-md border border-gray-200">
            <span className="text-sm text-gray-800 capitalize">{req.skill}</span>
            <button 
              onClick={() => onRemove(req.id)}
              className="text-gray-400 hover:text-red-500"
              title="Remove requirement"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </li>
        ))
      ) : (
        <li className="text-sm text-gray-400 italic">None</li>
      )}
    </ul>
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <div>
        <h4 className="text-sm font-semibold text-gray-700 mb-3">Required Skills</h4>
        {renderList(required)}
      </div>
      <div>
        <h4 className="text-sm font-semibold text-gray-700 mb-3">Preferred Skills</h4>
        {renderList(preferred)}
      </div>
    </div>
  );
}
