import React from "react";
import { InterviewPreparation } from "@/types/application";
import { Checkbox } from "@/components/ui/Checkbox";

interface InterviewPrepUIProps {
  prep: InterviewPreparation;
  onToggleTopic: (type: "technical" | "project", id: string) => void;
}

export function InterviewPrepUI({ prep, onToggleTopic }: InterviewPrepUIProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Technical Topics to Review</h3>
        {prep.technicalTopics.length > 0 ? (
          <ul className="space-y-2">
            {prep.technicalTopics.map(topic => (
              <li key={topic.id} className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    type="checkbox"
                    checked={topic.completed}
                    onChange={() => onToggleTopic("technical", topic.id)}
                    className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded cursor-pointer"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label className={`font-medium ${topic.completed ? "text-gray-400 line-through" : "text-gray-700"}`}>
                    {topic.topic}
                  </label>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-500 italic">No specific technical topics identified.</p>
        )}
      </div>

      {prep.projectReviews.length > 0 && (
        <div className="pt-4 border-t border-gray-200">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Project Reviews</h3>
          <div className="space-y-4">
            {prep.projectReviews.map(review => (
              <div key={review.projectId} className="bg-gray-50 p-3 rounded border border-gray-200">
                <h4 className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">
                  {review.projectName}
                </h4>
                <ul className="space-y-2">
                  {review.items.map(item => (
                    <li key={item.id} className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          type="checkbox"
                          checked={item.completed}
                          onChange={() => onToggleTopic("project", item.id)}
                          className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded cursor-pointer"
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label className={`${item.completed ? "text-gray-400 line-through" : "text-gray-700"}`}>
                          {item.topic}
                        </label>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
