"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useData } from "@/providers/DataProvider";
import { APPLICATION_STATUSES, ApplicationStatus } from "@/types/application";
import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Select";
import { StatusTimeline } from "@/components/applications/StatusTimeline";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { formatDate } from "@/lib/utils/date";

import { parseJobDescription } from "@/lib/parser/jdParser";
import { calculateMatchScore } from "@/lib/matching/jobMatcher";
import { recommendProjects } from "@/lib/matching/projectMatcher";
import { MatchScoreDisplay } from "@/components/applications/MatchScoreDisplay";
import { RequirementsList } from "@/components/applications/RequirementsList";

export default function ApplicationDetailPage() {
  const { id } = useParams() as { id: string };
  const router = useRouter();
  const { applications, updateApplication, updateApplicationStatus, skills, projects } = useData();

  const application = applications.find(a => a.id === id);
  const [isEditingNotes, setIsEditingNotes] = useState(false);
  const [tempNotes, setTempNotes] = useState("");

  if (!application) {
    return <div className="p-8 text-center">Application not found.</div>;
  }

  const handleSaveNotes = () => {
    updateApplication(id, { notes: tempNotes });
    setIsEditingNotes(false);
  };

  const handleAnalyzeJD = () => {
    if (!application.jobDescription) return;
    const parsed = parseJobDescription(application.jobDescription);
    const matchResult = calculateMatchScore(parsed.all, skills);
    const recommended = recommendProjects(parsed.all, projects, skills);

    updateApplication(id, {
      requirements: parsed.all,
      matchResult,
      recommendedProjects: recommended,
    });
  };

  const handleRemoveRequirement = (reqId: string) => {
    const newReqs = application.requirements.filter(r => r.id !== reqId);
    const matchResult = calculateMatchScore(newReqs, skills);
    const recommended = recommendProjects(newReqs, projects, skills);
    
    updateApplication(id, {
      requirements: newReqs,
      matchResult,
      recommendedProjects: recommended,
    });
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12">
      <div className="flex items-center space-x-4">
        <button onClick={() => router.back()} className="text-gray-400 hover:text-gray-600">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex-1">
          <h1 className="text-2xl font-semibold text-gray-900">{application.company}</h1>
          <p className="mt-1 text-sm text-gray-500">{application.position}</p>
        </div>
        <div className="flex space-x-3 items-center">
          {application.jobUrl && (
            <a href={application.jobUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 text-sm flex items-center">
              <ExternalLink className="w-4 h-4 mr-1" /> View Job
            </a>
          )}
          <Select
            value={application.status}
            onChange={(e) => updateApplicationStatus(id, e.target.value as ApplicationStatus)}
            options={APPLICATION_STATUSES.map(s => ({ value: s.value, label: s.label }))}
            className="w-40"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          
          {/* Job Match Analysis */}
          {application.matchResult ? (
            <div className="bg-white shadow rounded-lg p-6 border border-gray-200">
              <MatchScoreDisplay result={application.matchResult} />
              
              <div className="mt-8 border-t border-gray-200 pt-6">
                <h3 className="text-sm font-medium text-gray-900 mb-4">Extracted Requirements</h3>
                <RequirementsList requirements={application.requirements} onRemove={handleRemoveRequirement} />
              </div>
            </div>
          ) : (
            <div className="bg-white shadow rounded-lg p-6 border border-gray-200 text-center">
              <h3 className="text-lg font-medium text-gray-900">Job Match Analysis</h3>
              <p className="text-sm text-gray-500 mt-2 mb-4">Analyze the job description to extract requirements and see how well your skills match.</p>
              <Button onClick={handleAnalyzeJD} disabled={!application.jobDescription}>Analyze Job Description</Button>
            </div>
          )}

          {/* Recommended Projects */}
          {application.recommendedProjects && application.recommendedProjects.length > 0 && (
            <div className="bg-white shadow rounded-lg p-6 border border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Recommended Projects</h3>
              <div className="space-y-4">
                {application.recommendedProjects.map((rec, i) => (
                  <div key={rec.projectId} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <div>
                      <h4 className="font-medium text-gray-900">{i + 1}. {rec.projectName}</h4>
                      <p className="text-xs text-gray-500 mt-1">
                        Matched: {rec.matchedSkills.join(", ")}
                      </p>
                    </div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {rec.score}% Match
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Interview Prep Placeholder */}
          <div id="interview-prep-placeholder" className="bg-white shadow rounded-lg p-6 border border-gray-200 border-dashed hidden">
            Interview Prep will go here
          </div>

          {/* Job Description */}
          <div className="bg-white shadow rounded-lg p-6 border border-gray-200">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Job Description</h2>
            {application.jobDescription ? (
              <div className="prose prose-sm max-w-none text-gray-600 max-h-96 overflow-y-auto bg-gray-50 p-4 rounded border border-gray-100 whitespace-pre-wrap">
                {application.jobDescription}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">No job description provided.</p>
            )}
          </div>

        </div>

        <div className="space-y-6">
          {/* Details Sidebar */}
          <div className="bg-white shadow rounded-lg p-6 border border-gray-200">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Details</h2>
            <dl className="space-y-3 text-sm">
              <div>
                <dt className="text-gray-500">Applied On</dt>
                <dd className="font-medium text-gray-900">{formatDate(application.applicationDate)}</dd>
              </div>
              {application.deadline && (
                <div>
                  <dt className="text-gray-500">Deadline</dt>
                  <dd className="font-medium text-gray-900">{formatDate(application.deadline)}</dd>
                </div>
              )}
              {application.location && (
                <div>
                  <dt className="text-gray-500">Location</dt>
                  <dd className="font-medium text-gray-900">{application.location}</dd>
                </div>
              )}
              {application.salary && (
                <div>
                  <dt className="text-gray-500">Salary</dt>
                  <dd className="font-medium text-gray-900">{application.salary}</dd>
                </div>
              )}
            </dl>
          </div>

          {/* Notes */}
          <div className="bg-white shadow rounded-lg p-6 border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-medium text-gray-900">Notes</h2>
              {!isEditingNotes && (
                <button onClick={() => { setTempNotes(application.notes); setIsEditingNotes(true); }} className="text-sm text-blue-600 hover:text-blue-800">
                  Edit
                </button>
              )}
            </div>
            {isEditingNotes ? (
              <div className="space-y-3">
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
                  rows={4}
                  value={tempNotes}
                  onChange={(e) => setTempNotes(e.target.value)}
                />
                <div className="flex justify-end space-x-2">
                  <Button variant="ghost" size="sm" onClick={() => setIsEditingNotes(false)}>Cancel</Button>
                  <Button variant="primary" size="sm" onClick={handleSaveNotes}>Save</Button>
                </div>
              </div>
            ) : (
              <div className="text-sm text-gray-600 whitespace-pre-wrap">
                {application.notes || "No notes."}
              </div>
            )}
          </div>

          {/* Status Timeline */}
          <div className="bg-white shadow rounded-lg p-6 border border-gray-200">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Timeline</h2>
            <StatusTimeline history={application.statusHistory} />
          </div>
        </div>
      </div>
    </div>
  );
}
