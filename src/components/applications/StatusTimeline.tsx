import React from "react";
import { StatusChange, APPLICATION_STATUSES } from "@/types/application";
import { formatDate } from "@/lib/utils/date";

export function StatusTimeline({ history }: { history: StatusChange[] }) {
  if (!history || history.length === 0) return null;

  return (
    <div className="flow-root mt-4">
      <ul className="-mb-8">
        {history.map((event, idx) => {
          const isLast = idx === history.length - 1;
          const fromLabel = event.from ? APPLICATION_STATUSES.find(s => s.value === event.from)?.label : "Start";
          const toLabel = APPLICATION_STATUSES.find(s => s.value === event.to)?.label;
          
          return (
            <li key={`${event.changedAt}-${idx}`}>
              <div className="relative pb-8">
                {!isLast && (
                  <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
                )}
                <div className="relative flex space-x-3">
                  <div>
                    <span className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center ring-8 ring-white border border-gray-300">
                      <div className="h-2.5 w-2.5 rounded-full bg-blue-600" />
                    </span>
                  </div>
                  <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                    <div>
                      <p className="text-sm text-gray-500">
                        Moved from <span className="font-medium text-gray-900">{fromLabel}</span> to <span className="font-medium text-gray-900">{toLabel}</span>
                      </p>
                    </div>
                    <div className="text-right text-sm whitespace-nowrap text-gray-500">
                      {formatDate(event.changedAt)}
                    </div>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
