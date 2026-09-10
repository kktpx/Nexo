import React from "react";
import { MatchResult } from "@/types/application";

export function MatchScoreDisplay({ result }: { result: MatchResult }) {
  const { score, matchedSkills, missingRequiredSkills, missingPreferredSkills } = result;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-medium text-gray-900">Job Match</h3>
        <span className="text-2xl font-bold text-gray-900">{score}%</span>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div 
          className={`h-2.5 rounded-full ${score >= 80 ? "bg-green-600" : score >= 50 ? "bg-yellow-400" : "bg-red-500"}`} 
          style={{ width: `${score}%` }}
        ></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
        <div>
          <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Matched</h4>
          <ul className="space-y-1">
            {matchedSkills.length > 0 ? (
              matchedSkills.map(skill => (
                <li key={skill} className="text-sm text-green-700 flex items-center">
                  <span className="mr-1.5">✓</span> <span className="capitalize">{skill}</span>
                </li>
              ))
            ) : (
              <li className="text-sm text-gray-400">None</li>
            )}
          </ul>
        </div>
        
        <div>
          <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Missing Required</h4>
          <ul className="space-y-1">
            {missingRequiredSkills.length > 0 ? (
              missingRequiredSkills.map(skill => (
                <li key={skill} className="text-sm text-red-700 flex items-center">
                  <span className="mr-1.5">✕</span> <span className="capitalize">{skill}</span>
                </li>
              ))
            ) : (
              <li className="text-sm text-gray-400">None</li>
            )}
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Missing Preferred</h4>
          <ul className="space-y-1">
            {missingPreferredSkills.length > 0 ? (
              missingPreferredSkills.map(skill => (
                <li key={skill} className="text-sm text-yellow-600 flex items-center">
                  <span className="mr-1.5">△</span> <span className="capitalize">{skill}</span>
                </li>
              ))
            ) : (
              <li className="text-sm text-gray-400">None</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
