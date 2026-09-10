import React from "react";

export function SkillLevel({ level }: { level: number }) {
  const max = 5;
  return (
    <div className="flex items-center space-x-1" title={`${level}/${max}`}>
      {Array.from({ length: max }).map((_, i) => (
        <div
          key={i}
          className={`h-2 w-4 rounded-sm ${i < level ? "bg-blue-600" : "bg-gray-200"}`}
        />
      ))}
      <span className="text-xs text-gray-500 ml-2">{level}/5</span>
    </div>
  );
}
